import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import {Animated} from 'react-animated-css';
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import PmpFeatures from './pmpFeatures';
import './landing.css';
const clientId = "374998186039-sogtupo8o5aksqq2te2eie0anmm13tst.apps.googleusercontent.com";

const landingPage = (props) => {

  let quizText = null;
  let text = props.userName;

  if (!props.userName) {
    quizText = "Continue as Guest"
  } else {
    quizText = "Proceed to Quiz"
  }

  return (

    <div>
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

        <div className="landingContainer">
          <div >
            <GoogleLogin
              render={renderProps => (
                  <Button className="landingButton" type="primary" ghost onClick={renderProps.onClick}><Icon type="google" />Sign with Google</Button>
              )}
               onSuccess={props.success} onFailure={props.error} clientId={clientId}/>
          </div>

          <div>
            <FacebookLogin
              appId="348732972376990"
              autoLoad={false}
              fields="name,email,picture"
              callback={props.facebookResp}
              render={renderProps => (
                <Button  className="landingButton" type="primary" ghost onClick={renderProps.onClick}><Icon type="facebook" />Sign with Facebook</Button>
              )}
            />
          </div>
          {!props.userName?
            <div>
              <Button className="landingButton" type="primary" ghost onClick={props.guestLogin}><Icon type="user" />Continue as Guest</Button>
            </div>
            :
            null
          }

        </div>

      </Animated>
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={false}>
        <PmpFeatures/>
      </Animated>
    </div>

  )

}

export default landingPage
