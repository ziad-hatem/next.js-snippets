"use client";
import React from "react";
import { db } from "@/db";

import * as actions from "@/actions/index";
import { useFormState } from "react-dom";
const SnippetCreatePage = () => {
  const [formState, action] = useFormState(actions.createSnippet, {
    message: "",
  });
  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4 w-[40%] mx-auto">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="Code"
          />
        </div>

        {formState.message ? (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState.message}
          </div>
        ) : null}

        <button
          type="submit"
          className="border rounded p-2 bg-blue-200 hover:bg-blue-300 transition"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default SnippetCreatePage;
