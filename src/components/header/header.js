import React, {Component} from 'react';
import {Button, Tag, Avatar, Popover} from 'antd';
import './header.css'
import Typing from 'react-typing-animation';
import {Animated} from 'react-animated-css';

class header extends Component {


    constructor(props) {
      super(props);

    }

    render() {

      let logOut = this.logOut;
      let userName = "Guest";
      let userPic = null;
      let userLoggedIn = false;
      let userEmail = null;

      if (this.props.profile) {
        userName = this.props.profile.userName;
        userPic = this.props.profile.imageUrl;
        userEmail = this.props.profile.email;
        userLoggedIn = true;
      }

      let headerText = null;

      switch (this.props.pageLoaded) {
        case "LandingPage":
          headerText = "Hello " + userName;
          break;
        case "CoursePage":
          headerText = "Hello " + userName;
          break;
        case "QuizHistoryPage":
          headerText = "Your Quiz History";
          break;
        case "ResultPage":
          headerText = "Here is your Result";
          break;
        default:

      }

      const guestContent = (
        <div>
          <Tag color="DimGray">Login with Google</Tag>
          <Tag color="DodgerBlue">Login with Facebook</Tag>
        </div>
      )

      const userContent = (
        <div>
          <p>Email: {userEmail}</p>
          <Tag color="DimGray">Edit Profile</Tag>
          <Tag color="DodgerBlue" onClick={this.props.logOutButton}>Sign Off</Tag>
        </div>
      )

      return (

        <div className="grid-container">
          <div>
            <Avatar className="avatarBox" onClick={this.props.homeButton}
            style = {{color: 'LightSlateGray'}} icon="home" />
          </div>

          <div>
          </div>

          <div>
            <h3 style = {{color: 'LightSlateGray'}}>{headerText}</h3>
          </div>

          <div>
          </div>

          <div>
            {this.props.profile?
              <Popover placement="rightBottom" title={userName} content={userContent} trigger="click">
                <Avatar className="avatarBox" src={this.props.profile.imageUrl}/>
              </Popover>
              :
              <Popover placement="rightBottom" title={userName} content={guestContent} trigger="click">
                <Avatar className="avatarBox" style = {{color: 'LightSlateGray'}} icon="user"/>
              </Popover>
            }
          </div>
        </div>


      )
    }


}

export default header
