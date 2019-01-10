import _ from 'lodash';

let mathExplanations = (formula,data) => {

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
    case 'probabilityValue':

      answer = Math.round(data[0]*data[1] + data[2]*data[3] + data[4]*data[5]);
      alt1 = Math.round(data[0]*data[1] + data[2]*data[3] );
      alt2 = Math.round( data[2]*data[3] + data[4]*data[5]);
      alt3 = Math.round(data[0] + data[1] + data[2] + data[3] + data[4] + data[5]);
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;
    case 'probabilityValueNeg':

      answer = Math.round(data[6]*data[7] - data[0]*data[1] - data[2]*data[3] - data[4]*data[5]);
      alt1 = Math.round(data[6]*data[7] + data[0]*data[1] - data[2]*data[3] - data[4]*data[5]);
      alt2 = Math.round(data[6]*data[7] + data[0]*data[1] + data[2]*data[3] + data[4]*data[5]);
      alt3 = Math.round(0 - data[6]*data[7] - data[0]*data[1] - data[2]*data[3] - data[4]*data[5]);
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;
    case 'SV': //SChedule Variance

      let PV = data[0];
      let EV = data[1];
      let SV = EV - PV;
      let answer = SV;

      alt1 = Math.round((SV/PV)*100);
      alt2 = 100 - alt1;
      alt3 = EV + PV;

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'SVper': //SChedule Variance Percentage

      PV = data[0];
      EV = data[1];
      SV = EV - PV;
      answer = Math.round((SV/PV)*100);

      alt1 = 100 - answer;
      alt2 = answer/2;
      alt3 = alt1/2;

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;
    case 'paybackPeriod':

      let totalValue = data[0];
      let initPayback = data[1];
      let initYears = data[2];
      let laterPayback = data[3];

      let initMonths = initYears*12;
      let initReturn = initPayback*initMonths;
      let pendingReturn = totalValue - initReturn;
      let pendingMonths = Math.round(pendingReturn/laterPayback);

      if (pendingMonths < 0) {
        pendingMonths = initReturn - pendingMonths;
      }
      answer = pendingMonths;

      alt1 = Math.round(totalValue/laterPayback);
      alt2 = Math.round(initReturn/laterPayback);
      alt3 = Math.round(pendingReturn/initPayback);


      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;
    case 'EACperCPI':

      let BAC = data[0];
      let CPI = data[2];
      let EAC = Math.round(BAC/CPI*100)/100;
      answer = EAC;

      if (CPI === 0.5) {
        CPI = 0.4;
      }

      alt1 = Math.round(BAC*CPI*100)/100;
      alt2 = Math.round(BAC/(1 - CPI)*100)/100;
      alt3 = Math.round(BAC*(1 - CPI)*100)/100;


      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'oppurtunitycost':

      answer = data[3];
      alt1 = data[1];
      alt2 = data[3] - data[1];
      alt3 = data[3] + data[1];

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
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
      alt1 = Math.round((AC/EV)*100)/100;
      alt2 = Math.round((AC/budget)*100)/100;
      alt3 = Math.round((EV/budget)*100)/100;
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'CV':

      EV = data[0];
      AC = data[1];

      CV = EV - AC;

      answer = CV;
      alt1 = (EV+AC);
      alt2 = (EV+AC+AC);
      alt3 = (AC-EV);

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'EACperETC':

      AC = data[0];
      BAC = data[1];
      EV = data[2];
      ETC = data[3];

      EAC = AC + ETC;
      answer = Math.round(EAC*100)/100;
      alt1 = Math.round(AC + (BAC - EV))
      alt2 = Math.round(AC + BAC)
      alt3 = Math.round(AC + EV + BAC);
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'ETCperBAC':

      AC = data[0];
      BAC = data[1];
      EV = data[2];

      ETC = BAC - EV;
      answer = Math.round(ETC*100)/100;
      alt1 = Math.round(AC + (BAC - EV))
      alt2 = Math.round(AC + BAC)
      alt3 = Math.round(AC + EV + BAC);
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'EACperBAC':

      AC = data[0];
      BAC = data[1];
      EV = data[2];

      EAC = AC + (BAC - EV);
      answer = Math.round(EAC*100)/100;
      alt1 = Math.round(AC)
      alt2 = Math.round(AC + BAC)
      alt3 = Math.round(AC + EV + BAC);
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'EACperACEV':

      AC = data[0];
      BAC = data[1];
      EV = data[2];

      CPI = EV/AC;
      EAC = BAC/CPI;

      answer = Math.round(EAC*100)/100;
      alt1 = Math.round(AC + (BAC - EV))
      alt2 = Math.round(AC + BAC)
      alt3 = Math.round(AC + EV + BAC);
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'ETCperCPI':

      BAC = data[0];
      EV = data[1];
      CPI = data[2];

      EAC = Math.round((BAC/CPI)*100)/100
      AC = Math.round((EV/CPI)*100)/100
      let ETC = EAC - AC;
      answer = ETC;
      alt1 = EAC;
      alt2 = AC;
      alt3 = EAC + AC;

      alt1 = Math.round(AC + (BAC - EV))
      alt2 = Math.round(AC + BAC)
      alt3 = Math.round(AC + EV + BAC);
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;


    case 'depreciationY':

      let costOfProduct = data[0];
      let lastingYears = data[1];
      let valueAtEnd = data[2];

      let depreciation = Math.round((costOfProduct - valueAtEnd)/lastingYears);
      answer = depreciation;
      alt1 = Math.round(costOfProduct/lastingYears);
      alt2 = Math.round(valueAtEnd/lastingYears);
      alt3 = Math.round(depreciation/2);
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'SPI':

      EV = data[0];
      PV = data[1];

      answer = Math.round((EV/PV)*100)/100;
      alt1 =  Math.round((PV/EV)*100)/100;
      alt2 =  Math.round(((PV+EV)/EV)*100)/100;
      alt3 =  Math.round(((EV-PV)/(EV+PV))*100)/100;
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'CPIwithEVAC':

      EV = data[0];
      AC = data[1];
      answer = Math.round((EV/AC)*100)/100;

      alt1 =  Math.round((AC/EV)*100)/100;
      alt2 =  Math.round(((AC+EV)/EV)*100)/100;
      alt3 =  Math.round(((EV-AC)/(EV+AC))*100)/100;
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'PERT':

      let PT = data[0];
      let OT = data[1];
      let MLT = data[2];
      let PERT = (PT + OT + 4*MLT)/6
      answer = Math.round(PERT*100)/100;
      alt1 = Math.round(answer*2);
      alt2 = Math.round(answer*3);
      alt3 = Math.round(answer/2);
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'BCR':

      let Rev = data[0];
      let Cost = data[1];
      answer = Math.round((Rev/Cost)*100)/100;
      alt1 =  Math.round(((Rev-Cost)/Cost)*100)/100;
      alt2 =  Math.round(((Cost)/Rev)*100)/100;
      alt3 = Math.round(((Rev-Cost)/Rev)*100)/100;
      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'SPIwithEV':

      EV = data[1];
      PV = data[0]*100;
      answer = EV/PV;

      alt1 = 1 - answer;
      alt2 = answer*2;
      alt3 = EV*2;

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
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

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
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

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'riskValue':

      impactValue = data[0];
      let riskPercentage = data[1];
      let junkdata = data[2];

      answer = impactValue*riskPercentage/100;
      alt1 = (impactValue + junkdata)*riskPercentage/100;
      alt2 = junkdata*riskPercentage/100;
      alt3 = (impactValue - junkdata)*riskPercentage/100;

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
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
      alt2 = Math.round(((EV/currentMonth)*plannedMonth)/100)*100;
      alt3 = answer*2 - EV;

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'standardDeviation':

      let optEst = data[0];
      let pesEst = data[1];
      answer = Math.round(((pesEst - optEst)/6)*100)/100;
      alt1 = Math.round(((pesEst + optEst)/6)*100)/100;
      alt2 = Math.round(((pesEst - optEst)/3)*100)/100;
      alt3 = Math.round(((pesEst)/2)*100)/100;

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'standardDeviation':

      let profitChance = data[0];
      let profitValue = data[1];
      let lossChance = data[2];
      let lossValue = data[3];

      answer = (profitChance*profitValue)/100 - (lossChance*lossValue)/100;
      alt1 = (profitChance*profitValue)/100;
      alt2 = (lossChance*lossValue)/100;
      alt3 = (profitChance*profitValue)/100 + (lossChance*lossValue)/100;

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'CPPC':

      let estCost = data[0];
      profitChance = data[1];
      AC = data[2];

      answer = AC + (profitChance*AC)/100;
      alt1 = estCost + (profitChance*AC)/100;
      alt2 = estCost + (profitChance*estCost)/100;
      alt3 = AC + (profitChance*estCost)/100;

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'CPIF':

      estCost = data[0];
      let fee = data[1];
      let sellerShare = data[2];

      let saving = estCost - AC;
      if (saving < 0) {
        saving = 0;
      }

      answer = fee + (saving*sellerShare)/100;
      alt1 = fee + (fee*sellerShare)/100;
      alt2 = fee + (fee*(100-sellerShare))/100;
      alt3 = AC - estCost;

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

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
      let diffCost = (CielingPrice - (FinalFee+AC));

      if (diffCost < 0) {
        FinalFee = FinalFee + diffCost
      }
      remainingCost = CielingPrice - AC;
      answer = FinalFee;
      alt1 = remainingCost;
      alt2 = remainingCost + TargetFee;
      alt3 = remainingCost*sellerShare/100;

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'communicationChannels':

      let set1 = data[0];
      let set2 = data[1];
      let NN = set1 + set2;
      answer = NN*(NN-1)/2;
      alt1 = NN*2;
      alt2 = NN*NN;
      alt3 = NN;

      choices = _.shuffle([answer,alt1,alt2,alt3]);
      ansIndex = _.indexOf(choices,answer);
      choices.push(ansIndex);
      return choices;
      break;

    case 'generateNumber':

      let varValue = data;
      let min = varValue[2];
      let max = varValue[3];
      let multipleOf = varValue[4];
      let decimal = varValue[5];
      let deciMultOf = varValue[6];
      max = max/multipleOf;
      min = min/multipleOf;
      max = Math.round(max) + 1;
      min = Math.round(min);

      let step2 = Math.floor(Math.random()*(max - min)) + min;
      let step3 = step2*multipleOf;
      let step4 = 0;

      if (decimal>0) {
        let decimax = 9;
        let decimin = 1;
        let expo = 10**decimal;
        decimax = Math.round(expo/deciMultOf);
        step4 = Math.floor(Math.random()*(decimax - decimin))+decimin;
        step4 = (step4*deciMultOf)/expo;

      }
      let step5 = step3 + step4
      return(step5);

      break;

    default:

  }

}
export default mathExplanations
