import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';
import LandingPage from '..//src/components/landing/landing';
import CoursePage from '..//src/components/menu/coursePage';
import PMPMenuPage from '..//src/components/menu/pmpMenuPage';
import PMPLearnPage from '..//src/components/menu/pmpLearnPage';
import CountPage from '..//src/components/questions/countPage';
import QuestType1 from '..//src/components/questions/questType1';
import QuestType5 from '..//src/components/questions/questType5';
import Header from '..//src/components/header/header';
import ResultPage from '..//src/components/menu/resultPage';
import HeaderQuiz from '..//src/components/header/headerQuiz';
import './App.css';
import _ from 'lodash';
import axios from 'axios';
import {Progress} from 'antd';
import Request from 'superagent';



let moment = require('moment')
class mainPage extends Component {

  constructor(props) {
    super(props);


    this.state = {
      pageId : "landingPage",
      totalQuestions : 0,
      currentQuestionNum : 0,
      typeCounts : [],
      subIndex : null,
      lessonIndex : null,
      selClass : null,
      selSubject : null,
      selLesson : null,
      quizStatus : 'none',
      groupSetFetched : false,
      quizSet : [],
      baseQuizSet : [],
      quizDetails: null,
      correctAnsIndex: [],
      selectedAns: [],
      selectedAnsIndex: [],
      variableValues: [],
      ansInd : [],
      classList : [],
      subList : [],
      lessonList : [],
      refreshTo : null,
      resultData : [],
      score : 0,
      dataObject : {
        q_no : null,
        answerInd : null,
        question : null,
        answer : null,
        yourAns : null,
      },
      userProfile : null,
      userPackage : null,
      userLoggedIn : false,
      // userId : null,
      // userName : null,
      // emailId : null,
      // profilePic : null,
      userQuizHistory : null,
      quizIdRunning : null,
      userQuizData : null,
      userSavedQuizData : null,
      questionArray : [],
      selectedGroupSet : null,
      muteVoice : false,
      gotPMPQuestions : false,
      boardSelected : null,
    }
  }


  googleSuccess = (response) => {

    let loginTime = moment().format()
    console.log("google response", response.profileObj);
    localStorage.setItem('emailId',response.profileObj.email);
    localStorage.setItem('userId',response.profileObj.googleId);
    localStorage.setItem('userName',response.profileObj.name);
    localStorage.setItem('imageUrl',response.profileObj.imageUrl);

    console.log("localStorage.profile", localStorage.profile);
    if (response.profileObj.email) {
      this.getUserProfile(response.profileObj)
    }

    this.setState({
      pageId : "coursePage",
      userLoggedIn : true,
    })

  }

  googleError = (response) => {

    let loginTime = moment().format()

    localStorage.setItem('profile',response.profileObj)

    this.setState({

      userLoggedIn : false,
    })

  }

  registerUser = (profileObj) => {
    console.log("inside registerUser");
    let registeredDate = moment().format()
    let userId = localStorage.userId;
    let userName = localStorage.userName;
    let userEmail = localStorage.emailId;
    let imageUrl = localStorage.imageUrl;

    let targetUrl = "http://prem2282.pythonanywhere.com/api/UserDetails/create"

    // let targetUrl = 'http://127.0.0.1:8000/api/UserDetails/create';
    axios.post(targetUrl, {
      userId: userId,
      userName: userName,
      userEmail: userEmail,
      imageUrl: imageUrl,
      registeredDate:registeredDate,
      loginTime:registeredDate,
    })
    .then(res => {
      this.setState({
        userProfile: profileObj,
        userLoggedIn: true,
        pageId : "coursePage",
      })
    })
    .catch(err => {
      this.setState({
        userProfile: null,
        userLoggedIn: false,
        pageId: "landingPage",
      })

    })


  }
  getUserProfile = (profileObj) => {

    console.log("getting user profile:" , profileObj);
    console.log("profile userId", profileObj.userId);
    let targetUrl = 'http://prem2282.pythonanywhere.com//api/UserDetails/'

    axios.get(targetUrl, {params:
      {userId: profileObj.userId}
    })
    .then(res => {
      this.saveUserProfile(res.data[0]);
      this.getUserQuizHistory(profileObj.userId);
      console.log("res:", res);
      if (res.data.length===0) {
        console.log("going to registerUser");
        this.registerUser(profileObj)
      }
    })
    .catch(err => {
      console.log("err:", err);
    })

  }

  getUserSavedLocally = (userId) => {

    let targetUrl = 'http://prem2282.pythonanywhere.com/api/UserDetails/'

    axios.get(targetUrl, {params:
      {userId: userId}
    })
    .then(res => {
      this.saveUserProfile(res.data[0]);
      this.getUserQuizHistory(userId);
      this.getUserPackage(userId);
      this.goBackToCourse();
    })
    .catch(err => {

    })

  }

  saveUserPackage = (userPackage) => {
    this.setState({
      userPackage : userPackage,
    })
  }
  getUserPackage = (userId) => {
    let targetUrl = 'http://prem2282.pythonanywhere.com/api/UserPackage/'
    axios.get(targetUrl, {params: {userId:userId} })
    .then(res => {
      this.saveUserPackage(res.data[0].packageId)
    })
    .catch(err => {

    })
  }
  saveUserProfile = (userProfile) => {
    this.setState({
      userProfile : userProfile,
      userLoggedIn : true,
    })
  }

  componentWillMount = () => {

    // this.getGroupSet();

    if (localStorage.userId) {
      this.getUserSavedLocally(localStorage.userId)
    }

  }

  resetQuizDetails = () => {

    this.setState({
      pageId : "coursePage",
      totalQuestions : 0,
      currentQuestionNum : 0,
      typeCounts : [],
      subIndex : null,
      lessonIndex : null,
      selClass : null,
      selSubject : null,
      selLesson : null,
      quizStatus : 'none',
      groupSetFetched : false,
      quizSet : [],
      // baseQuizSet : [],
      quizDetails: null,
      correctAnsIndex: [],
      selectedAnsIndex: [],
      variableValues: [],
      ansInd : [],
      classList : [],
      subList : [],
      lessonList : [],
      refreshTo : null,
      resultData : [],
      score : 0,
      dataObject : {
        q_no : null,
        answerInd : null,
        question : null,
        answer : null,
        yourAns : null,
      },
      // userProfile : null,
      // userId : null,
      // userName : null,
      // emailId : null,
      // profilePic : null,
      // userQuizHistory : null,
      quizIdRunning : null,
      // userQuizData : null,
      // userSavedQuizData : null,
      questionArray : [],
      selectedGroupSet : null,
      // muteVoice : false,
      // gotPMPQuestions : false,
      boardSelected : null,
    })
  }

  goToHome = () => {
    this.resetQuizDetails();
  }

  goBackToCourse = () => {
    this.setState({
      pageId: "coursePage"
    })
  }

  checkUserForQuiz = (groupId,quizStatus) => {

      console.log("groupId:",groupId);

      let userId = this.state.userProfile.userId;

      let targetUrl = 'http://prem2282.pythonanywhere.com/api/UserQuiz/';
      axios.get(targetUrl, {params: {
        userId: userId,
        groupId: groupId,
        quizStatus: quizStatus,
      }})
      .then(res => {

                console.log(res.data);
        if (res.data.length>0) {

          if (res.data[0].quizStatus === 'Completed') {
            console.log("completed quiz found:",res.data[0] );
            this.setState({
              userQuizData: res.data[0],
            })
          } else {
            console.log("saved quiz found:",res.data[0] );
            this.setState({

              userSavedQuizData: res.data[0],
            })
          }
        }
      })
      .catch(err => {
        console.log(err);
      })

  }

  pmpStartQuiz = (quizSet,groupId) => {

    if (this.state.userLoggedIn) {
      this.checkUserForQuiz(groupId,'Completed');
      this.checkUserForQuiz(groupId,'Running');
    }
    this.setState({
      quizSet: quizSet,
      quizIdRunning: groupId,
      pageId: "refresh",
      refreshTo: "countPage",
    })
  }

  logOut = () => {
    localStorage.removeItem('profile')
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('emailId')
    localStorage.removeItem('imageUrl')



    this.resetQuizDetails();
    this.setState({
      userProfile: null,
      pageId: "landingPage",
    })
  }

  getPMPQuestionsApi = () => {
      console.log("get PMP // QUESTION: ");
    let targetUrl = 'http://prem2282.pythonanywhere.com/api/PMPQuestionList/';
    if (!this.state.gotPMPQuestions) {
      axios.get(targetUrl)
      .then(res => {
        console.log("response is good");
        this.setState({
          baseQuizSet: res,
          gotPMPQuestions: true,
          // pageId : "pmpMenuPage",
        })
      })

    }



  }
  pmpQuiz = () => {

    this.setState({
      pageId: "pmpMenuPage",
    })

  }


  pmpLearn = () => {

      this.setState({
        pageId: "pmpLearnPage",
      })

  }


  getUserQuizHistory = (userId) => {

    let targetUrl = 'http://prem2282.pythonanywhere.com/api/UserQuiz';


      axios.get(targetUrl,{
        params: {userId: userId}
      })
      .then(res => {
        this.setState({
          userQuizHistory: res,
        })
      })

  }

  countEnded = () => {
    this.setState({
      pageId : "refresh",
      refreshTo : "loadQuestion"
    })
  }

  questTypeCheck = () => {
    let questionNum = this.state.currentQuestionNum;
    console.log("questionNum:",questionNum);
    console.log("this.state.quizSet:",this.state.quizSet);
    let questionType = Number(this.state.quizSet[questionNum].QuestionType);
    switch (questionType) {
      case 1:
        return (<div>{this.questType1render()}</div>);
        break;

      case 5:
        return (<div>{this.questType5render()}</div>);
        break;

      default:
        return (<div>{this.questType1render()}</div>);
        break;
    }
  }

  choiceSelectedType1 = (clickedIndex) => {
    let selectedAnsIndex = [...this.state.selectedAnsIndex]
    selectedAnsIndex[this.state.currentQuestionNum] = clickedIndex;
    let variableValues = [...this.state.variableValues];
    variableValues[this.state.currentQuestionNum] =  null;
    this.setState({
      selectedAnsIndex: selectedAnsIndex,
      variableValues: variableValues,
    })
    this.nextQuestion();

  }

  correctAnsChoice = () => {
    const questionNum = this.state.currentQuestionNum;
    // const correctAns = [...this.state.correctAns];
    const correctAnsIndex = [...this.state.correctAnsIndex];

    let correctAnswer = null;
    let correctAnswerIndex = null;

    if (this.state.quizSet[questionNum].answer_1_ind === true) {
      correctAnswer = this.state.quizSet[questionNum].answer_1;
      correctAnswerIndex = "0";
    }
    if (this.state.quizSet[questionNum].answer_2_ind === true) {
      correctAnswer = this.state.quizSet[questionNum].answer_1;
      correctAnswerIndex = "1";
    }
    if (this.state.quizSet[questionNum].answer_3_ind === true) {
      correctAnswer = this.state.quizSet[questionNum].answer_1;
      correctAnswerIndex = "2";
    }
    if (this.state.quizSet[questionNum].answer_4_ind === true) {
      correctAnswer = this.state.quizSet[questionNum].answer_1;
      correctAnswerIndex = "3";
    }

    // correctAns[questionNum] = correctAnswer;
    correctAnsIndex[questionNum] = correctAnswerIndex;

    this.setState({
      // correctAns: correctAns,
      correctAnsIndex: correctAnsIndex,
    })

  }

  checkAnswers = () => {

    let resultData = [];
    let ansInd = [];
    let ansI = null;

    let dataObject = {
      q_no: null,
      answerInd: null,
      question: null,
      answer : null,
      yourAns : null,
    }
    for (let i = 0; i < this.state.quizSet.length; i++) {

      let correctAns = _.trim(_.lowerCase(this.state.correctAnsIndex[i]));
      let selectedAns = _.trim(_.lowerCase(this.state.selectedAnsIndex[i]));

      if (correctAns === selectedAns) {
        ansInd.push(true);
        ansI = true;
      } else {
        ansInd.push(false);
        ansI = false;
      }

      dataObject.q_no = i+1;
      dataObject.ansInd = (ansI?"Y":"X")
      dataObject.question = this.state.quizSet[i].Question;
      dataObject.answer = correctAns;
      dataObject.yourAns = selectedAns;

      let dataObjectNew = {...dataObject}
      resultData.push(dataObjectNew);

    }
    this.setState({
      resultData: resultData,
    })
    return(ansInd);
  }

  findMarks = () => {
    let myMarks = 0;
    let totalMarks = 0;

    for (let i = 0; i < this.state.quizSet.length; i++) {
      let correctAns = _.trim(_.lowerCase(this.state.correctAnsIndex[i]));
      let selectedAns = _.trim(_.lowerCase(this.state.selectedAnsIndex[i]));
      totalMarks = totalMarks + this.state.quizSet[i].marks;
      console.log("correctAns:",correctAns);
      console.log("selectedAns:",selectedAns);
      if (correctAns === selectedAns) {
        myMarks = myMarks + this.state.quizSet[i].marks;

      }

    }
    let score = Math.round((myMarks/totalMarks)*100);
    return(score);
  }

  addUserQuiz = (userQuizDetails) => {
    let moment = require('moment')
    let updatedTime = moment().format();
    let targetUrl =  'http://prem2282.pythonanywhere.com/api/UserQuiz/create';

    let updated = false;

    axios.post(targetUrl, {
      userId: userQuizDetails.userId,
      groupId: userQuizDetails.groupId,
      questionSet: userQuizDetails.questionSet,
      answerSet: userQuizDetails.answerSet,
      variableSet: userQuizDetails.variableSet,
      selectedAnsIndex: userQuizDetails.selectedAnsIndex,
      score: userQuizDetails.score,
      updatedTime: updatedTime,
      quizStatus: userQuizDetails.quizStatus,

    })
    .then (res => {
      updated = true;
      this.getUserQuizHistory(localStorage.userId);
      if (userQuizDetails.quizStatus == 'Running') {
        this.checkUserForQuiz(userQuizDetails.groupId, 'Running');
      }
    })
    .catch(err => {
      updated = false;
    })
    return(updated);
  }


  updateUserQuiz = (userQuizDetails) => {
      let moment = require('moment')
      let updatedTime = moment().format();
      let targetUrl =  'http://prem2282.pythonanywhere.com/api/UserQuiz/edit/' + userQuizDetails.userQuizId;

      let updated = false;

      axios.put(targetUrl, {
        userId: userQuizDetails.userId,
        groupId: userQuizDetails.groupId,
        questionSet: userQuizDetails.questionSet,
        answerSet: userQuizDetails.answerSet,
        variableSet: userQuizDetails.variableSet,
        selectedAnsIndex: userQuizDetails.selectedAnsIndex,
        score: userQuizDetails.score,
        updatedTime: updatedTime,
        quizStatus: userQuizDetails.quizStatus,

      })
      .then (res => {
        updated = true;
        this.getUserQuizHistory(localStorage.userId);
      })
      .catch(err => {
        updated = false;
      })
      return(updated);
    }


  removeQuizHistory = (quizId) => {

    let targetUrl = 'http://prem2282.pythonanywhere.com/api/UserQuiz/delete' + quizId;

    axios.delete(targetUrl)
    .then(res => {
      console.log("Quiz deleted");
    })
    .catch(err => {
      console.log("error:", err);
    })

  }
  saveQuizDetails = (answerSet, score) => {
    let questionSet = [];
    for (var i = 0; i < this.state.quizSet.length; i++) {
      questionSet.push(this.state.quizSet[i].id)
    }
    questionSet = _.toString(questionSet);
    let answerSetNew = answerSet.map((answer, i) => {
      if (answer) {
        return 1
      } else {
        return 0
      }
    })

    let userQuizId = null;
    if (this.state.userQuizData) {
      userQuizId = this.state.userQuizData.id
    }

    let quizDetails = {
      userQuizId: userQuizId,
      userId : localStorage.userId,
      groupId : this.state.quizIdRunning,
      questionSet: questionSet,
      answerSet : _.toString(answerSetNew),
      variableSet : _.toString(this.state.variableValues),
      selectedAnsIndex: _.toString(this.state.selectedAnsIndex),
      score: score,
      quizStatus: "Completed"
    }

    if (this.state.userSavedQuizData) {
      this.removeQuizHistory(this.state.userSavedQuizData.id)
    }

    if(quizDetails.userQuizId) {
      this.updateUserQuiz(quizDetails);
    } else {
      this.addUserQuiz(quizDetails);
    }

    this.setState({
      quizDetails: quizDetails
    })

  }

  beforeResultProcess = () => {
    const ansInd = this.checkAnswers();
    const score = this.findMarks();

    this.saveQuizDetails(ansInd, score);
    this.setState(
      {
        ansInd : ansInd,
        score: score,
        quizStatus: 'completed',
        pageId: 'result',
      }
    )
  }
  nextQuestion = () => {
    let questionNum = this.state.currentQuestionNum;
    let questionType = Number(this.state.quizSet[questionNum].QuestionType);

    this.correctAnsChoice();

    if (questionNum === this.state.totalQuestions - 1) {
      const selectedChoices = [false,false,false,false,false,false];
      const correctChoices = [false,false,false,false,false,false];
      this.setState({
        quizStatus: 'completed',
        pageId : 'beforeResult',
        selectedChoices: selectedChoices,
        correctChoices: correctChoices,
      })
    } else {
      const selectedChoices = [false,false,false,false,false,false];
      const correctChoices = [false,false,false,false,false,false];
      this.setState({
        currentQuestionNum: this.state.currentQuestionNum + 1,
        pageId : 'refresh',
        refreshTo: 'questTypeCheck',
        selectedChoices: selectedChoices,
        correctChoices: correctChoices,
      })
    }

  }
  choiceSelected = (event) => {
    const choiceClicked = event.target.textContent;
    let clickedIndex = event.target.id;
    const ansBoxClass = ['answerBoxType1','answerBoxType1','answerBoxType1','answerBoxType1'];
    ansBoxClass[clickedIndex] = 'answerBoxSel';
    const selectedAns = [...this.state.selectedAns];
    const selectedAnsIndex = [...this.state.selectedAnsIndex];
    selectedAns[this.state.currentQuestionNum]=choiceClicked;
    selectedAnsIndex[this.state.currentQuestionNum]=clickedIndex;

    let variableValues = [...this.state.variableValues];
    variableValues[this.state.currentQuestionNum] = null;
    this.setState({
      selectedAns:selectedAns,
      variableValues: variableValues,
      ansBoxClass: ansBoxClass,
    });

  }

  saveIncompleteQuiz = () => {

  }
  questType1render = () => {
    const questionNum = this.state.currentQuestionNum + 1;
    const currentQuestionNum = this.state.currentQuestionNum;

    return (
        <QuestType1
          quiz = {this.state.quizSet[currentQuestionNum]}
          questionNum = {questionNum}
          selected = {this.choiceSelectedType1}
          clicked = {this.choiceSelected}
          questionBoxClass = "questionBox"
          saveQuiz = {this.saveIncompleteQuiz}
          selectedAns = {this.state.selectedAns[currentQuestionNum]}
          muteVoice = {this.state.muteVoice}
        />
    )
  }

  questType5render = () => {
    const questionNum = this.state.currentQuestionNum + 1;
    const currentQuestionNum = this.state.currentQuestionNum;

    return (
      <div className = "App">
        <QuestType5
          quiz = {this.state.quizSet[currentQuestionNum]}
          questionNum = {questionNum}
          filledText = {this.filledText}
          nextButton = {this.Q5answered}
          muteVoice = {this.state.muteVoice}
        />
      </div>
    )
  }

  Q5answered = (Q5return) => {

    console.log("Q5return:",Q5return);
    const questionNum = this.state.currentQuestionNum;
    const correctAnsIndex = [...this.state.correctAnsIndex];
    const selectedAnsIndex = [...this.state.selectedAnsIndex];

    correctAnsIndex[questionNum] = Q5return.rightAns;
    selectedAnsIndex[questionNum] = Q5return.selectedAns;
    let variableValues = [...this.state.variableValues];
    variableValues[questionNum] = Q5return.varValues;

    this.setState({
                    selectedAnsIndex: selectedAnsIndex,
                    variableValues: variableValues,
                    correctAnsIndex: correctAnsIndex,
    })

    this.nextQuestion();

  }

  loadQuestion = () => {
    let totalQuestions = this.state.quizSet.length

    this.setState(
      {
        pageId: 'questTypeCheck',
        quizStatus: 'started',
        totalQuestions: totalQuestions
      }
    )
  }

  landingPageRender = () => {
    return(
      <LandingPage
        success = {this.googleSuccess}
        error = {this.googleError}
      />
    )

  }


  coursePageRender = () => {
    return(
      <div>
        <Header
          homeButton = {this.goToHome}
          logOutButton = {this.logOut}
          pageLoaded = "CoursePage"
          profile = {this.state.userProfile}
        />
        <CoursePage
          pmpQuiz = {this.pmpQuiz}
          pmpLearn = {this.pmpLearn}
        />
    </div>
    )

  }

  pmpLearnPageRender = () => {
    return(
      <div>
        <PMPLearnPage
            homeButton = {this.goToHome}
            logOutButton = {this.logOut}
            pageLoaded = "pmpLearnPage"
            userProfile = {this.state.userProfile}
            backButton= {this.goBackToCourse}
          />
    </div>
    )
  }

  pmpMenuPageRender = () => {
    return(
      <div>
      <PMPMenuPage
          baseQuizSet = {this.state.baseQuizSet.data}
          backButton= {this.goBackToCourse}
          setSelected={this.pmpStartQuiz}
          userQuizHistory={this.state.userQuizHistory}
          homeButton = {this.goToHome}
          logOutButton = {this.logOut}
          pageLoaded = "pmpMenuPage"
          userProfile = {this.state.userProfile}
          userPackage = {this.state.userPackage}
          userQuizHistory = {this.state.userQuizHistory}
        />
    </div>
    )

  }

  countPageRender = () => {
    return (
      <div>
        <Header
          homeButton = {this.goBackToCourse}
          logOutButton = {this.logOut}
          pageLoaded = "CoursePage"
          profile={this.state.userProfile}
        />
        <CountPage
          countEnded={this.countEnded}
        />
    </div>
    )
  }

  resultRender = () => {

    return(
      <div>
        <Header
            homeButton= {this.goToHome}
            logOutButton={this.logOut}
            quizOn={false}
            profile={this.state.userProfile}
            pageLoaded="ResultPage"
          />
        <ResultPage
          selected= {this.selectionResult}
          correctAns={this.state.correctAnsIndex}
          variableValues={this.state.variableValues}
          selectedAnsIndex={this.state.selectedAnsIndex}
          ansInd={this.state.ansInd}
          questionArray={this.state.quizSet}
          score={this.state.score}
          retakeQuiz={this.retakeQuizFromResult}
          quizDetails = {this.state.quizDetails}
          PMPBaseQuizSet = {this.state.baseQuizSet.data}
        />
    </div>
    )
  }
  refreshRender = (refreshTo) => {
    this.setState({pageId: refreshTo})
    return (
      <div></div>
    )
  }



  render() {

        switch (this.state.pageId) {

          case 'landingPage':
          this.getPMPQuestionsApi();
          return(
            this.landingPageRender()
          )

            break;

          case "coursePage":
          return (
            this.coursePageRender()
          )

            break;

          case "pmpMenuPage":
          return (
            this.pmpMenuPageRender()
          )

            break;

          case "pmpLearnPage":
          return (
            this.pmpLearnPageRender()
          )

          case "countPage":
          return (
            this.countPageRender()
          )

            break;
          case "beforeResult":
          this.beforeResultProcess();
          return (
            <div>
            </div>
          )

            break;

          case "result":
          return (
            this.resultRender()
          )

            break;

          case "refresh":
          return (
            this.refreshRender(this.state.refreshTo)
          )
            break;
          case "loadQuestion":
          this.loadQuestion()
          return (
            <div></div>
          )
          break;
          case 'questTypeCheck':
            const questionNum = this.state.currentQuestionNum + 1;
            const currentQuestionNum = this.state.currentQuestionNum;

            let now = Number((currentQuestionNum/this.state.totalQuestions)*100);
            let progLabel = questionNum + " of " + this.state.totalQuestions;

            return(
              <div>
                <div>
                  <HeaderQuiz
                    quizOn={true}
                    saveQuiz={this.saveAndQuit}
                    homeButton={this.goToHome}
                    logOutButton={this.logout}
                    timeUp = {this.nextQuestion}
                    profile={this.state.userProfile}
                    muteVoiceToggle={this.muteVoiceToggle}
                    muteVoice={this.state.muteVoice}
                    progLabel={progLabel}
                  />
                </div>
                <Progress showInfo={false} percent={now} style={{backgroundColor:'#444'}} status='active' />
                {this.questTypeCheck()}
              </div>
            )

          default:

        }
  }
}
export default mainPage;
