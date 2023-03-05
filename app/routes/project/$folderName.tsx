import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import * as E from "fp-ts/lib/Either";
import * as api from "~/api.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "/output.css" }];
};

export const loader: LoaderFunction = async ({ params }) => {
  console.log("loader /project/$folderName.tsx");
  const folderName = params.folderName;

  const fileNamesEither = await api.getFileNames(
    `./project/${folderName}/src`
  )();

  if (E.isRight(fileNamesEither)) {
    const fileNames = fileNamesEither.right;
    console.log({ fileNames });
    console.log("Getting files...");
    const filesEither = await api.getFiles(
      `./project/${folderName}/src`,
      fileNames
    )();
    console.log("Got filesEither: ", filesEither);
    if (E.isRight(filesEither)) {
      const files = filesEither.right;
      console.log({ folderName, files });
      return json({ folderName, files });
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
  console.log({ folderName, files });

  // TESTING IF FOLDERNAME AND FILES EVER CHANGE ON AJAX REQUEST
  useEffect(() => {
    console.log({ folderName, files });
  }, [folderName, files]);

  useEffect(() => {
    const element = document.querySelector("#gren");
    if (element && window.Gren) {
      window.Gren.Main.init({
        node: element,
        flags: { folderName, files },
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
