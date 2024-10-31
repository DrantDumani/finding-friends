import "./Gamebar.scss";
import { convertMs } from "../../modules/convertTime";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export function GameBar({ characters, elapsedTime, confirmText }) {
  const parsedTime = elapsedTime;
  const initialTime = Date.now() - elapsedTime;
  const [timePassed, setTimePassed] = useState(initialTime);
  const [showConfirmText, setShowConfirmText] = useState(false);

  useEffect(() => {
    if (confirmText.msg) {
      setShowConfirmText(true);
      const id = setTimeout(() => {
        setShowConfirmText(false);
      }, 3000);

      return () => clearTimeout(id);
    }
  }, [confirmText]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimePassed((t) => t + 1000);
    }, 1000);
    return () => clearInterval(id);
  }, [parsedTime]);

  return (
    <div className="gamebar">
      <div className="gamebar__char-grid">
        {characters.map((charObj) => (
          <figure
            className={`${charObj.found && "found-char"}`}
            key={charObj._id}
          >
            <img
              crossOrigin="anonymous"
              className="gamebar__char-img"
              src={charObj.image}
              alt=""
            />
            <figcaption className="gamebar__caption">{charObj.name}</figcaption>
          </figure>
        ))}
      </div>
      <p className="gamebar__timer">{convertMs(timePassed)}</p>
      {showConfirmText && (
        <p className="gamebar__confirm-text">{confirmText.msg}</p>
      )}
    </div>
  );
}

GameBar.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object),
  elapsedTime: PropTypes.number,
  confirmText: PropTypes.objectOf(PropTypes.string),
};
