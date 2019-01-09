import React, {Component} from 'react';
import {Icon, Button, Tag} from 'antd';
import './questionStyle.css'
import {Animated} from 'react-animated-css';
import _ from 'lodash';
import Countdown from 'react-countdown-now';

class countPage extends Component {

  countRenderer = ({hours, minutes, seconds, completed}) => {
    if (completed) {
      return null;
    } else {
      return <h1 style={{color:"Aqua"}}>{seconds}</h1>
    }
  }

  render() {
    return (
      <div className="menuContainer">
        <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={true}>
        <h1 style={{color:"Aqua"}}></h1>
        <Countdown
          date={Date.now() + 3000}
          renderer={this.countRenderer}
          onComplete = {this.props.countEnded}
        />
        </Animated>
      </div>
    )
  }
}

export default countPage
