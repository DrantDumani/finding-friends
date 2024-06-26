import PropTypes from "prop-types";
import "./Dropdown.scss";
import { useRef, useState, useLayoutEffect } from "react";

export function Dropdown({ btnList, mousePos, imgHeight, imgWidth }) {
  const dropdownRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (dropdownRef.current) {
      console.log("huh");
      setDimensions({
        width: dropdownRef.current.offsetWidth,
        height: dropdownRef.current.offsetHeight,
      });
    }
  }, []);

  const xPos =
    mousePos.x + dimensions.width < imgWidth
      ? mousePos.x
      : mousePos.x - dimensions.width;

  const yPos =
    mousePos.y + dimensions.height < imgHeight
      ? mousePos.y
      : mousePos.y - dimensions.height;

  return (
    <div
      method="PUT"
      ref={dropdownRef}
      className="plyr-choice-container"
      style={{
        left: xPos,
        top: yPos,
      }}
    >
      <input type="hidden" name="xPos" value={mousePos.x / imgWidth} />
      <input type="hidden" name="yPos" value={mousePos.y / imgHeight} />
      {btnList.map((choice) => (
        <button
          type="submit"
          name="characterId"
          value={choice._id}
          className="plyr-choice-container__btn"
          key={choice._id}
        >
          {choice.name}
        </button>
      ))}
    </div>
  );
}

Dropdown.propTypes = {
  btnList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  mousePos: PropTypes.objectOf(PropTypes.number),
  removeDropdown: PropTypes.func,
  setConfirmText: PropTypes.func,
};
