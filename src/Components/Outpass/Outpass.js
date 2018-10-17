import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
var config = {
  apiKey: "AIzaSyAfYCHmHZMw-xC0I9NsU2pxlYRW83GgYmM",
  authDomain: "auth-7f72c.firebaseapp.com",
  databaseURL: "https://auth-7f72c.firebaseio.com",
  projectId: "auth-7f72c",
  storageBucket: "auth-7f72c.appspot.com",
  messagingSenderId: "356229365648"
};
firebase.initializeApp(config);

var outpassSubmitRef = firebase.database().ref("outpassSubmit");

class Outpass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      usn: "",
      room: "",
      block: "",
      purpose: "",
      indate: "",
      outdate: "",
      intime: "",
      outtime: ""
    };
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name);
  };

  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    var data = {
      fname: this.state.fname,
      lname: this.state.lname,
      usn: this.state.usn,
      room: this.state.room,
      block: this.state.block,
      purpose: this.state.purpose,
      indate: this.state.indate,
      outdate: this.state.outdate,
      intime: this.state.intime,
      outtime: this.state.outtime
    };

    console.log(data);
    var newoutpassSubmitRef = outpassSubmitRef.push();
    newoutpassSubmitRef.set({
      data: data
    });
    this.setState({
      fname: "",
      lname: "",
      usn: "",
      room: "",
      block: "",
      purpose: "",
      indate: "",
      outdate: "",
      intime: "",
      outtime: ""
    });
  };

  render() {
    const {
      fname,
      lname,
      usn,
      room,
      block,
      purpose,
      indate,
      outdate,
      intime,
      outtime
    } = this.state;
    const isInvalid =
      fname == "" ||
      lname == "" ||
      usn == "" ||
      room == "" ||
      block == "" ||
      purpose == "" ||
      indate == "" ||
      outdate == "" ||
      intime == "" ||
      outtime == "";
    return (
      <div>
        <div className="main">
          <div>
            <Link to="#">
              <img src={require("../../img/email (2).png")} alt="banner" />
              <p className="elements">outpass</p>
            </Link>
            <div className="highlighter" />
          </div>
          <div>
            <Link to="Feeds">
              <img src={require("../../img/email (2).png")} alt="banner" />
              <p className="elements">Feeds</p>
            </Link>
          </div>
          <div>
            <Link to="#">
              <img src={require("../../img/email (2).png")} alt="banner" />
              <p className="elements">Status</p>
            </Link>
          </div>
          <div>
            <Link to="#">
              <img src={require("../../img/email (2).png")} alt="banner" />
              <p className="elements">Mess</p>
            </Link>
          </div>
          <div>
            <Link to="#">
              <img src={require("../../img/email (2).png")} alt="banner" />
              <p className="elements">Sports</p>
            </Link>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <Link to="home" class=" backbtn btn btn-light">
                Go Back
              </Link>
              <h1 class="display-4 text-center">Fill Your Outpass</h1>
              <p class="lead text-center">Easy way to submit your outpass </p>
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    placeholder="* First Name"
                    onChange={this.onChange}
                    name="fname"
                    value={this.state.fname}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    placeholder="* Last Name"
                    onChange={this.onChange}
                    name="lname"
                    value={this.state.lname}
                  />{" "}
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    placeholder="* USN"
                    onChange={this.onChange}
                    name="usn"
                    value={this.state.usn}
                  />{" "}
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    placeholder="* Block"
                    onChange={this.onChange}
                    name="block"
                    value={this.state.block}
                  />{" "}
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    placeholder="* Room No"
                    onChange={this.onChange}
                    name="room"
                    value={this.state.room}
                  />
                </div>
                <h6>Out Date</h6>
                <div class="form-group">
                  <input
                    type="date"
                    class="form-control form-control-xs"
                    placeholder="Outdate"
                    onChange={this.onChange}
                    name="outdate"
                    value={this.state.outdate}
                  />
                </div>
                <h6>In Date</h6>
                <div class="form-group">
                  <input
                    type="date"
                    class="form-control form-control-xs"
                    placeholder="Indate"
                    onChange={this.onChange}
                    name="indate"
                    value={this.state.indate}
                  />
                </div>
                <h6>Out Time</h6>

                <div class="form-group">
                  <input
                    type="time"
                    class="form-control form-control-xs"
                    placeholder="Outtime"
                    onChange={this.onChange}
                    name="outtime"
                    value={this.state.outtime}
                  />
                </div>
                <h6>In Time</h6>

                <div class="form-group">
                  <input
                    type="time"
                    class="form-control form-control-xs"
                    placeholder="Intime"
                    onChange={this.onChange}
                    name="intime"
                    value={this.state.intime}
                  />
                </div>

                <div class="form-group">
                  <textarea
                    class="form-control form-control-xs"
                    placeholder="Purpose"
                    onChange={this.onChange}
                    name="purpose"
                    value={this.state.purpose}
                  />
                </div>
                <input
                  type="submit"
                  class="btn btn-info btn-block mt-4"
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

export default Outpass;
