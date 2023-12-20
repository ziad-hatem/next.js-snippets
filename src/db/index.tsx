import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export const db = new PrismaClient().$extends(withAccelerate());

db.snippets.create({
  data: {
    title: "title!",
    code: "const abc => () => {}",
  },
});
