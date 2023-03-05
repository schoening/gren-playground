import { ActionFunction } from "@remix-run/node";
import uuid4 from "uuid4";
import dedent from "dedent";
import * as E from "fp-ts/Either";
import * as api from "~/api.server";
import { json } from "react-router";

// Almost the same as app/routes/api/save.tsx
// But also initializes the project
export const action: ActionFunction = async ({ request }) => {
  console.log("/api/create.tsx: request", request);

  const folderName = `${uuid4()}_1`;

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

  console.log("before gren init");

  await api.grenInit(folderName)();

  console.log("after gren init");

  console.log("before create files");

  const createFilesEither = await api.createFiles(
    `./project/${folderName}/src`,
    files
  )();

  if (E.isLeft(createFilesEither)) {
    const error = createFilesEither.left;
    throw new Error(error.message);
  }

  console.log("after create files");

  console.log("before compile");
  const compileEither = await api.compile(folderName)();

  console.log("after compile");

  if (E.isLeft(compileEither)) {
    const error = compileEither.left;
    console.log("error", error);
    throw new Error(error.message);
  }

  if (E.isRight(compileEither)) {
    console.log(compileEither.right);
    return json({ folderName }, { status: 200 });
  }
};
