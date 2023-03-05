import { json, LoaderFunction, Response } from "@remix-run/node";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as api from "~/api.server";

export const loader: LoaderFunction = async ({ params }) => {
  const folderName = params.folderName;

  const scriptTagEither = await api.getFiles(`./project/${folderName}/`, [
    "gren.js",
  ])();

  if (E.isLeft(scriptTagEither)) {
    const error = scriptTagEither.left;
    return new Response(error.message, {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (E.isRight(scriptTagEither)) {
    return new Response(scriptTagEither.right[0].content, {
      status: 200,
      headers: {
        "Content-Type": "application/javascript",
        // max-age controls the browser cache
        // s-maxage controls a CDN cache
        "Cache-Control": "public, max-age=0, s-maxage=0",
      },
    });
  }
};
