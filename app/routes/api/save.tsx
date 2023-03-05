import { ActionFunction } from "@remix-run/node";
import * as E from "fp-ts/Either";
import * as api from "~/api.server";
import { json } from "react-router";

export const action: ActionFunction = async ({ request }) => {
  let jsonResult;
  try {
    jsonResult = await request.json();
  } catch (error) {
    throw new Error(error as any);
  }

  const { folderName, files } = jsonResult;

  await api.deleteFolder(`./project/${folderName}/src`)();
  await api.deleteFile(`./project/${folderName}/gren.js`)();
  await api.deleteFile(`./project/${folderName}/error.txt`)();

  await api.createFolder(`./project/${folderName}/src`)();
  await api.createFiles(`./project/${folderName}/src`, files)();

  const compileEither = await api.compile(folderName)();

  if (E.isLeft(compileEither)) {
    const error = compileEither.left;
    throw new Error(error.message);
  }

  if (E.isRight(compileEither)) {
    return json({ folderName }, { status: 200 });
  }
};
