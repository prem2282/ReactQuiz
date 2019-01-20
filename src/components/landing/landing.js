import React, { Component } from 'react';
import { Button, Icon, Affix } from 'antd';
import Header from '../..//components/header/header';
import ShareBar from './shareBar';
import {Animated} from 'react-animated-css';
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Login from './login';
import Features from './features';
import Categories from './categories';
import Welcome from './welcome';
import GetStarted from './getStarted';
import CoursePage from '../..//components/menu/coursePageNew';
import './landing.css';
import GetUserLocation from './location';
import Delayed from '../..//components/header/delayed';
import GoPremium from '../..//components/payment/goPremium';
const clientId = "374998186039-sogtupo8o5aksqq2te2eie0anmm13tst.apps.googleusercontent.com";

class landingPage  extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayFeatures : false,
      category : 'PMP',
      getStartedClicked : false,
      showPremiumDetails: false,
      showPremiumBox: false,
    }
  }


  getStarted = () => {
    this.setState({
      getStartedClicked : true,
    })
  }

  goToHome = () => {
    this.setState({
      getStartedClicked : false,
    })
  }

  logOut = () => {
    this.setState({
      getStartedClicked : false,
    })
    this.props.logOut();
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
  catSelected = (e) => {
    console.log(e.target.id);
    this.setState({
      displayFeatures: true,
      category: e.target.id
    })
  }

  proHandleCancel = () => {
    this.setState({
      showPremiumBox: false
    })
  }


  render() {

      let quizText = null;
      let userProfile = this.props.userProfile;
      let getStartedClicked = this.state.getStartedClicked;
      console.log("userProfile");
      let pageId = null;
      if (getStartedClicked) {
        pageId = "coursePage"
      } else if (userProfile) {
        pageId = "getStarted"
      } else if (true) {
        pageId = "login";
      }

    return (

      <div>
        <Affix offsetTop={0}>
          <Header
            homeButton = {this.goToHome}
            logOutButton = {this.logOut}
            pageLoaded = "LandingPage"
            profile = {this.props.userProfile}
            userPackage = {this.props.userPackage}
          />
        </Affix>
        <Welcome
          userProfile = {userProfile}
            userLocation = {this.props.userLocation}
          />
        {pageId === "login"?
        <Delayed waitBeforeShow={500}>
        <Categories
          catSelected={this.catSelected}

          />
        </Delayed>
        :null
        }
        <ShareBar/>
        {pageId === "login"?
          <Login
            success = {this.props.success}
            error = {this.props.error}
            facebookResp = {this.props.facebookResp}
            guestLogin = {this.getStarted}
            />
          :null
        }
        {pageId === "getStarted"?
          <GetStarted
            getStarted = {this.getStarted}
            clickedGoPremium = {this.clickedGoPremium}
            userPackage = {this.props.userPackage}
            category = {this.state.category}
            />
          :null
        }
        {pageId === "coursePage"?
          <CoursePage
            pmpQuiz = {this.props.pmpQuiz}
            pmpLearn = {this.props.pmpLearn}
            historyPage = {this.props.historyPage}
            userProfile = {this.props.userProfile}
            />
          :null
        }

        <Features
            toDisplay = {this.state.category}
          />
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={this.state.showPremiumBox}>
          <GoPremium
            visible={this.state.showPremiumBox}
            title="Go Premium"
            userProfile = {this.props.userProfile}
            handleOk={this.proHandleOk}
            handleCancel={this.proHandleCancel}
          />
        </Animated>
      </div>

    )
  }

}

export default landingPage

// <Delayed waitBeforeShow={1000}>
//   <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
//
//   <div className="landingContainer">
//
//     <div >
//       <GoogleLogin
//         render={renderProps => (
//             <Button className="googleButton"  onClick={renderProps.onClick}><Icon type="google" />Sign with Google</Button>
//         )}
//          onSuccess={this.props.success} onFailure={this.props.error} clientId={clientId}/>
//     </div>
//
//     <div>
//       <FacebookLogin
//         appId="348732972376990"
//         autoLoad={false}
//         fields="name,email,picture"
//         callback={this.props.facebookResp}
//         render={renderProps => (
//           <Button  className="faceBookButton"  onClick={renderProps.onClick}><Icon type="facebook" />Sign with Facebook</Button>
//         )}
//       />
//     </div>
//
//     <div>
//       <Button className="guestButton"  onClick={this.props.guestLogin}><Icon type="user" />Continue as Guest</Button>
//     </div>
//   </div>
//
// </Animated>
// </Delayed>
