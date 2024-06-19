import { useLoaderData, useFetcher } from "react-router-dom";
import { useState, useEffect, useId } from "react";
import { convertMs } from "../../modules/convertTime";
import { Dropdown } from "../../components/Dropdown/Dropdown";

export function GameInstance() {
  const gameInfo = useLoaderData();
  const fetcher = useFetcher();
  const currentTime = Date.now() - Date.parse(gameInfo.createdAt);
  const elapsedTime =
    gameInfo.updatedAt &&
    Date.parse(gameInfo.updatedAt) - Date.parse(gameInfo.createdAt);
  const [timer, setTimer] = useState(currentTime);
  const [showChoices, setShowChoices] = useState(false);
  const inputId = useId();

  const displayDropdown = () => {
    setShowChoices(true);
  };

  useEffect(() => {
    const id = setInterval(() => setTimer((t) => t + 1000), 1000);

    return () => clearInterval(id);
  }, []);

  const charsRemaining = gameInfo.chars
    .filter((char) => !char.found)
    .map((char) => ({ _id: char._id, name: char.name }));

  const allFriendsFound = gameInfo.chars.every((char) => char.found);
  console.log(gameInfo.chars[0]);

  return !allFriendsFound ? (
    <div className="game-screen">
      <div className="game-screen__gamebar">
        <div className="game-screen__char-grid">
          {gameInfo.chars.map((char) => (
            <figure key={char._id}>
              <img src={char.image} alt="" />
              <figcaption>{char.name}</figcaption>
            </figure>
          ))}
        </div>
        <p className="game-screen__timer">{convertMs(timer).slice(0, 5)}</p>
      </div>
      <div className="game-img-container">
        <img
          onClick={displayDropdown}
          src={gameInfo.image}
          alt="Find all the friends"
        />
        {showChoices && <Dropdown btnList={charsRemaining} />}
      </div>
    </div>
  ) : (
    <div className="game-screen__victory">
      <h1>Friends found in {convertMs(elapsedTime)}</h1>
      <fetcher.Form method="POST">
        <label htmlFor={inputId}>Enter your name</label>
        <input id={inputId} name="player-name" />
      </fetcher.Form>
    </div>
  );
}
