import React, {Component} from 'react';
import {Icon, Button, message} from 'antd';
import './pmpNewStyles.css';
import {Animated} from 'react-animated-css';
import Delayed from '../..//components/header/delayed';


class PMPCoursePageNew extends Component {

  constructor(props) {
    super(props);

  }

  reportCard = () => {

    if (this.props.userProfile) {
        this.props.historyPage();
    } else {
        message.warning('Please login to use this feature');
    }


  }

  render() {

    return(
      <div className="p1Frame">
        <Animated  animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <div className="wecomeNote">
            <h2 className="welcomeText">Welcome to PMP</h2>
            <h3 className="welcomeText2">Select your Choice</h3>
          </div>
        </Animated>
        <div className="landingContainer">

            <Animated  animationIn="slideInLeft" animationOut="fadeOut" isVisible={true}>
              <Button className="guestButton"  onClick={this.props.pmpQuiz}><Icon type="question-circle" />Take Quiz</Button>
            </Animated>
            <Animated  animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
              <Button className="guestButton"  onClick={this.props.pmpLearn}><Icon type="book" />Learn Inputs and Outputs</Button>
            </Animated>

            <Animated  animationIn="slideInRight" animationOut="fadeOut" isVisible={true}>
              <Button className="guestButton"  onClick={this.reportCard}><Icon type="solution" />Report Card</Button>
            </Animated>
        </div>
      </div>
    )

  }

}

export default PMPCoursePageNew
// <Button className="menuItem" onClick={this.props.pmpQuiz} ghost>  Quiz </Button>
// <Button className="menuItem" onClick={this.props.pmpLearn}  ghost> Learn  </Button>
// <Button className="menuItem" onClick={this.props.historyPage}  ghost> Score Cards  </Button>
