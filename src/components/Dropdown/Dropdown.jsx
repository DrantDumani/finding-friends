import PropTypes from "prop-types";

export function Dropdown({ btnList }) {
  return (
    <div className="plyr-choice-container">
      {btnList.map((choice) => (
        <button key={choice._id}>{choice.name}</button>
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
};
