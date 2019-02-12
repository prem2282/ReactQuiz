import React, {Component} from 'react';
import './questionStyle.css';
import _ from 'lodash';
import {Animated} from 'react-animated-css';
import { Button , Popover, Icon, Dropdown, Menu} from 'antd';
// import TC from  '../..//components/constants/tamilConstants';
import Delayed from '../..//components/header/delayed';
import MyFunctions from '../..//components/constants/functions';
//const questType1 = (props) => {

class listType2 extends Component {

  constructor(props) {
    super(props);

    let data = MyFunctions("listType", this.props.quiz);
    let activeList = data.activeList;
    let unshuffledList = data.unshuffledList;
    let selectedChoice = data.selectedChoice;
    let superListNames = data.superListNames;
    this.state = {
      getList : true,
      superList : null,
      superListNames : superListNames,
      submitVisibility : false,
      activeList : activeList,
      visibility : true,
      selectedChoice : selectedChoice,
      ansInd : null,
      quizOver : false,
      showAnswers : false,
      submitType : 'back',
      unshuffledList: unshuffledList,
      selectedAnsIndex:[],
    }
  }


  componentWillMount () {

  }
  componentDidMount () {
    //console.log("Question Did Mount");
  }
  componentWillUnMount () {
    //console.log("Question Will  UnMount");
  }
  speechEnded () {
    //console.log("speechEnded");
  }

  choiceClicked =  (choice) => {

    console.log("choice Clicked:", choice);
    let qNo = this.state.questionSelected;

    let selectedChoice = [...this.state.selectedChoice];
    selectedChoice[qNo] =  choice+1;

    let submitType = this.state.submitType;
    let allDone = true;
    for (var i = 0; i < selectedChoice.length; i++) {
      if (selectedChoice[i] === null) {
        allDone = false;
      }
    }

    let submitVisibility = false;
    if (allDone) {
      submitVisibility = true
    }
    this.setState({
      selectedChoice : selectedChoice,
      submitVisibility: submitVisibility,

    })

  }

  showAnswers = () => {

    this.setState({
      showAnswers: true,
      submitType : 'return',
    })

  }
  submitSelected = () => {

    let ansInd = [];
    let activeList = this.state.activeList;
    let unshuffledList = this.state.unshuffledList;
    let selectedChoice = this.state.selectedChoice;

    let selectedAnsIndex = [];
    let correctAnsIndex = [];

    for (var i = 0; i < unshuffledList.length; i++) {
      let indexOfItem = activeList.indexOf(unshuffledList[i]);
      selectedAnsIndex.push(selectedChoice[indexOfItem]-1);
    }

    for (var i = 0; i < unshuffledList.length; i++) {
      correctAnsIndex.push(unshuffledList[i].answer)
    }

    // for (var i = 0; i < activeList.length; i++) {
    //   let ans = false;
    //   if (activeList[i].answer === selectedChoice[i]) {
    //     ans = true;
    //   }
    //   ansInd.push(ans)
    // }

    selectedAnsIndex = selectedAnsIndex.join('-');
    correctAnsIndex = correctAnsIndex.join('-');

    let listTypeResponse = {
      selectedAns: selectedAnsIndex,
      correctAns: correctAnsIndex
    }
    this.props.selected(listTypeResponse);

  }

  handleVisibleChange = (popOverVisibility) => {
    this.setState({ popOverVisibility : popOverVisibility });
  }

  dropDownClicked = (id) => {
    this.setState({
      questionSelected: id,
    })
  }
  goBack = () => {

    this.setState ( {
      getList : true,
      superList : null,
      superListNames : null,
      submitVisibility : false,
      activeList : null,
      visibility : true,
      selectedChoice : null,
      ansInd : null,
      quizOver : false,
      showAnswers : false,
      submitType : 'submit',
    })

  }
  render() {

    // let submitVisibility = false;
    //
    // if (!this.state.getList) {
    //   this.getQuestions();
    // }



    let classNameList = ["listTypeAns1", "listTypeAns1", "listTypeAns1"]


    return (
      <div className="listTopContainer">
      {this.state.getList?

        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <h3 className="listTypeHeader">{this.props.topic}</h3>

        {this.state.activeList.map((item, i) => {

          let questClassName = "listTypeQuest1"
          let questClassWrong = "listTypeQuest3"
          // let buttonText = this.state.superListNames[this.state.selectedChoice[i]]
          let dropDownHeadText = 'select';
          if (this.state.selectedChoice[i]) {
            dropDownHeadText = this.state.superListNames[this.state.selectedChoice[i]-1]
          }
          let visibility = true;
          let iconType = null;
          let iconColor = 'Aqua';
          if (dropDownHeadText !== 'select') {
            questClassName = "listTypeQuest2";
          }
          if (this.state.quizOver) {
            if (this.state.ansInd[i]) {
              questClassName = "listTypeQuest1"
              iconType = 'check'
              iconColor = 'green'
            } else {
              questClassName = "listTypeQuest3"
              iconType = 'close'
              iconColor = 'red'
            }
          }

          const menu = (
            <Menu>
              {this.state.superListNames.map((item,j) => {
                return(
                  <Menu.Item key={j} id={j} onClick={() => this.choiceClicked(j)}>
                    <p className={questClassName}>{item}</p>
                  </Menu.Item>
                )
              })}
            </Menu>
          )

            return(
              <div className="listTypeContainer">

                {this.state.quizOver?
                <div>
                  <Animated animationIn="flipInX" animationOut="fadeOut" isVisible={true}>
                    <p className={questClassName}> {item.question} </p>
                  </Animated>
                </div>
                :
                  <Animated animationIn="lightSpeedIn" animationOut="fadeOut" isVisible={visibility}>
                    <p className={questClassName}> {item.question} </p>
                  </Animated>
                }
                {this.state.showAnswers?
                  <Animated animationIn="lightSpeedIn" animationOut="fadeOut" isVisible={true}>
                    <p className="listTypeQuest1" >{this.state.superListNames[item.answer]}</p>
                  </Animated>
                  :
                    <Animated key={i} id={i}  animationIn="lightSpeedIn" animationOut="fadeOut" isVisible={true}>
                      <Dropdown overlay={menu} trigger={['click']}>
                        <p className={questClassName} onClick={() => this.dropDownClicked(i)}>{dropDownHeadText}</p>
                      </Dropdown>
                    </Animated>

                }
              </div>
            )
        })}
        </Animated>
        :
        null
      }

        <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={this.state.submitVisibility}>
          <div className='buttonContainer'>
            <Button className="submitButton" onClick={this.submitSelected} ghost> Submit </Button>
          </div>
        </Animated>

      </div>

    )


  }



}


export default listType2
