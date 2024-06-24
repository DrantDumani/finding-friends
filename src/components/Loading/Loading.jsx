import { useState, useEffect } from "react";
import "./Loading.scss";

const letters = ["L", "o", "a", "d", "i", "n", "g"];

export function Loading() {
  const [animateIndex, setAnimateIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimateIndex((n) => (n + 1) % letters.length);
    }, 200);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="loading-wrapper">
      {letters.map((c, ind) => (
        <span
          className={`loading-wrapper__letter ${
            ind === animateIndex && `loading-wrapper__letter--${c}`
          }`}
          key={ind}
        >
          {c}
        </span>
      ))}
    </div>
  );
}
