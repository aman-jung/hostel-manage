import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import "../../css/style.css";
import { Link } from "react-router-dom";

const SigninPage = ({ history }) => (
  <div>
    <SignInForm history={history} />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push("/home");
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign In</h1>
              <p className="lead text-center">Sign In to your Hostel account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={event =>
                      this.setState(byPropKey("email", event.target.value))
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={event =>
                      this.setState(byPropKey("password", event.target.value))
                    }
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={isInvalid}
                />
                {error && <p>{error.message}</p>}
                <p>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
                <p>
                  <Link to="/pw-forget">Forgot Password?</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SigninPage);

export { SignInForm };
