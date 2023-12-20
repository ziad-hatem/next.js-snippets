import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Button from "./button";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as actions from "@/actions";
interface SnippetShowPage {
  params: {
    id: string;
  };
}

const SnippetShowPage = async (props: SnippetShowPage) => {
  const snippet = await db.snippets.findFirst({
    where: { id: +props.params.id },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet?.title}</h1>
        <div className="flex gap-4">
          <Link
            className="p2 border rounded"
            href={`/snippets/${snippet.id}/edit`}
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <Button />
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <SyntaxHighlighter language="javascript" style={docco}>
          {snippet.code}
        </SyntaxHighlighter>
      </pre>
    </div>
  );
};

export async function generateStaticParams() {
  const snippets = await db.snippets.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}

export default SnippetShowPage;
