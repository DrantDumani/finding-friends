import { handleData } from "./handleData";
import { redirect } from "react-router-dom";

export async function getThumbnails() {
  const resp = await handleData("games/thumbnails");
  if (resp.ok) {
    const thumbnails = await resp.json();
    return thumbnails;
  } else {
    return redirect("/error");
  }
}

export async function getGameData({ params }) {
  const { gameId } = params;
  const resp = await handleData(`games/${gameId}`);
  if (resp.ok) {
    const gameData = await resp.json();
    return gameData;
  } else {
    return redirect("/error");
  }
}

export async function getGameInstance({ params }) {
  const { gameInstanceId } = params;
  const resp = await handleData(`gameInstances/${gameInstanceId}`);
  const data = resp.json();
  if (resp.ok) {
    return data;
  } else {
    throw new Response({ err: data.err });
  }
}
