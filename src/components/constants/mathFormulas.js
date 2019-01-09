import _ from 'lodash';

let mathFormulas = (formula,data) => {

  for (let i = 0; i < data.length; i++) {
    data[i] = Number(data[i])
  }

  let choices = [];
  let answer = null;
  let alt1 = null;
  let alt2 = null;
  let alt3 = null;
  let ansIndex = null;

  switch (formula) {
    case 'sumAll':
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum = sum + data[i];
        sum = Math.round(sum*100)/100;
      }
      answer = sum;
      alt1 = sum + Math.round(Math.random()*10);
      alt2 = sum + Math.round(Math.random()*20);
      alt3 = sum - Math.round(Math.random()*20);
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;
    default:

  }

}
export default mathFormulas
