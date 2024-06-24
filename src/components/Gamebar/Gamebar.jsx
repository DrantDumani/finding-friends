import "./Gamebar.scss";
import { convertMs } from "../../modules/convertTime";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export function GameBar({ characters, timeGameBegan }) {
  const parsedTime = Date.parse(timeGameBegan);
  const initialTime = Date.now() - parsedTime;
  const [timePassed, setTimePassed] = useState(initialTime);

  useEffect(() => {
    const id = setInterval(() => {
      setTimePassed(Date.now() - parsedTime);
    }, 1000);
    return () => clearInterval(id);
  }, [parsedTime]);

  return (
    <div className="gamebar">
      <div className="gamebar__char-grid">
        {characters.map((charObj) => (
          <figure key={charObj._id}>
            <img
              className="gamebar__char-img"
              src={charObj.char.image}
              alt=""
            />
            <figcaption className="gamebar__caption">
              {charObj.char.name}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="gamebar__timer">{convertMs(timePassed)}</p>
    </div>
  );
}

GameBar.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object),
  timeGameBegan: PropTypes.string,
};
