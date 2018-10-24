import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import SigninPage from "./Authentication/SigninPage";
import SignupPage from "./Authentication/SignupPage";
import LandingPage from "./Authentication/LandingPage";
import HomePage from "./Home/Homepage";
import Navigation from "./Authentication/Navigation";
import Outpass from "./Outpass/Outpass";
import Feeds from "./Feeds/Feeds";
import PasswordForgetPage from "./Authentication/PasswordForgetPage";
import ExtraInformation from "./Information/ExtraInformation";
import firebase from "firebase";
import Warden from "./Warden/Warden";
import Status from "./Warden/Status";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({ authUser });
      } else {
        this.setState({ authUser: null });
      }
    });
  }

  render() {
    console.log(this.state.authUser);
    return (
      <BrowserRouter>
        <div>
          <Navigation authUser={this.state.authUser} />
          {/* <Route
            exact
            path="/signup"
            render={() => <SignupPage authUser={this.state.authUser} />}
          /> */}
          <Route
            exact
            path="/signup"
            render={() =>
              this.state.authUser ? <Redirect to="/home" /> : <SignupPage />
            }
          />
          {/* <Route
            exact
            path="/signin"
            render={() => <SigninPage authUser={this.state.authUser} />}
          /> */}
          <Route
            exact
            path="/signin"
            render={() =>
              this.state.authUser ? <Redirect to="/home" /> : <SigninPage />
            }
          />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/Outpass" component={Outpass} />
          <Route exact path="/Feeds" component={Feeds} />
          <Route exact path="/info" component={ExtraInformation} />
          <Route exact path="/pw-forget" component={PasswordForgetPage} />
          <Route exact path="/warden" component={Warden} />
          <Route exact path="/status" component={Status} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
