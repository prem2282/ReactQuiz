
import React, {Component} from 'react';
import './questionStyle.css';
import {Animated} from 'react-animated-css';
import {Button, Avatar} from 'antd';
// import {VoicePlayer} from 'react-voice-components';
import VoicePlayer from '../..//components/apicalls/VoicePlayer';
import Delayed from '../..//components/header/delayed';

// let  picBox = {
//   display: "grid",
//   gridTemplateColumns: "100%",
//   alignItems: "center",
//   justifyContent: "space-around",
//   backgroundImage: "linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ),url(this.props.quiz.Q_image)",
//   backgroundSize: "cover",
// }

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
          speakQuestion: true,
          ansBoxClass : ['answerBoxType1','answerBoxType1','answerBoxType1','answerBoxType1']
        }
    }

    choiceSelected = (event) => {
      const textContent = event.target.textContent;
      let clickedIndex = event.target.id;

      if (this.props.quiz.subject === 'Tamil') {

      } else {
        var speechMessage = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        speechMessage.voice = voices[0];
        speechMessage.text = textContent;

        speechSynthesis.speak(speechMessage);
      }


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
    speakQuestion = (text) => {



      // for (var i = 0; i < voices.length; i++) {
      //   console.log("voice #:", i);
      //   console.log(voices[i]);
      // }

      if (this.props.quiz.subject === 'Tamil') {
        var speechMessage = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();


          // console.log(window.speechSynthesis.getLocale().toString());

      } else {
        var speechMessage = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();

        // for (var i = 0; i < voices.length; i++) {
        //   console.log(voice[i].getLocale().toString());
        // }


        speechMessage.voice = voices[4];
        speechMessage.text = text;
        speechSynthesis.speak(speechMessage);
      }

      this.setState({
        speakQuestion: false,
      })
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
          // questionVoice = questionVoice.replace("_","dash")
          questionVoice = questionVoice.split("_").join(" ")
          // questionVoice = "Question " + questionVoice;
          questionVoice = questionVoice.replace("<dash>","dash")
      let displayQuestion = this.props.quiz.Question.replace("<dash>","__________")

      if (this.state.speakQuestion) {
        this.speakQuestion(questionVoice)
      }

      let picSize = 200;
      let screenWidth = window.innerWidth;

      picSize = screenWidth/4;

      let backgroundImage = null;

      let imageUrl = "url('" + this.props.quiz.Q_image + "')"

      if (this.props.quiz.Q_image) {
              backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) )," + imageUrl
      }


      return (
        <div className ="screenBackground">
        <Animated  animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <div className = "questionContainer" style={{  backgroundImage:backgroundImage }}>

            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
              <div>
                <p className="questionBox" onClick={() => this.speakQuestion(questionVoice)}>{displayQuestion}</p>
              </div>
            </Animated>
            <div className="answerContainer">
              <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
                <p className={this.state.ansBoxClass[0]} id='0' onClick={this.choiceSelected}>{this.props.quiz.answer_1}</p>
              </Animated>
              <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
                <p className={this.state.ansBoxClass[1]} id='1' onClick={this.choiceSelected}>{this.props.quiz.answer_2}</p>
              </Animated>
              {this.props.quiz.answer_3?
                <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
                  <p className={this.state.ansBoxClass[2]} id='2' onClick={this.choiceSelected}>{this.props.quiz.answer_3}</p>
                </Animated>
              :null}
              {this.props.quiz.answer_4?
              <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.visibility}>
                <p className={this.state.ansBoxClass[3]} id='3' onClick={this.choiceSelected}>{this.props.quiz.answer_4}</p>
              </Animated>
              :null}
              <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={this.state.submitVisibility}>
                <div className='buttonContainer'>
                  <Button className="submitButton" onClick={this.submitSelected} ghost> Submit </Button>
                </div>
              </Animated>

            </div>
          </div>
        </Animated>
        </div>
      )

    }



}

export default questType1

// {pic?
//   <div className="questionWithPic">
//     <p className="questionBox">{displayQuestion}</p>
//     <div className="questionPic">
//       <Avatar className="questionPic" shape="square" size={picSize} src={pic} />
//     </div>
//   </div>
// :
//   <div>
//     <p className="questionBox">{displayQuestion}</p>
//   </div>
// }
// {!this.state.muteVoice?
//   <Delayed waitBeforeShow={500}>
//     <VoicePlayer play onEnd={this.speechEnded} text={questionVoice}/>
//   </Delayed>
//   :null
// }
