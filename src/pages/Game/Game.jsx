import { useLoaderData, useFetcher, useNavigation } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import "./Game.scss";

export function Game() {
  const navigation = useNavigation();
  const gameData = useLoaderData();
  const instanceSkeleton = {
    gameId: gameData.game._id,
    chars: gameData.characters.map((char) => char._id),
  };
  const fetcher = useFetcher();

  const isNavigating =
    navigation.state === "loading" || fetcher.state === "submitting";

  return isNavigating ? (
    <Loading />
  ) : (
    <div className="thumbnail-wrapper">
      <h1 className="thumbnail-wrapper__title">Find all of these friends!</h1>
      <div className="thumbnail-grid">
        {gameData.characters.map((char) => (
          <figure key={char._id}>
            <img
              crossOrigin="anonymous"
              className="thumbnail-grid__image"
              src={char.image}
              alt=""
            />
            <figcaption
              className="thumbnail-grid__caption"
              data-testid="char-name"
            >
              {char.name}
            </figcaption>
          </figure>
        ))}
      </div>
      <fetcher.Form className="thumbnail-wrapper__gameForm" method="POST">
        <input
          type="hidden"
          name="instance"
          value={JSON.stringify(instanceSkeleton)}
        />
        <button
          disabled={isNavigating}
          className={`thumbnail-wrapper__btn ${
            isNavigating && "thumbnail-wrapper__btn--disabled"
          }`}
        >
          Start
        </button>
      </fetcher.Form>
    </div>
  );
}
