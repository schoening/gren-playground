import { ActionFunction, json } from "@remix-run/node";
import uuid4 from "uuid4";

export const action: ActionFunction = async ({ request }) => {
  try {
    const { folderName } = await request.json();

    const forkName = `${uuid4()}_1`;

    // TODO
    // exec copy folder content to new forkName dir

    return json({ forkName });
  } catch (error) {
    throw new Error(error as any);
  }
};
