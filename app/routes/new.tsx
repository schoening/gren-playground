import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import * as E from "fp-ts/lib/Either";
import * as api from "~/api.server";
import dedent from "dedent";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "/output.css" }];
};

export const loader: LoaderFunction = async ({ params }) => {
  const files: api.FileData[] = [
    {
      name: "Main",
      extension: ".gren",
      content: dedent(`module Main exposing ( main )
        
        import Html as H
        
        main : H.Html msg
        main =
            H.text "Hello World!"

        `),
    },
  ];

  return json({ files });
};

type LoaderData = {
  folderName: string;
  files: api.FileData[];
};

export default function ProjectPage() {
  const { files } = useLoaderData<LoaderData>();

  useEffect(() => {
    const element = document.querySelector("#gren");
    if (element && window.Gren) {
      const app = window.Gren.Main.init({
        node: element,
        flags: { folderName: "new", files },
      });

      app.ports.setCodeEditorValue.subscribe((code: string) => {
        const codeEditor = document.querySelector("wc-monaco-editor") as any;

        if (codeEditor) {
          codeEditor.value = code;
        } else {
          setTimeout(() => {
            const codeEditor = document.querySelector(
              "wc-monaco-editor"
            ) as any;
            if (codeEditor) {
              codeEditor.value = code;
            }
          }, 250);
        }
      });
    }
  }, []);

  return (
    <div>
      <link href="/output.css" />
      <div id="gren"></div>
      <script
        type="module"
        src="https://cdn.jsdelivr.net/gh/vanillawc/wc-monaco-editor@1/index.js"
      ></script>
      <script src={`/gren.js`}></script>
    </div>
  );
}
