import { LoaderFunction } from "@remix-run/node";
import { redirect } from "react-router";

export const loader: LoaderFunction = () => {
  return redirect("/new");
};
