import { Tag, DescriptionSectionSSRKey } from './../../node_modules/@scalar/types/dist/legacy/reference-config.d'
import Elysia, { t } from "elysia"

export const example = new Elysia()

  .get("/", () => "Hello Ronaldo Sui!!!", {
    detail: {
      tags: ["Example"],
      summary: ('Get Hello TJ'),
      Description: 'Hello Thanaphat'
    }
  })

  .post("/about", ({ body }) => {
    return {
      id: '159357',
      msg: 'ayo' + body.name
    }
  }, {
    body: t.Object({
      name: t.String()
    }),
    detail: {
      tags: ["Example"],
      summary: ('About'),
      Description: 'Hello I love Roblox'
    }
  })