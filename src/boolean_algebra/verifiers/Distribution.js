import {getParsedStatement, getString} from "../Parser.js";

export function DistributionVerifier(parsedStatement1, parsedStatement2) {
  if (getString(parsedStatement2).length > getString(parsedStatement1).length) {
    return(Distribution(parsedStatement1, parsedStatement2));
  } else if (getString(parsedStatement1).length > getString(parsedStatement2).length) {
    return(Distribution(parsedStatement2, parsedStatement1));
  } else {
    return(Distribution(parsedStatement2, parsedStatement1) || Distribution(parsedStatement1, parsedStatement2));
  }
}

function Distribution(parsedStatement1, parsedStatement2) {
  let connective1 = parsedStatement1.type;
  let allAtomic = true;
  for (let i = 0; i < parsedStatement1.parts.length; i++) {
    if (parsedStatement1.parts[i].type !== "ATOMIC") {
      allAtomic = false;
      break;
    }
  }
  if (allAtomic) {
    console.log("All Atomic");
    return false
  }
  let newStr = DistributionHelper(parsedStatement1.parts[0], parsedStatement1.parts[1], connective1);
  if (newStr === getString(parsedStatement2)) {
    console.log(newStr);
    console.log(getString(parsedStatement2));
    return true
  }
  for (let i = 1; i<parsedStatement1.parts.length-1; i++) {
    newStr = DistributionHelper(getParsedStatement(newStr), parsedStatement1.parts[i+1], connective1); //problem is that newstr is a string not type
    console.log(newStr);
    console.log(getString(parsedStatement2));
    if (newStr === getString(parsedStatement2)) {
      return true;
    }
  }
  return false;
}

function DistributionHelper(LHS, RHS, connective1) {
  let distString = "(";
  if (LHS.type === "ATOMIC" && RHS.type === "ATOMIC") {
    distString += "(" + getString(LHS.parts[0]) + connective1 + getString(RHS.parts[0]) + ")";
  } else if ((LHS.type !== "NOT") && (RHS.type !== "NOT")) {
    for (let i = 0; i < LHS.parts.length; i++) {
      for (let j = 0; j < RHS.parts.length; j++) {
        if ((i != LHS.parts.length-1) || (j != RHS.parts.length-1)) {
          if (LHS.type !== "ATOMIC" && RHS.type !== "ATOMIC") {
            distString += "(" + getString(LHS.parts[i]) + connective1 + getString(RHS.parts[j]) + ")" + LHS.type;
          } else if (LHS.type !== "ATOMIC" && RHS.type === "ATOMIC") {
            distString += "(" + getString(LHS.parts[i]) + connective1 + RHS.parts[j] + ")" + LHS.type;
          } else if (LHS.type === "ATOMIC" && RHS.type !== "ATOMIC") {
            distString += "(" + LHS.parts[i] + connective1 + getString(RHS.parts[j]) + ")" + RHS.type;
          }
        } else {
          if (LHS.type !== "ATOMIC" && RHS.type !== "ATOMIC") {
            distString += "(" + getString(LHS.parts[i]) + connective1 + getString(RHS.parts[j]) + ")";
          } else if (LHS.type !== "ATOMIC" && RHS.type === "ATOMIC") {
            distString += "(" + getString(LHS.parts[i]) + connective1 + RHS.parts[j] + ")";
          } else if (LHS.type === "ATOMIC" && RHS.type !== "ATOMIC") {
            distString += "(" + LHS.parts[i] + connective1 + getString(RHS.parts[j]) + ")";
          }
        }
      }
    }
  }
  distString += ")";
  distString = distString.replaceAll("AND", "&");
  distString = distString.replaceAll("OR", "|");
  distString = distString.replaceAll("NOT", "~");
  return distString;
}

let statement1 = getParsedStatement("A|(B&C)")
let statement2 = getParsedStatement("(A|B)&(A|C)")

let statement3 = getParsedStatement("(A&B)|(C&D)")
let statement4 = getParsedStatement("(A|C)&(A|D)&(B|C)&(B|D)")

let statement5 = getParsedStatement("(A|B)&(C|D)&(E|F)")
let statement6 = getParsedStatement("(((A&C)&E)|((A&C)&F)|((A&D)&E)|((A&D)&F)|((B&C)&E)|((B&C)&F)|((B&D)&E)|((B&D)&F))")

let statement7 = getParsedStatement("(A|B)&(C|D)&(E|F)")
let statement8 = getParsedStatement("(((A&C)&E)|((A&C)&F)|((A&D)&E)|((A&D)&F)|((B&C)&E)|((B&C)&F)|((B&D)&E)|((B&D)&E))")

let statement9 = getParsedStatement("(A|B)&(C|(D&E))")
let statement10 = getParsedStatement("(A&C)|(A&(D&E))|(B&C)|(B&(D&E))")

let statement11 = getParsedStatement("A|A")
let statement12 = getParsedStatement("A|A")

let statement13 = getParsedStatement("((A&B)|(C&D))&((E&F)|(G&H))")
let statement14 = getParsedStatement("((A&B)&(E&F))|((A&B)&(G&H))|((C&D)&(E&F))|((C&D)&(G&H))")

console.log(DistributionVerifier(statement1, statement2))
console.log(DistributionVerifier(statement2, statement1))
console.log(DistributionVerifier(statement3, statement4))
console.log(DistributionVerifier(statement5, statement6))
console.log(DistributionVerifier(statement7, statement8))
console.log(DistributionVerifier(statement9, statement10))
console.log(DistributionVerifier(statement11, statement12))
console.log(DistributionVerifier(statement13, statement14))