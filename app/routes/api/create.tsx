import { ActionFunction } from "@remix-run/node";
import uuid4 from "uuid4";
import dedent from "dedent";
import { spawn } from "child_process";
import * as api from "~/api.server";
import { json } from "react-router";

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
  const folderName = `${uuid4()}_1`;

  await api.createFolder(`./project/${folderName}`);
  await api.createFolder(`./project/${folderName}/src`);

  await api.grenInit(folderName);

  await api.createFiles(`./project/${folderName}/src/`, [main]);

  await api.compile(folderName);

  return json({ folderName }, { status: 200 });
};
