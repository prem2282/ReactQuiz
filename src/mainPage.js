import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';
import LandingPage from '..//src/components/landing/landing';
import CoursePage from '..//src/components/menu/coursePageNew';
import PMPMenuPage from '..//src/components/menu/pmpMenuPage';
import PMPLearnPage from '..//src/components/menu/pmpLearnPage';
import CountPage from '..//src/components/questions/countPage';
import QuestType1 from '..//src/components/questions/questType1';
import QuestType5 from '..//src/components/questions/questType5';
import Header from '..//src/components/header/header';
import PMPHeader from '..//src/components/header/headerPMP';
import ResultPage from '..//src/components/menu/resultPage';
import HeaderQuiz from '..//src/components/header/headerQuiz';
import HistoryPage from '..//src/components/menu/historyPage';
import LoadingPage from '..//src/components/menu/loadingPage';
import './App.css';
import _ from 'lodash';
import axios from 'axios';
import {Progress, Affix, message} from 'antd';
import Request from 'superagent';
const url = require('url');

// const groupingUrl = 'https://prem2282.pythonanywhere.com/api/Grouping/'
// const PMPQuestionListUrl = 'https://prem2282.pythonanywhere.com/api/PMPQuestionList/'
// const QuestionListUrl = 'https://prem2282.pythonanywhere.com/api/QuestionList/'

const groupingUrl = 'http://127.0.0.1:8000/api/Grouping/'
const PMPQuestionListUrl = 'http://127.0.0.1:8000/api/PMPQuestionList/'
const QuestionListUrl = 'http://127.0.0.1:8000/api/QuestionList/'

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
      groupSet : null,
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
      loginSelected: false,
      userLoggedIn : false,
      userLocation : null,
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
    }
  }

  facebookResp = (response) => {

        let loginTime = moment().format()
        console.log("facebook response", response);
        localStorage.setItem('emailId',response.email);
        localStorage.setItem('userId',response.id);
        localStorage.setItem('userName',response.name);
        localStorage.setItem('imageUrl',response.picture.data.url);

        let profileObj = {
          email : localStorage.emailId,
          userId : localStorage.userId,
          userName: localStorage.userName,
          imageUrl: localStorage.imageUrl,
          loginFrom: 'facebook',

        }

        if (localStorage.userId) {
          this.getUserProfile(profileObj);
        }
        // window.location.href = "http://localhost:3000"
        const url = require('url');

        let urlDetails = window.location.href;
        console.log("urlDetails:",urlDetails);

        let url_parts = url.parse( urlDetails, true),
          responseData = url_parts.query;
        console.log("responseData:",responseData);

        let loadUrl = 'https://' +  url_parts.hostname
        window.location.href = loadUrl

  }

  guestLogin = () => {
    this.setState({

      userLoggedIn : false,
      loginSelected: true,
      pageId : 'landingPage',
    })
  }

  googleSuccess = (response) => {

    let loginTime = moment().format()
    console.log("google response", response.profileObj);
    localStorage.setItem('emailId',response.profileObj.email);
    localStorage.setItem('userId',response.profileObj.googleId);
    localStorage.setItem('userName',response.profileObj.name);
    localStorage.setItem('imageUrl',response.profileObj.imageUrl);

    let profileObj = {
      email : localStorage.emailId,
      userId : localStorage.userId,
      userName: localStorage.userName,
      imageUrl: localStorage.imageUrl,
      loginFrom: 'google',

    }

    if (response.profileObj.googleId) {
      this.getUserProfile(profileObj)
    }

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

    let targetUrl = "https://prem2282.pythonanywhere.com/api/UserDetails/create"

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
        loginSelected: true,
        pageId : "landingPage",
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


    let targetUrl = 'https://prem2282.pythonanywhere.com//api/UserDetails/'

    axios.get(targetUrl, {params:
      {userId: localStorage.userId}
    })
    .then(res => {
      this.saveUserProfile(res.data[0]);
      this.getUserQuizHistory(localStorage.userId);
      this.getUserPackage(localStorage.userId);

      console.log("res:", res);
      if (res.data.length===0) {
        console.log("going to registerUser");
        this.registerUser(profileObj)
      } else {
        this.setState({
          pageId : "landingPage",
          userLoggedIn : true,
          loginSelected: true,
        })
      }
    })
    .catch(err => {
      console.log("err:", err);
    })

  }

  getUserSavedLocally = (userId) => {

    let targetUrl = 'https://prem2282.pythonanywhere.com/api/UserDetails/'

    axios.get(targetUrl, {params:
      {userId: userId}
    })
    .then(res => {
      this.saveUserProfile(res.data[0]);
      this.getUserQuizHistory(userId);
      this.getUserPackage(userId);
      this.goBackToLanding();
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
    let targetUrl = 'https://prem2282.pythonanywhere.com/api/UserPackage/'
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
      loginSelected: true,
    })
  }


  getUserLocation = () => {

    let targetUrl = 'http://ip-api.com/json';

      if (!this.state.userLocation) {
        axios.get(targetUrl,{
        })
        .then(res => {
          this.setState({
            userLocation:  res.data
          })
          console.log(res);
        })
        .catch(err => {
          console.log("error:", err);
          this.setState({
            userLocation:  null
          })
        })
      }


  }

  componentDidMount = () => {
    window.history.pushState(null,document.title,window.location.href);
    window.addEventListener('popstate',function(event){
      window.history.pushState(null,document.title,window.location.href);
    })
  }

  componentWillMount = () => {

    // this.getUserLocation();

    if (localStorage.userId) {
      this.getUserSavedLocally(localStorage.userId)
    }
    if (!this.state.gotPMPQuestions) {
      this.getPMPQuestionsApi();
      this.getGroupSet();
    }

  }

  resetQuizDetails = () => {

    this.setState({

      totalQuestions : 0,
      currentQuestionNum : 0,
      typeCounts : [],
      subIndex : null,
      lessonIndex : null,
      selClass : null,
      selSubject : null,
      selLesson : null,
      quizStatus : 'none',
      quizSet : [],
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
      quizIdRunning : null,
      questionArray : [],
      selectedGroupSet : null,
      boardSelected : null,
      pageId : "landingPage",
    })
  }

  goToHome = () => {
    console.log("resetQuizDetails");
    this.setState({
      pageId: "refresh",
      refreshTo: "landingPage",
    })
    this.resetQuizDetails();
  }

  goBackToCourse = () => {
    this.setState({
      pageId: "coursePage"
    })
  }

  goBackToLanding = () => {
    this.setState({
      pageId: "landingPage"
    })
  }

  goToHistoryPage = () => {

    console.log("Quiz History Clicked");
    this.setState(
      {
        pageId : "historyPage"
      }
    )
  }

  checkUserForQuiz = (groupId,quizStatus) => {

      console.log("groupId:",groupId);

      let userId = this.state.userProfile.userId;

      let targetUrl = 'https://prem2282.pythonanywhere.com/api/UserQuiz/';
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
      userQuizHistory: null,
      userPackage: null,
      userQuizData: null,
      pageId: "landingPage",
      userLoggedIn: false,
      loginSelected: false,
    })
  }

  startQuiz = (quizSet,groupId) => {

    if (this.state.userLoggedIn) {
      this.checkUserForQuiz(groupId,'Completed');
      this.checkUserForQuiz(groupId,'Running');
    }
    this.setState({
      quizSet: quizSet,
      groupSetFetched: true,
      quizIdRunning: groupId,
      pageId: "refresh",
      refreshTo: "countPage",
    })

  }

  selectedGroup = (group) => {
    this.setState({
      pageId: "loading",
      selectedGroupSet: group
    })
    console.log("selectedGroup",group);
      // let targetUrl = 'https://prem2282.pythonanywhere.com/api/QuestionList/';
      let targetUrl = QuestionListUrl;
      let groupId = group.id
      axios.get(targetUrl, {params:{
        category:group.category,
        board: group.board,
        standard: group.standard,
        subject: group.subject,
        lessonNum: group.lessonNum,
      }})
      .then(res => {
        console.log("quizset is here");
        if (res.data.length > 0) {
                this.startQuiz(res.data,groupId)
        } else {
          message.warning('This is not yet ready. Please check back later');
          this.goBackToLanding();
        }

      })

  }
  getGroupSet = () => {
      // let targetUrl = 'https://prem2282.pythonanywhere.com/api/Grouping/';

      let targetUrl = groupingUrl;

      if (!this.state.groupSetFetched) {
        axios.get(targetUrl)
        .then(res => {
          console.log("response is good");
          this.setState({
            groupSet: res,
            groupSetFetched: true,
            // pageId : "pmpMenuPage",
          })
        })
      }
  }

  getPMPQuestionsApi = () => {
      console.log("get PMP // QUESTION: ");

      let targetUrl = PMPQuestionListUrl

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

    let targetUrl = 'https://prem2282.pythonanywhere.com/api/UserQuiz';


      axios.get(targetUrl,{
        params: {userId: userId}
      })
      .then(res => {
        this.setState({
          userQuizHistory: res.data,
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
    console.log("inside correctAnsChoice");
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
    console.log("3correctAnsIndex:",correctAnsIndex);
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

      console.log("Question:", i);
      console.log("correctAns:" , correctAns);
      console.log("selectedAns: ", selectedAns);
      if (correctAns === selectedAns) {
        ansInd.push(true);
        ansI = true;
      } else {
        ansInd.push(false);
        ansI = false;
      }
      console.log("ansI: ", ansI);
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
    console.log("adding quiz details");
    let moment = require('moment')
    let updatedTime = moment().format();
    let targetUrl =  'https://prem2282.pythonanywhere.com/api/UserQuiz/create';

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
      let targetUrl =  'https://prem2282.pythonanywhere.com/api/UserQuiz/edit/' + userQuizDetails.userQuizId;

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

    let targetUrl = 'https://prem2282.pythonanywhere.com/api/UserQuiz/delete' + quizId;

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

    if (this.state.userProfile) {
      if (this.state.userSavedQuizData) {
        this.removeQuizHistory(this.state.userSavedQuizData.id)
      }

      if(quizDetails.userQuizId) {
        this.updateUserQuiz(quizDetails);
      } else {
        this.addUserQuiz(quizDetails);
      }
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

    if (questionType === 1) {
          this.correctAnsChoice();
    }


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
    console.log("correctAnsIndex:", this.state.correctAnsIndex);
    console.log("selectedAnsIndex:", this.state.selectedAnsIndex);
    let questionNum = this.state.currentQuestionNum;
    let correctAnsIndex = [...this.state.correctAnsIndex];
    let selectedAnsIndex = [...this.state.selectedAnsIndex];

    correctAnsIndex[questionNum] = Q5return.rightAns;
    selectedAnsIndex[questionNum] = Q5return.selectedAns;
    let variableValues = [...this.state.variableValues];
    variableValues[questionNum] = Q5return.varValues;
    console.log("2correctAnsIndex:", correctAnsIndex);
    console.log("2selectedAnsIndex:", selectedAnsIndex);
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

  landingBackButton = () => {
    console.log("landingBackButton");
    this.setState({
      loginSelected: false
    })
  }

  landingPageRender = () => {

    // if (this.state.gotPMPQuestions) {
      return(
        <div>
          <LandingPage
            success = {this.googleSuccess}
            error = {this.googleError}
            facebookResp = {this.facebookResp}
            guestLogin = {this.guestLogin}
            userProfile = {this.state.userProfile}
            userPackage = {this.state.userPackage}
            userLocation = {this.state.userLocation}
            pmpQuiz = {this.pmpQuiz}
            pmpLearn = {this.pmpLearn}
            historyPage = {this.goToHistoryPage}
            homeButton = {this.goToHome}
            logOut = {this.logOut}
            pageLoaded = "LandingPage"
            gotPMPQuestions = {this.state.gotPMPQuestions}
            loginSelected = {this.state.loginSelected}
            groupSet = {this.state.groupSet}
            selectedGroup = {this.selectedGroup}
            backButton = {this.landingBackButton}
            selectedGroupSet = {this.state.selectedGroupSet}
            userQuizHistory = {this.state.userQuizHistory}
          />

        </div>
      )
    // } else {
    //   return(
    //     <LoadingPage/>
    //   )
    //
    // }


  }


  coursePageRender = () => {

    if (this.state.gotPMPQuestions) {
      return(
        <div>
          <Affix offsetTop={0}>
            <Header
              homeButton = {this.goToHome}
              logOutButton = {this.logOut}
              pageLoaded = "CoursePage"
              profile = {this.state.userProfile}
              backButton = {this.goToHome}
              userPackage = {this.state.userPackage}
            />
          </Affix>
          <CoursePage
            pmpQuiz = {this.pmpQuiz}
            pmpLearn = {this.pmpLearn}
            historyPage = {this.goToHistoryPage}
            goBackToLanding = {this.goBackToLanding}
            userProfile = {this.state.userProfile}
          />
      </div>
      )

    } else {
      return(
        <LoadingPage/>
      )
    }

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

  retakeQuizFromHistory = (id, questionArray) => {
    id = id -1;
    console.log('id',id);
    console.log('questionArray',questionArray);
    let groupId = this.state.userQuizHistory[id].groupId;
    let questionSet = this.state.userQuizHistory[id].questionSet;
    questionSet = questionSet.split(',').map(Number);
    let quizSet = this.state.baseQuizSet.data.filter(quiz => questionSet.includes(Number(quiz.id)))

    this.setState({
      selectedAnsIndex: [],
      currentQuestionNum: 0,
      variableValues: [],
      quizIdRunning: groupId,
      quizSet : quizSet,
      userQuizData: this.state.userQuizHistory[id],
      pageId: "refresh",
      refreshTo: "countPage",
    })

  }
  retakeQuizFromResult = () => {
    if (this.state.userProfile) {
          this.checkUserForQuiz(this.state.quizIdRunning,'Completed');
    }


    let quizSet = this.state.quizSet;

    this.setState({
      quizSet : quizSet,
      selectedAnsIndex: [],
      variableValues: [],
      currentQuestionNum: 0,
      pageId : "refresh",
      refreshTo: "countPage",
    })
  }


  countPageRender = () => {
    return (
      <div>
        <CountPage
          countEnded={this.countEnded}
        />
    </div>
    )
  }

  resultRender = () => {

    return(
      <div>
        <Affix offsetTop={0}>
          <Header
            homeButton = {this.goToHome}
            logOutButton = {this.logOut}
            pageLoaded = "ResultPage"
            profile = {this.state.userProfile}
            goToHistoryPage = {this.goToHistoryPage}
          />
        </Affix>
        <ResultPage
          goBackToCourse= {this.resetQuizDetails}
          correctAns={this.state.correctAnsIndex}
          variableValues={this.state.variableValues}
          selectedAnsIndex={this.state.selectedAnsIndex}
          ansInd={this.state.ansInd}
          questionArray={this.state.quizSet}
          score={this.state.score}
          retakeQuiz={this.retakeQuizFromResult}
          quizDetails = {this.state.quizDetails}
          PMPBaseQuizSet = {this.state.baseQuizSet.data}
          homeButton= {this.goToHome}
          logOutButton={this.logOut}
          userProfile={this.state.userProfile}
          pageLoaded="ResultPage"
          backButton= {this.goBackToLanding}
          selectedGroupSet={this.state.selectedGroupSet}
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

  historyPageRender = () => {
    let headerText = 'Your Quiz Reports'
    return(
      <div>
        <Affix offsetTop={0}>
          <PMPHeader
            homeButton = {this.goToHome}
            logOutButton = {this.logOut}
            backButton={this.goBackToLanding}
            pageLoaded = "historyPage"
            profile={this.state.userProfile}
            headerText = {headerText}
          />
        </Affix>
        <HistoryPage
          quizList = {this.state.userQuizHistory}
          quizTopicData={this.state.groupSet}
          questionArray={this.state.questionArray}
          PMPBaseQuizSet={this.state.baseQuizSet.data}
          groupSet = {this.state.groupSet}
          backButton={this.goBackToLanding}
          userProfile={this.state.userProfile}
          removeQuizHistory={this.removeQuizFromHistory}
          retakeQuiz={this.retakeQuizFromHistory}
          homeButton = {this.goToHome}
          logOutButton = {this.logOut}
          />
      </div>
    )
  }

  render() {

    let urlDetails = window.location.href;
    console.log(urlDetails);

    let url_parts = url.parse( urlDetails, true),
      responseData = url_parts.query;
      console.log("url_parts:", url_parts);
      console.log("responseData:", responseData);
    console.log(responseData);

        switch (this.state.pageId) {

          case 'landingPage':
            // this.getPMPQuestionsApi();
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
          case "loading":
            return (
              <LoadingPage/>
            )
            break;
          case "loadQuestion":
            this.loadQuestion()
            return (
              <div></div>
            )
            break;
          case "historyPage":
            console.log("going to historyPage");
            return(
                this.historyPageRender()
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
                  <Affix offsetTop={0}>
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
                  </Affix>
                </div>
                <Progress showInfo={false} percent={now} style={{backgroundColor:'#444'}} status='active' />
                {this.questTypeCheck()}
              </div>
            )
            break;
          default:

        }
  }
}
export default mainPage;
