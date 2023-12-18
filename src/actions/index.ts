"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export async function editSnippet(id: number, code: string) {
  await db.snippets.update({
    where: { id },
    data: { code },
  });
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippets.delete({
    where: { id },
  });
  revalidatePath("/");
  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title Must Be Longer",
      };
    }

    if (typeof code !== "string" || title.length < 10) {
      return {
        message: "Code Must Be Longer",
      };
    }
    revalidatePath("/");
    const snippet = await db.snippets.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "SomeThing Went Wrong...",
      };
    }
  }
  redirect("/");
}
