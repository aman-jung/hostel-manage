import React, { Component } from "react";
import firebase from "firebase";
import { withRouter } from "react-router-dom";

const Initial_state = {
  username: "",
  email: "",
  usn: "",
  image: "",
  block: "",
  roomNo: ""
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
    event.preventDefault();
    const { usn, image, block, roomNo, email } = this.state;
    const { history } = this.props;
    var user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Details")
      .add({
        username: user.displayName,
        usn: usn,
        email: user.email,
        block: block,
        roomNo: roomNo
      })
      .then(() => {
        this.setState({ ...Initial_state });
        history.push("/home");
      })
      .catch(error => this.setState(byPropKey("error", error)));

    var storageRef = firebase.storage().ref(`Photos ${image.name}`);
    storageRef.put(image);
  };

  render() {
    const { usn, image, block, roomNo } = this.state;
    var user = firebase.auth().currentUser;
    console.log(user);

    const isInvalid = usn == "" || image == "";
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Hey{" "}
                <h1 style={{ marginLeft: "10px" }}>
                  {user ? user.displayName : ""}
                </h1>
              </h1>
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
                    placeholder="usn"
                    name="usn"
                    type="text"
                    value={usn}
                    onChange={event =>
                      this.setState(byPropKey("usn", event.target.value))
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Room Number"
                    name="roomNo"
                    type="text"
                    value={roomNo}
                    onChange={event =>
                      this.setState(byPropKey("roomNo", event.target.value))
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    placeholder="block"
                    name="block"
                    type="text"
                    value={block}
                    onChange={event =>
                      this.setState(byPropKey("block", event.target.value))
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
                    required
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
