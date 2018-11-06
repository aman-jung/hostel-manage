import React, { Component } from "react";
import firebase from "firebase";
import { withRouter } from "react-router-dom";

const Initial_state = {
  username: "",
  email: "",
  usn: "",
  image: "",
  block: "",
  roomNo: "",
  phonenum: "",
  error: "",
  selectValue: "",
  selectBlock: ""
};

var db = firebase.firestore();

class ExtraInformation extends Component {
  state = {
    Initial_state
  };

  handleChange = e => {
    const image = e.target.files[0];
    this.setState({ image });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    // this.setState({ selectValue: e.target.value });
    // this.setState({ selectBlock: e.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    var scope = this;
    const { usn, roomNo, selectValue, selectBlock } = this.state;
    const { history } = this.props;
    var user = firebase.auth().currentUser;
    var value = "";
    console.log(user.emailVerified);

    db.collection("Details")
      .where("usn", "==", usn)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          value = doc.data();
        });
        if (!value.usn) {
          if (user.emailVerified) {
            firebase
              .firestore()
              .collection("Details")
              .add({
                username: user.displayName,
                usn: usn,
                email: user.email,
                roomNo: roomNo,
                selectValue: selectValue,
                selectBlock: selectBlock
              })
              .then(() => {
                scope.setState({ ...Initial_state });
                history.push("/home");
              })
              .catch(err => {
                console.log("Error getting documents", err);
              });
          } else {
            user
              .sendEmailVerification()
              .then(function() {
                window.alert("Verification Sent to your link");
              })
              .catch(function(error) {
                window.alert("Error", +error.message);
              });
          }
        } else {
          alert("usn is already used");
        }
      });
  };

  render() {
    const { usn, image, roomNo } = this.state;

    var user = firebase.auth().currentUser;
    const isInvalid = usn === "" || image === "";
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
                  <label for="exampleFormControlSelect1">FULL NAME</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="name"
                    name="username"
                    value={user ? user.displayName : ""}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleFormControlSelect1">EMAIL</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="email"
                    value={user ? user.email : ""}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label for="exampleFormControlSelect1">USN</label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="usn"
                    name="usn"
                    type="text"
                    value={usn}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleFormControlSelect1">ROOM NUMBER</label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Room Number"
                    name="roomNo"
                    type="text"
                    value={roomNo}
                    onChange={this.onChange}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">BLOCK</label>
                  <select
                    class="form-control"
                    //value={selectBlock}
                    name="selectBlock"
                    onChange={this.onChange}
                  >
                    <option value="jr">Junior</option>
                    <option value="sr">Senior</option>
                    <option value="gr">Girls</option>
                  </select>
                </div>

                {/* <div className="form-group">
                  <label for="exampleFormControlSelect1">BLOCK</label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="block"
                    name="block"
                    type="text"
                    value={block}
                    onChange={this.onChange}
                  />
                </div> */}

                <div className="form-group">
                  <label for="exampleFormControlSelect1">PHONE NUMBER</label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Phone  Number"
                    name="phonenum"
                    type="text"
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <label for="exampleFormControlSelect1">PHOTO</label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Front Photo"
                    name={image}
                    type="file"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">GENDER</label>
                  <select
                    class="form-control"
                    // id="exampleFormControlSelect1"
                    //value={this.state.selectValue}
                    name="selectValue"
                    onChange={this.onChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
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
