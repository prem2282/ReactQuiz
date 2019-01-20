import React, {Component} from 'react';
import {Affix, Button, Tag, Avatar, Popover,Icon} from 'antd';
import './header.css'
import Typing from 'react-typing-animation';
import {Animated} from 'react-animated-css';
import {faCrown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GoPremium from '../..//components/payment/goPremium';
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
const clientId = "374998186039-sogtupo8o5aksqq2te2eie0anmm13tst.apps.googleusercontent.com";
const ip = require('ip');
const iplocation = require('iplocation').default;

class header extends Component {


    constructor(props) {
      super(props);
      this.state = {
        showPremiumBox: false,
        showPremiumDetails : false,
      }
    }

    clickedGoPremium = () => {

      if (this.props.userPackage === 'PMP') {
        this.setState({
          showPremiumDetails: true,
        })
      } else {
        this.setState({
          showPremiumBox: true,
        })
      }

    }

    proHandleCancel = () => {
      this.setState({
        showPremiumBox: false
      })
    }

    render() {

      let ipAddress = ip.address();

      let screenHeight = window.innerHeight;
      let screenWidth = window.innerWidth;
      let alertText = screenWidth + ":" + screenHeight;

      let logOut = this.logOut;
      let userName = "Guest";
      let userPic = null;
      let userLoggedIn = false;
      let userEmail = null;
      let premiumUser = false;
      if (this.props.userPackage === 'PMP') {
        premiumUser = true;
      }

      if (this.props.profile) {
        userName = this.props.profile.userName;
        userPic = this.props.profile.imageUrl;
        userEmail = this.props.profile.userEmail;
        userLoggedIn = true;
      }



      let headerText = null;

      switch (this.props.pageLoaded) {
        case "LandingPage":
          headerText = "Hello " + userName + ipAddress;
          break;
        case "CoursePage":
          headerText = "Hello " + userName;
          break;
        case "HistoryPage":
          headerText = "Your Quiz Reports";
          break;
        case "ResultPage":
          headerText = "Here is your Result";
          break;
          case "ResultPage":
            headerText = "Here is your Result";
            break;
        default:

      }

      const guestContent = (
        <div>
          <div >
            <Animated  animationIn="slideInLeft" animationOut="fadeOut" isVisible={true}>
            <GoogleLogin
              render={renderProps => (
                  <Tag color="#D34836" onClick={renderProps.onClick}>Sign with Google</Tag>
              )}
               onSuccess={this.props.success} onFailure={this.props.error} clientId={clientId}/>
           </Animated>
          </div>
          <div>
            <Animated  animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
            <FacebookLogin
              appId="348732972376990"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.props.facebookResp}
              render={renderProps => (
                <Button  className="faceBookButton"  onClick={renderProps.onClick}><Icon type="facebook" />Sign with Facebook</Button>
              )}
            />
          </Animated>
          </div>

        </div>
      )
      let premiumText = " Go Premium "
      let premiumTagColor = "DimGray"
      if (premiumUser) {
        premiumText = " Premium User"
        premiumTagColor = "Gold"
      }
      const userContent = (
        <div>
          <p>{userEmail}</p>

          <Tag color={premiumTagColor} onClick={this.clickedGoPremium}>
            <FontAwesomeIcon icon={faCrown}/>{premiumText}
          </Tag>

          <Tag color="DodgerBlue" onClick={this.props.logOutButton}>Sign Off</Tag>

        </div>
      )

      return (
        <Affix offsetTop={0}>
          <div className="grid-container">
          <div>
            <Avatar className="avatarBox" onClick={this.props.homeButton}
            style = {{color: 'LightSlateGray'}} icon="home" />
          </div>

          <div>
            <p>{alertText}</p>
          </div>

          <div>
            <h3 style = {{color: 'LightSlateGray'}}>{headerText}</h3>
          </div>

          <div>
            <FontAwesomeIcon icon={faCrown}  onClick={this.clickedGoPremium} className='faCrownClass'/>
          </div>

          <div>
            {this.props.profile?
              <Popover placement="rightBottom" title={userName} content={userContent} trigger="hover">
                <Avatar className="avatarBox" src={this.props.profile.imageUrl}/>
              </Popover>
              :
              <Popover placement="rightBottom" title={userName} content={guestContent} trigger="hover">
                <Avatar className="avatarBox" style = {{color: 'LightSlateGray'}} icon="user"/>
              </Popover>
            }
          </div>
        </div>
          <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={this.state.showPremiumBox}>
            <GoPremium
              visible={this.state.showPremiumBox}
              title="Go Premium"
              handleOk={this.proHandleOk}
              handleCancel={this.proHandleCancel}
            />
          </Animated>
        </Affix>


      )
    }


}

export default header
// <Button className="googleButton"  onClick={renderProps.onClick}><Icon type="google" />Sign with Google</Button>
          //
          //
          // <Tag color="DimGray">Login with Google</Tag>
          // <Tag color="DodgerBlue">Login with Facebook</Tag>
