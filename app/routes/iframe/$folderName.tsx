import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import * as api from "~/api.server";

export const loader: LoaderFunction = async ({ params }) => {
  const folderName = params.folderName;

  try {
    const compileError = await api.getFiles(`./project/${folderName}/`, [
      "error.txt",
    ]);
    return json({ compileError: compileError[0].content });
  } catch (error) {
    return json({ folderName });
  }
};

declare global {
  interface Window {
    Gren?: any;
  }
}

export default function IframePage() {
  const { folderName, compileError } = useLoaderData();
  console.log({ compileError, folderName });

  useEffect(() => {
    if (compileError) {
      return;
    }
    const element = document.querySelector("#gren");
    if (element && window.Gren) {
      window.Gren.Main.init({
        node: element,
      });
    }
    // if (element) {
    //   // @ts-ignore
    //   if (Gren) {
    //     // @ts-ignore
    //     Gren.init({
    //       node: element,
    //     });
    //   }
    // }
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
      <script src={`/api/scriptTag/${folderName}`} />
    </div>
  );
}
