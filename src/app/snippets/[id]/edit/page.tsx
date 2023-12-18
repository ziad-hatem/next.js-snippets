import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/SnippetEditForm";
import { revalidatePath } from "next/cache";

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

const SnippetEditPage = async (props: SnippetEditPageProps) => {
  const id = +props.params.id;
  const snippet = await db.snippets.findFirst({
    where: { id },
  });

  if (!snippet) {
    return notFound();
  }
  revalidatePath(`snippets/${id}`);
  revalidatePath(`snippets/${id}/edit`);
  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
};

export default SnippetEditPage;
