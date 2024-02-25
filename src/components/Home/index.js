import React, { Component } from "react";
import Cookies from "js-cookie";
import { TailSpin } from 'react-loader-spinner';

import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileDetails: null,
  }

  componentDidMount() {
    this.getProfileDetails();
  }

  getProfileDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    try {
      const jwtToken = Cookies.get('jwt_token');
      const apiUrl = 'https://jmbackend.onrender.com/profile/';
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok) {
        this.setState({
          profileDetails: data,
          apiStatus: apiStatusConstants.success,
        });
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  }

  handleLogout = () => {
    Cookies.remove('jwt_token');
    this.props.history.push('/login'); // Redirect to the login page
  };

  renderSuccessView = () => {
    const { profileDetails } = this.state;
    return (
      <div className="Home-container">
        <h1> Hello, {profileDetails.name} </h1>
        <p>Username: {profileDetails.username}</p>
        <p>Email: {profileDetails.email}</p>
        <p>Phone Number: {profileDetails.Phonenumber}</p>
        <button type="button"  className="button" onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }

  renderFailureView = () => {
    return <div>Failed to fetch profile.</div>;
  }

  renderLoaderView = () => {
    return (
      <div className="Loader-container" testid="loader">
        <TailSpin type="TailSpin" color="#0284C7" height={50} width={50} />
      </div>
    );
  }

  render() {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoaderView();
      default:
        return null;
    }
  }
}

export default Home;
