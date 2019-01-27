import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import {Animated} from 'react-animated-css';
import './landing.css';
import _ from 'lodash';
import Delayed from '../..//components/header/delayed';
import Slide from 'react-reveal/Slide';

 let categoryList = [];
 let boardList = [];
 let standardList = [];
 let subjectList = [];
 let lessonList = [];

class categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPremiumBox: false,
      showPremiumDetails : false,
      levelSelected : null,
      choiceSelected: null,
      categorySelected: null,
      boardSelected: null,
      standardSelected: null,
      subjectSelected: null,
      lessonSelected: null,
      backLevel: null,
      backChoice: null,
      pageId: 'normal',
      refreshTo: 'normal',
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
      console.log("back for standard");
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

    })



  }
  returnGroupId = (choice) => {
    let groupSet = this.state.subGroupSet;
    let returnList =[];
    let subGroupSet = _.filter(groupSet, function(group) { return group.lessonName === choice})

    this.props.selectedGroup(subGroupSet[0]);


  }

  otherProcess = (choice) => {
    console.log("choice:", choice);
    console.log('this.state.levelSelected:',this.state.levelSelected);
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
        console.log(categoryList);

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

  loadCategory =(category) => {
    let groupSet = this.props.groupSet.data
    let categoryArray = _.filter(groupSet, function(group) { return group.category === category})

    console.log("categoryArray:", categoryArray);
    this.setState({
      subGroupSet : categoryArray,
      categorySelected: category,
    });
  }

  loadBoard = (board) => {

    let groupSet = this.state.subGroupSet
    console.log("groupSet:",groupSet);
    let boardArray = _.filter(groupSet, function(group) { return group.board === board})

    console.log("boardArray:", boardArray);
    this.setState({
      subGroupSet : boardArray,
      boardSelected: board,
    });

    if (boardList.length === 1) {
      this.menuSelected(boardList[0])
    }



  }

  loadStandard = (standard) => {

    let groupSet = this.state.subGroupSet
    console.log("groupSet:",groupSet);
    let standardArray = _.filter(groupSet, function(group) { return group.standard === standard})

    console.log('standardArray:',standardArray);
    this.setState({
      subGroupSet : standardArray,
      standardSelected: standard,
    });

    if (standardList.length === 1) {
      this.menuSelected(standardList[0])
    }



  }

  loadSubject = (subject) => {

    let groupSet = this.state.subGroupSet
    console.log("groupSet:",groupSet);
    let subjectArray = _.filter(groupSet, function(group) { return group.subject === subject})

    console.log('subjectArray:',subjectArray);

    this.setState({
      subGroupSet : subjectArray,
      subjectSelected: subject,
    });

    if (subjectList.length === 1) {
      this.menuSelected(subjectList[0])
    }



  }

  loadLesson= (lesson) => {

    let groupSet = this.state.subGroupSet
    console.log("groupSet:",groupSet);
    let lessonArray = _.filter(groupSet, function(group) { return group.lessonNum === lesson})

    console.log('lessonArray:',lessonArray);
    this.setState({
      subGroupSet : lessonArray,
      lessonSelected: lesson,
    });

    if (lessonList.length === 1) {
      this.menuSelected(lessonList[0])
    }



  }


  renderMenu = (menuList) => {

    let showBackButton = true;
    if (!this.state.levelSelected) {
      if (this.props.userProfile) {
        showBackButton = false;
      }

    }

    console.log("menuList:", menuList);
    return(
      <div>
          <div className='outerCatGrid'>

              {menuList.map((item,i) => {
                return(
                    <Slide key={i} id={i} bottom>
                      <div key={i} id={item}  className='outerCatBox'>
                          <Button id={item} className="guestButton" onClick={() => this.menuSelected(item)}>{item}</Button>
                      </div>
                    </Slide>
                )
              })}
              {showBackButton?
                <Button className = 'backButton' type="primary"   onClick={this.backButton}>
                  <Icon type="double-left" theme="outlined" />
                  Back
                </Button>
              :null}


          </div>


      </div>
    )
  }

  render () {

    console.log("groupSet:", this.props.groupSet);
    let menuList = [];
    let choiceSelected = this.state.choiceSelected;
    console.log('levelSelected:',this.state.levelSelected);
    console.log('choiceSelected:',this.state.choiceSelected);
    if (!this.state.levelSelected) {
          menuList = this.getCategory();
    } else if (this.state.levelSelected === 'category') {
          menuList = this.getBoard(choiceSelected)
    } else if (this.state.levelSelected === 'board') {
          menuList = this.getStandard(choiceSelected)
    } else if (this.state.levelSelected === 'standard') {
          menuList = this.getSubject(choiceSelected)
    } else if (this.state.levelSelected === 'subject') {
          menuList = this.getLesson(choiceSelected)
    }
    let pageId = this.state.pageId;

    if (pageId === 'refresh') {
      return(
                  this.refreshRender(this.state.refreshTo)
      )
    } else {
        return(
            this.renderMenu(menuList)
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
