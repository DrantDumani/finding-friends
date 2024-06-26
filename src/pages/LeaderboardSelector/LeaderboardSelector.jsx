import {
  useLoaderData,
  useNavigation,
  useParams,
  Outlet,
  Link,
} from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import "./LeaderboardSelector.scss";

export function LeaderboardSelector() {
  const games = useLoaderData();
  const navigation = useNavigation();
  const { gameId } = useParams();
  const selected = games.find((game) => game._id === gameId)?.name;

  return navigation.state === "loading" ? (
    <Loading />
  ) : (
    <div className="leaderboard">
      {games.length > 0 && (
        <div className="leaderboard__link-grid">
          {games.map((game) => (
            <Link
              className={`leaderboard__link ${
                game._id === gameId && "leaderboard__link--selected"
              }`}
              key={game._id}
              to={`${game._id}`}
            >
              <figure>
                <img
                  crossOrigin="anonymous"
                  className="leaderboard__image"
                  src={game.thumbnail}
                  alt={game.name}
                  width="287"
                  height="160"
                />
                <figcaption className="leaderboard__img-caption">
                  {game.name}
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
      )}

      <h1 className="leaderboard__title">
        {selected || "Choose a leaderboard above"}
      </h1>
      {selected && <Outlet />}
    </div>
  );
}
