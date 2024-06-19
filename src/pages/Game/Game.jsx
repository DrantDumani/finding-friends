import { useLoaderData, useFetcher } from "react-router-dom";

export function Game() {
  const data = useLoaderData() || {};
  const instanceSkeleton = {
    gameId: data.gameId,
    chars: data.chars.map((char) => ({ charId: char._id })),
  };
  const fetcher = useFetcher();

  return (
    <div className="thumbnail-wrapper">
      <div className="thumbnail-grid">
        {data.chars.map((char) => (
          <div key={char._id}>
            <img className="filler" src={char.image} alt="" />
            <p data-testid="char-name">{char.name}</p>
          </div>
        ))}

        <fetcher.Form method="POST">
          <input type="hidden" value={JSON.stringify(instanceSkeleton)} />
          <button>Start</button>
        </fetcher.Form>
      </div>
    </div>
  );
}
