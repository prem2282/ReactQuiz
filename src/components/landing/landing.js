import React, { Component } from 'react';
import { Button } from 'antd';
import {Animated} from 'react-animated-css';
import {GoogleLogin} from 'react-google-login';
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
          <div>
            <GoogleLogin onSuccess={props.success} onFailure={props.error} clientId={clientId}/>
          </div>

          <div>
            <Button  className="landingButton" type="primary" ghost>Sign with Facebook</Button>
          </div>

          <div>
            <Button className="landingButton" type="primary" ghost>Continue as Guest</Button>
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
