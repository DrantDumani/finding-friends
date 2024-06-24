import { useLoaderData } from "react-router-dom";
import { convertMs, convertDate } from "../../modules/convertTime";
import "./Leaderboards.scss";

export function Leaderboards() {
  const scoreList = useLoaderData();

  return (
    <section className="leaderboard-container">
      {scoreList.length ? (
        <div className="list-label-wrapper">
          <div className="label-container">
            <span>Place</span>
            <span>Name</span>
            <span>Time</span>
            <span>Date</span>
          </div>
          <ul className="score-list">
            {scoreList.map((score, i) => (
              <li className="score-list__item" key={score._id}>
                <span>{i + 1}</span>
                <span>{score.name}</span>
                <span data-testid="score-time">{convertMs(score.score)}</span>
                <span>{convertDate(score.date)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>No one has found friends here yet. Be the first!</h2>
      )}
    </section>
  );
}
