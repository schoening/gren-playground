import { ActionFunction } from "@remix-run/node";
import uuid4 from "uuid4";
import * as E from "fp-ts/Either";
import * as api from "~/api.server";
import { json } from "react-router";
import { getSession } from "~/session.server";

// Almost the same as app/routes/api/save.tsx
// But also initializes the project
export const action: ActionFunction = async ({ request }) => {
  console.log("/api/create.tsx: request", request);

  const folderName = `${uuid4()}_1`;
  const session = await getSession(request.headers.get("Cookie"));

  let createdBy = session.get("createdBy");

  if (!createdBy) {
    throw new Error("No session!");
  }

  const sessionFile: api.FileData = {
    name: "session",
    extension: "txt",
    content: createdBy,
  };

  let jsonResult;
  try {
    jsonResult = await request.json();
  } catch (error) {
    throw new Error(error as any);
  }

  const { files } = jsonResult;

  console.log({ files });

  await api.createFolder(`./project/${folderName}`)();
  await api.createFolder(`./project/${folderName}/src`)();

  const createSessionFileEither = await api.createFile(
    `./project/${folderName}`,
    sessionFile
  )();
  console.log("createSessionFileEither", createSessionFileEither);

  await api.grenInit(folderName)();

  const createFilesEither = await api.createFiles(
    `./project/${folderName}/src`,
    files
  )();

  if (E.isLeft(createFilesEither)) {
    const error = createFilesEither.left;
    throw new Error(error.message);
  }

  const compileEither = await api.compile(folderName)();

  if (E.isLeft(compileEither)) {
    const error = compileEither.left;
    console.log("error", error);
    throw new Error(error.message);
  }

  if (E.isRight(compileEither)) {
    return json({ folderName }, { status: 200 });
  }
};
