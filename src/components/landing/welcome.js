import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import {Animated} from 'react-animated-css';
import './landing.css';
import Delayed from '../..//components/header/delayed';

class welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render () {
    return(
      <Delayed waitBeforeShow={100}>
        <Animated  animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
          <div className="welcomeNote">
            <h2 className="welcomeText">Welcome to QuizMeBuddy</h2>
            <h3 className="welcomeText2">Quiz yourself and get better at it!</h3>
          </div>
        </Animated>
      </Delayed>
    )
  }
}

export default welcome
