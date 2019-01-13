import React, {Component} from 'react';
import './questionStyle.css';
import {Animated} from 'react-animated-css';
import {Button, Avatar} from 'antd';
// import {VoicePlayer} from 'react-voice-components';
import VoicePlayer from '../..//components/apicalls/VoicePlayer';

class questType1 extends Component {

    constructor(props) {
      super(props);
        this.state = {
          submitVisibility: false,
          visibility: true,
          counter : null,
          selectedAns: false,
          selectedAnsIndex: null,
          muteVoice: false,
          ansBoxClass : ['answerBoxType1','answerBoxType1','answerBoxType1','answerBoxType1']
        }
    }

    choiceSelected = (event) => {
      const choiceClicked = event.target.textContent;
      let clickedIndex = event.target.id;

      const ansBoxClass = ['answerBoxType1','answerBoxType1','answerBoxType1','answerBoxType1'];
      let selectedAnsIndex = this.state.selectedAnsIndex;
      let submitVisibility = this.state.submitVisibility;
      if (selectedAnsIndex === clickedIndex) {
        selectedAnsIndex = null;
        submitVisibility = false;
      } else {
        selectedAnsIndex = clickedIndex;
        ansBoxClass[clickedIndex] = 'answerBoxSel';
        submitVisibility = true;
      }
      this.setState({
        selectedAnsIndex: selectedAnsIndex,
        ansBoxClass: ansBoxClass,
        submitVisibility: submitVisibility,
      });
    }

    componentWillMount = () => {
      this.setState({
        muteVoice: false
      })
    }

    muteVoice = () => {
      this.setState({
        muteVoice: !this.state.muteVoice
      })
    }
    speechEnded = () => {

    }
    submitSelected = () => {

      this.setState({
        muteVoice : true,
        visibility : !this.state.visibility
      })

      this.props.selected(this.state.selectedAnsIndex);

    }

    render() {

      let pic = this.props.quiz.Q_image;
      let questionVoice = this.props.quiz.Question;
          questionVoice = questionVoice.split("_").join(" ")
          // questionVoice = "Question " + questionVoice;

      let picSize = 200;
      let screenWidth = window.innerWidth;

      if (screenWidth<600) {
        picSize = screenWidth/5;
      } else {
        picSize = screenWidth/8;
      }

      return (
        <div className = "questionContainer">
          {!this.state.muteVoice?
            <VoicePlayer play onEnd={this.speechEnded} text={questionVoice}/>
            :null
          }
          <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
            {pic?
              <div className="questionWithPic">
                <div className="questionPic">
                  <Avatar shape="square" size={picSize} src={pic} />
                </div>
                <p className="questionBox">{this.props.quiz.Question}</p>
              </div>
            :
              <div>
                <p className="questionBox">{this.props.quiz.Question}</p>
              </div>
            }
          </Animated>
          <div className="answerContainer">
            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
              <p className={this.state.ansBoxClass[0]} id='0' onClick={this.choiceSelected}>{this.props.quiz.answer_1}</p>
            </Animated>
            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
              <p className={this.state.ansBoxClass[1]} id='1' onClick={this.choiceSelected}>{this.props.quiz.answer_2}</p>
            </Animated>
            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
              <p className={this.state.ansBoxClass[2]} id='2' onClick={this.choiceSelected}>{this.props.quiz.answer_3}</p>
            </Animated>
            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
              <p className={this.state.ansBoxClass[3]} id='3' onClick={this.choiceSelected}>{this.props.quiz.answer_4}</p>
            </Animated>
          </div>
          {this.state.submitVisibility?
          <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.submitVisibility}>
            <Button className="clickBox" onClick={this.submitSelected} ghost> Submit </Button>
          </Animated>
          :
          null
          }
        </div>
      )

    }



}

export default questType1
