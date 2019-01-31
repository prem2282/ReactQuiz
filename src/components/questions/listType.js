import React, {Component} from 'react';
import './questionStyle.css';
import _ from 'lodash';
import {Animated} from 'react-animated-css';
import { Button , Popover, Icon} from 'antd';
import TC from  '../..//components/constants/tamilConstants';
import Delayed from '../..//components/header/delayed';
//const questType1 = (props) => {

class listType extends Component {

  constructor(props) {
    super(props);

    this.state = {
      getList : false,
      superList : null,
      superListNames : null,
      submitVisibility : false,
      activeList : null,
      visibility : true,
      selectedChoice : null,
      ansInd : null,
      quizOver : false,
      showAnswers : false,
      submitType : 'back',
      popOverVisibility: [false,false,false,false,false,false,false,false,false,false],
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

  getQuestions = () => {

        let superList = this.props.superList;
        let sliceCount = Math.round(10/superList.length)
        let subList = [];
        let superListNames = [];

        for (let i = 0; i < superList.length; i++) {
          let list0 = TC(superList[i]);
          let list1 = list0.values;
          let listName = list0.name;
          console.log("list1:", list1);
          let list2 = list1.split(',');
          console.log("list2", list2);
          let list3 = _.shuffle(list2);
          console.log("list3", list3);
          let list4 = _.slice(list3,0,sliceCount);
          console.log("list4", list4);
          subList.push(list4)
          superListNames.push(listName)
        }

        console.log("subList:", subList);

        let subList2 = [];
        for (let i = 0; i < subList.length; i++) {
          let list1 = subList[i];
          let list2 = [];
          let questObject = {
            question:null,
            answer:null,
          };
          for (var j = 0; j < list1.length; j++) {
            let qObject = {...questObject};
            qObject.question = list1[j];
            qObject.answer = i
            subList2.push(qObject);
          }
        }

        let subList3 = _.shuffle(subList2);
        let selectedChoice = [];

        for (let i = 0; i < subList3.length; i++) {
          selectedChoice.push(null)
        }

        console.log("subList3", subList3);

        this.setState ({
          activeList : subList3,
          getList : true,
          superListNames : superListNames,
          selectedChoice : selectedChoice,
        })

  }

  choiceClicked = (qNo, choice) => {

    let selectedChoice = [...this.state.selectedChoice];
    selectedChoice[qNo] =  choice;

    let submitType = this.state.submitType;
    let allDone = true;
    for (var i = 0; i < selectedChoice.length; i++) {
      if (selectedChoice[i] === null) {
        allDone = false;
      }
    }

    if (allDone) {
      submitType = 'submit'
    }
    this.setState({
      selectedChoice : selectedChoice,
      submitType: submitType,

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
    let selectedChoice = this.state.selectedChoice;
    for (var i = 0; i < activeList.length; i++) {
      let ans = false;
      if (activeList[i].answer === selectedChoice[i]) {
        ans = true;
      }
      ansInd.push(ans)
    }

    this.setState({
      ansInd : ansInd,
      quizOver : true,
      submitType : 'showAnswers',
    })

  }

  handleVisibleChange = (popOverVisibility) => {
    this.setState({ popOverVisibility : popOverVisibility });
  }
  goBack = () => {

    this.setState ( {
      getList : false,
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

    let submitVisibility = false;

    if (!this.state.getList) {
      this.getQuestions();
    }



    let classNameList = ["listTypeAns1", "listTypeAns1", "listTypeAns1"]


    return (
      <div className="listTopContainer">
      {this.state.getList?

        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
        <h3 className="listTypeHeader">{this.props.topic}</h3>

        {this.state.activeList.map((item, i) => {

          let questClassName = "listTypeQuest1"
          let questClassWrong = "listTypeQuest3"
          let buttonText = this.state.superListNames[this.state.selectedChoice[i]]
          let visibility = true;
          let iconType = null;
          let iconColor = 'Aqua';
          if (buttonText) {
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

            return(
              <div className="listTypeContainer">
                {this.state.quizOver?
                  <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                  <div>
                      <p className={questClassName}>
                        <Icon fill={iconColor} type={iconType} />
                      </p>
                  </div>
                  </Animated>
                  :
                  <Delayed waitBeforeShow={i*100}>
                  <p className="listTypeQuest1">
                  {i+1}
                  </p>
                  </Delayed>
                }
                {this.state.quizOver?
                <div>
                  <Animated animationIn="flipInX" animationOut="fadeOut" isVisible={true}>
                    <p className={questClassName}> {item.question} </p>
                  </Animated>
                </div>
                :
                <Delayed waitBeforeShow={i*200}>
                  <Animated animationIn="lightSpeedIn" animationOut="fadeOut" isVisible={visibility}>
                    <p className={questClassName}> {item.question} </p>
                  </Animated>
                </Delayed>
                }
                {this.state.showAnswers?
                  <Animated animationIn="lightSpeedIn" animationOut="fadeOut" isVisible={true}>
                    <p className="listTypeQuest1" >{this.state.superListNames[item.answer]}</p>
                  </Animated>
                  :
                  <Delayed waitBeforeShow={i*200}>
                    <Animated animationIn="lightSpeedIn" animationOut="fadeOut" isVisible={true}>
                    <Popover placement="top"
                      content={
                        <div>
                        {this.state.superListNames.map((item, j) => {

                            return(
                              <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <p className={questClassName} onClick={() => this.choiceClicked(i,j)}>{item}</p>
                              </Animated>
                            )
                          })
                        }
                        </div>
                      }
                      trigger="click"
                    >
                        <p className={questClassName}>{buttonText?buttonText:'Select'}</p>
                    </Popover>
                    </Animated>
                  </Delayed>

                }
              </div>
            )
        })}
        </Animated>
        :
        null
      }

        <Delayed waitBeforeShow={2000}>
          <Animated animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
            {(this.state.submitType === 'back')?
            <Button className="backButton" onClick={this.props.backButton} ghost> Back </Button>
              :
              null
            }
            {(this.state.submitType === 'submit')?
            <Button className="backButton" onClick={this.submitSelected} ghost> Submit </Button>
              :
              null
            }
            {(this.state.submitType === 'showAnswers')?
              <Button className="backButton" onClick={this.showAnswers} ghost> Show Answers </Button>
              :
              null
            }
            {(this.state.submitType === 'return')?
              <Button className="backButton" onClick={this.props.backButton} ghost> Return </Button>
              :
              null
            }
          </Animated>
        </Delayed>

      </div>

    )


  }



}


export default listType
