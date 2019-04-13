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

    case "listType":

    let superListNames = data.Question.split(',');

    let subList1 = [];
    let subList2 = [];
    let subList3 = [];
    let subList4 = [];
    let subList5 = [];
    let subList6 = [];

    if (data.answer_1) {
      subList1 = data.answer_1.split(',')
    }
    if (data.answer_2) {
      subList2 = data.answer_2.split(',')
    }
    if (data.answer_3) {
      subList3 = data.answer_3.split(',')
    }
    if (data.answer_4) {
      subList4 = data.answer_4.split(',')
    }
    if (data.answer_5) {
      subList5 = data.answer_5.split(',')
    }
    if (data.answer_6) {
      subList6 = data.answer_6.split(',')
    }

    let selectedAnswer = [];

    let subList = [];
    let activeList = [];

    for (let i = 0; i < subList1.length; i++) {
      let questObject = {
        question: subList1[i],
        answer:0,
      }
      activeList.push(questObject)
    }
    for (let i = 0; i < subList2.length; i++) {
      let questObject = {
        question: subList2[i],
        answer:1,
      }
      activeList.push(questObject)
    }
    for (let i = 0; i < subList3.length; i++) {
      let questObject = {
        question: subList3[i],
        answer:2,
      }
      activeList.push(questObject)
    }
    for (let i = 0; i < subList4.length; i++) {
      let questObject = {
        question: subList4[i],
        answer:3,
      }
      activeList.push(questObject)
    }
    for (let i = 0; i < subList5.length; i++) {
      let questObject = {
        question: subList5[i],
        answer:4,
      }
      activeList.push(questObject)
    }
    for (let i = 0; i < subList6.length; i++) {
      let questObject = {
        question: subList6[i],
        answer:5,
      }
      activeList.push(questObject)
    }
    let unshuffledList = [...activeList];
    activeList = _.shuffle(activeList);

    let selectedChoice = [];

    for (let i = 0; i < activeList.length; i++) {
      selectedChoice.push(null)
    }

    returnData = {
      activeList: activeList,
      unshuffledList: unshuffledList,
      selectedChoice: selectedChoice,
      superListNames: superListNames,
    }

    return(returnData)
    break;
    default:

  }

}

export default functions
