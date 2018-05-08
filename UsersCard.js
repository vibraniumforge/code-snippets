import React from "react";
import { Link } from "react-router-dom";

class UsersCard extends React.PureComponent {

  render() {
    return (
      <div className="product-content product-wrap clearfix" id="card" style={{ minHeight: 240, maxHeight:300}}>
        <div className="row">
          <div className="col-md-4" id="cardPhoto">
            <div className="product-image">
              <img
                height="auto"
                width="auto"
                className="img-responsive"
                src={this.props.image}
                alt=""
              />
            </div>
          </div>
          <div className="col-md-8" id="cardInfo">
            <div className="product-deatil">
              <h5 className="name">
                {this.props.firstName} {this.props.lastName}
              </h5>
              <p>{this.props.email}</p>
            </div>
            <div className="description">
              <p>{this.props.role}</p>
              <p>{this.props.blurb}</p>
              <br />
              <Link to={"user-profile/" + this.props.id}>
                {" "}
                <button type="button" className="btn btn-primary">
                  View User
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersCard;
