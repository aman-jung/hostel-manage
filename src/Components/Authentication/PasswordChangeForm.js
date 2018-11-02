import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = event => {
    const { passwordOne } = this.state;

    firebase
      .auth()
      .currentUser.updatePassword(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => this.setState({ error }));

    event.preventDefault();
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Change your Password</h1>
              <p className="lead text-center">We're almost done!!</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm New Password"
                  />
                </div>
                <Link to="/studentprofile">
                  <button disabled={isInvalid} type="submit">
                    Reset My Password
                  </button>
                </Link>
                {error && <p>{error.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>

      // <form onSubmit={this.onSubmit}>
      //   <input
      //     value={passwordOne}
      //     onChange={this.onChange}
      //     type="password"
      //     placeholder="New Password"
      //   />
      //   <input
      //     value={passwordTwo}
      //     onChange={this.onChange}
      //     type="password"
      //     placeholder="Confirm New Password"
      //   />
      //   <button disabled={isInvalid} type="submit">
      //     Reset My Password
      //   </button>

      //   {error && <p>{error.message}</p>}
      // </form>
    );
  }
}

export default PasswordChangeForm;
