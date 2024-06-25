import { Loading } from "../../components/Loading/Loading";
import { useNavigation } from "react-router-dom";
import "./About.scss";

export function About() {
  const navigation = useNavigation();

  return navigation.state === "loading" ? (
    <Loading />
  ) : (
    <div className="about-wrapper">
      <div className="about-credits">
        <section className="about-credits__section">
          <p>Project created by Darnell</p>
          <p>
            Created with ExpressJS, MongoDB, Node, React, React Router, and SCSS
          </p>
          <div className="about-credits__link-container">
            <a
              href="https://github.com/DrantDumani/finding-friends"
              className="about-credits__link"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/darnell-james/"
              className="about-credits__link"
            >
              LinkedIn
            </a>
            <a
              href="https://drantdumani.github.io/homepage/"
              className="about-credits__link"
            >
              Portfolio
            </a>
          </div>
        </section>

        <section className="about-credits__section">
          <p>
            All art belongs to and has been created by Suyasuyabi Please check
            out their art on their{" "}
            <a
              href="https://twitter.com/Suyasuyabi427"
              className="about-credits__link"
            >
              Twitter
            </a>
          </p>
        </section>

        <section className="about-credits__section">
          Kirby and all Kirby characters belong to and have been created by
          Nintendo and HAL Labs
        </section>
      </div>
    </div>
  );
}
