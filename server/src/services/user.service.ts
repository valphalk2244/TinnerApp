import mongoose, { Query, RootFilterQuery } from 'mongoose'
import { pagination } from './../types/pagination.type'
import { updateProfile, user, userPagination, userPaginator } from './../types/user.type'
import { IUserDocument } from '../interfaces/useer.interface'
import { QueryHelper } from '../helper/query.helper'

export const UserService = {
    get: function (pagination: userPagination, user_id: string): Promise<userPaginator> {
        let fillter: RootFilterQuery<IUserDocument> = {
            _id: { $nin: new mongoose.Types.ObjectId(user_id) },
            $and: QueryHelper.parseUserQuery(pagination)
        }
        // newxt week
        throw new Error('Not implemented')
    },

    getByUserName: function (username: string): Promise<user> {
        throw new Error('Not implemented')
    },
    updateProfile: function (newProfile: updateProfile, user_id: string): Promise<user> {
        throw new Error('Not implemented')
    }
}