import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import {Animated} from 'react-animated-css';
import './landing.css';
import Delayed from '../..//components/header/delayed';
import {faCrown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class getStarted extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render () {
    return(
      <Delayed waitBeforeShow={1000}>
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <div className="getStartedContainer">
              <Button className="guestButton"  onClick={this.props.getStarted}><Icon type="user" />Get Started</Button>
          </div>
        </Animated>
        {!this.props.userPackage === 'PMP'?
          <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <div className="getStartedContainer">
                <Button className="premiumButton"  onClick={this.props.clickedGoPremium}>
                <Icon type="crown" />
                   Go Premium</Button>
            </div>
          </Animated>
          :null

        }

      </Delayed>
    )
  }
}

export default getStarted
