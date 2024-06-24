import { useLoaderData, useFetcher } from "react-router-dom";
import { useState, useEffect, useId, useRef } from "react";
// import { convertMs } from "../../modules/convertTime";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { GameBar } from "../../components/Gamebar/Gamebar";
import { ScoreForm } from "../../components/ScoreForm/ScoreForm";
import "./GameInstance.scss";

export function GameInstance() {
  const gameInfo = useLoaderData();
  const fetcher = useFetcher();
  const elapsedTime =
    gameInfo.updatedAt &&
    Date.parse(gameInfo.updatedAt) - Date.parse(gameInfo.createdAt);
  const [showChoices, setShowChoices] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const inputId = useId();
  const imageRef = useRef(null);

  const displayDropdown = (e) => {
    setShowChoices(true);
    setMousePos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    e.stopPropagation();
  };

  const removeDropdown = () => setShowChoices(false);

  useEffect(() => {
    const toggleChoicesOff = (e) => {
      if (e.target.nodeName !== "BUTTON") setShowChoices(false);
    };
    document.body.addEventListener("click", toggleChoicesOff);

    return () => document.body.removeEventListener("click", toggleChoicesOff);
  }, []);

  const charsRemaining = gameInfo.chars
    .filter((char) => !char.found)
    .map((char) => ({ _id: char.char._id, name: char.char.name }));

  const allFriendsFound = gameInfo.chars.every((char) => char.found);

  return !allFriendsFound ? (
    <div className="game-screen">
      <GameBar characters={gameInfo.chars} timeGameBegan={gameInfo.createdAt} />

      <div className="game-img-container">
        <img
          ref={imageRef}
          className="game-img-container__img"
          onClick={displayDropdown}
          src={gameInfo.gameId.image}
          alt="Find all the friends"
        />
        {showChoices && (
          <Dropdown
            gameInstanceId={gameInfo._id}
            removeDropdown={removeDropdown}
            btnList={charsRemaining}
            mousePos={mousePos}
            imgWidth={imageRef.current.offsetWidth}
            imgHeight={imageRef.current.offsetHeight}
          />
        )}
      </div>
    </div>
  ) : (
    <ScoreForm elapsedTime={elapsedTime} />
    // <div className="game-screen__victory">
    //   <h1>Friends found in {convertMs(elapsedTime)}</h1>
    //   <fetcher.Form method="POST">
    //     <label htmlFor={inputId}>Enter your name</label>
    //     <input id={inputId} name="player-name" />
    //   </fetcher.Form>
    // </div>
  );
}
