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

  submitSelected = () => {

    let matchTypeResponse = {
      selectedAns: this.state.selectedAnswers,
      correctAns: this.state.matchAnswer
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
          let choiceColor = "Orange"
          if (!this.state.choiceVisibility[i]) {
            choiceColor = "Gray"
          }
          return(
            <Menu.Item key={i} id={i}>
              <Tag style={{margin:'5px'}} color={choiceColor} onClick={() => this.choiceSelected(i)}>{this.state.shuffledAnswers[i]}</Tag>
            </Menu.Item>
          )

        })}
        {this.state.selectedAnswers[this.state.questionSelected]?
          <Menu.Item>
            <Tag style={{margin:'5px'}} color="DarkSlateGray" onClick={this.resetChoice}>Clear</Tag>
          </Menu.Item>
        :null}


      </Menu>
    );

    return(
      <div>
        <h3>{this.state.questionText}</h3>
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={this.state.visibility}>
        {this.state.matchQuestion.map((item, i) => {
          let valueText = "select"
          if (this.state.selectedAnswers[i]) {
            valueText = this.state.selectedAnswers[i]
          }
          return(
            <div key={i} id={i} className="matchTypeContainer">
              <div className="matchTypeQDiv">
                <p className="matchTypeQText">{this.state.matchQuestion[i]}</p>
              </div>

              <div className="matchTypeA">
                <Dropdown key={i} id={i} overlay={menu} onClick={() => this.dropDownClicked(i)} trigger={['click']}>
                      <p className="matchTypeQText">
                        {valueText} <Icon type="down" />
                    </p>
                </Dropdown>
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
