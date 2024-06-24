import PropTypes from "prop-types";
import "./Dropdown.scss";
import { useRef, useEffect } from "react";
import { useFetcher } from "react-router-dom";

export function Dropdown({
  btnList,
  mousePos,
  imgHeight,
  imgWidth,
  removeDropdown,
}) {
  const dropdownRef = useRef(null);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data) removeDropdown();
  }, [fetcher.data, removeDropdown]);

  const xPos =
    (dropdownRef.current &&
      (mousePos.x + dropdownRef.current.offsetWidth < imgWidth
        ? mousePos.x
        : mousePos.x - dropdownRef.current.offsetWidth)) ||
    mousePos.x;

  const yPos =
    (dropdownRef.current &&
      (mousePos.y + dropdownRef.current.offsetHeight < imgHeight
        ? mousePos.y
        : mousePos.y - dropdownRef.current.offsetHeight)) ||
    mousePos.y;

  return (
    <fetcher.Form
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
    </fetcher.Form>
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
};
