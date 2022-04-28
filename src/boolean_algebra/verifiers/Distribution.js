import * as Parser from "../Parser";

export function DistributionVerifier(parsedStatement1, parsedStatement2) {
  return(Distribution(parsedStatement1, parsedStatement2) || Distribution(parsedStatement2, parsedStatement1));
}

function Distribution(parsedStatement1, parsedStatement2) {
  let connective1 = parsedStatement1.type;
  let newStr = DistributionHelper(parsedStatement1[0], parsedStatement1[1], connective1);
  for (let i = 1; i<parsedStatement1.parts.length-1; i++) {
    let newStr = DistributionHelper(Parser.parseStatement(newStr), parsedStatement1[i+1], connective1); //problem is that newstr is a string not type
  }
  return (newStr === Parser.getString(parsedStatement2));
}

function DistributionHelper(LHS, RHS, connective1) {
  if (LHS.type === "ATOMIC" && RHS.type === "ATOMIC") {
    let distString = "";
    distString += "(" + Parser.getString(LHS.parts[0]) + connective1 + Parser.getString(RHS.parts[0]) + ")";
  } else if ((LHS.type !== "NOT") && (RHS.type !== "NOT")) {
    for (let i = 0; i < LHS.parts.length; i++) {
      for (let j = 0; j < RHS.parts.length; j++) {
        if (i != LHS.parts.length-1 && j != RHS.parts.length-1) {
          if (LHS.type === "ATOMIC") {
            distString += "(" + Parser.getString(LHS.parts[i]) + connective1 + Parser.getString(RHS.parts[j]) + ")" + RHS.type;
          } else {
            distString += "(" + Parser.getString(LHS.parts[i]) + connective1 + Parser.getString(RHS.parts[j]) + ")" + LHS.type;
          }
        }
        distString += "(" + Parser.getString(LHS.parts[i]) + connective1 + Parser.getString(RHS.parts[j]) + ")";
      }
    }
  }
  distString.replace("AND", "&");
  distString.replace("OR", "|");
  distString.replace("NOT", "~");
  return distString;
}
