import React, {Component} from 'react';
import {Animated} from 'react-animated-css';
import {Button, Modal, Icon, Tag, Avatar} from 'antd';
import QuizDetails from './quizDetails';
import QuizDetails2 from './quizDetails2';
import './menuPage.css'
import VoicePlayer from '../..//components/apicalls/VoicePlayer';

class resultPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible : false,
      showOnlyWrong: false,
    }
  }

  yourAnswerText = (selectedAnsIndex) => {
    let textArray = selectedAnsIndex?String(selectedAnsIndex).split('-'):[];
    let textArrayNew = textArray.map((txt,i) => {
      switch (txt) {
        case "0":
          return "A";
          break;
        case "1":
          return "B";
          break;
        case "2":
          return "C";
          break;
        case "3":
          return "D";
          break;
        case "4":
          return "E";
          break;
        case "5":
          return "F";
          break;
        default:
          return txt;
          break

      }
    })
    return(textArrayNew)
  }





  scoreText = (score) => {
    let scoreText = "";
    score = Number(score);
    if (score < 30) {
      scoreText = "Oh No! You need more preparation! You can do it!"
    } else if (score >= 30 & score < 50) {
      scoreText = "Not Bad. But you can do much better!"
    } else if (score >= 50 & score < 80) {
      scoreText = "Good Job. Try Try Try. You will be on top!"
    } else if (score >= 80 & score < 100) {
      scoreText = "Great Job. Try a little more and you can get 100 percent"
    } else if (score === 100) {
      scoreText = "Excellent! You are the best!"
    }

    scoreText = scoreText + "You scored " + score + "percent!"
    return(scoreText);
  }

  speechEnded = () => {

  }

  render () {
    let scoreText = this.scoreText(this.props.score);
    let resultTopBox = "resultTopBox"
    if (this.props.score === 100) {
      resultTopBox = "resultTopBox100"
    }



    return(
      <div>
        <VoicePlayer play onEnd={this.speechEnded} text={scoreText}/>
        <div className='detailsContainer'>
          <div className={resultTopBox}>
            <div className="resultBox1">
              <Button className="menuItem" type="primary" ghost onClick={this.props.goBackToCourse}><Icon type="double-left" /> Return</Button>
            </div>
            <div className="resultBox2">
              <Animated  animationIn="slideDown" animationOut="fadeOut" isVisible={true}>
                <h2 className="resultText1">You Scored</h2>
              </Animated>
              <Animated  animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
                <h1 className="resultText2">{this.props.score} %</h1>
              </Animated>
            </div>
            <div className="resultBox3">
              <Button className="menuItem" type="primary" ghost onClick={this.props.retakeQuiz}><Icon type="reload" /> Retake</Button>
            </div>
          </div>
        </div>

        <div className="detailsContainer">
          <QuizDetails2
            quizDetails = {this.props.quizDetails}
            PMPBaseQuizSet = {this.props.PMPBaseQuizSet}
            handleCancel = {this.handleModalClose}
            questionArray = {this.props.questionArray}
            selectedGroupSet = {this.props.selectedGroupSet}
          />
        </div>
        <Animated  animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
          <div className="resultButtonContainer">
            <div>
            </div>
            <div>
            </div>
          </div>
        </Animated>
      </div>
    )
  }

}

export default resultPage

// <Button className="menuItem" ghost onClick={this.showModal}>Show All</Button>
// <Button className="menuItem" ghost onClick={this.showModalWrong}>Show only Wrong</Button>
