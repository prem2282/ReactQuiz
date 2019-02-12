import { Modal, Button, Icon, Card , message, Tag , Progress, Collapse } from 'antd';
import pmpPhaseMapping from '../..//components/constants/pmpPhaseMapping';
import pmpTypeMapping from '../..//components/constants/pmpTypeMapping';import  React from 'react';
import './menuPage.css';
import './quizDetails.css';
import _ from 'lodash';
import {Animated} from 'react-animated-css';
import Formulas from  '../..//components/constants/mathFormulas';
import MathExplanations from  '../..//components/constants/mathExplanations';
import MyFunctions from '../..//components/constants/functions';
const confirm = Modal.confirm;
const Panel = Collapse.Panel;
message.config({
  top: 100,
  duration: 1,
  maxCount: 3,
});


class quizDetails2 extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      questionArray : [],
      visible: true,
      modalName : null,
      groupIdClicked : null,
      showExplain : false,
    }
  }

  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
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

  yourAnswerArray = (questionSet) => {

    let questionId = _.toString(questionSet.id);
    let questionNums = this.props.quizDetails.questionSet.split(',');
    let questionIndex = questionNums.indexOf(questionId);
    let selectedAnsIndex = this.props.quizDetails.selectedAnsIndex.split(',');


    let answerText = selectedAnsIndex[questionIndex];
    console.log("answerText:",answerText);
    let textArray = answerText?answerText.split('-'):[];
    console.log("your ans text Array:",textArray);
    return(textArray)
  }
  yourAnswerText = (questionSet) => {

    let questionId = _.toString(questionSet.id);
    let questionNums = this.props.quizDetails.questionSet.split(',');
    let questionIndex = questionNums.indexOf(questionId);
    let selectedAnsIndex = this.props.quizDetails.selectedAnsIndex.split(',');


    let answerText = selectedAnsIndex[questionIndex];
    let textArray = answerText?answerText.split('-'):[];
    let textArrayNew =  textArray.map((txt, i) =>{
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
                        break;

                    }
                  })

   return(textArrayNew);

  }


  yourAnswerCheck = (questionSet) => {


    let questionId = _.toString(questionSet.id);
    let questionType = questionSet.QuestionType;


    let questionNums = this.props.quizDetails.questionSet.split(',');
    let questionIndex = questionNums.indexOf(questionId);
    let yourAnswer = this.props.quizDetails.answerSet.split(',')

    let answerCheck = _.toString(yourAnswer[questionIndex]);
    return(answerCheck);


  }

  getTitle = (groupId) => {

      let groupIdSet = groupId.split('-');
      let text = 'Title';
      if (groupIdSet[1] === 'T') {
        text = 'Process Group:' + pmpTypeMapping(groupIdSet[2]) + ' Set :' + groupIdSet[3]
      }
      if (groupIdSet[1] === 'P') {
        text = 'Phase:' + pmpPhaseMapping(groupIdSet[2]) + ' Set :' + groupIdSet[3]
      }
      if (groupIdSet[1] === 'M') {
        text = 'Formula Based'+ ' Set :' + groupIdSet[3]
      }

      return(text);
  }


  render() {


    let questionNum = this.props.quizDetails.questionSet.split(',');

    let questionArray = null;
    let group = null;
    let groupId = this.props.quizDetails.groupId;
    let title = null;
    console.log("groupId",groupId);
    let groupArray = String(groupId).split('-');


    if (groupArray[0] === 'PMP') {
      questionArray = this.props.questionArray;
      groupId = this.props.quizDetails.groupId;
      title = this.getTitle(groupId);
    } else {
      questionArray = this.props.questionArray;
      group = this.props.selectedGroupSet;
      groupId = group.id;
      title = group.board + '/' + group.standard + '/' + group.subject

    }


    for (var i = 0; i < questionNum.length; i++) {
      questionNum[i] = Number(questionNum[i])
    }

    return (
      <div>
          {

            questionNum.map((question, i) =>{
                          let questionSetA =  _.filter(questionArray,
                                function(quizItem) {
                                  return (
                                        quizItem.id === Number(question)
                                          )
                                })

                          let questionSet = questionSetA[0]
                          // console.log("questionSet:", questionSet);
                          let screenWidth = window.innerWidth;
                          let correctText = "✔️"
                          let wrongText = "❌"
                          let answerCheck = this.yourAnswerCheck(questionSet)
                          let checkText = null

                          if (answerCheck==="1") {
                            checkText =correctText
                          } else if (answerCheck==="0") {
                            checkText =wrongText
                          } else {
                            let split = answerCheck.split("-");
                            if (Number(split[0]) === 0) {
                                checkText = "(" + split[1] + wrongText + ")";
                            } else if (Number(split[1]) === 1) {
                                checkText = "(" + split[0] + correctText + ")";
                            } else {
                                checkText = "(" + split[0] + correctText + " , " + split[1] + wrongText + ")";
                            }


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
                          // console.log("this.yourAnswerText(questionSet) :", this.yourAnswerText(questionSet) );
                          if (this.yourAnswerText(questionSet)[0] === "A") {
                            // console.log("inside A");
                            if (questionSet.answer_1_ind) {
                              choice1Class = "choiceCorrect"
                            } else {
                              choice1Class = "choiceWrong"
                            }
                            // console.log("choice1Class:", choice1Class);
                          }
                          if (this.yourAnswerText(questionSet)[0] === "B") {
                            if (questionSet.answer_2_ind) {
                              choice2Class = "choiceCorrect"
                            } else {
                              choice2Class = "choiceWrong"
                            }
                          }
                          if (this.yourAnswerText(questionSet)[0] === "C") {
                            if (questionSet.answer_3_ind) {
                              choice3Class = "choiceCorrect"
                            } else {
                              choice3Class = "choiceWrong"
                            }
                          }
                          if (this.yourAnswerText(questionSet)[0] === "D") {
                            if (questionSet.answer_4_ind) {
                              choice4Class = "choiceCorrect"
                            } else {
                              choice4Class = "choiceWrong"
                            }
                          }
                          let explanation_1 = null;
                          let explanation_2 = null;
                          let explainTextArray = [];
                          let collapseText = "Question :" +  String(i+1) + "  " + checkText;
                          let yourAnswerArray = this.yourAnswerArray(questionSet)
                          // console.log("collapseText:", collapseText);
                          // console.log("questionSet.QuestionType:",questionSet.QuestionType);
                          if (questionSet.QuestionType === '5') {
                            let newQuestion = questionSet.Question;
                            if (questionSet.answer_3) {
                              explanation_1 = questionSet.answer_3;
                            }
                            if (questionSet.answer_4) {
                              explanation_2 = questionSet.answer_4;
                            }

                            let varSet = questionSet.answer_1;
                            varSet = varSet.split(",")
                            let variableSet =  this.props.quizDetails.variableSet.split(",")
                            let replaceSet = variableSet[i].split("-")
                            for (var k = 0; k < varSet.length; k++) {
                              let replaceValue = Number(replaceSet[k]).toLocaleString();
                              newQuestion = newQuestion.replace(varSet[k],replaceValue);
                              if (explanation_1) {
                                  explanation_1 = explanation_1.replace(varSet[k],replaceValue);
                              }
                              if (explanation_2) {
                                  explanation_2 = explanation_2.replace(varSet[k],replaceValue);
                              }
                            }
                            for (var k = 0; k < varSet.length; k++) {
                              let replaceValue = Number(replaceSet[k]).toLocaleString();
                              newQuestion = newQuestion.replace(varSet[k],replaceValue);
                            }
                            let expArray_1 = []
                            let expArray_2 = []
                            if (explanation_1) {
                              expArray_1 = explanation_1.split(";")
                            }
                            if (explanation_2) {
                              expArray_2 = explanation_2.split(";")
                            }

                            let formula = questionSet.answer_2;
                            let mathExplanations = MathExplanations(formula,replaceSet)
                            explainTextArray = expArray_1.concat(expArray_2,mathExplanations);
                            let choices =Formulas(formula,replaceSet);
                            let rightAnsIndex = choices[4];
                            let rightAns = choices[rightAnsIndex];
                            rightAns = Number(rightAns).toLocaleString();
                            let yourAnswerText = this.yourAnswerText(questionSet)
                            if (Number(yourAnswerText)>0) {
                                yourAnswerText = Number(yourAnswerText).toLocaleString();
                            }
                            let displayQuestion = newQuestion.replace("<dash>","__________")
                            return(
                              <Animated key={i} animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
                                <Collapse accordion className="custom" style={{backgroundColor:'transparent', margin:'2px'}} onChange={this.callback}>
                                  <Panel header={collapseText}>

                                    <div >
                                      <div  className="historyQuestBox">
                                        <p>
                                          {displayQuestion}
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
                                            explainTextArray.map((sentence, i) => {
                                                return(
                                                  <p> Step {i+1} : {sentence}</p>
                                                )
                                            })
                                          }
                                            <p style={{color:'Gold'}}>Answer : {rightAns} </p>
                                          </div>
                                          :null
                                        }
                                      </div>
                                    </div>
                                  </Panel>
                                </Collapse>
                              </Animated>

                            )
                          } else if (questionSet.QuestionType === '2') {
                            let data = MyFunctions("matchType",questionSet.Question);
                            let questionText = data.questionText;
                            let matchQuestion = data.matchQuestion;
                            let matchAnswer = data.matchAnswer;
                            // let yourAnswer = this.props.quizDetails.selectedAnsIndex.split(",")

                            return(
                              <Animated key={i} animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
                                <Collapse accordion className="custom" style={{backgroundColor:'transparent', margin:'2px'}} onChange={this.callback}>
                                  <Panel header={collapseText}>

                                    <div >
                                      <div  className="historyQuestBox">
                                        <p>
                                          {questionText}
                                        </p>

                                        {matchQuestion.map((item, i) => {
                                          let yourAnsColor = 'Red';
                                          let answerInd = false;
                                          let tickText = wrongText;
                                          if (yourAnswerArray[i] === matchAnswer[i]) {
                                            yourAnsColor = 'Green'
                                            answerInd = true
                                            tickText = correctText
                                          }
                                          return(
                                            <div className = 'matchType'>
                                              <p className="matchTypeAnswer">{tickText}</p>
                                              <p className="matchTypeQuestion">{matchQuestion[i]}</p>
                                              <p className="matchTypeAnswer">{matchAnswer[i]}</p>
                                              {answerInd?
                                              null:
                                              <p className="matchTypeWrongAnswer">{yourAnswerArray[i]}</p>
                                              }

                                            </div>
                                          )


                                        })}
                                      </div>
                                    </div>
                                  </Panel>
                                </Collapse>
                              </Animated>

                            )

                          } else {
                            let displayQuestion = questionSet.Question.replace("<dash>","__________")


                            return(
                              <Animated key={i} animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
                              <Collapse accordion className="custom" style={{backgroundColor:'transparent', margin:'2px'}} onChange={this.callback}>
                              <Panel header={collapseText}>

                                <div >
                                  <div  className="historyQuestBox">
                                    <p>
                                      {displayQuestion}
                                    </p>
                                  </div>
                                  {questionSet.answer_1?
                                    <div  className="historyAnsBox">
                                      <p className={choice1Class}>
                                        A) {questionSet.answer_1}
                                        {questionSet.answer_1_ind? <Icon type="check" />:null }
                                      </p>
                                    </div>
                                  :null}
                                  {questionSet.answer_2?
                                    <div   className="historyAnsBox">
                                      <p className={choice2Class}>
                                        B) {questionSet.answer_2}   {questionSet.answer_2_ind? <Icon type="check" />:null }
                                      </p>
                                    </div>
                                    :null}
                                  {questionSet.answer_3?
                                    <div   className="historyAnsBox">
                                      <p className={choice3Class}>
                                        C) {questionSet.answer_3}   {questionSet.answer_3_ind? <Icon type="check" />:null }
                                      </p>
                                    </div>
                                    :null}
                                  {questionSet.answer_4?
                                    <div   className="historyAnsBox">
                                      <p className={choice4Class}>
                                        D) {questionSet.answer_4}   {questionSet.answer_4_ind? <Icon type="check" />:null }
                                      </p>
                                    </div>
                                    :null}
                                </div>
                              </Panel>
                              </Collapse>
                              </Animated>
                            )
                          }
                        })


          }


      </div>
    )

  }


}

export default quizDetails2
