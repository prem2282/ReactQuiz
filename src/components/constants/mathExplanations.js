import _ from 'lodash';



let mathExplanations = (formula,data) => {

  for (var i = 0; i < data.length; i++) {
    data[i] = Number(data[i]);
  }
  let choices = [];
  let alt1 = null;
  let alt2 = null;
  let alt3 = null;
  let ansIndex = null;
  let explainTextArray = [];
  let answer = null;
  let text = null;

  switch (formula) {
    case 'sumAll':

      for (let i = 0; i < data.length; i++) {
        text = text + ' + ' + String(data[i]);
      }

      explainTextArray.push(text)

      return explainTextArray;

      break;

    case 'probabilityValue':

      // answer = Math.round(data[0]*data[1] + data[2]*data[3] + data[4]*data[5]);
      text = "Probability value = Sum of (Effort * Probability)"
      explainTextArray.push(text)
      text = "Pr Val = " + "( " + data[0] + "*" + data[1] + " )" +  " + " + "( " + data[2] + "*" + data[3] + " )" + " + " +  "( " + data[4] + '*' + data[5] + " )"
      explainTextArray.push(text)
      text = "Pr Val = " + "( " + data[0]*data[1] + " )" + " + " + "( " + data[2]*data[3] + " )" + " + " + "( " + data[4]*data[5] + " )"
      explainTextArray.push(text)
      console.log("explainTextArray:",explainTextArray);
      return explainTextArray;
    break;

    case 'probabilityValueNeg':

      answer = Math.round(data[6]*data[7] - data[0]*data[1] - data[2]*data[3] - data[4]*data[5]);

      alt1 = Math.round(data[6]*data[7] + data[0]*data[1] - data[2]*data[3] - data[4]*data[5]);
      alt2 = Math.round(data[6]*data[7] + data[0]*data[1] + data[2]*data[3] + data[4]*data[5]);
      alt3 = Math.round(0 - data[6]*data[7] - data[0]*data[1] - data[2]*data[3] - data[4]*data[5]);

      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);

      return choices;
    break;


    case 'SV': //SV percentage
      let PV = data[0];
      let EV = data[1];
      let SV = EV - PV;
      let answer = SV;

      text = "Planned Value (PV) = " + PV;
      explainTextArray.push(text)
      text = "Earned Value (EV) = " + EV;
      explainTextArray.push(text)
      text = "Schedule Variance (SV) = EV - PV" ;
      explainTextArray.push(text)
      text = "SV = " + EV + " - " + PV ;
      explainTextArray.push(text)

      return explainTextArray;

    break;

    case 'SVper': //SV percentage
      PV = data[0];
      EV = data[1];
      SV = EV - PV;
      answer = Math.round((SV/PV)*100);

      text = "Planned Value (PV) = " + PV;
      explainTextArray.push(text)
      text = "Earned Value (EV) = " + EV;
      explainTextArray.push(text)
      text = "Schedule Variance (SV) = EV - PV" ;
      explainTextArray.push(text)
      text = "SV = " + EV + " - " + PV ;
      explainTextArray.push(text)
      text = "SV = " + SV;
      explainTextArray.push(text)
      text = "Percentage SV = (SV/PV)*100" ;
      explainTextArray.push(text)
      text = "Percentage SV = (" + SV + "/" + PV + ") * " + 100;
      explainTextArray.push(text)

      return explainTextArray;

    break;

    case 'paybackPeriod':

      let totalValue = data[0];
      let initPayback = data[1];
      let initYears = data[2];
      let laterPayback = data[3];

      let initMonths = initYears*12;
      let initReturn = initPayback*initMonths;
      let pendingReturn = totalValue - initReturn;
      let paybackPeriod = 0;
      let pendingMonths = 0;
      if (pendingReturn < 0) {
        paybackPeriod = Math.round(totalValue/initPayback) ;
      } else {
        pendingMonths = (pendingReturn/laterPayback);
        paybackPeriod = initMonths + pendingMonths;
      }
      answer = paybackPeriod;

      text = "Cost of the Project (Cost) = " + totalValue.toLocaleString();
      explainTextArray.push(text)
      text = "Period of initial Return = " +  initYears + " x " + " 12  months = " + initMonths + " months ";
      explainTextArray.push(text)
      text = "Initial Returns (IR): " + initMonths + " x " +  initPayback + " = " + initReturn.toLocaleString() ;
      explainTextArray.push(text)
      text = "Remaining return = Cost - IR "
      explainTextArray.push(text)
      text = "Remaining return = " + totalValue.toLocaleString() + " - " + initReturn.toLocaleString() + " = " + pendingReturn.toLocaleString();
      explainTextArray.push(text)
      if (pendingReturn < 0) {
        text = "Payback is within the initial period itself."
        explainTextArray.push(text)
        text = "Payback period in months = Cost / Return Per month initially"
        explainTextArray.push(text)
        text = "Payback period in months = " +  totalValue.toLocaleString() + " / " +  initPayback;
        explainTextArray.push(text)
      } else {
        text = "Return after " + initYears +  " years = " + laterPayback.toLocaleString();
        explainTextArray.push(text)
        text = "Payback period for remaining amount in months = " + pendingReturn.toLocaleString() + " / " + laterPayback.toLocaleString() + " = " + pendingMonths
        explainTextArray.push(text)
        text = "Total Payback period = Period of Initial Return + Remaining Payback period"
        explainTextArray.push(text)
        text = "Total Payback period in months = " + initMonths + " + " +  pendingMonths
        explainTextArray.push(text)
      }


      return explainTextArray;
      break;

    case 'EACperCPI':

      let BAC = data[0];
      let CPI = data[2];

      let EAC = Math.round(BAC/CPI * 100)/100;
      answer = EAC;
      text = "Budget At Completion (BAC) = " +  BAC.toLocaleString()
      explainTextArray.push(text)
      text = "Cost Performance Index (CPI)  = " +  CPI.toLocaleString()
      explainTextArray.push(text)
      text = "Estimate at Completion  = BAC/CPI "
      explainTextArray.push(text)
      text = "Estimate at Completion  = " + BAC.toLocaleString() + "/" +    CPI.toLocaleString()
      explainTextArray.push(text)

      return explainTextArray;
    break;

    case 'oppurtunitycost':

      text = "Cost of lost oppurtunity :" + data[3].toLocaleString();
      explainTextArray.push(text)
      return explainTextArray;

    break;

    case 'costVariancePer':

      let budget = data[0];
      let totalMonths = data[1];
      let currentMonth = data[2];
      let AC = data[3];

      EV = Math.round((budget/totalMonths)*currentMonth);
      let CV = EV - AC;
      let CVP = (CV/EV);

      answer = Math.round(CVP*100)/100;

      text = "Budget At Completion (BAC) = " +  budget.toLocaleString()
      explainTextArray.push(text)
      text = "Actual Cost (AC) = " +  AC.toLocaleString()
      explainTextArray.push(text)
      text = "Earned Value (EV) = (BAC / Number Of Months) x Current Month"
      explainTextArray.push(text)
      text = "Earned Value (EV) = (" + budget.toLocaleString() + " / " + totalMonths + " )" + " x " +  currentMonth + " = " + EV.toLocaleString()
      explainTextArray.push(text)
      text = "Cost Variance (CV) = EV - AC"
      explainTextArray.push(text)
      text = "Cost Variance (CV) = " + EV.toLocaleString() + " - " + AC.toLocaleString() + " = " + CV.toLocaleString();
      explainTextArray.push(text)
      text = "Cost Variance percentage (CVP) = CV/EV"
      explainTextArray.push(text)
      text = "Cost Variance percentage (CVP) = " + CV.toLocaleString() + " / " + EV.toLocaleString() + " = " + answer;
      explainTextArray.push(text)
      return explainTextArray;


      return choices;
      break;

    case 'CV':

      EV = data[0];
      AC = data[1];

      CV = EV - AC;

      text = "Earned Value(EV) = " + String(EV)
      explainTextArray.push(text)
      text = "Actual Value(AC) = " + String(AC)
      explainTextArray.push(text)
      text = "Cost Variance(CV) = EV - AC"
      explainTextArray.push(text)
      text = "Cost Variance(CV) = " + String(EV) + ' - ' + String(AC)
      explainTextArray.push(text)

      return explainTextArray;
      break;

      case 'EACperETC': //EAC = AC + (BAC -EV) - VARIANCE WILL NOT OCCUR AGAIN

        AC = data[0];
        BAC = data[1];
        EV = data[2];
        ETC = data[3];

        EAC = AC + ETC;

        answer = Math.round(EAC * 100)/100

        let EAC1 = AC + (BAC -EV)
        let EAC2 = AC + BAC
        let EAC3 = AC + EV + BAC

        alt1 = Math.round(EAC1);
        alt2 = Math.round(EAC2);
        alt3 = Math.round(EAC3);


        choices = [answer,alt1,alt2,alt3];
        console.log("choices", choices);
        choices = _.shuffle(choices);
        console.log("shuffled choices", choices);
        ansIndex = _.indexOf(choices, answer);
        choices.push(ansIndex);


        return choices;
        break;

        case 'ETCperBAC': //EAC = AC + (BAC -EV) - VARIANCE WILL NOT OCCUR AGAIN

          AC = data[0];
          BAC = data[1];
          EV = data[2];

          ETC = (BAC -EV)

          answer = Math.round(EAC * 100)/100

          EAC1 = AC + (BAC -EV)
          EAC2 = AC + BAC
          EAC3 = AC + EV + BAC

          alt1 = Math.round(EAC1);
          alt2 = Math.round(EAC2);
          alt3 = Math.round(EAC3);


          choices = [answer,alt1,alt2,alt3];
          console.log("choices", choices);
          choices = _.shuffle(choices);
          console.log("shuffled choices", choices);
          ansIndex = _.indexOf(choices, answer);
          choices.push(ansIndex);


          return choices;
          break;

    case 'EACperBAC': //EAC = AC + (BAC -EV) - VARIANCE WILL NOT OCCUR AGAIN

      AC = data[0];
      BAC = data[1];
      EV = data[2];

      EAC = AC + (BAC -EV)

      answer = Math.round(EAC * 100)/100

      EAC1 = AC
      EAC2 = AC + BAC
      EAC3 = AC + EV + BAC

      alt1 = Math.round(EAC1);
      alt2 = Math.round(EAC2);
      alt3 = Math.round(EAC3);


      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);


      return choices;
      break;

      case 'EACperACEV': //EAC = AC + (BAC -EV) - VARIANCE WILL NOT OCCUR AGAIN

        AC = data[0];
        BAC = data[1];
        EV = data[2];

        CPI = EV/AC;
        EAC = BAC/CPI;

        answer = Math.round(EAC * 100)/100

        EAC1 = AC + (BAC -EV)
        EAC2 = AC + BAC
        EAC3 = AC + EV + BAC

        alt1 = Math.round(EAC1);
        alt2 = Math.round(EAC2);
        alt3 = Math.round(EAC3);


        choices = [answer,alt1,alt2,alt3];
        console.log("choices", choices);
        choices = _.shuffle(choices);
        console.log("shuffled choices", choices);
        ansIndex = _.indexOf(choices, answer);
        choices.push(ansIndex);


        return choices;
        break;


    case 'ETCperCPI':

      BAC = data[0];
      EV = data[1];
      CPI = data[2];

      EAC = Math.round((BAC / CPI) * 100)/100
      // CPI = EV/AC
      AC = Math.round((EV/CPI) * 100)/100
      let ETC = EAC - AC;
      answer = ETC;
      alt1 = EAC;
      alt2 = AC;
      alt3 = EAC+AC;

      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);


      return choices;
      break;

    case 'depreciationY':
      let costOfProduct = data[0];
      let lastingYears = data[1];
      let valueAtEnd = data[2];

      let depreciation = Math.round((costOfProduct - valueAtEnd)/lastingYears)
      answer = depreciation
      alt1 = Math.round(costOfProduct/lastingYears)
      alt2 = Math.round(valueAtEnd/lastingYears)
      alt3 = Math.round(depreciation/2)

      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);


      return choices;
      break;


    case 'SPI':
      EV = data[0];
      PV = data[1];
      let SPI = Math.round((EV/PV)*100)/100;

      answer = SPI;
      alt1 = Math.round((PV/EV)*100)/100;
      alt2 = Math.round(((PV+EV)/EV)*100)/100;
      alt3 = Math.round(((EV-PV)/(EV+PV)) * 100)/100;

      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);


      return choices;
      break;


    case 'CPIwithEVAC':
      EV = data[0];
      AC = data[1];
      CPI = Math.round((EV/AC)*100)/100;

      answer = CPI;
      alt1 = Math.round((AC/EV)*100)/100;
      alt2 = Math.round(((AC+EV)/EV)*100)/100;
      alt3 = Math.round(((EV+AC)/100) * 100)/100;

      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);
      return choices;

      break;

    case 'PERT':
      let PT = data[0];
      let OT = data[1];
      let MLT = data[2];
      let PERT = (PT + OT + 4*MLT)/6
      answer = Math.round(PERT*100)/100

      alt1 = Math.round(answer * 2);
      alt2 = Math.round(answer / 2);
      alt3 = Math.round(answer * 3);


      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);
      return choices;

      break;

    case 'BCR': //benefit cost ratio

      let Rev = data[0];
      let Cost = data[1];

      answer = Math.round((Rev/Cost)*100)/100;
      alt1 =  Math.round(((Rev-Cost)/Cost)*100)/100;
      alt2 =  Math.round((Cost/Rev)*100)/100;
      alt3 =  Math.round(((Rev-Cost)/Rev)*100)/100;

      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);
      return choices;

      break;

    case 'SPIwithEV':
        EV = data[1];
        PV = data[0]*100;
        SPI = EV/PV;

        answer = SPI
        alt1 =  1 - SPI
        alt2 = SPI*2
        alt3 = EV*2
        choices = [answer,alt1,alt2,alt3];
        console.log("choices", choices);
        choices = _.shuffle(choices);
        console.log("shuffled choices", choices);
        ansIndex = _.indexOf(choices, answer);
        choices.push(ansIndex);
        return choices;

        break;

    case 'managementReserve':
      let riskValue = data[0];
      let impactValue = data[1];

      answer = 0;
      alt1 = riskValue;
      alt2 = impactValue;
      alt3 = riskValue + impactValue;
      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);
      return choices;

      break;

    case 'contingentReserve':
      riskValue = data[0];
      impactValue = data[1];

      answer = riskValue;
      alt1 = 0;
      alt2 = impactValue;
      alt3 = riskValue + impactValue;
      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);
      return choices;

      break;

    case 'riskValue':
      impactValue = data[0];
      let riskPercentage = data[1];
      let junkdata = data[2];
      answer = impactValue * riskPercentage / 100;

      alt1 = (impactValue + junkdata) * riskPercentage / 100;
      alt2 = (junkdata) * riskPercentage / 100;
      alt3 = (impactValue - junkdata) * riskPercentage / 100;
      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);
      return choices;

      break;

    case 'simplyBAC':
      let totalUnits = data[0];
      let budgetPerUnit = data[1];
      let plannedMonth = data[2];
      currentMonth = data[3];
      EV = data[4];

      answer = totalUnits*budgetPerUnit;

      alt1 = EV*2;
      alt2 = Math.round(((EV/currentMonth)*plannedMonth)/100)*100
      alt3 = answer*2 - EV;

      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);
      return choices;

    case 'standardDeviation':
    // Hint: Use standard deviation formula: (pessimistic - optimistic) / 6
      let optEst = data[0];
      let pesEst = data[1];

      answer = Math.round(((pesEst - optEst)/6)*100)/100;
      alt1 = Math.round(((pesEst + optEst)/6)*100)/100;
      alt2 = Math.round(((pesEst - optEst)/3)*100)/100;
      alt3 = Math.round(((pesEst)/2)*100)/100;

      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);
      return choices;

    case 'profitOrLoss':
      let profitChance = data[0];
      let profitValue = data[1];
      let lossChance = data[2];
      let lossValue = data[3];

      answer = (profitChance*profitValue)/100 - (lossChance*lossValue)/100;
      alt1 = (profitChance*profitValue)/100;
      alt2 = (lossChance*lossValue)/100;
      alt3 = (profitChance*profitValue)/100 + (lossChance*lossValue)/100;
      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);
      return choices;

    case 'CPPC':
      let estCost = data[0];
      profitChance = data[1];//profit percentatge in this case
      AC = data[2];

      answer = AC + (profitChance*AC)/100;
      alt1 =  estCost + (profitChance*AC)/100;
      alt2 =  estCost + (profitChance*estCost)/100;
      alt3 = AC + (profitChance*estCost)/100;
      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);
      return choices;

    case 'CPIF':
      estCost = data[0];
      let fee = data[1];
      let sellerShare = data[2];
      AC  = data[3];

      let saving = estCost - AC;
      if (saving < 0) {
        saving = 0;
      }

      answer = fee + (saving*sellerShare)/100;
      alt1 = fee + (fee*sellerShare)/100;
      alt2 = fee + (fee*(100-sellerShare))/100;
      alt3 = AC - estCost;
      choices = [answer,alt1,alt2,alt3];
      console.log("choices", choices);
      choices = _.shuffle(choices);
      console.log("shuffled choices", choices);
      ansIndex = _.indexOf(choices, answer);
      choices.push(ansIndex);
      return choices;

    case 'FPI':
      let TargetCost = data[0];
      let TargetFee = data[1];
      let CielingPrice = data[2];
      sellerShare = data[3];
      AC = data[4];


      let profit = TargetCost - AC;
      let FinalFee = TargetFee;
      let remainingCost = 0;

      FinalFee = ((TargetCost - AC)*sellerShare)/100 + TargetFee;
      let diffCost = (CielingPrice - (FinalFee+AC))

      if (diffCost < 0) {
          FinalFee = FinalFee + diffCost
      }
      answer = FinalFee;
      text = "Diff between Target Cost and Actual Cost (profit) = " + TargetCost + " - " + AC + " = " + profit
      explainTextArray.push(text);
      text = "Final Fee = profit x seller Share + Target Fee"
      explainTextArray.push(text);
      text = "Final Fee = " + profit + " x " + sellerShare + " + " + TargetFee
      explainTextArray.push(text);


      return explainTextArray;

    case 'communicationChannels':
      let set1 = data[0];
      let set2 = data[1];
      let NN = set1 + set2;

      text = "Total number of people (N)= " + set1 + " + " + set2 + " = " + NN;
      explainTextArray.push(text);
      text = "Formula for Communcation Channels (CC)= (N x (N - 1)) / 2";
      explainTextArray.push(text);
      text = "CC = (" + NN + " x (" + NN + " - 1)) / 2";
      explainTextArray.push(text);
      let NN_1 = NN - 1;
      text = "CC = (" + NN + " x (" + NN_1 + ")) / 2";
      explainTextArray.push(text);
      let NN_2 = NN*NN_1;
      text = "CC = " + NN_2 + " / 2";
      explainTextArray.push(text);

      answer = NN*(NN-1)/2;

      return explainTextArray;


    case 'generateNumber':

                                     //[0] will contain N for number.
        let varValue = data;         //[1] is always a identifier for naming ref
        let min = varValue[2];         //[2] lower range
        let max = varValue[3];         //[3] upper range
        let multipleOf = varValue[4];  //[4] whole number is multiple of this
        let decimal = varValue[5];     //[5] decimal digits
        let deciMultOf = varValue[6]; //[6] decimal value is multiple of this

        max = max/multipleOf; //first reduce the upper range to the part of multiple. finally multiply with the multipleOf value
        min = min/multipleOf; //same as above

        max = Math.round(max) + 1; //random alwas excludes upper limit number. so add 1 to it.
        min = Math.round(min);

        let step2 = Math.floor(Math.random() * (max - min) ) + min;
        console.log("Random number step 2: ",step2);
        let step3 = step2*multipleOf //finally multiplying to get desired number.

        console.log("decimal places:", decimal);
        let step4 = 0;
        if (decimal>0) {
          let decimax = 9;
          let decimin = 1;
          let expo = 10**decimal;
          decimax = Math.round(expo/deciMultOf);
          console.log("decimax:", decimax);
          step4 = Math.floor(Math.random() * (decimax - decimin) ) + decimin;
          console.log("step4:", step4);
          step4 = (step4*deciMultOf)/expo;
          console.log("step4 in decimal:", step4);
        }

        let step5 = step3 + step4
        console.log("step5:", step5);


        return(step5);

    break;





    default:

  }

}

export default mathExplanations
