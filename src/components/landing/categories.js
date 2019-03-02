
import React, { Component } from 'react';
import { Button, Icon, Affix, Tag, Avatar,Collapse, Slider } from 'antd';
import {Animated} from 'react-animated-css';
import './landing.css';
import _ from 'lodash';
import Delayed from '../..//components/header/delayed';
import Slide from 'react-reveal/Slide';

const Panel = Collapse.Panel;
 let categoryList = [];
 let boardList = [];
 let standardList = [];
 let subjectList = [];
 let lessonList = [];
 let countList = [10,15,20,25];

 const panel1Text1 = " Select Lessons  "
 let panel1Text2 = "  All  "
 const panel2Text1 = " Number of Questions  "
 let panel2Text2 = "  All  "
 const panel3Text1 = " Select Types  "
 let panel3Text2 = "  All  "

class categories extends Component {

  constructor(props) {
    super(props);

    let   levelSelected = null;
    let      choiceSelected= null;
    let      categorySelected= null;
    let      boardSelected= null;
    let      standardSelected= null;
    let      subjectSelected= null;
    let      lessonSelected= null;
    let group = this.props.selectedGroupSet;
    let subGroupSet = null;

    console.log("group", group);

    if (this.props.selectedGroupSet) {
      levelSelected = 'subject';
      choiceSelected= group.subject;
      categorySelected= group.category;
      boardSelected= group.board;
      standardSelected= group.standard;
      subjectSelected= group.subject;
      subGroupSet = _.filter(this.props.groupSet.data, function(group) {
        return (group.category === categorySelected &&
                group.board === boardSelected &&
                group.standard === standardSelected &&
                group.subject === subjectSelected
        )})
    }

    this.state = {
      showPremiumBox: false,
      showPremiumDetails : false,
      levelSelected : levelSelected,
      choiceSelected: null,
      categorySelected: categorySelected,
      boardSelected: boardSelected,
      standardSelected: standardSelected,
      subjectSelected: subjectSelected,
      subGroupSet: subGroupSet,
      lessonSelected: null,
      backLevel: null,
      backChoice: null,
      pageId: 'normal',
      refreshTo: 'normal',
      customQuizSelected: false,
      lessonList: [],
      customQuestionNum: 20,
    }
  }

  backButton = () => {

    let levelSelected = this.state.levelSelected
    let categorySelected = this.state.categorySelected;
    let boardSelected = this.state.boardSelected;
    let standardSelected = this.state.standardSelected;
    let subjectSelected = this.state.subjectSelected;
    let lessonSelected = this.state.lessonSelected;
    let subGroupSet = this.state.subGroupSet;
    let groupSet = this.props.groupSet.data;
    if (levelSelected === 'lesson') {
      levelSelected = 'subject'
      lessonSelected = null
      subGroupSet = _.filter(groupSet, function(group) {
        return (group.category === categorySelected &&
                group.board === boardSelected &&
                group.standard === standardSelected &&
                group.subject === subjectSelected
        )})
    } else if (levelSelected === 'subject') {
      levelSelected = 'standard'
      subjectSelected = null
      subGroupSet = _.filter(groupSet, function(group) {
        return (group.category === categorySelected &&
                group.board === boardSelected &&
                group.standard === standardSelected
        )})
    } else if (levelSelected === 'standard') {
      levelSelected = 'board'
      standardSelected = null
      subGroupSet = _.filter(groupSet, function(group) {
      return (group.category === categorySelected &&
              group.board === boardSelected
      )})
      //console.log("back for standard");
    } else if (levelSelected === 'board') {
      levelSelected = 'category'
      boardSelected = null
      subGroupSet = _.filter(groupSet, function(group) {
      return (group.category === categorySelected
      )})
    } else if (levelSelected === 'category') {
      levelSelected = null
      categorySelected = null
      subGroupSet = groupSet
    } else if (!levelSelected) {
      this.props.backButton()
    }

    this.setState({
      levelSelected : levelSelected,
      categorySelected: categorySelected,
      boardSelected: boardSelected,
      standardSelected: standardSelected,
      subjectSelected: subjectSelected,
      lessonSelected: lessonSelected,
      subGroupSet: subGroupSet,
      pageId: 'refresh',
      refreshTo: 'normal',
      customQuizSelected: false,

    })



  }

  historySelected = () => {
    ////console.log("in categories history clicked");
    this.props.goToHistoryPage();
  }

  returnGroupId = (choice) => {
    let groupSet = this.state.subGroupSet;
    let returnList =[];
    let subGroupSet = _.filter(groupSet, function(group) { return group.lessonName === choice})

    this.props.selectedGroup(subGroupSet[0]);


  }

  returnCustomizedList = () => {

      let lessonSelector = this.state.lessonList;

      let lessonListArray = [];

      for (var i = 0; i < lessonSelector.length; i++) {
        if (lessonSelector[i]) {
          lessonListArray.push(this.state.subGroupSet[i].lessonNum);
        }
      }

      if (lessonListArray.length === 0) {
        for (var i = 0; i < lessonSelector.length; i++) {
            lessonListArray.push(this.state.subGroupSet[i].lessonNum);
        }
      }

      let groupSet = this.state.subGroupSet[0];
      let lessonList = lessonListArray.join('-')
      console.log(lessonList);
      let response = {
        category:  this.state.categorySelected,
        board: this.state.boardSelected,
        standard: this.state.standardSelected,
        subject: this.state.subjectSelected,
        lessonList: lessonList,
        questionCount: this.state.customQuestionNum,
        groupSet:groupSet,
      }

    this.props.customizedList(response)
  }

  otherProcess = (choice) => {
    //console.log("choice:", choice);
    //console.log('this.state.levelSelected:',this.state.levelSelected);
    let levelSelected = this.state.levelSelected
    let backLevel = levelSelected;
    let backChoice = this.state.choiceSelected;
    // let catSelected = this.state.catSelected;
    // let boardSelected = this.state.boardSelected;
    // let standardSelected = this.state.standardSelected;
    // let subjectSelected = this.state.subjectSelected;
    // let lessonSelected = this.state.lessonSelected;
    if (!levelSelected) {
      levelSelected = 'category'
      this.loadCategory(choice)
    } else if (this.state.levelSelected === 'category') {
      this.loadBoard(choice)
      levelSelected = 'board'
    } else if (this.state.levelSelected === 'board') {
      this.loadStandard(choice)
      levelSelected = 'standard'
    } else if (this.state.levelSelected === 'standard') {
      this.loadSubject(choice)
      levelSelected = 'subject'
    } else if (this.state.levelSelected === 'subject') {
      this.returnGroupId(choice)
    } else if (this.state.levelSelected === 'lesson') {



    }


    this.setState({
      levelSelected : levelSelected,
      choiceSelected: choice,
      backLevel : backLevel,
      backChoice : backChoice,
      pageId : 'refresh',
      refreshTo : 'normal'
    })
  }

  startCustomQuiz = () => {

          this.returnCustomizedList();
  }
  menuSelected = (choice) => {


    if (choice === 'PMP') {
      this.props.catSelected(choice)
    } else {
      this.otherProcess(choice)
    }

  }

  refreshRender = (refreshTo) => {
    this.setState({pageId: refreshTo})
    return (
      <div></div>
    )
  }

  getCategory = () => {

        let groupSet = this.props.groupSet.data
        let categoryArray = [];
        // let categoryArray = _.filter(groupSet, function(group) { return group.category === category})
        for (var i = 0; i < groupSet.length; i++) {
          categoryArray.push(groupSet[i].category);
        }
        let categoryList = [...new Set(categoryArray)];
        //console.log(categoryList);

        return(categoryList)

  }


  getBoard = (category) => {
    let subGroupSet = this.state.subGroupSet;
    let returnList =[];
    // let subGroupSet = _.filter(groupSet, function(group) { return group.category === category})

    for (let i = 0; i < subGroupSet.length; i++) {
      returnList.push(subGroupSet[i].board);
    }

    returnList = [...new Set(returnList)];
    return(returnList);

  }

  getStandard = () => {
    let subGroupSet = this.state.subGroupSet;
    let returnList = [];

    for (let i = 0; i < subGroupSet.length; i++) {
      returnList.push(subGroupSet[i].standard);
    }
    returnList = [...new Set(returnList)];
    return(returnList);

  }

  getSubject = () => {
    let subGroupSet = this.state.subGroupSet;
    let returnList = [];

    for (let i = 0; i < subGroupSet.length; i++) {
      returnList.push(subGroupSet[i].subject);
    }
    returnList = [...new Set(returnList)];
    return(returnList);

  }

  getLesson = () => {
    let subGroupSet = this.state.subGroupSet;
    let returnList = [];
    for (let i = 0; i < subGroupSet.length; i++) {
      returnList.push(subGroupSet[i].lessonName);
    }

    returnList = [...new Set(returnList)];
    return(returnList);

  }

  getScores = () => {
    let subGroupSet = this.state.subGroupSet;
    let scoreList = [];
    for (let i = 0; i < subGroupSet.length; i++) {
      let userQuizHistory = _.filter(this.props.userQuizHistory, function(group) { return group.groupId === String(subGroupSet[i].id)})
      //console.log("userQuizHistory", userQuizHistory);
      if (userQuizHistory.length > 0) {
            scoreList.push(userQuizHistory[0].score)
            //console.log("pushing score:" , userQuizHistory[0].score);
      } else {
            scoreList.push(null)
              //console.log("pushing score: null" );
      }
    }

    // scoreList = [...new Set(scoreList)];
    return(scoreList);
  }



  loadCategory =(category) => {
    let groupSet = this.props.groupSet.data
    let categoryArray = _.filter(groupSet, function(group) { return group.category === category})

    //console.log("categoryArray:", categoryArray);
    this.setState({
      subGroupSet : categoryArray,
      categorySelected: category,
    });
  }

  loadBoard = (board) => {

    let groupSet = this.state.subGroupSet
    //console.log("groupSet:",groupSet);
    let boardArray = _.filter(groupSet, function(group) { return group.board === board})

    //console.log("boardArray:", boardArray);
    this.setState({
      subGroupSet : boardArray,
      boardSelected: board,
    });
  }

  loadStandard = (standard) => {

    let groupSet = this.state.subGroupSet
    //console.log("groupSet:",groupSet);
    let standardArray = _.filter(groupSet, function(group) { return group.standard === standard})

    //console.log('standardArray:',standardArray);
    this.setState({
      subGroupSet : standardArray,
      standardSelected: standard,
    });

    // let returnList = [];
    //
    // for (let i = 0; i < standardArray.length; i++) {
    //   returnList.push(standardArray[i].board);
    // }
    //
    // returnList = [...new Set(returnList)];
    //
    //
    // if (returnList.length === 1) {
    //   this.loadStandard(returnList[0].standard)
    // }


  }

  loadSubject = (subject) => {

    let groupSet = this.state.subGroupSet
    //console.log("groupSet:",groupSet);
    let subjectArray = _.filter(groupSet, function(group) { return group.subject === subject})
    let lessonList = [];
    //console.log('subjectArray:',subjectArray);
    for (var i = 0; i < subjectArray.length; i++) {
      lessonList.push(false)
    }


    this.setState({
      subGroupSet : subjectArray,
      subjectSelected: subject,
      lessonList: lessonList,
    });



  }

  loadLesson= (lesson) => {

    let groupSet = this.state.subGroupSet
    //console.log("groupSet:",groupSet);
    let lessonArray = _.filter(groupSet, function(group) { return group.lessonNum === lesson})

    //console.log('lessonArray:',lessonArray);
    this.setState({
      subGroupSet : lessonArray,
      lessonSelected: lesson,
    });

  }

  customQuizSelected =  () => {

    this.setState({
      customQuizSelected: true,
      levelSelected: "lesson"
    })
  }

  customLessonSelected = (lesson) => {

    let lessonList = [...this.state.lessonList];
    let lessonSelection = lessonList[lesson];

    lessonList[lesson] = !lessonSelection;
    this.setState({
      lessonList: lessonList
    })
  }

  customSlideChange = (value) => {
    this.setState({
      customQuestionNum: value
    })
  }

  renderMenu = (menuList,scoreList,topText) => {


    let showBackButton = true;
    if (!this.state.levelSelected) {
      if (this.props.userProfile) {
        showBackButton = false;
      }

    }

    console.log("menuList:", menuList);
    console.log("scoreList:",scoreList);
    let itemText = null;
    if (this.state.levelSelected === 'board') {
      itemText = 'Class: '
    }

    let lessonCount = 0;
    for (var i = 0; i < this.state.lessonList.length; i++) {
      if (this.state.lessonList[i]) {
        lessonCount = lessonCount + 1
      }
    }

    panel2Text2 = this.state.customQuestionNum;
    console.log("lessonCount", lessonCount);
    if (lessonCount) {
      panel1Text2 = String(lessonCount)
    } else {
      panel1Text2 = " All "
    }

    let panelHeader1 = <p className="customQuizHeaderPara">{panel1Text1}
                          <Tag color="DarkSlateBlue">
                            {panel1Text2}
                          </Tag>
                        </p>

    let panelHeader2 = <p className="customQuizHeaderPara">{panel2Text1}
                          <Tag color="DarkSlateBlue">
                            {panel2Text2}
                          </Tag>
                        </p>

    let panelHeader3 = <p className="customQuizHeaderPara">{panel3Text1}
                          <Tag color="DarkSlateBlue">
                            {panel3Text2}
                          </Tag>
                        </p>

    return(
      <div>
          <div className='outerCatGrid'>
                <Animated animationIn="slideInDown" animationOut="fadeOut" isVisible={this.state.submitVisibility}>
                <div className="wecomeNote">
                  <h2 className="welcomeText">{topText.topText1}</h2>
                </div>
                </Animated>
              {this.state.customQuizSelected?
                <div className='outerCatBox'>

                  <Collapse accordion >
                    <Panel header={panelHeader1} key="1">
                    <div  className='lessonChoiceOuter'>
                      {menuList.map((item,i) => {

                      let lessonButton = "lessonChoiceButton"
                      let checkMark = null;
                        if (this.state.lessonList[i]) {
                          lessonButton = "lessonSelectedButton"
                          checkMark = <Icon type="check-circle"/>
                        }


                        return(
                          <Slide key={i} id={i} bottom>
                            <Animated animationIn="flipInY" animationOut="fadeOut" isVisible={this.state.submitVisibility}>
                                <Button id={item} className={lessonButton}  onClick={() => this.customLessonSelected(i)}>
                                    <div>
                                      {checkMark}  {item}
                                    </div>
                                </Button>
                              </Animated>
                          </Slide>
                        )
                        }
                        )
                      }
                    </div>
                    </Panel>
                    <Panel header={panelHeader2} key="2">
                        <Slider min={10} max={50} step={1} defaultValue={20} onChange={this.customSlideChange} value={this.state.customQuestionNum} />
                    </Panel>
                  </Collapse>
                </div>
              :
              <div className="innerListContainer">
                {this.state.levelSelected==='subject'?
                  <div className='outerCatBox'>
                    <Button className="customizeButton"  onClick={this.customQuizSelected}>
                    Customize Quiz
                    </Button>
                  </div>
                : null
                }

                {menuList.map((item,i) => {

                  let score = scoreList[i];
                  let tagColor = "MediumSeaGreen";
                  if (Number(score) < 60) {
                    tagColor = "IndianRed"
                  }
                  return(
                    <Slide key={i} id={i} bottom>
                      <Animated animationIn="flipInY" animationOut="fadeOut" isVisible={this.state.submitVisibility}>
                        <div key={i} id={item}  className='outerCatBox'>

                          <Button id={item} className="itemButton"  onClick={() => this.menuSelected(item)}>
                              <div>
                                {itemText}{item}
                              </div>
                              <div>
                                {score?
                                  <Tag color={tagColor}>
                                    Scored {score} %
                                  </Tag>
                                :null
                                }
                                </div>
                            </Button>

                          </div>
                        </Animated>
                    </Slide>
                  )
                  }
                  )
                }
              </div>
            }


            {this.state.customQuizSelected?
              <div>
                <div style={{margin:'1rem'}}>
                  <Button  type="primary" onClick={this.startCustomQuiz} >Start Quiz<Icon type="double-right" /></Button>
                </div>
                <div style={{margin:'1rem'}}>
                  <Button  type="danger" ghost onClick={this.backButton} ghost><Icon type="double-left" /> Go Back </Button>
                </div>
              </div>
            :
            <div>
              <div>
                <div className="dummyDiv">
                </div>
                {showBackButton?
                  <Affix offsetBottom={20}>
                    <Animated animationIn="slideInLeft" animationOut="fadeOut" isVisible={this.state.submitVisibility}>
                      <div className="buttonContainer">
                        <Avatar  className = 'backButton'  onClick={this.backButton}
                         icon="double-left" />

                      </div>
                    </Animated>
                  </Affix>

                :null}
              </div>
              <Affix offsetBottom={20}>
                <Animated animationIn="slideInRight" animationOut="fadeOut" isVisible={this.state.submitVisibility}>
                  <div className="buttonContainer">
                    <Avatar  className = 'scrollButton'  id="scrollTop" onClick={this.topFunction}
                     icon="arrow-up" />
                  </div>
                </Animated>
              </Affix>
            </div>
            }


          </div>


      </div>
    )
  }

  topFunction = () => {
    if (!this.state.customQuizSelected) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

  }

  scrollFunction = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("scrollTop").style.display = "block";
    } else {
      document.getElementById("scrollTop").style.display = "none";
    }
  }

  render () {

    this.topFunction();
    // window.onscroll =  this.scrollFunction();

    console.log("selectedGroupSet:", this.props.selectedGroupSet);

    let menuList = [];
    let scoreList = [];

    let choiceSelected = this.state.choiceSelected;
    let topText1 = null;
    let topText2 = null;
    //console.log('levelSelected:',this.state.levelSelected);
    //console.log('choiceSelected:',this.state.choiceSelected);
    if (!this.state.levelSelected) {
          menuList = this.getCategory();
          topText1 = "Welcome to QuizMeBuddy"
          topText2 = "Select your Category"
    } else if (this.state.levelSelected === 'category') {
          menuList = this.getBoard(choiceSelected)
          topText1 = this.state.categorySelected
          topText2 = "Select your Choice"
    } else if (this.state.levelSelected === 'board') {
          menuList = this.getStandard(choiceSelected)
          topText1 = this.state.boardSelected
          topText2 = "Select your Choice"
    } else if (this.state.levelSelected === 'standard') {
          menuList = this.getSubject(choiceSelected)
          topText1 = this.state.boardSelected + " / " + this.state.standardSelected
          topText2 = "Select your Choice"
    } else if (this.state.levelSelected === 'subject') {
          menuList = this.getLesson(choiceSelected)
          scoreList = this.getScores(choiceSelected)
          topText1 = this.state.boardSelected + " / " + this.state.standardSelected + " / " + this.state.subjectSelected
          topText2 = "Select your Choice"
    }  else if (this.state.levelSelected === 'lesson') {
          menuList = this.getLesson(choiceSelected)
          scoreList = this.getScores(choiceSelected)
          topText1 = this.state.boardSelected + " / " + this.state.standardSelected + " / " + this.state.subjectSelected
          topText2 = "Select your Choice"
    }
    let pageId = this.state.pageId;
    let topText = {
      topText1:topText1,
      topText2:topText2,
    }

    if (pageId === 'refresh') {
      return(
                  this.refreshRender(this.state.refreshTo)
      )
    } else {
        return(
            this.renderMenu(menuList,scoreList, topText)
        )
    }


  }

}

export default categories

// {innerText[i].map((item2,j)  => {
//   return(
//     <p  key={j} id={item2} className='innerCatText2'>{item2}</p>
//   )
// })}
// let innerText = [
//   [
//     " Are you getting ready for your PMP exam? ",
//     " Well ! You are at the right place ! ",
//     " Go ahead and try it out. All the best !",
//   ],
//   [
//     " Are you getting ready for your PMP exam? ",
//     " Well ! You are at the right place ! ",
//     " Go ahead and try it out. All the best !",
//   ],
// ]
//
// <Button className = 'backButton' type="primary"   onClick={this.backButton}>
//   <Icon type="double-left" theme="outlined" />
//   Back
// </Button>
