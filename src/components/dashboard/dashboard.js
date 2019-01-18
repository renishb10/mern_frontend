import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from '../common/Spinner';

export class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profiles;

    let dashBoardContent;
    if (profile === null || loading) {
      dashBoardContent = <Spinner />;
    } else {
      if(Object.keys(profile).length > 0) {
        dashBoardContent = <h4>display profile</h4>
      } else {
        //User has no profile
        dashBoardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name }</p>
            <p>You have not yet setup a profile, please add some data</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.protoTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profiles: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
