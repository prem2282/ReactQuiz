import React, {Component} from 'react';
import './questionStyle.css';
import _ from 'lodash';
import {Animated} from 'react-animated-css';
import VoicePlayer from '../..//components/apicalls/VoicePlayer';
import TamilConstants from '../..//components/constants/tamilConstants';
import { Button, Input, message, Icon,Menu, Dropdown } from 'antd';


const Question = "ந;$ண்;ப;$ன்,வ;$று;மை,பெ;$ரு;மை,அ;$ரு;மை,சி;$று;மை"

let TC = TamilConstants('letter');
let la = TC.lagaram.split(";");
let ra = TC.ragaram.split(";");
let na = TC.nagaram.split(";");
let lagaram = [];
let ragaram = [];
let nagaram = [];


for (var i = 0; i < la.length; i++) {
  lagaram.push(la[i].split(','))
}
for (var i = 0; i < ra.length; i++) {
  ragaram.push(ra[i].split(','))
}
for (var i = 0; i < na.length; i++) {
  nagaram.push(na[i].split(','))
}

class tamilDict extends Component {

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
      updatedCurrentWord: null,
      correctCurrentWord: null,
      currentWordVis: [],
      allDone: false,
      questionSelected: null,
      questionClicked: false,
      choiceSelected: null,
      submittedWords: [],
      correctWords: [],

    }
  }

  nextQuestion = () => {

    let question = this.state.words[this.state.currentWord];
    let updatedCurrentWord = this.state.updatedCurrentWord;
    let currentWordVis = [];
    if (!updatedCurrentWord) {
      updatedCurrentWord = question.split(';')
    }
    let correctCurrentWord = [...updatedCurrentWord];


    for (var i = 0; i < updatedCurrentWord.length; i++) {
      if (_.startsWith(updatedCurrentWord[i], '$')) {
        currentWordVis.push(false)
        let hiddenLetter = _.trim(updatedCurrentWord[i],'$')
        correctCurrentWord[i] = hiddenLetter
      } else {
        currentWordVis.push(true)
      }
    }



    this.setState({
      updatedCurrentWord: updatedCurrentWord,
      currentWordVis: currentWordVis,
      correctCurrentWord: correctCurrentWord,
    })

  }
  componentWillMount () {

      this.nextQuestion();
      //console.log("Question type 4");
      //console.log(this.props.quiz);
  }
  componentDidMount () {
    //console.log("Question Did Mount");
  }
  componentWillUnMount () {
    //console.log("Question Will  UnMount");
  }


  submitted = () => {

    let correctWords = [...this.state.correctWords];
    let submittedWords = [...this.state.submittedWords];

    correctWords[this.state.currentWord] = this.state.correctCurrentWord;
    submittedWords[this.state.currentWord] = this.state.updatedCurrentWord;

    let currentWord = this.state.currentWord;
    console.log("currentWord on sub: ", currentWord);
    console.log("this.state.words.length:",this.state.words.length);
    let allDone = false;
    if (currentWord === this.state.words.length - 1) {
     allDone = true;
    //  console.log("correctAns:", correctAns);
    //  console.log("selectedAns:", selectedAns);
      currentWord = 0;
   } else {
     currentWord = currentWord + 1;
     console.log("adding 1");
   }

    this.setState({
      correctWords: correctWords,
      submittedWords: submittedWords,
      currentWord: currentWord,
      updatedCurrentWord: null,
      correctCurrentWord: null,
      currentWordVis: [],
      allDone: allDone,
      questionSelected: null,
      questionClicked: false,
      choiceSelected: null,
      showSubmitButton: false,
      visibility: false,
    })


  }

  completed = () => {

     let correctAns = [];
     let selectedAns = [];
     for (var i = 0; i < this.state.words.length; i++) {
       let correctWord = this.state.correctWords[i].join("");
       console.log("correctWord", correctWord);
       let selectedWord = this.state.submittedWords[i].join("");
       console.log("selectedWord", selectedWord);
       correctAns.push(correctWord);
       selectedAns.push(selectedWord);
     }

     correctAns = correctAns.join('-');
     selectedAns = selectedAns.join('-');

    let response = {
      selectedAns: selectedAns,
      correctAns: correctAns,
    }

    // console.log("response:", response);
    this.props.completed(response)
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
  }

  choiceSelected = (item) => {


    let question = this.state.words[this.state.currentWord];
    let updatedCurrentWord = this.state.updatedCurrentWord;
    let currentWordVis = this.state.currentWordVis;
    if (!updatedCurrentWord) {
      updatedCurrentWord = question.split(';')
    }

    updatedCurrentWord[this.state.questionSelected] = item;
    currentWordVis[this.state.questionSelected] = true;

    let allDone = true;
    for (var i = 0; i < currentWordVis.length; i++) {
      if (!currentWordVis[i]) {
        allDone = false;
      }
    }

    this.setState({
      choiceSelected: item,
      questionClicked: false,
      updatedCurrentWord: updatedCurrentWord,
      currentWordVis: currentWordVis,
      showSubmitButton: allDone,
    })

  }

  dropDownClicked = (id) => {

    console.log("dropDownClicked");
    console.log("dropdown id:",id);
    this.setState({
      questionSelected: id,
      questionClicked: true,
    })
  }

  changeVisibility = () => {
    this.setState({
      visibility: true,
    })

  }

  render() {

    if (!this.state.visibility) {

      if (this.state.allDone) {
        this.completed();
      } else {
        this.changeVisibility();
        this.nextQuestion();
      }
    }


    // let questionVoice = this.props.quiz.Question;
    //     questionVoice = questionVoice.split("_").join(" ")
    //console.log("after str: ",questionVoice);
      console.log("currentWord:", this.state.currentWord);
      let question = this.state.words[this.state.currentWord];
      let totalWords = this.state.words.length
      let currentWord = this.state.currentWord + 1;
      let letters = question.split(';')
      let letterVis = [];
      let letterToShow = [];
      let letterBoxStyle = [];
      let choices = [];
      let choice = [];
      let menu = [];

      // console.log("lagaram",lagaram);
      // console.log("ragaram",ragaram);
      // console.log("nagaram",nagaram);


      for (var i = 0; i < letters.length; i++) {
        if (_.startsWith(letters[i], '$')) {
          letterVis.push(false)
          letterToShow.push("?")
          letterBoxStyle.push("letterBoxHidden")
          let hiddenLetter =  _.trim(letters[i],'$')
          for (var j = 0; j < lagaram.length; j++) {
            let index = lagaram[j].indexOf(hiddenLetter)
            if (index >= 0 ) {
              console.log("index of", hiddenLetter, "is ", index );
              console.log("lagaram",lagaram[j]);
              choice = [...lagaram[j]]
            }
          }
          for (var j = 0; j < ragaram.length; j++) {
            let index = ragaram[j].indexOf(hiddenLetter)
            if (index >= 0 ) {
              console.log("index of", hiddenLetter, "is ", index );
              console.log("ragaram",ragaram[j]);
              choice = [...ragaram[j]]
            }
          }
          for (var j = 0; j < nagaram.length; j++) {
            let index = nagaram[j].indexOf(hiddenLetter)
            if (index >= 0 ) {
              console.log("index of", hiddenLetter, "is ", index );
              console.log("nagaram",nagaram[j]);
              choice = [...nagaram[j]]
            }
          }

          choices.push(choice)
          console.log("choice", choice);
          menu.push(
            <Menu>
              {choice.map((item, j) => {
                return(
                  <Menu.Item key={j} id={j} onClick={() => this.choiceSelected(item)}>
                    <p className="letterBoxChoice">{item}</p>
                  </Menu.Item>
                )

              })}
            </Menu>
          )
          console.log(menu);


        } else {
          letterVis.push(true)
          letterToShow.push(letters[i])
          letterBoxStyle.push("letterBoxNormal")
          menu.push(null)
        }
      }

      console.log("choices", choices);




      if (this.state.allDone) {
          return (
            <div></div>
          )
      } else {


    return (

        <div className="countContainer">
            <div onClick={this.clicked}>
              <Animated animationIn="rubberBand" animationOut="fadeOut" isVisible={this.state.visibility}>
                <h3 style={{color:"DarkGray"}}>{currentWord} of {this.state.words.length}</h3>
                <div className="lettersDiv">
                  {letters.map((item,i) => {
                    return(
                      <div>
                      {letterVis[i]?
                        <p className={letterBoxStyle[i]}>{letterToShow[i]}</p>
                      :
                      <Dropdown key={i} id={i} overlay={menu[i]} onClick={() => this.dropDownClicked(i)} trigger={['click']}>
                      {this.state.currentWordVis[i]?
                        <p className={letterBoxStyle[i]}>{this.state.updatedCurrentWord[i]}</p>
                        :
                        <p className={letterBoxStyle[i]}><Icon type="star"  spin/></p>

                      }
                      </Dropdown>


                      }
                      </div>
                    )
                  }
                  )}
                </div>
              </Animated>

            </div>

          <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={this.state.showSubmitButton}>
              <Button className="buttonBox" onClick={this.submitted} ghost> Submit </Button>
          </Animated>
        </div>

    )

    }

  }



}


export default tamilDict
