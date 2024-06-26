import { convertMs } from "../../modules/convertTime";
import { useFetcher, useNavigation } from "react-router-dom";
import { useId } from "react";
import PropTypes from "prop-types";
import { Loading } from "../Loading/Loading";
import "./ScoreForm.scss";

export function ScoreForm({ elapsedTime, gameId }) {
  const navigation = useNavigation();
  const fetcher = useFetcher();
  const inputId = useId();
  const isNavigating =
    navigation.state === "loading" || fetcher.state === "submitting";

  return isNavigating ? (
    <Loading />
  ) : (
    <div className="score-form-flex">
      <div className="score-form-wrapper">
        <h1 className="score-form-title">
          Friends found in {convertMs(elapsedTime)}
        </h1>
        <fetcher.Form className="score-form" method="POST">
          <div className="score-form__label-wrapper">
            <label className="score-form__label" htmlFor={inputId}>
              Enter your name
            </label>
            <input
              className="score-form__input"
              id={inputId}
              name="name"
              placeholder="Name must be between 1 and 7 characters"
              required
              maxLength={7}
            />
          </div>
          <button
            name="scoreForm"
            value={gameId}
            className={`score-form__btn ${
              isNavigating && "score-form__btn--disabled"
            }`}
            type="submit"
          >
            Submit
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}

ScoreForm.propTypes = {
  elapsedTime: PropTypes.number,
  gameId: PropTypes.string,
};
