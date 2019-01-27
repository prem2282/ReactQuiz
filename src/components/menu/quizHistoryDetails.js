
import { Modal, Button, Icon, Card , message, Tag , Progress, Collapse } from 'antd';
import  React from 'react';
import './menuPage.css';
import './historyStyles.css';
import _ from 'lodash';
import {Animated} from 'react-animated-css';
import axios from 'axios';
import Request from 'superagent';
import Formulas from  '../..//components/constants/mathFormulas';
import MathExplanations from  '../..//components/constants/mathExplanations';
import QuizDetails from './quizDetails';


const confirm = Modal.confirm;
const Panel = Collapse.Panel;


message.config({
  top: 100,
  duration: 1,
  maxCount: 3,
});

class historyDetailsModel extends React.Component {

  constructor (props) {
    super(props);

  this.state = {
    questionArray : [],
    visible: false,
    modalName : null,
    groupIdClicked : null,
    showExplain : false,
    showNewModal: false,
  }

}

  retakeQuiz = (event) => {

    let id = event.target.id
    console.log("retakeQui idz:", id);

    if ((this.state.groupId == this.props.quizList.groupId) &&  (this.state.questionArray.length>0)) {
        this.props.retakeQuiz(id,this.state.questionArray);
    } else {
        this.getQustionArray(id)
    }

  }

  showQuizModalPMP = () => {
    let groupId = this.props.quizList.groupId;

    let groupIdArray = String(groupId).split("-")

    let  questionArray = [];

    if (groupIdArray[0]==='PMP') {

      this.setState({
        questionArray : this.props.PMPBaseQuizSet,
        visible: true,
        modalName : "quiz",
        groupIdClicked : groupId,
        showNewModal: true,
      })
    }

  }

  getQustionArray = (id) => {

        let groupId = this.props.quizList.groupId ;
        console.log("groupId:", groupId);

        let groupIdArray = String(groupId).split("-")
        console.log("groupIdArray:",groupIdArray);

        let targetUrl = null;
        if (groupIdArray[0]=='PMP') {
          targetUrl = 'https://prem2282.pythonanywhere.com/api/PMPQuestionList/';
          // targetUrl = 'http://127.0.0.1:8000/api/PMPQuestionList/';

        } else {
           targetUrl = 'https://prem2282.pythonanywhere.com/api/QuestionList/';
          //  targetUrl = 'http://127.0.0.1:8000/api/QuestionList/';
        }

        let questionSet = this.props.quizList.questionSet
        console.log("questionSet:",questionSet);
        //
        // questionSet = [1,2,3,4,5];

        let  questionArray = [];

        Request.get(targetUrl)
               .query({ questionSet: questionSet })
                .catch(function(error) {

                })
                .then((response) => {
                  if (response.body.length>0) {
                    console.log("API response:",response.body);
                    for (let i = 0; i < response.body.length; i++) {
                      questionArray.push(response.body[i]);
                    }
                    this.props.retakeQuiz(id,questionArray);
                  }
                })


  }

  showRemoveModal = () => {
    this.setState({
      visible: true,
      modalName: "remove"
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });

  }

  handleModalClose = (e) => {
    this.setState({
      showNewModal: false,
    });
  }

  yourAnswerCheck = (questionSet) => {

    let questionId = _.toString(questionSet.id);
    let questionType = questionSet.QuestionType;


    let questionNums = this.props.quizTopic.questionNums.split(',');
    let questionIndex = questionNums.indexOf(questionId);
    let yourAnswer = this.props.quizTopic.ans_inds.split(',')

    let answerCheck = _.toString(yourAnswer[questionIndex]);
    return(answerCheck);

    console.log("questionId", questionId);
    console.log("answerCheck", answerCheck);

  }


  removeQuizHistory = () => {

    console.log("To be removed quizId:", this.props.quizTopic.quizId);

    console.log("To be removed quizNumber:", this.props.quizNumber);


      let quizId = this.props.quizTopic.quizId;
      let quizNumber = this.props.quizNumber;

      // let targetUrl = 'http://127.0.0.1:8000/api/UserQuiz/delete/' + quizId + '/' ;
      let targetUrl = 'https://prem2282.pythonanywhere.com/api/UserQuiz/delete/' + quizId;

      let updated = false;

        axios.delete(targetUrl, {
          id: quizId,
        })

        .then(res => {
          console.log("Quiz Removed");

          this.props.remove(quizNumber);
        })
        .catch(err => {

        })


    this.setState({
      visible: false,
    });
  }

  showDeleteConfirm = () => {
    confirm({
      title: 'Delete from History?',
      content: 'Are you sure you want to delete this from your history?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  yourAnswerText = (questionSet) => {

    let questionId = _.toString(questionSet.id);
    let questionNums = this.props.quizTopic.questionNums.split(',');
    let questionIndex = questionNums.indexOf(questionId);
    let selectedAnsIndex = this.props.quizTopic.selectedAnsIndex.split(',');


    console.log("questionNums:",questionNums);
    console.log("selectedAnsIndex", selectedAnsIndex);
    console.log("questionId", questionId);
    console.log("questionIndex", questionIndex);
    let answerText = selectedAnsIndex[questionIndex];
    console.log("answerText:", answerText);
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
  renderModal =(title) => {
    if (this.state.modalName == "quiz") {
      // return this.renderQuizModal(title);
      return this.renderQuizDetailsModal();
    } else if (this.state.modalName == "remove") {
      return this.renderCloseModal();
    }
  }

  renderQuizDetailsModal = () => {

    let quizDetails = {
        questionSet :  this.props.quizTopic.questionNums,
        answerSet :  this.props.quizTopic.ans_inds,
        variableSet : this.props.quizTopic.variableSet,
        selectedAnsIndex : this.props.quizTopic.selectedAnsIndex,
        groupId: this.props.quizList.groupId,
      }

    this.setState({

      showNewModal: true,
      quizDetails: quizDetails,
    })

  }

  renderQuizModal = (title) => {

    console.log("this.props.quizTopic.questionNums.",this.props.quizTopic.questionNums);
    let questionNum = this.props.quizTopic.questionNums.split(',');
    console.log(questionNum);

    let questionArray = this.props.PMPBaseQuizSet;

    for (var i = 0; i < questionNum.length; i++) {
      questionNum[i] = Number(questionNum[i])
    }

    console.log(questionNum);

    return (
    <Modal
      className="custom modalClass"
      title={title}
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      footer = {null}
    >
      {

        questionNum.map((question, i) =>{
                      let questionSetA =  _.filter(questionArray,
                            function(quizItem) {
                              return (
                                    quizItem.id === Number(question)
                                      )
                            })

                      let questionSet = questionSetA[0]
                      console.log("questionSet:", questionSet);
                      let screenWidth = window.innerWidth;
                      let correctText = "✔️"
                      let wrongText = "❌"

                      let checkText = null
                      if (this.yourAnswerCheck(questionSet)==="1") {
                        checkText =correctText
                      } else {
                        checkText =wrongText
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
                      console.log("this.yourAnswerText(questionSet) :", this.yourAnswerText(questionSet) );
                      if (this.yourAnswerText(questionSet)[0] === "A") {
                        console.log("inside A");
                        if (questionSet.answer_1_ind) {
                          choice1Class = "choiceCorrect"
                        } else {
                          choice1Class = "choiceWrong"
                        }
                        console.log("choice1Class:", choice1Class);
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

                      let collapseText = "Question :" +  String(i+1) + "   " + checkText;
                      let explanation_1 = null;
                      let explanation_2 = null;
                      let explainTextArray = [];
                      console.log("collapseText:", collapseText);
                      console.log("questionSet.QuestionType:",questionSet.QuestionType);
                      if (questionSet.QuestionType === '5') {
                        let newQuestion = questionSet.Question;
                        if (questionSet.answer_3) {
                          explanation_1 = questionSet.answer_3;
                        }
                        if (questionSet.answer_4) {
                          explanation_2 = questionSet.answer_4;
                        }


                        console.log("variableValues:", this.props.quizTopic.variableSet);
                        let varSet = questionSet.answer_1;
                        // let variableSet = this.props.quizTopic.variableSet
                        varSet = varSet.split(",")
                        let variableSet =  this.props.quizTopic.variableSet.split(",")
                        console.log("variableSet",variableSet);
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
                          // explanation_1 = explanation_1.replace(varSet[k],replaceValue);
                          // explanation_2 = explanation_2.replace(varSet[k],replaceValue);
                        }
                        for (var k = 0; k < varSet.length; k++) {
                          let replaceValue = Number(replaceSet[k]).toLocaleString();
                          newQuestion = newQuestion.replace(varSet[k],replaceValue);
                          // explanation_1 = explanation_1.replace(varSet[k],replaceValue);
                          // explanation_2 = explanation_2.replace(varSet[k],replaceValue);
                        }
                        let expArray_1 = []
                        let expArray_2 = []
                        if (explanation_1) {
                          expArray_1 = explanation_1.split(";")
                        }
                        if (explanation_2) {
                          expArray_2 = explanation_2.split(";")
                        }

                        console.log("expArray_1 after:", expArray_1);
                        console.log("expArray_2 after:", expArray_2);

                        // explainTextArray = expArray_1.concat(expArray_2);

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
                        return(
                          <Animated key={i} animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
                            <Collapse accordion className="custom" style={{backgroundColor:'transparent', margin:'2px'}} onChange={this.callback}>
                              <Panel header={collapseText}>

                                <div >
                                  <div  className="historyQuestBox">
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
                      } else {
                        return(
                          <Animated key={i} animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
                          <Collapse accordion className="custom" style={{backgroundColor:'transparent', margin:'2px'}} onChange={this.callback}>
                          <Panel header={collapseText}>

                            <div >
                              <div  className="historyQuestBox">
                                <p>
                                  {questionSet.Question}
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

    </Modal>
  )

  }

  renderCloseModal = () => {

    return (
      <Modal
        className="modalStyle"
        title="Remove Quiz from History"
        visible={this.state.visible}
        onOk={this.removeQuizHistory}
        onCancel={this.handleCancel}
      >
        <p>Are you sure you want to Remove this?</p>
      </Modal>
    )
  }

  render() {
                console.log(this.props.quizTopic);
                let board = this.props.quizTopic.board;
                let standard = _.toString(this.props.quizTopic.standard);
                let subject = this.props.quizTopic.subject;
                let lessonName = _.toString(this.props.quizTopic.lessonName);
                let score = _.toString(this.props.quizTopic.score);
                let title= board + ' - ' + standard + ' - ' + subject;
                // if (subject) {
                //   title= board + ' - ' + standard + ' - ' + subject;
                // }

                // title = title + " " + score;
                let quizStatus = this.props.quizTopic.quizStatus;
                let quizNum = _.toString(this.props.quizNumber);
                let moment = require('moment');

                let timeDiff = moment(this.props.quizTopic.updatedTime).fromNow()

                console.log("timeDiff:", timeDiff);
                console.log("updatedTime:", this.props.quizTopic.updatedTime);

                console.log("quizTopic:", this.props.quizTopic);
                console.log("questionArray:", this.state.questionArray);

                let quizDetails = {
                    questionSet :  this.props.quizTopic.questionNums,
                    answerSet :  this.props.quizTopic.ans_inds,
                    variableSet : this.props.quizTopic.variableSet,
                    selectedAnsIndex : this.props.quizTopic.selectedAnsIndex,
                    groupId: this.props.quizList.groupId,
                  }


                return (
                  <div>
                      <div className="historyBoxWrapper"  >
                          <div className="historyBox1" >

                              <div className="historyBox1Main" style={{cursor:'pointer'}} onClick={this.showQuizModalPMP}>

                                <Tag color="#4D3F54">
                                  <p style={{color:'Turquoise'}}>{title}</p>
                                </Tag>
                                <p className="historyHeadText1">{lessonName}</p>
                                <p className="historyHeadText2">{timeDiff}</p>
                              </div>
                              <div className="historyBox1Close">
                                <Tag color="#4D3F54">
                                {quizStatus==="Running"?
                                <p style={{color:'Turquoise'}} id={this.props.quizNumber} onClick={this.retakeQuiz}>Continue</p>
                                :
                                <p style={{color:'Turquoise'}} id={this.props.quizNumber} onClick={this.retakeQuiz}>Retake</p>
                                }
                                </Tag>
                                {quizStatus==="Running"?
                                <h3 style={{color:'Gold'}}>Saved</h3>
                                :
                                <h3 style={{color:'Gold'}}>{score} %</h3>
                                }
                                <Tag color="#4D3F54">
                                  <p style={{color:'Turquoise'}} id={this.props.quizNumber} onClick={this.showQuizModalPMP}>View</p>
                                </Tag>
                              </div>
                              <div>
                                <Icon style={{cursor:'pointer'}} type="close" onClick={this.showRemoveModal}  />
                              </div>

                          </div>

                      </div>
                      {this.state.showNewModal?
                        <div className='historyModal'>
                          <QuizDetails
                                quizDetails = {quizDetails}
                                PMPBaseQuizSet = {this.props.PMPBaseQuizSet}
                                handleCancel = {this.handleModalClose}
                            />
                          </div>
                          :null
                          }
                  </div>
                )

  }

}

export default historyDetailsModel

// {this.renderModal(title)}
