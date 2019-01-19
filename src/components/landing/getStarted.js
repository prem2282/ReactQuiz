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
      paymentSuccess: false
    }
  }

  getStarted = () => {
    this.setState({
        paymentSuccess: false
    })

    localStorage.removeItem('payment_id')
    localStorage.removeItem('payment_user')
    localStorage.removeItem('payment_request_id')
    this.props.getStarted();

  }
  render () {

    let paymentSuccess = this.state.paymentSuccess;
    if (localStorage.payment_id) {
      paymentSuccess = true;
    }


    return(
      <Delayed waitBeforeShow={1000}>
        {paymentSuccess?
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <div className="getStartedContainer">
            <Animated animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
              <h2>Congratulations! You are now a Premium User of {this.props.category}</h2>
            </Animated>
          </div>
        </Animated>
        :
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <div className="getStartedContainer">
            <Animated animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
              <h2>{this.props.category}</h2>
            </Animated>
          </div>
        </Animated>
        }
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <div className="getStartedContainer">
              <Button className="guestButton"  onClick={this.getStarted}>Get Started</Button>
          </div>
        </Animated>

        {this.props.userPackage === 'PMP'?
          null:
          <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <div className="getStartedContainer">
                <Button className="premiumButton"  onClick={this.props.clickedGoPremium}>
                <Icon type="crown" />
                   Go Premium</Button>
            </div>
          </Animated>


        }

      </Delayed>
    )
  }
}

export default getStarted
