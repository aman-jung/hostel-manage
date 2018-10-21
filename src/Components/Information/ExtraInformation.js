import React, { Component } from "react";
import firebase from "firebase";
import { withRouter } from "react-router-dom";
//import "firebase/stor";

const Initial_state = {
  username: "",
  email: "",
  roomNumber: "",
  block: "",
  image: ""
  //progress: 0
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class ExtraInformation extends Component {
  state = {
    Initial_state
  };

  handleChange = e => {
    const image = e.target.files[0];
    this.setState({ image });
  };

  onSubmit = event => {
    //var uploader = document.getElementById("uploader");
    event.preventDefault();
    const { email, roomNumber, image } = this.state;
    const { history } = this.props;
    var user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Details")
      .add({
        username: user.displayName,
        email: user.email,
        roomNumber: roomNumber
      })
      .then(() => {
        this.setState({ ...Initial_state });
        history.push("/home");
      })
      .catch(error => this.setState(byPropKey("error", error)));

    var storageRef = firebase.storage().ref(`Photos ${image.name}`);
    // var task =
    storageRef.put(image);
    // task.on(
    //   "state_changed",
    //   function progress(snapshot) {
    //     var percentage =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     uploader.value = percentage;
    //   },
    //   function error(err) {}
    // );
  };

  render() {
    const { roomNumber, image } = this.state;
    var user = firebase.auth().currentUser;
    const isInvalid = roomNumber == "" || image == "";
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Students Details</h1>
              <p className="lead text-center">We're almost done!!</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="name"
                    name="username"
                    value={user ? user.displayName : ""}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="email"
                    value={user ? user.email : ""}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Room Number"
                    name="roomNumber"
                    type="number"
                    value={roomNumber}
                    onChange={event =>
                      this.setState(byPropKey("roomNumber", event.target.value))
                    }
                  />
                </div>

                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Front Photo"
                    name={image}
                    type="file"
                    onChange={this.handleChange}
                    // value={roomNumber}
                    // onChange={event =>
                    //   this.setState(byPropKey("photoUrl", event.target.files))
                    // }
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={isInvalid}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ExtraInformation);
