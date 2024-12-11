
import { file } from 'bun'
import Elysia, { Static, t } from "elysia"

export const _photo = t.Object({
    id: t.Optional(t.String()),
    url: t.String(),
    is_avatar: t.Optional(t.Boolean()),
    created_at: t.Optional(t.Date()),
    public_id: t.String()
})

export const _uploadPhoto = t.Object({
    file: t.File({
        type: ['image/png', 'image/jpeg', 'image/jpg'],
        maxSize: '1m',
        error: 'image must be png, jpeg, or jpg'
    })
})

export type photo = Static<typeof _photo>

export const PhotoDto = new Elysia().model({
    upload: _uploadPhoto,
    photo: _photo,
    photos: t.Array(_photo)
})