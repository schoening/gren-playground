import { ActionFunction } from "@remix-run/node";
import * as api from "~/api.server";

export const action: ActionFunction = async ({ request }) => {
  try {
    const { folderName } = await request.json();

    // api.format(folderName)(); // exec(`cd ./project/${folderName} && gren format src --yes)
  } catch (error) {
    throw new Error(error as any);
  }
};
