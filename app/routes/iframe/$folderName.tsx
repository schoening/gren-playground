import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import * as E from "fp-ts/lib/Either";
import * as api from "~/api.server";

export const loader: LoaderFunction = async ({ params }) => {
  const folderName = params.folderName;

  const compileErrorEither = await api.getFiles(`./project/${folderName}/`, [
    "error.txt",
  ])();

  const grenJSEither = await api.getFiles(`./project/${folderName}/`, [
    "gren.js",
  ])();

  if (E.isLeft(grenJSEither) && E.isLeft(compileErrorEither)) {
    return new Response("No error.txt or gren.js found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (E.isRight(compileErrorEither)) {
    const compileError = compileErrorEither.right;
    return json({ folderName, compileError: compileError[0].content });
  }

  if (E.isRight(grenJSEither)) {
    return json({ folderName, grenJSFound: true });
  }
};

export default function IframePage() {
  const { folderName, grenJSFound, compileError } = useLoaderData();

  console.log({ folderName, grenJSFound, compileError });

  useEffect(() => {
    if (compileError || !grenJSFound) {
      return;
    }
    const element = document.querySelector("#gren");
    if (element && window.Gren) {
      window.Gren.Main.init({
        node: element,
      });
    }
  }, []);

  if (compileError) {
    return (
      <code>
        <pre>{compileError}</pre>
      </code>
    );
  }

  return (
    <div>
      <div id="gren"></div>
      <script src="https://cdn.tailwindcss.com" />
      <script src={`/api/scriptTag/${folderName}`} />
    </div>
  );
}
