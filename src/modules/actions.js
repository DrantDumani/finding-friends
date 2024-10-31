import { handleData } from "./handleData";
import { redirect } from "react-router-dom";

export async function createInstance({ params }) {
  const { gameId } = params;

  const resp = await handleData(`gameInstances/${gameId}`, undefined, "POST");
  const data = await resp.json();
  if (resp.ok) {
    const instanceToken = data;
    localStorage.setItem("token", instanceToken);
    return redirect(`/gameInstance/${gameId}`);
  } else {
    throw new Response(data);
  }
}

export async function gameInstanceAction({ request, params }) {
  const formData = await request.formData();
  const { gameId } = params;
  const characterId = formData.get("characterId");
  const scoreFormGameId = formData.get("scoreForm");

  if (characterId) {
    const inputObj = Object.fromEntries(formData);
    const input = {
      coords: {
        xPos: inputObj.xPos,
        yPos: inputObj.yPos,
      },
    };

    const resp = await handleData(
      `gameInstances/${characterId}`,
      JSON.stringify(input),
      "PUT"
    );
    const data = await resp.json();
    if (resp.ok) {
      localStorage.setItem("token", data.newToken);
      return data;
    } else {
      throw new Response(data);
    }
  } else if (scoreFormGameId) {
    const input = { name: formData.get("name") };
    const resp = await handleData(
      `scores/${gameId}`,
      JSON.stringify(input),
      "POST"
    );
    const data = await resp.json();

    if (resp.ok) {
      localStorage.removeItem("token");
      return redirect(`/leaderboards/${scoreFormGameId}`);
    } else {
      throw new Response(data.err, { status: resp.status });
    }
  }
}
