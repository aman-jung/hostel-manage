import React, { Component } from "react";
//import "./App.css";
import { Link } from "react-router-dom";
import firebase from "firebase";
import swal from "sweetalert2";

var db = firebase.firestore();
// var current = "";
// var uid1 = "";
const storage = firebase.storage().ref();
class StudentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: ""
      //profile: ""
    };
    //this.getImage("profile");
    this.request = this.request.bind(this);
  }
  componentDidMount() {
    console.log(firebase.auth().currentUser);
    let ref = firebase
      .storage()
      .refFromURL("gs://auth-7f72c.appspot.com/7vzUjBa775bS2hw8T2z4ln3Gm7h1");
    //console.log(ref);
    ref
      .getDownloadURL()
      .then(function(url) {
        console.log(url);
      })
      .catch(err => {
        // ...
      });
    //   var scope =  this;
    //     // console.log(this.data.state.historyTable)
    //     current = firebase.auth().currentUser;
    //     // console.log(current);
    //    if (current) {
    //      uid1 = current.email;
    //    console.log(uid1);
    //    } else {
    //      console.log("data empty");
    //    }
    //      db.collection("studentstatus").where("email", "==", uid1)
    //      .get()
    //      .then(snapshot => {
    //        snapshot.forEach(doc => {
    //         console.log(doc.id, "=>", doc.data());
    //          scope.setState({
    //            statusTable: this.state.statusTable.concat(doc.data())
    //          });
    //          console.log(this.state.statusTable)
    //        });
    //      })
    //      .catch(err => {
    //        console.log("Error getting documents", err);
    //      });
    // const images = firebase
    //   .storage()
    //   .ref()
    //   .child("Photos");
    // const image = images.child("image");
    // image.getDownloadURL().then(url => console.log(url));
  }

  getImage = () => {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     console.log(user.uid);
    //   }
    // });
    // let ref = firebase
    //   .storage()
    //   .refFromURL("gs://auth-7f72c.appspot.com/7vzUjBa775bS2hw8T2z4ln3Gm7h1");
    // console.log(ref);
    // ref
    //   .getDownloadURL()
    //   .then(function(url) {
    //     console.log(url);
    //   })
    //   .catch(err => {
    //     // ...
    //   });
    // let { state } = this;
    // storage
    //   .child(`${image}/jpg`)
    //   .getDownloadURL()
    //   .then(url => {
    //     state[image] = url;
    //     this.setState(state);
    //     console.log(state);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     // Handle any errors
    //   });
  };

  request(e) {
    swal({
      title: "Are you sure you want to edit parents mobile?",
      text: "You won't be able to revert this!",
      // input: "text",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!"
    });
    // .then(result => {
    //   console.log(result.value);
    //   if (result.value) {
    //     swal("Accepted!", "The outpass is accepted.", "success");
    // db.collection("permission")
    //   .where("id", "==", e.id)
    //   .get()
    //   .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //       db.collection("permission")
    //         .doc(doc.id)
    //         .update({ status: "Accepted", comment: result.value });
    //     });
    //   });
    // }
    // });
  }

  render() {
    var scope = this;
    var value;
    var db = firebase.firestore();
    var current = firebase.auth().currentUser;
    var uid1 = "";
    //var image = "";
    if (current) {
      uid1 = current.email;
      //image = current.photoURL;
      //console.log(image);
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
      .catch(err => {
        console.log("Error getting documents", err);
      });
    return (
      <div>
        <div class="row">
          <div class="col-md-12">
            <div class="card card-body bg-info text-white mb-3">
              <div class="row">
                <Link
                  to="/Home"
                  class=" backbtn btn btn-light"
                  style={{ height: "30px" }}
                >
                  Go Back
                </Link>
                <div class="col-4 col-md-3 m-auto">
                  <img
                    class="rounded-circle"
                    src={current ? current.photoURL : ""}
                    alt=""
                  />
                </div>
              </div>
              <div class="text-center">
                <h1 class="display-4 text-center">
                  {this.state.data.username}
                </h1>
                <p class="lead text-center">{this.state.data.usn}</p>
                <p>{this.state.data.email}</p>
                <Link to="/pw-change">
                  <div className="text-white text-center">
                    Change your password
                  </div>
                </Link>
                <p>
                  <a className="text-white p-2" href="#">
                    <i className="fas fa-edit fa-2x" />
                  </a>
                  {/* <a class="text-white p-2" href="#">
                    <i class="fab fa-twitter fa-2x" />
                  </a>
                  <a class="text-white p-2" href="#">
                    <i class="fab fa-facebook fa-2x" />
                  </a>
                  <a class="text-white p-2" href="#">
                    <i class="fab fa-linkedin fa-2x" />
                  </a>
                  <a class="text-white p-2" href="#">
                    <i class="fab fa-instagram fa-2x" />
                  </a> */}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card card-body bg-light mb-3">
              <h3 class="text-center text-info">
                {this.state.data.username}
                's Bio
              </h3>
              <p class="lead">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Provident fuga cum necessitatibus blanditiis vel, officia facere
                porro esse numquam assumenda doloremque saepe aliquam nemo
                excepturi aliquid maiores! Excepturi, libero repudiandae.
              </p>
              <hr />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <h3 class="text-center text-info">Hostel Details</h3>
            <ul class="list-group">
              <li class="list-group-item">
                <h4>Hostel Block</h4>
                <p>{this.state.data.block}</p>
                <p>
                  <strong>Room Number: </strong>

                  {this.state.data.roomNo}
                </p>
                <p>
                  <strong>Year:</strong> 1st year
                </p>
              </li>
            </ul>
          </div>
          <div class="col-md-6">
            <h3 class="text-center text-info">Profile Details</h3>
            <ul class="list-group">
              <li class="list-group-item">
                <h4>Department</h4>
                <p>Elelctronics</p>
                <p>
                  <strong>Phone Number: </strong>
                  7026370522
                </p>
                <p>
                  <strong>Parents phone number: </strong>
                  7259109645
                  <a
                    className="text-blue p-2"
                    href="#"
                    onClick={() => this.request()}
                  >
                    <i className="fas fa-edit fa-2x" />
                  </a>
                </p>
                <p>
                  <strong>Address:</strong> No:3, 1st main road, banagalore
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            {/* <h3 class="text-center text-info">Experience</h3>
            <ul class="list-group">
              <li class="list-group-item">
                <h4>Microsoft</h4>
                <p>Oct 2011 - Current</p>
                <p>
                  <strong>Position:</strong> Senior Developer
                </p>
                <p>
                  <strong>Description:</strong> Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Unde doloribus dicta enim
                  excepturi laborum voluptatem nam provident quisquam facere.
                  Quae?
                </p>
              </li>
              
            </ul> */}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentProfile;
