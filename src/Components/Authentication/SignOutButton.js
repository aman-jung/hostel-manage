import React from "react";
import firebase from "firebase";
//import { auth } from "../firebase";
import { Link } from "react-router-dom";

const SignOutButton = () => (
  <Link to="/">
    <button
      type="button"
      className="logout"
      onClick={() => {
        firebase.auth().signOut();
      }}
    >
      Sign Out
    </button>
  </Link>
);

export default SignOutButton;
