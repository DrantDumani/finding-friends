import { useLoaderData, Link } from "react-router-dom";
import "./Home.scss";

export function Home() {
  const games = useLoaderData() || [];

  return (
    <div className="home">
      <h1 className="home__title">How To Play:</h1>
      <p className="home__rules">
        Finding Friends is a photo tagging game where you&apos;ll be tasked with
        finding three of Kirby&apos;s friends (and enemies!). Find them as
        quickly as you can and add your score to the leaderboard. To keep you on
        your toes, the friends you&apos;ll have to find each time are
        randomized!
      </p>

      {games.length > 0 && (
        <div className="link-grid">
          {games.map((game) => (
            <Link
              className="link-grid__link"
              key={game._id}
              to={`game/${game._id}`}
            >
              <figure>
                <img className="link-grid__image" src={game.thumbnail} alt="" />
                <figcaption className="link-grid__caption">
                  {game.name}
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
