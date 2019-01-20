import React, {Component} from 'react';
import {Icon, Button, message} from 'antd';
import './menuPage.css';
import './pmpStyles.css';
import {Animated} from 'react-animated-css';
import Delayed from '../..//components/header/delayed';


class coursePageNew extends Component {

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
      <div>

        <div className="landingContainer">
            <Animated  animationIn="slideInLeft" animationOut="fadeOut" isVisible={true}>
              <Button className="guestButton"  onClick={this.props.pmpQuiz}><Icon type="question-circle" />Take a Quiz</Button>
            </Animated>
            <Animated  animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
              <Button className="guestButton"  onClick={this.props.pmpLearn}><Icon type="book" />Learn Inputs and Outputs</Button>
            </Animated>

            <Animated  animationIn="slideInRight" animationOut="fadeOut" isVisible={true}>
              <Button className="guestButton"  onClick={this.reportCard}><Icon type="ordered-list" />Report Card</Button>
            </Animated>
        </div>
      </div>
    )

  }

}

export default coursePageNew
// <Button className="menuItem" onClick={this.props.pmpQuiz} ghost>  Quiz </Button>
// <Button className="menuItem" onClick={this.props.pmpLearn}  ghost> Learn  </Button>
// <Button className="menuItem" onClick={this.props.historyPage}  ghost> Score Cards  </Button>
