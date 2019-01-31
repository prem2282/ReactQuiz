import React, {Component} from 'react';
import {Animated} from 'react-animated-css';
import {Button, Modal, Icon, Tag, Avatar} from 'antd';
import QuizDetails from './quizDetails';
import QuizDetails2 from './quizDetails2';
import './menuPage.css'

class resultPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible : false,
      showOnlyWrong: false,
      modalName : null,
      showNewModal: false,
    }
  }

  handleModalClose = (e) => {
    this.setState({
      showNewModal:false,
    })
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

  showModal = () => {
    this.setState({
      visible: true,
      showOnlyWrong: false,
    })
  }

  showModalWrong = () => {
    this.setState({
      visible: true,
      showOnlyWrong: true,
    })
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
      showOnlyWrong: false,
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
      showOnlyWrong: false,
    })
  }

  modalContent = (questionSet, i) => {
    let screenWidth = window.innerWidth;
    let correctText = "Correct";
    let wrongText = "Wrong";
    console.log("this.props.variableValues",this.props.variableValues);
    if (questionSet.QuestionType === '5') {
      let newQuestion = questionSet.Question;
      let varSet = questionSet.answer_1;
      varSet = varSet.split(",");
      let replaceSet = this.props.variableValues[i].split("-");
      for (let i = 0; i < varSet.length; i++) {
        let replaceValue = replaceSet[i];
        newQuestion = newQuestion.replace(varSet[i],replaceValue);
      }

      return (
        <Animated key={i} animationIn="slideDown" animationOut="fadeOut" isVisible={true}>
          <div className={(this.props.ansInd[i]?"historyBoxRight":"historyBoxWrong")}>
            <div className="historyQuestBox">
              <p>{newQuestion}</p>
              <Tag className="historyBox1Close" color={this.props.ansInd[i]?"#87d068":"#f50"}>
                <p>{this.props.ansInd[i]?correctText:wrongText}</p>
              </Tag>
            </div>
            <div className="historyAnsBox">
              <p>Correct Answer : {this.props.correctAns[i]}</p>
            </div>
            <div className="historyAnsBox">
              <p>Your Answer : {this.yourAnswerText(this.props.selectedAnsIndex[i])}</p>
            </div>
          </div>
        </Animated>
      )

    }

    else {
      return (
      <Animated key={i} animationIn="slideDown" animationOut="fadeOut" isVisible={true}>
        <div className={(this.props.ansInd[i]?"historyBoxRight":"historyBoxWrong")}>
          <div className="historyQuestBox">
            <p>{questionSet.Question}</p>
            <Tag className="historyBox1Close" color={this.props.ansInd[i]?"#87d068":"#f50"}>
              <p>{this.props.ansInd[i]?correctText:wrongText}</p>
            </Tag>
          </div>
          {questionSet.answer_1?
            <div className="historyAnsBox">
              <p className={questionSet.answer_1_ind?"historyAnsTextRight":null}>
                A) {questionSet.answer_1}
                {questionSet.answer_1_ind?<Icon type="check" />:null}
              </p>
            </div>
            :null
          }
          {questionSet.answer_2?
            <div className="historyAnsBox">
              <p className={questionSet.answer_2_ind?"historyAnsTextRight":null}>
                A) {questionSet.answer_2}
                {questionSet.answer_2_ind?<Icon type="check" />:null}
              </p>
            </div>
            :null
          }
          {questionSet.answer_3?
            <div className="historyAnsBox">
              <p className={questionSet.answer_3_ind?"historyAnsTextRight":null}>
                A) {questionSet.answer_3}
                {questionSet.answer_3_ind?<Icon type="check" />:null}
              </p>
            </div>
            :null
          }
          {questionSet.answer_4?
            <div className="historyAnsBox">
              <p className={questionSet.answer_4_ind?"historyAnsTextRight":null}>
                A) {questionSet.answer_4}
                {questionSet.answer_4_ind?<Icon type="check" />:null}
              </p>
            </div>
            :null
          }
          <div className="historyAnsBox">
            <p>Your Answer : {this.yourAnswerText(this.props.selectedAnsIndex[i])}</p>
          </div>
        </div>
      </Animated>
    )
  }
  }

  renderNewModel = () => {
    this.setState({
      showNewModal: true,
    })
  }
  renderModal = () => {
    return (
      <Modal
        className = "modalStyle"
        visible = {this.state.visible}
        title = "Quiz Result"
        onOk = {this.handleOk}
        onCancel = {this.handleCancel}
      >
      {
        this.props.questionArray.map((questionSet,i)=>{
          if (this.state.showOnlyWrong) {
            if (this.props.ansInd[i]) {
              return null
            } else {
              return this.modalContent(questionSet, i)
            }
          } else {
            return this.modalContent(questionSet, i)
          }
        })
      }
      </Modal>
    )
  }

  scoreText = (score) => {
    let scoreText = "";
    score = Number(score);
    if (score < 30) {
      scoreText = "Need more preparation! You can do it!"
    } else if (score >= 30 & score < 50) {
      scoreText = "Not Bad! But you can do much better!"
    } else if (score >= 50 & score < 80) {
      scoreText = "Good Job! Try! Try! Try! You will be on top!"
    } else if (score >= 80 & score < 100) {
      scoreText = "Great Job Buddy! Keep going!"
    } else if (score === 100) {
      scoreText = "Excellent! You are the best!"
    }
    return(scoreText);
  }

  render () {
    let scoreText = this.scoreText(this.props.score);

    return(
      <div>
        <Animated  animationIn="slideDown" animationOut="fadeOut" isVisible={true}>
          <h2 className="historyQuestion">You Scored</h2>
        </Animated>
        <Animated  animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
          <h1 className="historyQuestion">{this.props.score} %</h1>
        </Animated>
        <QuizDetails2
          quizDetails = {this.props.quizDetails}
          PMPBaseQuizSet = {this.props.PMPBaseQuizSet}
          handleCancel = {this.handleModalClose}
          questionArray = {this.props.questionArray}
          selectedGroupSet = {this.props.selectedGroupSet}
        />
        <Animated  animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
          <div className="resultButtonContainer">
            <div>
              <Button className="menuItem" type="primary" onClick={this.props.retakeQuiz}>Retake</Button>
            </div>
            <div>
              <Button className="menuItem" type="primary" onClick={this.props.goBackToCourse}>Return</Button>
            </div>
          </div>
        </Animated>
        {this.renderModal()}
        {this.state.showNewModal?
          <QuizDetails
            quizDetails = {this.props.quizDetails}
            PMPBaseQuizSet = {this.props.PMPBaseQuizSet}
            handleCancel = {this.handleModalClose}
            questionArray = {this.props.questionArray}
            selectedGroupSet = {this.props.selectedGroupSet}
          />
        :null}

      </div>
    )
  }

}

export default resultPage

// <Button className="menuItem" ghost onClick={this.showModal}>Show All</Button>
// <Button className="menuItem" ghost onClick={this.showModalWrong}>Show only Wrong</Button>
