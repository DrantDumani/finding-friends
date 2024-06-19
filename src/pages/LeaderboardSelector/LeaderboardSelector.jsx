import { useLoaderData, useParams, Outlet, Link } from "react-router-dom";
import "./LeaderboardSelector.scss";

export function LeaderboardSelector() {
  const games = useLoaderData() || [];
  const { gameId } = useParams();
  const selected = games.find((game) => game._id === gameId)?.name;

  return (
    <div className="leaderboard-wrapper">
      {games.length > 0 && (
        <div className="btn-flex">
          {games.map((game) => (
            <Link key={game._id} to={`${game._id}`}>
              <img
                className="btn-flex__image"
                src={game.thumbnail}
                alt={game.name}
              />
            </Link>
          ))}
        </div>
      )}

      <h1 className="leaderboard-title">
        {selected || "Choose a leaderboard above"}
      </h1>
      {selected && <Outlet />}
    </div>
  );
}
