import React, { Component } from 'react';
import { Button } from 'antd';
import {Animated} from 'react-animated-css';
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
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

      {(!props.userName)?
        <div className="landingContainer">
          <div >
            <GoogleLogin
              render={renderProps => (
                  <Button className="landingButton" type="primary" ghost onClick={renderProps.onClick}>Sign with Google</Button>
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
                <Button  className="landingButton" type="primary" ghost onClick={renderProps.onClick}>Sign with Facebook</Button>
              )}
            />
          </div>

          <div>
            <Button className="landingButton" type="primary" ghost onClick={props.guestLogin}>Continue as Guest</Button>
          </div>
        </div>
        :
        <div>
          <div>
            <p>Learn Input, Output and Tools</p>
          </div>

          <div>
            <p>Take Quiz</p>
          </div>

          <div>
            <p>Simulate Exam</p>
          </div>
        </div>
      }
      </Animated>
    </div>

  )

}

export default landingPage
