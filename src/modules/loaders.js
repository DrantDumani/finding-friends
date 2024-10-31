import { jwtDecode } from "jwt-decode";
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
    const gameToken = await resp.json();
    localStorage.setItem("token", gameToken);
    return gameToken;
  } else {
    return redirect("/error");
  }
}

export function getGameInstance({ params }) {
  const { gameId } = params;
  const gameToken = localStorage.getItem("token");
  if (!gameToken) {
    throw new Response("Invalid or expired game session");
  } else {
    const gameData = jwtDecode(gameToken);
    if (gameData.exp * 1000 < Date.now() || gameData.game._id !== gameId) {
      localStorage.removeItem("token");
      throw new Response("Invalid or expired game session");
    }
    return gameData;
  }
}

export async function getScores({ params }) {
  const { gameId } = params;
  const resp = await handleData(`scores/${gameId}`);
  const data = resp.json();

  if (resp.ok) {
    return data;
  } else {
    return redirect("/error");
  }
}
