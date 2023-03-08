import { ActionFunction } from "@remix-run/node";
import * as E from "fp-ts/Either";
import * as api from "~/api.server";
import { json } from "react-router";
import { getSession } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  let jsonResult;
  try {
    jsonResult = await request.json();
  } catch (error) {
    throw new Error(error as any);
  }

  const { folderName, files } = jsonResult;

  const session = await getSession(request.headers.get("Cookie"));

  const createdBy = session.get("createdBy");

  if (!createdBy) {
    throw new Error("No session");
  }

  const sessionFile = await api.getFiles(`./project/${folderName}`, [
    "session.txt",
  ])();

  console.log("sessionFile", sessionFile);

  if (E.isRight(sessionFile)) {
    const sessionFileData = sessionFile.right[0];
    const sessionFileContent = sessionFileData.content;

    console.log("CREATED BY:", createdBy);
    console.log("SESSION FILE CONTENT:", sessionFileContent);

    if (sessionFileContent !== createdBy) {
      throw new Error("Session mismatch");
    }
  }

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
