
import React, {Component} from 'react';
import './questionStyle.css';
import {Animated} from 'react-animated-css';
import {Button, Avatar, Menu, Dropdown} from 'antd';
// import {VoicePlayer} from 'react-voice-components';
import VoicePlayer from '../..//components/apicalls/VoicePlayer';
import Delayed from '../..//components/header/delayed';

let quiz = {
  Question : "Choose the right word;Sample,Dample",
  answer_1 : "Choice sentence one <dash>; Choice sentence two <dash>",
  answer_2 : "https://img1.picmix.com/output/stamp/normal/3/1/3/0/320313_360e3.png",
  answer_3 : "https://images-na.ssl-images-amazon.com/images/I/51Na8wiT85L.jpg",
}

let questClassName = "dualTypeQuest"
let listClassName = "listTypeQuest1"
let questionText = quiz.answer_1.split(';');

let selectedChoiceDefault = ["-","-"];
class dualType extends Component {

    constructor(props) {
      super(props);


        this.state = {
          submitVisibility: false,
          visibility: true,
          counter : null,
          selectedAns: false,
          selectedAnsIndex: null,
          selectedChoice : [...selectedChoiceDefault],
          questionSelected : null,
          // choices: choices,
          // headerText : headerText,
        }
    }



    submitSelected = () => {

      // this.setState({
      //   muteVoice : true,
      //   visibility : !this.state.visibility
      // })

      let tempText = this.props.quiz.Question.split(';');
      let headerText = tempText[0];
      let choices = tempText[1].split(',');


      let response = {
        selectedAns : this.state.selectedChoice,
        correctans : choices,
      }
      this.props.selected(this.state.selectedChoice);

    }

    dropDownClicked = (id) => {
      this.setState({
        questionSelected: id,
      })
    }

    choiceClicked =  (choice) => {

      let selectedChoice = this.state.selectedChoice;
      selectedChoice[this.state.questionSelected] = choice;
      let submitVisibility = false;
      if ((selectedChoice[0] === selectedChoiceDefault[0]) || (selectedChoice[1] === selectedChoiceDefault[1])) {
          submitVisibility = false;
      } else {
          submitVisibility = true;
      }
      this.setState({
        selectedChoice : selectedChoice,
        submitVisibility: submitVisibility,
      //
      })

    }

    render() {



          // questionVoice = "Question " + questionVoice;
      // let questionVoice = questionVoice.replace("<dash>","dash")
      let displayQuestion = [];
      displayQuestion[0] = questionText[0].replace("<dash>","")
      displayQuestion[1] = questionText[1].replace("<dash>","")
      let tempText = this.props.quiz.Question.split(';');
      let headerText = tempText[0];
      let choices = tempText[1].split(',');
      // let picSize = 200;
      // let screenWidth = window.innerWidth;
      //
      // picSize = screenWidth/4;
      let imageUrl1 = "url('" + quiz.answer_2 + "')"
      let imageUrl2 = "url('" + quiz.answer_3 + "')"
      let backgroundImage1 = null;
      let backgroundImage2 = null;
      // if (this.state.speakQuestion) {
      //         this.speakQuestion(questionVoice)
      // }


      if (quiz.answer_2) {
          backgroundImage1 = "linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) )," + imageUrl1
      }
      if (quiz.answer_3) {
          backgroundImage2 = "linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) )," + imageUrl2
      }

      const menu = (
        <Menu>
          {choices.map((item,j) => {
            return(
              <Menu.Item key={j} id={j} onClick={() => this.choiceClicked(item)}>
                <p className={listClassName}>{item}</p>
              </Menu.Item>
            )
          })}
        </Menu>
      )

      let dropDownHeadText = ['select','select'];



      return (
        <div>
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <div className = "dualBoxContainer">
            <div className = "dualBox" style={{  backgroundImage:backgroundImage1, backgroundColor:'transparent' }}>
              <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
                <div>
                  <p className="questionBox">{displayQuestion[0]}</p>
                  <p className="dualQuestionText">{this.state.selectedChoice[0]}</p>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <p className={questClassName} onClick={() => this.dropDownClicked(0)}>{dropDownHeadText[0]}</p>
                  </Dropdown>
                </div>
              </Animated>
            </div>
            <div className = "dualBox" style={{  backgroundImage:backgroundImage2, backgroundColor:'transparent' }}>
              <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
                <div>
                  <p className="questionBox">{displayQuestion[1]}</p>
                  <p className="dualQuestionText">{this.state.selectedChoice[1]}</p>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <p className={questClassName} onClick={() => this.dropDownClicked(1)}>{dropDownHeadText[1]}</p>
                  </Dropdown>
                </div>
              </Animated>
            </div>

          </div>
          {this.state.submitVisibility?
              <div className='dualButtonContainer'>
                <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
                  <Button type="primary" className="dualSubmitButton" onClick={this.submitSelected}> Submit </Button>
                </Animated>
              </div>
            :null
          }

        </Animated>

        </div>
      )

    }



}

export default dualType
