import { useLoaderData, useFetcher, useNavigation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { GameBar } from "../../components/Gamebar/Gamebar";
import { ScoreForm } from "../../components/ScoreForm/ScoreForm";
import "./GameInstance.scss";
import { Loading } from "../../components/Loading/Loading";

export function GameInstance() {
  const gameInfo = useLoaderData();
  // handle seconds discrepency between client and server
  gameInfo.iat =
    Date.now() - gameInfo.iat * 1000 < 5 ? Date.now() / 1000 : gameInfo.iat;
  const elapsedTime =
    gameInfo.updatedAt && gameInfo.updatedAt - gameInfo.iat * 1000;
  const [showChoices, setShowChoices] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [confirmText, setConfirmText] = useState({});
  const imageRef = useRef(null);
  const fetcher = useFetcher();
  const navigation = useNavigation();

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

  useEffect(() => {
    if (fetcher.state === "submitting") {
      setConfirmText({ msg: "Confirming..." });
    } else if (fetcher.data) {
      setConfirmText(fetcher.data);
      setShowChoices(false);
    }
  }, [fetcher]);

  const charsRemaining = gameInfo.characters.filter((char) => !char.found);

  const allFriendsFound = gameInfo.characters.every((char) => char.found);

  return navigation.state === "loading" ? (
    <Loading />
  ) : !allFriendsFound ? (
    <div className="game-screen">
      <GameBar
        characters={gameInfo.characters}
        elapsedTime={gameInfo.iat * 1000}
        confirmText={confirmText}
      />

      <div className="game-img-container">
        <img
          ref={imageRef}
          crossOrigin="anonymous"
          className="game-img-container__img"
          onClick={displayDropdown}
          src={gameInfo.game.image}
          alt="Find all the friends"
        />
        {showChoices && (
          <fetcher.Form method="PUT">
            <Dropdown
              gameInstanceId={gameInfo._id}
              btnList={charsRemaining}
              mousePos={mousePos}
              imgWidth={imageRef.current.offsetWidth}
              imgHeight={imageRef.current.offsetHeight}
              removeDropdown={removeDropdown}
            />
          </fetcher.Form>
        )}
      </div>
    </div>
  ) : (
    <ScoreForm elapsedTime={elapsedTime} gameId={gameInfo.game._id} />
  );
}
