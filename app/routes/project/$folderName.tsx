import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import * as api from "~/api.server";

export const loader: LoaderFunction = async ({ params }) => {
  const folderName = params.folderName;

  try {
    const fileNames = await api.getFileNames(`./project/${folderName}/src`);

    console.log(fileNames);

    const files = await api.getFiles(`./project/${folderName}/src`, fileNames);

    return json({ folderName, fileNames, files }, { status: 200 });
  } catch (error) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
};

export default function ProjectPage() {
  const { folderName, fileNames, files } = useLoaderData<{
    folderName: string;
    fileNames: string[];
    files: api.FileData[];
  }>();

  useEffect(() => {
    const element = document.querySelector("#gren");
    if (element && window.Gren) {
      window.Gren.Main.init({
        node: element,
        flags: { folderName, files },
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

  console.log(files);
  return (
    <div>
      <link href="/output.css" />
      {/* {fileNames.map((fileName) => (
        <div key={fileName}>{fileName}</div>
      ))}
      <code style={{ whiteSpace: "pre-wrap" }}>{files[0].content}</code> */}
      {/* <iframe src={`/iframe/${folderName}`} /> */}
      <div id="gren"></div>
      <script src={`/gren.js`}></script>
    </div>
  );
}
