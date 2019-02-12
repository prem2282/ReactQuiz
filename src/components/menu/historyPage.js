import  React,{ Component } from 'react';
import { Affix, Button, Icon, Card, List } from 'antd';
import _ from 'lodash';
import './historyStyles.css';
import {Animated} from 'react-animated-css';
import Header from '../..//components/header/headerPMP';
// import GetQuestionsByQnum from '../..//components/apiCalls/getQuestionsByQnum';
// import SubjectMapping from '../..//components/constants/subjectMapping';
import Request from 'superagent';
import HistoryDetailsModel from './quizHistoryDetails';
import Delayed from '../..//components/header/delayed';
import { Row, Col } from 'antd';
import pmpPhaseMapping from '../..//components/constants/pmpPhaseMapping';
import pmpTypeMapping from '../..//components/constants/pmpTypeMapping';
const phaseList = ["I","P","E","M","C"];
const typeList = ['I','S','T','C','Q','H','CM','R','P'];



// <Button className="buttonBox" type="dashed" onClick={this.showDetails} ghost>Show Details</Button>
//const quizHistory = (props) => {
class historyPage extends Component {


    constructor (props) {
      super(props);

      this.state = {
        quizSet : [],
        completedQuizSet: [],
        savedQuizSet: [],
        questionArray : [...this.props.questionArray],
        quizList : [...this.props.quizList],
        showDetails : true,
        showCompleted : false,
        showSave : false,
        quizItem : {
          quizId : null,
          board : null,
          standard : null,
          subject : null,
          lessonNum : null,
          lessonName : null,
          questionNums : null,
          answers : [],
          score : 0,
          and_inds : null,
          variableSet : [],
          questionSet : null,
          selectedAnsIndex : null,
          listReceived : false,
        }
      }
    }

    showDetails = () => {
      if (!this.state.showDetails) {
        this.setState({
          showDetails : true
        })
      }
    }

    showCompleted = () => {
      this.setState({
        showCompleted : true,
        showSaved : false,
      })
    }

    showSaved = () => {
      this.setState({
        showCompleted : false,
        showSaved : true,
      })
    }


    retakeQuiz = (id, questionArray) => {
      this.props.retakeQuiz(id, questionArray);
    }

    removeQuizFromHistory = (i) => {

      this.props.removeQuizHistory(i);

    }


    componentWillMount = () => {

      let quizItem = {...this.state.quizItem};
      let quizSet = [];
      let groupSet = this.props.groupSet.data;

      for (let i = 0; i < this.state.quizList.length; i++) {

        quizItem.quizId = this.state.quizList[i].id ;
        let groupId = this.state.quizList[i].groupId ;
        // let quizStatus = this.state.quizList[i].quizStatus ;
        console.log("groupId:", groupId);

        let groupIdArray = groupId.split("-")
      console.log("groupIdArray:",groupIdArray);
        if (groupIdArray[0]=='PMP') {
            quizItem.board = 'PMP';
            if (groupIdArray[1]=='P') {
              quizItem.standard = "Phase"
              quizItem.subject = pmpPhaseMapping(groupIdArray[2]);
            } else if (groupIdArray[1]=='T') {
              quizItem.standard = "Process"
              quizItem.subject = pmpTypeMapping(groupIdArray[2]);
            } else if (groupIdArray[1]=='M') {
              quizItem.standard = "Type"
              quizItem.subject = 'Formula Based';
            } else if (groupIdArray[1]=='G') {
              quizItem.standard = "Type"
              quizItem.subject = 'Soft Skills';
            }
            // quizItem.subject = '';
            quizItem.lessonNum = groupIdArray[3];
            quizItem.lessonName = 'Set ' + groupIdArray[3];
        } else {
          console.log("groupSet:",groupSet);
          let group = _.filter(groupSet, function(group) {
                  return (group.id === Number(groupId)
                  )})
          console.log("group:",group);
          quizItem.board = group[0].board;
          quizItem.standard = group[0].standard;
          quizItem.subject = group[0].subject;
          quizItem.lessonNum = group[0].lessonNum;
          quizItem.lessonName = group[0].lessonName;
        }

        quizItem.ans_inds = this.state.quizList[i].answerSet;
        quizItem.variableSet = this.state.quizList[i].variableSet;
        quizItem.updatedTime = this.state.quizList[i].updatedTime;
        quizItem.questionNums = this.state.quizList[i].questionSet;
        quizItem.selectedAnsIndex = this.state.quizList[i].selectedAnsIndex;
        quizItem.score = this.state.quizList[i].score;
        quizItem.quizStatus = this.state.quizList[i].quizStatus ;


        let thisItem = {...quizItem};
        console.log("quizItem:", thisItem);
        quizSet.push(thisItem)

      }
      //
      // completedQuizSet =  _.filter(quizSet, function(group) {return (group.quizStatus === 'Complete')});
      // savedQuizSet = _.filter(quizSet, function(group) {return (group.quizStatus === 'Running')});

      this.setState({
        quizSet : quizSet,

      })

    }

    render() {

      console.log("this.state.quizSet:" , this.state.quizSet);
      console.log("this.state.questionArray:" , this.state.questionArray);

      // if (!this.state.showDetails) {
      //   this.setState({
      //     showDetails : true,
      //   })
      // }


      return (
           <div>

             <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
               <div>
                 {(this.state.showDetails)?
                   <div className="historyEmptyContainter">
                     {this.state.quizSet.length?
                       null:
                       <div>
                         <Delayed waitBeforeShow={500}>
                         <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
                           <h1 style={{color:'Gray'}}>You don't have any report card</h1>
                         </Animated>
                        </Delayed>
                        <Delayed waitBeforeShow={1500}>
                         <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                           <h2 style={{color:'Gray'}}>Your completed Quiz reports will appear here</h2>
                         </Animated>
                        </Delayed>
                       </div>

                     }

                      <div className="historyBoxContainter">
                        {
                          this.state.quizSet.map((quiz, i) => {
                              return(
                                <Delayed waitBeforeShow={i*100}>
                                  <Animated key={i} animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                    <HistoryDetailsModel key={i}
                                      quizTopic = {quiz}
                                      quizList = {this.state.quizList[i]}
                                      remove={this.removeQuizFromHistory}
                                      retakeQuiz={this.retakeQuiz}
                                      PMPBaseQuizSet={this.props.PMPBaseQuizSet}
                                      questionArray = {this.state.questionArray[i]}
                                      quizNumber = {i+1}
                                      groupSet = {this.props.groupSet}
                                      />
                                   </Animated>
                                 </Delayed>
                              )
                          })
                        }
                      </div>
                  </div>
                 :null
                 }
               </div>
            </Animated>
            </div>
       )
    }
}

export default historyPage
