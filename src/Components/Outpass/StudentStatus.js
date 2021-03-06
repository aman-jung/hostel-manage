import React, { Component } from "react";
//import "./App.css";
import { Link } from "react-router-dom";
import firebase from "firebase";

var db = firebase.firestore();
var current = "";
var uid1 = "";
class StudentStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusTable: [],
      search: "",
      name: []
    };
  }
  componentDidMount() {
    var scope = this;
    // console.log(this.data.state.historyTable)
    //   current = firebase.auth().currentUser;
    //   // console.log(current);

    //  if (current) {
    //    uid1 = current.email;
    //  console.log(uid1);
    //  } else {
    //    console.log("data empty");
    //  }

    firebase.auth().onAuthStateChanged(authUser => {
      uid1 = authUser.email;
      db.collection("studentstatus")
        .where("email", "==", uid1)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
            scope.setState({
              statusTable: this.state.statusTable.concat(doc.data()),
              name: doc.data()
            });
            console.log(this.state.statusTable);
          });
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    });
  }

  render() {
    return (
      <div>
        <div class="dashboard">
          <div class="container">
            <div class="row">
              <Link to="/Home" class=" backbtn btn btn-light">
                Go Back
              </Link>
              <br />
              <div class="col-md-12">
                <h1 class="display-4">Status</h1>
                <p class="lead text-muted">
                  Welcome {this.state.name.username}{" "}
                </p>

                <div>
                  {/* <h4 class="mb-2">Outpass History</h4> */}
                  {/* <input
                    type="text"
                    class="form-control form-control-xs"
                    placeholder="Seach by usn "
                    width="20px"
                    onChange={this.updateSearch}
                    value={this.state.search}
                  /> */}
                  <br />
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Usn</th>
                        <th>Purpose</th>
                        <th>Outdate</th>
                        <th>Indate</th>
                        <th>Status</th>
                        <th>Comment</th>
                        <th>createdate</th>
                      </tr>
                    </thead>
                    {this.state.statusTable.map(doc => (
                      <tbody>
                        <tr>
                          <td>{doc.usn}</td>

                          <td>{doc.purpose}</td>
                          <td>{doc.outdate}</td>
                          <td>{doc.indate}</td>
                          <td>{doc.status}</td>
                          <td>{doc.comment}</td>
                          <td>{doc.createdate}</td>

                          <td>
                            {<button class="btn btn-danger">Delete</button>}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentStatus;
