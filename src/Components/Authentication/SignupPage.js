import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import SocialAuth from "./SocialAuthentication/SocialAuth";
//import ExtraInformation from "../Information/ExtraInformation";

const SignupPage = ({ history }) => (
  <div>
    <div className="register" />
    <div className="container">
      <h1 className="display-4 text-center">Sign Up</h1>
      <p className="lead text-center">Create your Hostel account</p>
    </div>
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-6">
        <SignUpForm history={history} />
      </div>
      <div className="col-lg-6 col-md-6 col-sm-6">
        <SocialAuth />
      </div>
    </div>
    {/* <ExtraInformation email={this.state.email} /> */}
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const Initial_state = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...Initial_state };
  }
  // componentDidMount() {
  //   console.log(this.props.authUser);
  //   if (this.props.authUser) {
  //     this.props.history.push("/home");
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.authUser);
  //   if (nextProps.authUser) {
  //     this.props.history.push("/home");
  //   }
  // }

  onSubmit = event => {
    event.preventDefault();
    const { email, passwordOne, username } = this.state;
    console.log(email);
    const { history } = this.props;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...Initial_state });
        authUser.user.updateProfile({
          displayName: username
        });
        history.push("/info");
        //var user = firebase.auth().currentUser;

        // user
        //   .sendEmailVerification()
        //   .then(function() {
        //     history.push("/info");
        //   })
        //   .catch(function(error) {
        //     // An error happened.
        //   });
      })
      // .then(function() {
      //   user.updateProfile({
      //     displayName: displayName
      //   });
      // })
      .catch(error => this.setState(byPropKey("error", error)));
    // .then(function(user) {
    //   user.updateProfile({
    //     displayName: name
    //   });
    // });

    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, passwordOne)
    //   .then(() => {
    //     firebase
    //       .firestore()
    //       .collection("users")
    //       .add({
    //         username: username,
    //         email: email
    //       })
    //       .then(() => {
    //         this.setState({ ...Initial_state });
    //         history.push({
    //           pathname: "/info"
    //         });
    //       })
    //       .catch(error => this.setState(byPropKey("error", error)));
    //   })
    //   .catch(error => {
    //     this.setState(byPropKey("error", error));
    //   });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="username"
                    value={username}
                    onChange={event =>
                      this.setState(byPropKey("username", event.target.value))
                    }
                  />
                </div>
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
                    name="passwordOne"
                    value={passwordOne}
                    onChange={event =>
                      this.setState(
                        byPropKey("passwordOne", event.target.value)
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Confirm your Password"
                    name="passwordTwo"
                    type="password"
                    value={passwordTwo}
                    onChange={event =>
                      this.setState(
                        byPropKey("passwordTwo", event.target.value)
                      )
                    }
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={isInvalid}
                />
                {error && <p>{error.message}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupPage);

export { SignUpForm };

// firebase
// .auth()
// .createUserWithEmailAndPassword(email, passwordOne)
// .then(() => {
//   this.setState({ ...Initial_state });
//   user = firebase.auth().currentUser;
//   history.push("/info");
//   user.sendEmailVerification();
// })
