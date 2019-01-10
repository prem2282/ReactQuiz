import React, {Component} from 'react';
import {Animated} from 'react-animated-css';
import {Button, Modal, Icon, Tag, Avatar, Collapse, message} from 'antd';
import './menuPage.css';
import pmpPhaseMapping from '../..//components/constants/pmpPhaseMapping';
import pmpTypeMapping from '../..//components/constants/pmpTypeMapping';
import _ from 'lodash';
import Formulas from '../..//components/constants/mathFormulas';
import MathExplanations from '../..//components/constants/mathExplanations';
const confirm = Modal.confirm;
const Panel = Collapse.Panel;
message.config({
  top: 100,
  duration: 1,
  maxCount: 3,
})

class quizDetails extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      questionArray : [],
      visible: true,
      modalName: null,
      groupIdClicked: null,
      showExplain: false,
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
      showExplain: !this.state.showExplain
    })
    this.props.handleCancel();
  }

  callback = (e) => {
    this.setState({
      showExplain: false
    })
  }
  explainBoxClicked = () => {
    this.setState({
      showExplain: !this.state.showExplain
    })
  }

  yourAnswerText = (questionSet) => {

      let questionId = _.toString(questionSet.id)
      let questionNums = this.props.quizDetails.questionSet.split(',');
      let questionIndex = questionNums.indexOf(questionId);
      let selectedAnsIndex = this.props.quizDetails.selectedAnsIndex.split(',');
      let answerText = selectedAnsIndex[questionIndex];
      let textArray = answerText?answerText.split('-'):[];
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

  yourAnswerCheck = (questionSet) => {

    let questionId = String(questionSet.id)
    let questionNums = this.props.quizDetails.questionSet.split(',');
    let questionIndex = questionNums.indexOf(questionId);
    let yourAnswer = this.props.quizDetails.answerSet.split(',');
    let answerCheck = String(yourAnswer[questionIndex]);
    return answerCheck;

  }

  getTitle = (groupId) => {

    let groupIdSet = groupId.split('-');
    let text = 'Title';
    if (groupIdSet[1] === 'T') {
      text = 'Process Group:' + pmpTypeMapping(groupIdSet[2])+ ' Set: ' + groupIdSet[3];
    }
    if (groupIdSet[1] === 'P') {
      text = 'Process Group:' + pmpPhaseMapping(groupIdSet[2])+ ' Set: ' + groupIdSet[3];
    }
    if (groupIdSet[1] === 'M') {
      text = 'Formula Based' + ' Set: ' + groupIdSet[3];
    }
    return(text);
  }

  render() {

    let questionNum = this.props.quizDetails.questionSet.split(',');
    let questionArray = this.props.PMPBaseQuizSet;
    let groupId = this.props.quizDetails.groupId;
    let title = this.getTitle(groupId);
    for (let i = 0; i < questionNum.length; i++) {
      questionNum[i] = Number(questionNum[i])
    }
    return(
    <Modal
      className = "custom modalClass"
      title = {title}
      visible = {this.state.visible}
      onOk = {this.handleOk}
      onCancel = {this.handleCancel}
      footer = {null}
    >
    {
      questionNum.map((question,i) => {
        let questionSetA = _.filter(questionArray,
        function(quizItem) {
          return (
            quizItem.id === Number(question)
          )
        })
        let questionSet = questionSetA[0];
        let screenWidth = window.innerWidth;
        let correctText = 'Correct';
        let wrongText = 'Wrong';
        let checkText = null;
        if (this.yourAnswerCheck(questionSet)==='1') {
          checkText = correctText;
        }else {
          checkText = wrongText;
        }
        let choice1Class = "choiceDefault";
        let choice2Class = "choiceDefault";
        let choice3Class = "choiceDefault";
        let choice4Class = "choiceDefault";

        if (questionSet.answer_1_ind) {
          choice1Class = "choiceCorrect"
        }
        if (questionSet.answer_2_ind) {
          choice2Class = "choiceCorrect"
        }
        if (questionSet.answer_3_ind) {
          choice3Class = "choiceCorrect"
        }
        if (questionSet.answer_4_ind) {
          choice4Class = "choiceCorrect"
        }

        if (this.yourAnswerText(questionSet[0] === 'A')) {
          if (questionSet.answer_1_ind) {
            choice1Class = "choiceCorrect"
          } else {
            choice1Class = "choiceWrong"
          }
        }
        if (this.yourAnswerText(questionSet[0] === 'B')) {
          if (questionSet.answer_2_ind) {
            choice2Class = "choiceCorrect"
          } else {
            choice2Class = "choiceWrong"
          }
        }
        if (this.yourAnswerText(questionSet[0] === 'C')) {
          if (questionSet.answer_3_ind) {
            choice3Class = "choiceCorrect"
          } else {
            choice3Class = "choiceWrong"
          }
        }
        if (this.yourAnswerText(questionSet[0] === 'D')) {
          if (questionSet.answer_4_ind) {
            choice4Class = "choiceCorrect"
          } else {
            choice4Class = "choiceWrong"
          }
        }

        let collapseText = "Question : " + String(i+1) + " " + checkText;
        let explanation_1 = null;
        let explanation_2 = null;
        let explainTextArray = [];

        if (questionSet.QuestionType === '5') {
          let newQuestion = questionSet.Question;
          if (questionSet.answer_3) {
            explanation_1 = questionSet.answer_3;
          }
          if (questionSet.answer_4) {
            explanation_2 = questionSet.answer_4;
          }

          let varSet = questionSet.answer_1;
          varSet = varSet.split(",");
          let variableSet = this.props.quizDetails.variableSet.split(',');
          let replaceSet = variableSet[i].split("-");
          for (let i = 0; i < varSet.length; i++) {
            let replaceValue = Number(replaceSet[i]).toLocaleString();
            newQuestion = newQuestion.replace(varSet[i],replaceValue);
          }
          for (let i = 0; i < varSet.length; i++) {
            let replaceValue = Number(replaceSet[i]).toLocaleString();
            newQuestion = newQuestion.replace(varSet[i],replaceValue);
          }
          let expArray_1 = [];
          let expArray_2 = [];

          if (explanation_1) {
            expArray_1 = explanation_1.split(';')
          }
          if (explanation_2) {
            expArray_2 = explanation_2.split(';')
          }

          let formula = questionSet.answer_2;
          let mathExplanations = MathExplanations(formula,replaceSet);
          explainTextArray = expArray_1.concat(expArray_2,mathExplanations);
          let choices = Formulas(formula,replaceSet);
          let rightAnsIndex = choices[4];
          let rightAns = choices[rightAnsIndex];
          rightAns = Number(rightAns).toLocaleString();
          let yourAnswerText = this.yourAnswerText(questionSet);
          if (Number(yourAnswerText)>0) {
            yourAnswerText = Number(yourAnswerText).toLocaleString();
          }

          return(
            <Animated key={i} animationIn="slideDown" animationOut="fadeOut" isVisible={true}>
              <Collapse accordion className="custom" style={{backgroundColor:'transparent', margin:'2px'}}
              onChange={this.callback}>
                <Panel header={collapseText}>
                  <div>
                    <div className="historyQuestBox">
                      <p>
                        {newQuestion}
                      </p>
                      <div className = "historyMathAnsBox">
                        <p className = "historyMathRightAns">
                          Right Answer : {rightAns}
                        </p>
                        <p className = "historyMathYourAns">
                          Your Answer : {yourAnswerText}
                        </p>
                      </div>
                      <Button style={{width:'100px'}} onClick={this.explainBoxClicked} ghost>Explain</Button>
                      {this.state.showExplain?
                        <div className="explainBox">
                          {
                            explainTextArray.map((sentence,i) => {
                              return(
                                <p> Step {i+1} : {sentence}</p>
                              )
                            })
                          }
                          <p style={{color:'Gold'}}>Answer : {rightAns}</p>
                        </div>
                        :null
                      }
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </Animated>
          )

        } else {
          return(
            <Animated key={i} animationIn="slideDown" animationOut="fadeOut" isVisible={true}>
              <Collapse accordion className="custom" style={{backgroundColor:'transparent', margin:'2px'}}
              onChange={this.callback}>
                <Panel header={collapseText}>
                  <div>
                    <div className="historyQuestBox">
                      <p>
                        {questionSet.Question}
                      </p>
                      {questionSet.answer_1?
                        <div className = "historyAnsBox">
                          <p className={choice1Class}>
                            A) {questionSet.answer_1}
                            {questionSet.answer_1_ind?<Icon type="check"/>:null}
                          </p>
                        </div>
                      :null}
                      {questionSet.answer_2?
                        <div className = "historyAnsBox">
                          <p className={choice2Class}>
                            A) {questionSet.answer_2}
                            {questionSet.answer_2_ind?<Icon type="check"/>:null}
                          </p>
                        </div>
                      :null}
                      {questionSet.answer_3?
                        <div className = "historyAnsBox">
                          <p className={choice3Class}>
                            A) {questionSet.answer_3}
                            {questionSet.answer_3_ind?<Icon type="check"/>:null}
                          </p>
                        </div>
                      :null}
                      {questionSet.answer_4?
                        <div className = "historyAnsBox">
                          <p className={choice4Class}>
                            A) {questionSet.answer_4}
                            {questionSet.answer_4_ind?<Icon type="check"/>:null}
                          </p>
                        </div>
                      :null}
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </Animated>

          )
        }

      })
    }
    </Modal>
  )
  }

}

export default quizDetails
