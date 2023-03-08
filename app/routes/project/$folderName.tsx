import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import * as E from "fp-ts/lib/Either";
import * as api from "~/api.server";
import { commitSession, getSession } from "~/session.server";
import uuid4 from "uuid4";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: "/output.css" },
    { rel: "stylesheet", href: "/icons.css" },
  ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log("loader /project/$folderName.tsx");

  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("createdBy")) {
    console.log("no session found. Creating new session");
    const createdBy = uuid4();
    session.set("createdBy", createdBy);
  }

  const folderName = params.folderName;

  const fileNamesEither = await api.getFileNames(
    `./project/${folderName}/src`
  )();

  if (E.isRight(fileNamesEither)) {
    const fileNames = fileNamesEither.right;

    const filesEither = await api.getFiles(
      `./project/${folderName}/src`,
      fileNames
    )();

    if (E.isRight(filesEither)) {
      const files = filesEither.right;
      return json(
        { folderName, files },
        { headers: { "Set-Cookie": await commitSession(session) } }
      );
    }
    if (E.isLeft(filesEither)) {
      const error = filesEither.left;
      throw new Error(error.message);
    }
  }
  throw new Response("Not Found", {
    status: 404,
  });
};

type LoaderData = {
  folderName: string;
  files: api.FileData[];
};

export default function ProjectPage() {
  const { folderName, files } = useLoaderData<LoaderData>();

  useEffect(() => {
    const element = document.querySelector("#gren");
    if (element && window.Gren) {
      const app = window.Gren.Main.init({
        node: element,
        flags: { folderName, files },
      });

      console.log("app", app);

      const waitForCodeEditor = () => {
        return new Promise((resolve) => {
          const codeEditor = document.querySelector("wc-monaco-editor") as any;

          if (codeEditor) {
            return resolve(codeEditor);
          }

          const repeatUntilFound = () => {
            setTimeout(() => {
              const codeEditor = document.querySelector(
                "wc-monaco-editor"
              ) as any;
              if (codeEditor) {
                return resolve(codeEditor);
              }
              repeatUntilFound();
            }, 250);
          };

          repeatUntilFound();
        });
      };

      // waitForCodeEditor().then((codeEditor: any) => {
      //   console.dir(codeEditor);
      //   codeEditor.addEventListener("paste", (e: any) => {
      //     console.log("paste", e);
      //     app.ports.onCodeEditorChanged.send(codeEditor.value);
      //   });
      //   codeEditor.addEventListener("input", (e: any) => {
      //     console.log("input", e);
      //     app.ports.onCodeEditorChanged.send(codeEditor.value);
      //   });
      //   codeEditor.addEventListener("cut", (e: any) => {
      //     console.log("cut", e);
      //     app.ports.onCodeEditorChanged.send(codeEditor.value);
      //   });
      // });

      waitForCodeEditor().then((codeEditor: any) => {
        console.dir(codeEditor.editor);
        codeEditor.editor.getModel().onDidChangeContent((e: any) => {
          const code = codeEditor.value;
          app.ports.toGren_CodeEditorHasChanged.send(code);
        });
      });

      app.ports.toJS_SetCodeEditorValue.subscribe(async (code: string) => {
        const codeEditor = (await waitForCodeEditor()) as any;

        if (codeEditor) {
          codeEditor.value = code;
        }
      });
    }
  }, []);

  return (
    <div>
      <div id="gren"></div>
      <script
        type="module"
        src="https://cdn.jsdelivr.net/gh/vanillawc/wc-monaco-editor@1/index.js"
      ></script>

      <script src={`/gren.js`}></script>
    </div>
  );
}
