import React, {Component} from 'react';
import './questionStyle.css';
import {Animated} from 'react-animated-css';
import {Button, Avatar} from 'antd';
import _ from 'lodash';
import Formulas from '../..//components/constants/mathFormulas';
import QuestType1 from '../..//components/questions/questType1';

class questType5 extends Component {

      constructor(props) {
        super(props);
          this.state = {
            frameQuestion : true,
            filledText : null,
            showResult : false,
            quiz : null,
            newQuestion: null,
            choices : null,
            answer : null,
            submitText: 'Submit',
            shuffledChoices: null,
            rightAns: null,
            rightAnsIndex: null,
          }
      }
      getAnswerChoice = (formula,finalValue) => {
        let choices = Formulas(formula,finalValue);
        console.log("formula:", formula);
        console.log("choices:", choices);
        return choices;
      }
      goToNext = (selectedAnsIndex) => {
        let rightAnsIndex = this.state.rightAnsIndex;
        let ansInd = false;
        if (rightAnsIndex===Number(selectedAnsIndex)) {
          ansInd = true;
        }
        let returnObj = {
          varValues : _.map(this.state.finalValue).join('-'),
          rightAns : this.state.shuffledChoices[rightAnsIndex],
          selectedAns : this.state.shuffledChoices[selectedAnsIndex],
          ansInd : ansInd,
        }
        this.props.nextButton(returnObj);
      }
      updateQuestion = () => {

        let question = this.props.quiz.Question;
        let varSet = this.props.quiz.answer_1;
        let formula = this.props.quiz.answer_2;

        varSet = varSet.split(",")
        let varArray = [];
        let finalValue = [];
        let finalValueText = [];
        let genNum = 0;
        let varValue = null;
        for (let i = 0; i < varSet.length; i++) {
          varValue = varSet[i].split("-");
          if (varValue[0]=="N") {
              for (let j = 0; j < varValue.length; j++) {
                varValue[j] = Number(varValue[j])
              }
              genNum = Formulas('generateNumber',varValue)
          }
          varArray.push(varValue)
          finalValue.push(genNum)
        }
        console.log("varArray:", varArray);
        console.log("finalValue:",finalValue);
        console.log("varSet:",varSet);

        let newQuestion = question;
        for (let k = 0; k < varSet.length; k++) {
          console.log("finalValue[k]:",finalValue[k], " k: ", k);
          let replaceValue = Number(finalValue[k]).toLocaleString();

          newQuestion = _.replace(newQuestion,varSet[k],replaceValue);
          newQuestion = _.replace(newQuestion,varSet[k],replaceValue);

        }

        let choices = this.getAnswerChoice(formula, finalValue);
        let rightAnsIndex = choices[4];
        let rightAns = choices[rightAnsIndex];

        this.setState({
          newQuestion : newQuestion,
          varSet : varSet,
          finalValue: finalValue,
          formula: formula,
          choices: choices,
          shuffledChoices: choices,
          rightAns: rightAns,
          rightAnsIndex: rightAnsIndex,
          quiz : {
            Q_image : null,
            Question: newQuestion,
            answer_1: Number(choices[0]).toLocaleString(),
            answer_2: Number(choices[1]).toLocaleString(),
            answer_3: Number(choices[2]).toLocaleString(),
            answer_4: Number(choices[3]).toLocaleString(),
          },
          frameQuestion: false,
        })
        return(newQuestion);
      }

      render () {
        let screenWidth = window.innerWidth;
        let fontSize = String(Math.round((screenWidth-400)/100+14))+'px';
        let answerBoxWidth = '90%';
        let resultBoxSize = '20px';
        if (screenWidth<600) {
          answerBoxWidth = '90%';
          resultBoxSize = '20px';
        } else {
          answerBoxWidth = '40%';
          resultBoxSize = '30px';
        }
        if (this.state.frameQuestion) {
          this.updateQuestion()
        }

        return (
          <div>
            {!this.state.frameQuestion?
              <QuestType1
                quiz = {this.state.quiz}
                questionNum = {this.props.questionNum}
                selected = {this.goToNext}
                />
              :null
              }
          </div>
        )
      }
}

export default questType5
