import { message } from './../../../../../../server/src/types/message.type'
import { Component, input, OnInit } from '@angular/core'
import { User } from '../../../_models/user'
import { Message } from '../../../_models/message'

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit {
  sender = input.required<User>()
  recipent = input.required<User>()
  message = input.required<Message>()
  previousMessageSendDate = input.required<Date | undefined>()

  isMessageFromSender = true
  messageStyle: MessageStyle = 'right'
  avatar = ''
  messageDate = ''
  readAt = 'unread'

  ngOnInit(): void {
    this.isMessageFromSender = this.sender().id === this.message().sender
    if (this.isMessageFromSender) {
      this.avatar = this.sender().avatar!
    } else {
      this.avatar = this.recipent().avatar!
      this.messageStyle = 'left'
    }

    if (this.message().read_at)
      this.readAt = `read: ${this.message().read_at}`
  }

  isDateSamePreviousMessageSendDate(): boolean {
    const date1 = new Date(this.message().created_at!.toString())
    this.messageDate = date1.toLocaleDateString()

    if (!this.previousMessageSendDate()) return false

    const date2 = new Date(this.previousMessageSendDate()!.toString())

    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())

    return d1.getTime() === d2.getTime()
  }
}

type MessageStyle = 'right' | 'left'