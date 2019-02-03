import _ from 'lodash';

let functions = (name, data) => {

  switch (name) {
    case "matchType":

      console.log("matchType");
      let inputArray = data.split(";")
      let questionText = inputArray[0];
      let valueSet = inputArray[1].split(",")
      let matchQuestion = [];
      let matchAnswer = [];

      for (let i = 0; i < valueSet.length; i++) {
        let valueItem = valueSet[i].split("-");
        matchQuestion.push(valueItem[0]);
        matchAnswer.push(valueItem[1]);
      }

      let choices = [...matchAnswer];
      let answerIndex = [];
      // console.log("choices", choices);
      let shuffledAnswers = _.shuffle(choices);
      // console.log("shuffled choices", choices);
      for (var i = 0; i < shuffledAnswers.length; i++) {
      let ansIndex = _.indexOf(shuffledAnswers, matchAnswer[i]);
      answerIndex.push(ansIndex);
      }

      let returnData = {
        questionText: questionText,
        matchQuestion: matchQuestion,
        matchAnswer: matchAnswer,
        shuffledAnswers: shuffledAnswers,
        answerIndex: answerIndex,
      }

      return(returnData)

      break;
    default:

  }

}

export default functions
