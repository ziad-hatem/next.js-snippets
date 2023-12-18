import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

db.snippets.create({
  data: {
    title: "title!",
    code: "const abc => () => {}",
  },
});
