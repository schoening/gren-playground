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
      extension: "gren",
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
      window.Gren.Main.init({
        node: element,
        flags: { folderName: "new", files },
      });
    }
  }, []);

  return (
    <div>
      <link href="/output.css" />
      <div id="gren"></div>
      <script src={`/gren.js`}></script>
    </div>
  );
}
