import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="main">
          <div>
            <Link to="Outpass">
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
      </div>
    );
  }
}

export default withRouter(HomePage);
