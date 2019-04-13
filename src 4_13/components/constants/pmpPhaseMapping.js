const pmpPhaseMapping = (subCode) => {

  switch (subCode) {
    case "I":
      return("Initiating");
      break;
    case "P":
      return("Planning");
      break;
    case "E":
      return("Executing");
      break;
    case "M":
      return("Monitoring and Control");
      break;
    case "C":
      return("Closing");
      break;
    default:

  }
}

export default pmpPhaseMapping
