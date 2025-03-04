import { message } from './../types/message.type'
import Elysia, { error, t } from "elysia"
import { jwtConfig } from "../configs/jwt.config"
import { AuthMiddleWare, AuthPayload } from "../middlewares/auth.middleware"
import { MessageDto } from "../types/message.type"
import mongoose from "mongoose"
import { Message } from "../models/message.model"
import cli from '@angular/cli'

type client = {
    ws_id: string,
    user_id: string,
    group_name: string,
}

const groupSubscription = new Map<string, Set<client>>()

export const MessageController = new Elysia({
    prefix: "api/message",
    tags: ['Message']
})
    .use(jwtConfig)
    .use(AuthMiddleWare)
    .use(MessageDto)

    .ws('/ws', {

        async open(ws) {
            const token = ws.data.query.token
            const recipient_id = ws.data.query.recipient_id
            const payload = await ws.data.jwt.verify(token)
            if (!payload || !recipient_id) {
                ws.send({ sender: 'system', content: 'Unauthorized' })
                ws.close()
            }
            const user_id = (payload as AuthPayload).id
            const groupName = getGroupName(user_id, recipient_id!)

            ws.send({ sender: 'system', content: 'connected' })
            if (!ws.isSubscribed(groupName)) {
                ws.subscribe(groupName)

                if (!groupSubscription.has(groupName)) {
                    groupSubscription.set(groupName, new Set())
                }

                !groupSubscription.get(groupName)?.add({
                    ws_id: ws.id,
                    user_id: user_id,
                    group_name: groupName
                })
            }
        },

        close(ws) {
            for (const clients of groupSubscription.values()) {
                for (const client of clients) {
                    if (client.ws_id === ws.id) {
                        ws.unsubscribe(client.group_name)
                        clients.delete(client)
                    }
                }
            }
        },

        async message(ws, message) {
            const msg = message as message
            if (!msg.sender || !msg.content || !msg.recipient) {
                ws.send({ sender: 'system', content: 'invalid message,no sender' })
                return
            }

            const groupName = getGroupName(msg.sender, msg.recipient)

            try {
                const newMessage = new Message({
                    sender: new mongoose.Types.ObjectId(msg.sender),
                    recipient: new mongoose.Types.ObjectId(msg.recipient),
                    content: msg.content
                })
                if (isRecipientConnected(groupName, msg.recipient)) {
                    newMessage.read_at = new Date()
                }

                await newMessage.save()
                const msgObj = newMessage.toMessage()
                ws.publish(groupName, msgObj)
                ws.send(msgObj)
            } catch (error) {
                ws.send({ sender: 'system', content: 'Somthing wen wrong, pls dance for fix this code' })
                return
            }
        },
    })

    .get('/:recipient_id', async ({ Auth, params: { recipient_id }, query }) => {
        if (!query.pageSize || !query.currentPage)
            throw error(400)
        const user_id = (Auth.payload as AuthPayload).id
        const sender_Objid = new mongoose.Types.ObjectId(user_id)
        const recipient_Objid = new mongoose.Types.ObjectId(recipient_id)

        const filter = {
            $or: [
                { sender: sender_Objid, recipient: recipient_Objid, sender_delete: { $ne: true } },
                { sender: recipient_Objid, recipient: sender_Objid, recipient_delete: { $ne: true } },
            ]
        }
        const model = Message.find(filter).sort({ created_at: -1 })

        const skip = query.pageSize * (query.currentPage - 1)
        model.skip(skip).limit(query.pageSize)

        const [messageDocs, totalCount] = await Promise.all([
            model.exec(),
            Message.countDocuments(filter).exec()
        ])

        query.length = totalCount
        const messages = messageDocs.map(doc => doc.toMessage())

        await Message.updateMany({
            sender: recipient_Objid,
            recipient: sender_Objid,
            read_at: { $exists: false }
        }, {
            $set: { read_at: new Date() }
        })
        return {
            pagination: query,
            items: messages
        }

    }, {
        query: "pagination",
        response: "messages",
        isSignIn: true,
        params: t.Object({ recipient_id: t.String() })
    })

const getGroupName = function (sender: string, recipient: string) {
    const compare = sender.localeCompare(recipient)
    if (compare < 0)
        return `${sender}-${recipient}`
    return `${recipient}-${sender}`
}

const countSubscribers = function (groupName: string) {
    return groupSubscription.get(groupName)?.size || 0
}

const isRecipientConnected = function (group_name: string, recipient: string): boolean {
    const clients = groupSubscription.get(group_name)
    if (clients)
        return Array.from(clients).find(client => client.user_id === recipient) !== undefined
    return false
}