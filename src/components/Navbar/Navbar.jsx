import { Link } from "react-router-dom";
import Logo from "../../assets/images/FF-logo.svg?react";
import "./Navbar.scss";

export function Navbar() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-list__item nav-list__item--large">
          <Link to="/" className="nav-list__link nav-list__link--large">
            <Logo />
          </Link>
        </li>
        <li className="nav-list__item nav-list__item--left-margin">
          <Link to="leaderboards" className="nav-list__link">
            Leaderboards
          </Link>
        </li>
        <li>
          <Link to="about" className="nav-list__link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
