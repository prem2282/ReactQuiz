import React, {Component} from 'react';
import './questionStyle.css';
import _ from 'lodash';
import {Animated} from 'react-animated-css';
import { Button , Icon, Tag, Dropdown, Menu, message} from 'antd';
import Delayed from '../..//components/header/delayed';
import MyFunctions from '../..//components/constants/functions';
const inputText = "This is question Type;Name 1 - Value 1, Name 2 - Value 2, Name 3 - Value 3, Name 4 - Value 4, Name 5 - Value 5";
// let data = MyFunctions("matchType",inputText);
let selectedAnswers = [];
let choiceVisibility = [];

class matchType extends Component {

  constructor(props) {
    super(props);
    let data = MyFunctions("matchType",this.props.quiz.Question);
    let selectedAnswers = [];
    let choiceVisibility = [];
    for (var i = 0; i < data.matchQuestion.length; i++) {
      selectedAnswers.push(null)
      choiceVisibility.push(true)
    }
    this.state = {
      questionText: data.questionText,
      matchQuestion : data.matchQuestion,
      matchAnswer : data.matchAnswer,
      shuffledAnswers : data.shuffledAnswers,
      answerIndex : data.answerIndex,
      selectedAnswers : selectedAnswers,
      questionSelected : null,
      submitVisibility : false,
      choiceVisibility : choiceVisibility,
    }
  }

  resetAll = () => {
    let selectedAnswers = [];
    let choiceVisibility = [];
    for (let i = 0; i < this.state.matchQuestion.length; i++) {
      selectedAnswers.push(null)
      choiceVisibility.push(true)
    }

    this.setState({
      selectedAnswers: selectedAnswers,
      submitVisibility: false,
      choiceVisibility: choiceVisibility,
    })
  }

  submitSelected = () => {

    let selectedAns = this.state.selectedAns;
    let correctAns = this.state.matchAnswer;
    let indexArray = [];
    let correctArray = [];

    for (var i = 0; i < selectedAns.length; i++) {
        let index = correctAns.indexOf(selectedAns[i])
        indexArray.push(index)
        correctArray.push(i)
    }


    let selectedAnsIndex = indexArray.join('-')
    let correctAnsIndex = correctArray.join('-')
    let matchTypeResponse = {
      selectedAns: selectedAnsIndex,
      correctAns: correctAnsIndex,
    }

    this.props.selected(matchTypeResponse);

  }

  dropDownClicked = (id) => {

    console.log("dropDownClicked");
    console.log("dropdown id:",id);
    this.setState({
      questionSelected: id,
    })
  }

  resetChoice = () => {
    let choiceVisibility = [...this.state.choiceVisibility];
    choiceVisibility[this.state.questionSelected] = true;
    let selectedAnswers = [...this.state.selectedAnswers];
    selectedAnswers[this.state.questionSelected] = null;
    let submitVisibility = true;
    for (var i = 0; i < selectedAnswers.length; i++) {
      if (!selectedAnswers[i]) {
        submitVisibility = false;
      }
    }

    this.setState({
      selectedAnswers: selectedAnswers,
      submitVisibility: submitVisibility,
      choiceVisibility: choiceVisibility,
    })
  }

  choiceSelected = (index) => {

    let choiceVisibility = [...this.state.choiceVisibility];

    if (!choiceVisibility[index]) {
      message.warn("Choice Already Selected !")
    } else {
      choiceVisibility[index] = false;

      let selectedAnswers = [...this.state.selectedAnswers]
      if (selectedAnswers[this.state.questionSelected]) {
        let valueToClear = selectedAnswers[this.state.questionSelected];
        let indexToClear = this.state.shuffledAnswers.indexOf(valueToClear);
        choiceVisibility[indexToClear] = true;
      }
      selectedAnswers[this.state.questionSelected] = this.state.shuffledAnswers[index]
      let submitVisibility = true;

      for (var i = 0; i < selectedAnswers.length; i++) {
        if (!selectedAnswers[i]) {
          submitVisibility = false;
        }
      }
      console.log("submitVisibility", submitVisibility);
      this.setState({
        selectedAnswers: selectedAnswers,
        submitVisibility: submitVisibility,
        choiceVisibility: choiceVisibility,
      })

    }



  }
  render () {

    // let data = MyFunctions("matchType",inputText)


    console.log("Question:", this.state.matchQuestion);
    console.log("Answers:", this.state.matchAnswer);
    console.log("shuffledAnswers:", this.state.shuffledAnswers);
    console.log("Answerindex:", this.state.answerIndex);

    const menu = (
      <Menu>
        {this.state.matchQuestion.map((item, i) => {
          let choiceClass = "matchTypeChoiceText"
          if (!this.state.choiceVisibility[i]) {
            choiceClass = "matchTypeChoiceTextDisable"
          }
          return(
            <Menu.Item key={i} id={i} onClick={() => this.choiceSelected(i)}>
              <p className={choiceClass}>{this.state.shuffledAnswers[i]}</p>
            </Menu.Item>
          )

        })}
        {this.state.selectedAnswers[this.state.questionSelected]?
          <Menu.Item>
            <Tag style={{margin:'5px'}} color="SteelBlue" onClick={this.resetChoice}>Clear</Tag>
          </Menu.Item>
        :null}


      </Menu>
    );

    return(
      <div>
        <h3 className="matchTypeHeadText">{this.state.questionText}</h3>
        <Tag style={{margin:'5px'}} color="SteelBlue" onClick={this.resetAll}>Clear All</Tag>
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={this.state.visibility}>
        {this.state.matchQuestion.map((item, i) => {
          let valueText = "select"
          let classText = "matchTypeQTextA"
          if (this.state.selectedAnswers[i]) {
            valueText = this.state.selectedAnswers[i]
            classText = "matchTypeQTextB"
          }
          return(
            <div key={i} id={i} className="matchTypeContainer">
                <div className="matchTypeQDiv">
                  <Animated animationIn="slideInLeft" animationOut="fadeOut" isVisible={this.state.visibility}>
                    <p className="matchTypeQText">{this.state.matchQuestion[i]}</p>
                  </Animated>
                </div>
                <div className="matchTypeA">
                  <Animated animationIn="slideInRight" animationOut="fadeOut" isVisible={this.state.visibility}>
                    <Dropdown key={i} id={i} overlay={menu} onClick={() => this.dropDownClicked(i)} trigger={['click']}>
                          <p className={classText}>
                            {valueText} <Icon type="down" />
                        </p>
                    </Dropdown>
                </Animated>
                </div>


            </div>



          )
        })}
        </Animated>
        <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={this.state.submitVisibility}>
          <div className='buttonContainer'>
            <Button className="submitButton" onClick={this.submitSelected} ghost> Submit </Button>
          </div>
        </Animated>
      </div>
    )
  }

}

export default matchType
