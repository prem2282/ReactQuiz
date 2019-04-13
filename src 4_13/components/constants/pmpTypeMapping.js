const pmpTypeMapping = (subCode) => {

  switch (subCode) {
    case "I":
      return("Integration");
      break;
    case "S":
      return("Scope");
      break;
    case "T":
      return("Time");
      break;
    case "C":
      return("Cost");
      break;
    case "Q":
      return("Quality");
      break;
    case "H":
      return("HR");
      break;
    case "CM":
      return("Communication");
      break;
    case "R":
      return("Risk");
      break;
    case "P":
      return("Procurement");
      break;
    default:

  }
}

export default pmpTypeMapping
