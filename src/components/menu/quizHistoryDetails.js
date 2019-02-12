

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
import QuizDetails2 from './quizDetails2';
import Slide from 'react-reveal/Slide';

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
    removeVisible: false,
    modalName : null,
    groupIdClicked : null,
    showExplain : false,
    showNewModal: false,
    quizDetails: null,
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

    console.log("groupId:", groupId);
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

    } else {

      let questionSet = this.props.quizList.questionSet
      console.log("questionSet:",questionSet);
     let targetUrl = 'https://prem2282.pythonanywhere.com/api/QuestionList/'

     axios.get(targetUrl, {params:{
       questionSet:questionSet,
     }})
     .then(res => {
       console.log("quizset is here");

       this.setState({
         questionArray : res.data,
         visible: true,
         modalName : "quiz",
         groupIdClicked : groupId,
         showNewModal: true,
       })

     })
      // this.setState({
      //   questionArray : this.props.PMPBaseQuizSet,
      //   visible: true,
      //   modalName : "quiz",
      //   groupIdClicked : groupId,
      //   showNewModal: true,
      // })

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
      removeVisible: true,
      modalName: "remove"
    });
  }
  removeHandleOk = (e) => {
    this.setState({
      removeVisible: false,
    });
  }
  removeHandleCancel = (e) => {
    this.setState({
      removeVisible: false,
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
      removeVisible: false,
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
  //
  // renderModal =(title) => {
  //   if (this.state.modalName == "quiz") {
  //     // return this.renderQuizModal(title);
  //     return this.renderQuizDetailsModal();
  //   } else if (this.state.modalName == "remove") {
  //     return this.renderCloseModal();
  //   }
  // }
  //
  // renderQuizDetailsModal = () => {
  //
  //   let quizDetails = {
  //       questionSet :  this.props.quizTopic.questionNums,
  //       answerSet :  this.props.quizTopic.ans_inds,
  //       variableSet : this.props.quizTopic.variableSet,
  //       selectedAnsIndex : this.props.quizTopic.selectedAnsIndex,
  //       groupId: this.props.quizList.groupId,
  //     }
  //
  //   this.setState({
  //
  //     showNewModal: true,
  //     quizDetails: quizDetails,
  //   })
  //
  // }
  //

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
                console.log("groupSet",this.props.groupSet.data );
                console.log("quizList", this.props.quizList);
                let quizList = this.props.quizList;
                let selectedGroupSet = _.filter(this.props.groupSet.data, function(group) {
                  return (String(group.id) === quizList.groupId
                  )})
                  console.log("selectedGroupSet:", selectedGroupSet);

                let quizDetails = {
                    questionSet :  this.props.quizTopic.questionNums,
                    answerSet :  this.props.quizTopic.ans_inds,
                    variableSet : this.props.quizTopic.variableSet,
                    selectedAnsIndex : this.props.quizTopic.selectedAnsIndex,
                    groupId: this.props.quizList.groupId,
                  }


                return (
                  <Slide  bottom>
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
                          <div className = "historyModal">
                            <Modal
                              className="custom modalClass"
                              title={title}
                              visible={this.state.visible}
                              onOk={this.handleOk}
                              onCancel={this.handleCancel}
                              footer = {null}
                            >
                              <QuizDetails2
                                    quizDetails = {quizDetails}
                                    questionArray = {this.state.questionArray}
                                    handleCancel = {this.handleModalClose}
                                    selectedGroupSet = {selectedGroupSet[0]}
                                />
                            </Modal>
                          </div>
                        :null
                        }
                        {(this.state.modalName==='remove')?
                          <div className = "historyModal">
                            <Modal
                              className="custom modalClass"
                              title="Remove Quiz?"
                              visible={this.state.removeVisible}
                              onOk={this.removeQuizHistory}
                              onCancel={this.removeHandleCancel}
                            >
                            <h3 className="historyHeadText1">Your Quiz history of {title} {lessonName} will be removed. Are you sure?</h3>
                            </Modal>
                          </div>
                          :null
                        }

                    </div>
                  </Slide>
                )

  }

}

export default historyDetailsModel
