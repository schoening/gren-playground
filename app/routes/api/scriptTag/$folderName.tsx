import { LoaderFunction, Response } from "@remix-run/node";
import * as api from "~/api.server";

export const loader: LoaderFunction = async ({ params }) => {
  const folderName = params.folderName;

  try {
    const grenJS = await api.getFiles(`./project/${folderName}/`, ["gren.js"]);
    return new Response(grenJS[0].content, {
      status: 200,
      headers: {
        "Content-Type": "application/javascript",
      },
    });
  } catch (error) {
    return new Response("Error", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};
