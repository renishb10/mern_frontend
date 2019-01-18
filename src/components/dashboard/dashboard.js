import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

export class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    return (
      <div>
        Dashboard
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
