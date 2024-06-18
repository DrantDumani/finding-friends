import { useLoaderData } from "react-router-dom";
import { convertMs } from "../../modules/convertTime";

export function Leaderboards() {
  const scoreList = useLoaderData();

  return scoreList.length ? (
    <div className="list-label-wrapper">
      <div className="label-container">
        <span>Place</span>
        <span>Name</span>
        <span>Date</span>
        <span>Time</span>
      </div>
      <ul className="score-list">
        {scoreList.map((score, i) => (
          <li className="score-list__item" key={score._id}>
            <span>{i}</span>
            <span>{score.name}</span>
            <span data-testid="score-time">{convertMs(score.score)}</span>
            <span>{score.date}</span>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h2>No one has found friends here yet. Be the first!</h2>
  );
}
