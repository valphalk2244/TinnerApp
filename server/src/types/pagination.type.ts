import { Static, t, TSchema } from "elysia"

export const _pagination = t.Object({
    pageSize: t.Number(),
    currentpage: t.Number(),
    length: t.Optional(t.Number())
})

export type pagination = Static<typeof _pagination>

export function CreatePagination<T extends TSchema, U extends TSchema>(itemType: T, paginationType: U) {
    return t.Object({
        items: t.Array(itemType),
        pagination: paginationType
    })
}