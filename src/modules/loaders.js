import { handleData } from "./handleData";
import { redirect } from "react-router-dom";

export async function getThumbnails() {
  const resp = await handleData("games/thumbnails");
  if (resp.ok) {
    const thumbnails = await resp.json();
    return thumbnails;
  } else {
    redirect("/error");
  }
}
