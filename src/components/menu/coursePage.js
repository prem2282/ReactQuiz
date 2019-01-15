import React, {Component} from 'react';
import {Icon, Button, Alert} from 'antd';
import './menuPage.css';
import './pmpStyles.css';
import {Animated} from 'react-animated-css';
import Delayed from '../..//components/header/delayed';

class coursePage extends Component {

  constructor(props) {
    super(props);

  }

  render() {



    return(
      <div className="coursePageContainer">

        <Delayed waitBeforeShow={1*200}>
          <Animated  animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <div className="subProcessContainer"  onClick={this.props.pmpQuiz} >
              <div className="subProcessIcon" >
                <Icon type="question-circle" style={{color:'LightSteelBlue'}}/>
              </div>
                <p className="subProcessText">Quiz</p>
            </div>
          </Animated>
        </Delayed>
        <Delayed waitBeforeShow={2*200}>
          <Animated  animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <div className="subProcessContainer"  onClick={this.props.pmpLearn} >
              <div className="subProcessIcon" >
                <Icon type="book" style={{color:'LightSteelBlue'}}/>
              </div>
                <p className="subProcessText">Learn</p>
            </div>
          </Animated>
        </Delayed>
        {this.props.userProfile?
          <Delayed waitBeforeShow={3*200}>
            <Animated  animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
              <div className="subProcessContainer"  onClick={this.props.historyPage} >
                <div className="subProcessIcon" >
                  <Icon type="ordered-list" style={{color:'LightSteelBlue'}}/>
                </div>
                  <p className="subProcessText">Report Card</p>
              </div>
            </Animated>
          </Delayed>
        :
        <Delayed waitBeforeShow={3*200}>
          <Button type="danger" ghost style={{width:'100px'}} onClick={this.props.goBackToLanding}>
            <Icon type="double-left" theme="outlined" />
            Back
          </Button>
        </Delayed>
        }




      </div>
    )

  }

}

export default coursePage
// <Button className="menuItem" onClick={this.props.pmpQuiz} ghost>  Quiz </Button>
// <Button className="menuItem" onClick={this.props.pmpLearn}  ghost> Learn  </Button>
// <Button className="menuItem" onClick={this.props.historyPage}  ghost> Score Cards  </Button>
