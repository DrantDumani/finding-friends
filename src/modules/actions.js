import { handleData } from "./handleData";
import { redirect } from "react-router-dom";

export async function createInstance({ request }) {
  const formData = await request.formData();
  const instance = formData.get("instance");

  const { gameId } = JSON.parse(instance);
  const resp = await handleData(`gameInstances/${gameId}`, instance, "POST");
  const data = await resp.json();
  if (resp.ok) {
    const { _id } = data;
    return redirect(`/gameInstance/${_id}`);
  } else {
    throw new Response(data);
  }
}

export async function gameInstanceAction({ request, params }) {
  const formData = await request.formData();
  const { gameInstanceId } = params;
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
      `gameInstances/${gameInstanceId}/${characterId}`,
      JSON.stringify(input),
      "PUT"
    );
    const data = await resp.json();
    if (resp.ok) {
      return data;
    } else {
      throw new Response(data);
    }
  } else if (scoreFormGameId) {
    const input = { name: formData.get("name") };
    const resp = await handleData(
      `scores/${gameInstanceId}`,
      JSON.stringify(input),
      "POST"
    );
    const data = await resp.json();

    if (resp.ok) {
      return redirect(`/leaderboards/${scoreFormGameId}`);
    } else {
      throw new Response(data.err, { status: resp.status });
    }
  }
}
