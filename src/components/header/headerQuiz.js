import React, {Component} from 'react';
import {Button, Tag, Avatar, Popover,Popconfirm, message,Icon} from 'antd';
import './header.css'
import Countdown from 'react-countdown-now';
import Typing from 'react-typing-animation';
import {Animated} from 'react-animated-css';

class headerQuiz extends Component {


    constructor(props) {
      super(props);
      this.state  = ({
        muteVoice: false,
        soundBackground: 'LightSlateGray',
        opacity : 1,
      })


    }

    muteVoiceToggle = () => {
      let muteVoice = this.props.muteVoice;
      let soundBackground = this.state.soundBackground;
      let opacity = this.state.opacity;

      if (muteVoice) {
        soundBackground = 'DarkSlateGray';
        opacity = .3;
      } else {
        soundBackground = 'LightSlateGray';
        opacity = 1;
      }

      this.setState({
        muteVoice: muteVoice,
        soundBackground: soundBackground,
        opacity: opacity,
      })

      this.props.muteVoiceToggle();

    }

    logOut = () => {
      message.success("Logout Clicked");
      this.props.logOutButton();
    }

    countRenderer = ({ hours, minutes, seconds, completed}) => {
      if (completed) {
        return null;
      } else {
        return(
          <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
            <div className="typeTextClass">{minutes}:{seconds}</div>
          </Animated>
        )
      }
    }

    cancel = (e) => {

    }

    render() {

      let screenWidth = window.innerWidth;
      let quitConfirm = this.props.homeButton;
      let logOut = this.logOut;
      let userName = "Guest";
      let userPic = null;
      let userLoggedIn = false;
      let userEmail = null;
      let quitButtonText = 'Quit';


      if (this.props.profile) {
        userName = this.props.profile.userName;
        userPic = this.props.profile.imageUrl;
        userEmail = this.props.profile.email;
        userLoggedIn = true;
        quitButtonText = "Quit";
        quitConfirm = this.props.saveQuiz;
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

        <div className="quiz-grid-container">
          <div>
            {this.props.quizOn?
              <div className='iconClass'>
              </div>

              :
              <div className='iconClass' onClick={this.props.homeButton}>
              <Icon 
                  type="home" />
              </div>
            }
          </div>

          <div>
            <Typing Delay={1000} speed={100}>
              <div className="typeTextClass">{this.props.progLabel}</div>
            </Typing>
          </div>

          <div>
            {this.props.quizOn?
            
              <Countdown  date={Date.now() + 30000} renderer={this.countRenderer} />
              :
              null
            }
          </div>

          <div>
            {this.props.quizOn?
              <Popconfirm title="Do you really want to Quit?" onConfirm={this.props.homeButton} okText={quitButtonText}>
                  <div className='iconClass' onClick={this.props.homeButton}>
                  <Icon 
                      type="close" />
                  </div>                     
              </Popconfirm>
              :null
            }
          </div>

          <div>
            {this.props.profile?
              <Popover placement="rightBottom" title={userName} content={userContent} trigger="click">
                <Avatar className="avatarBox" src={this.props.profile.imageUrl}/>
              </Popover>
              :
              <Popover placement="rightBottom" title={userName} content={guestContent} trigger="click">
                <div className='iconClass' onClick={this.props.homeButton}>
                  <Icon 
                      type="user" />
                  </div>     
              </Popover>
            }
          </div>
        </div>


      )
    }


}

export default headerQuiz
