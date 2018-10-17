import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);
const NavigationAuth = () => (
  <div>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link to="/home" className="navbar-brand">
          Jain Hostel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Post Feed
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="#">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <img
                className="rounded-circle"
                style={{ width: "25px", marginRight: "5px" }}
                src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                alt=""
                title="You must have a Gravatar connected to your email to display an image"
              />
              <SignOutButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

const NavigationNonAuth = () => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <Link to="/" className="navbar-brand">
        Jain Hostel
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#mobile-nav"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          {/* <li className="nav-item">
            <Link className="nav-link" to="/landing">
              Landing
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/signin">
              signin
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  </nav>
);

export default Navigation;
