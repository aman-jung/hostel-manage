import React, { Component } from "react";
// import "./App.css";
import { Link } from "react-router-dom";
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAfYCHmHZMw-xC0I9NsU2pxlYRW83GgYmM",
  authDomain: "auth-7f72c.firebaseapp.com",
  databaseURL: "https://auth-7f72c.firebaseio.com",
  projectId: "auth-7f72c",
  storageBucket: "auth-7f72c.appspot.com",
  messagingSenderId: "356229365648"
};
firebase.initializeApp(config);
var db = firebase.firestore();
const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BD3GfKjHVOXpFwb2gBOmSgrhL-XCNdzfGArgsidVNHM0TloXMCEub7qoyKZp1SDoDS026m8jlCTmoxtQDGsjn_s"
);
class Outpass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose: "",
      indate: "",
      outdate: "",
      intime: "",
      outtime: "",
      status: "",
      data: [],
      more: [],
      more1: [],
      id: []
    };
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.name);
  };
  componentDidMount() {
    let scope = this;
    db.collection("id")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          scope.setState({
            id: doc.data()
          });
          console.log(this.state.id);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  handleSubmit = e => {
    var id1 = this.state.id.val;
    var date = Date.now();
    var datenew = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(date);
    e.preventDefault();
    e.target.reset();
    var value = "";
    var value1 = "";
    var scope1 = this;
    var USN = "";
    if (this.state.data) {
      USN = this.state.data.usn;
      console.log(USN);
    } else {
      //console.log("data empty");
    }

    db.collection("outpassSubmit")
      .where("usn", "==", USN)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          value = doc.data();
        });
        if (value.usn) {
          alert("already submitted");
        } else {
          db.collection("outpassSubmit").add({
            id: scope1.state.id.val,
            username: scope1.state.data.username,
            usn: scope1.state.data.usn,
            room: scope1.state.data.roomNo,
            block: scope1.state.data.block,
            purpose: scope1.state.purpose,
            indate: scope1.state.indate,
            outdate: scope1.state.outdate,
            intime: scope1.state.intime,
            outtime: scope1.state.outtime,
            status: "Pending",
            comment: "",
            createdate: datenew,
            email: scope1.state.data.email
          });

          db.collection("permission").add({
            id: scope1.state.id.val,
            username: scope1.state.data.username,
            usn: scope1.state.data.usn,
            room: scope1.state.data.roomNo,
            block: scope1.state.data.block,
            purpose: scope1.state.purpose,
            indate: scope1.state.indate,
            outdate: scope1.state.outdate,
            intime: scope1.state.intime,
            outtime: scope1.state.outtime,
            status: "Pending",
            comment: "",
            createdate: datenew,
            email: scope1.state.data.email
          });

          db.collection("studentstatus")
            .where("usn", "==", USN)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                value1 = doc.data();
              });
              if (value1.usn) {
                console.log(scope1.state.purpose);
                // alert("already submitted");
                db.collection("studentstatus")
                  .where("usn", "==", USN)
                  .get()
                  .then(
                    function(querySnapshot) {
                      querySnapshot.forEach(function(doc) {
                        db.collection("studentstatus")
                          .doc(doc.id)
                          .update({
                            id: scope1.state.id.val,
                            username: scope1.state.data.username,
                            usn: scope1.state.data.usn,
                            room: scope1.state.data.roomNo,
                            block: scope1.state.data.block,
                            purpose: scope1.state.purpose,
                            indate: scope1.state.indate,
                            outdate: scope1.state.outdate,
                            intime: scope1.state.intime,
                            outtime: scope1.state.outtime,
                            status: "Pending",
                            comment: "",
                            createdate: datenew,
                            email: scope1.state.data.email
                          });
                      });
                    },
                    function() {
                      db.collection("id")
                        .get()
                        .then(function(querySnapshot) {
                          querySnapshot.forEach(function(doc) {
                            db.collection("id")
                              .doc(doc.id)
                              .update({ val: id1 + 1 });
                          });
                        });

                      scope1.setState({
                        purpose: "",
                        indate: "",
                        outdate: "",
                        intime: "",
                        outtime: "",
                        status: "Pending"
                      });
                    }
                  );
              } else {
                db.collection("studentstatus").add({
                  id: scope1.state.id.val,
                  username: scope1.state.data.username,
                  usn: scope1.state.data.usn,
                  room: scope1.state.data.roomNo,
                  block: scope1.state.data.block,
                  purpose: scope1.state.purpose,
                  indate: scope1.state.indate,
                  outdate: scope1.state.outdate,
                  intime: scope1.state.intime,
                  outtime: scope1.state.outtime,
                  status: "Pending",
                  comment: "",
                  createdate: datenew,
                  email: scope1.state.data.email
                });

                db.collection("id")
                  .get()
                  .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                      db.collection("id")
                        .doc(doc.id)
                        .update({ val: id1 + 1 });
                    });
                  });

                scope1.setState({
                  purpose: "",
                  indate: "",
                  outdate: "",
                  intime: "",
                  outtime: "",
                  status: "Pending"
                });
              }
            });
        }
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  render() {
    var scope = this;
    var db = firebase.firestore();
    var current = firebase.auth().currentUser;
    // console.log(current);
    var uid1 = "";
    if (current) {
      uid1 = current.email;
      //console.log(uid1);
    } else {
      //console.log("data empty");
    }

    db.collection("Details")
      .where("email", "==", uid1)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          //console.log(doc.id, " => ", doc.data());
          //value = doc.data();
          //console.log(value);

          scope.setState({
            data: doc.data()
          });
        });
      })
      .catch(err => {});
    return (
      <div>
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
                    name={this.state.data.username}
                    value={this.state.data.username}
                    required
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    name={this.state.data.usn}
                    value={this.state.data.usn}
                    required
                  />{" "}
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    name={this.state.data.block}
                    value={this.state.data.block}
                    required
                  />{" "}
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-xs"
                    name={this.state.data.roomNo}
                    value={this.state.data.roomNo}
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                  />
                </div>

                <div class="form-group">
                  <textarea
                    class="form-control form-control-xs"
                    placeholder="Purpose"
                    onChange={this.onChange}
                    name="purpose"
                    value={this.state.purpose}
                    required
                  />
                </div>
                <input type="submit" class="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Outpass;
