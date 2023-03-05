import { ActionFunction } from "@remix-run/node";
import uuid4 from "uuid4";
import dedent from "dedent";
import * as api from "~/api.server";
import { json, redirect } from "react-router";

const main: api.FileData = {
  name: "Main",
  extension: "gren",
  content: dedent(`
    module Main exposing ( main )

    import Html as H

    main : H.Html msg
    main =
        H.text "Hello World!"
    `),
};

export const action: ActionFunction = async ({ request }) => {
  //   const folderName = `${uuid4()}_1`;
  try {
    const json = await request.json();
    const { folderName, files } = json;

    console.log(folderName);
    console.log(files);

    try {
      await api.deleteFolder(`./project/${folderName}/src`);
    } catch (error) {}
    try {
      await api.deleteFile(`./project/${folderName}/gren.js`);
    } catch (error) {}
    try {
      await api.deleteFile(`./project/${folderName}/error.txt`);
    } catch (error) {}

    await api.createFolder(`./project/${folderName}/src`);
    await api.createFiles(`./project/${folderName}/src`, files);

    try {
      const result = await api.compile(folderName);
      return json({ result });
    } catch (error) {
      console.log({ error });
      throw new Error(error as any);
    }
  } catch (error) {
    throw new Error(error as any);
  }

  //   console.log({ json });

  //   const formData = await request.formData();

  //   const folderName = formData.get("folderName");

  //   const files = formData.get("file[]");

  //   console.log({ files });

  //   await api.createFolder(`./project/${folderName}`);
  //   await api.createFolder(`./project/${folderName}/src`);

  //   await api.grenInit(folderName);

  //   await api.createFiles(`./project/${folderName}/src/`, [main]);

  //   await api.compile(folderName);

  //   return json({ folderName }, { status: 200 });
  //   return redirect(`/project/${folderName}`);
};
