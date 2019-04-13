import React, { Component } from 'react';
import { Button } from 'antd';
import {Animated} from 'react-animated-css';
import {GoogleLogout, GoogleLogin} from 'react-google-login';
import './landing.css';

const firstPage = (props) => {

  let text = props.userName;

  return (

    <div>
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>


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
      </Animated>
    </div>

  )

}

export default firstPage
