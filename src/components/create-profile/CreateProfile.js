import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        youtube: '',
        instagram: '',
        errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
          this.setState({errors: nextProps.errors});
      }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
      e.preventDefault();
      
      const profileData = {
        handle: this.state.handle,
        company: this.state.company,
        website: this.state.website,
        location: this.state.location,
        status: this.state.status,
        skills: this.state.skills,
        githubusername: this.state.githubusername,
        bio: this.state.bio,
        twitter: this.state.twitter,
        facebook: this.state.facebook,
        youtube: this.state.youtube,
        instagram: this.state.instagram
      }

      this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    //Toggle Social Inputs down below the form
    let socialInputs;
    if (displaySocialInputs) {
        socialInputs = (
            <div>
                <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter} 
                />

                <InputGroup
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook} 
                />

                <InputGroup
                    placeholder="YouTube URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube} 
                />

                <InputGroup
                    placeholder="LinkedIn Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin} 
                />

                <InputGroup
                    placeholder="Instagram URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram} 
                />
            </div>
        )
    }

    //Options for status
    const options = [
        { label: '* Select Professional Status', value: 0 },
        { label: 'Developer', value: 'Developer'},
        { label: 'Junior Developer', value: 'Junior Developer'},
        { label: 'Senior Developer', value: 'Senior Developer'},
        { label: 'Manager', value: 'Manager'},
        { label: 'Student', value: 'Student'},
        { label: 'Instructor', value: 'Instructor'},
        { label: 'Intern', value: 'Intern'},
        { label: 'Other', value: 'Other'},
    ];


    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Create Your Profile</h1>
                    <p className="lead text-center">
                        Let's get some information to make your profile stand out
                    </p>
                    <small className="d-block pb-3">* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup 
                            placeholder="* Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="A unique handle for your profile URL. Your full name, company name etc"
                        />
                        <SelectListGroup
                            placeholder="* Status"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                            error={errors.status}
                            options={options}
                            info="What are you?"
                        />
                        <TextFieldGroup 
                            placeholder="Company"
                            name="company"
                            value={this.state.company}
                            onChange={this.onChange}
                            error={errors.company}
                            info="Could be your own company or one you work for"
                        />
                        <TextFieldGroup 
                            placeholder="Location"
                            name="location"
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                            info="Where you are living?"
                        />
                        <TextFieldGroup 
                            placeholder="* Skills"
                            name="skills"
                            value={this.state.skills}
                            onChange={this.onChange}
                            error={errors.skills}
                            info="Please use comma separated values eg: C#, NodeJs, HTML, CSS, Javascript"
                        />
                        <TextFieldGroup 
                            placeholder="Github Username"
                            name="githubusername"
                            value={this.state.githubusername}
                            onChange={this.onChange}
                            error={errors.githubusername}
                            info="Portrait your portfolio"
                        />
                        <TextAreaFieldGroup 
                            placeholder="Short Bio"
                            name="bio"
                            value={this.state.bio}
                            onChange={this.onChange}
                            error={errors.bio}
                            info="Tell us a little about yourself"
                        />

                        <div className="mb-3">
                            <button 
                            type="button"
                            onClick={() => {
                                this.setState(prevState => ({
                                   displaySocialInputs: !prevState.displaySocialInputs 
                                }))
                            }}
                            className="btn btn-light">Add Social Network Links</button>
                            <span className="text-muted">Optional</span>
                        </div>
                        {socialInputs}
                        <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
