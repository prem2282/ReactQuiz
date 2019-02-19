
import React, {Component} from 'react';
import './questionStyle.css';
//import _ from 'lodash';
import {Animated} from 'react-animated-css';
import VoicePlayer from '../..//components/apicalls/VoicePlayer';
import { Button, Input, message, Icon } from 'antd';


const Question = "Inclination,Focus,Battery,Across,Contaminated"

class dictation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filledText : null,
      showSubmitButton : false,
      dictate: true,
      words: this.props.quiz.Question.split(','),
      enteredWords: this.props.quiz.Question.split(','),
      // words: Question.split(','),
      // enteredWords: Question.split(','),
      currentWord: 0,
      allDone: false,
    }
  }

  componentWillMount () {
      //console.log("Question type 4");
      //console.log(this.props.quiz);
  }
  componentDidMount () {
    //console.log("Question Did Mount");
    this.inputElement.focus();
  }
  componentWillUnMount () {
    //console.log("Question Will  UnMount");
  }


  submitted = () => {

    let filledText = this.state.filledText;
    let allDone = false;
    if (filledText.length>0) {
      // this.props.selected(this.state.filledText);
      let enteredWords = this.state.enteredWords;
      enteredWords[this.state.currentWord] = this.state.filledText;
      let totalWords = this.state.words.length;

      if (this.state.currentWord === (totalWords-1)) {
        allDone = true;
      }
      this.setState({
        enteredWords: enteredWords,
        currentWord: this.state.currentWord + 1,
        allDone: allDone,
        filledText: null,
        dictate: true,
        visibility: false,
      })

    } else {
      message.error('please enter your answer');
    }

    if (allDone) {
      this.completed();
    }
    this.inputElement.focus();


  }

  completed = () => {
    let response = {
      selectedAns: this.state.enteredWords.join('-'),
      correctAns: this.state.words.join('-'),
    }
    this.props.completed(response)
  }

  textChanged = (event) => {

    console.log("Changed text:" + event.target.value);
    let filledText = event.target.value;

    let showSubmitButton = false;
    if (filledText.length>0) {
      showSubmitButton = true
    }

    this.setState({
      filledText: filledText,
      showSubmitButton: showSubmitButton,
    })

  }

  speechEnded = () => {
    this.setState({
      dictate: false,
    })
  }

  clicked = () => {
    this.setState({
      dictate: true,
    })
    this.inputElement.focus();
  }

  changeVisibility = () => {
    this.setState({
      visibility: true,
    })

  }

  render() {

    if (!this.state.visibility) {
      this.changeVisibility();
    }

    // let questionVoice = this.props.quiz.Question;
    //     questionVoice = questionVoice.split("_").join(" ")
    //console.log("after str: ",questionVoice);
      let    questionVoice = this.state.words[this.state.currentWord];
      let totalWords = this.state.words.length
      let currentWord = this.state.currentWord + 1;
  //  let filledText = _.upperCase(this.props.filledText);

      let screenWidth = window.innerWidth;
      let fontSize = String(Math.round((screenWidth - 400)/100 + 14)) + 'px'

    return (
        <div className="questionContainer">
          {this.state.dictate?
            <VoicePlayer play onEnd={this.speechEnded} text={questionVoice} />
            :null
          }
            <div onClick={this.clicked}>
              <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
                <p className="sountText1Class">
                  Dictation Word {currentWord} of {totalWords}
                </p>
              </Animated>
              <Animated animationIn="rubberBand" animationOut="fadeOut" isVisible={this.state.visibility}>
                <p className="soundIconClass">
                  <Icon type="sound"/>
                  </p>
              </Animated>
              <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
                <p className="sountText2Class">
                  Click to listen again
                </p>
              </Animated>

            </div>

          <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
            <div className="textInput">
              <Input className="fill-input" placeholder="...." size="large"
                id='0'
                ref={(inp) => {this.inputElement = inp}}
                onChange={this.textChanged} value={this.state.filledText}></Input>
            </div>
          </Animated>
          <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.showSubmitButton}>
              <Button className="buttonBox" onClick={this.submitted} ghost> Submit </Button>
          </Animated>
        </div>

    )


  }



}


export default dictation
