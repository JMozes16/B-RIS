import {getParsedStatement, getString} from "../Parser.js";

export function AbsorptionVerifier(statement1, statement2) {
  return AbsoprtionHelper(statement1,statement2);
}

function AbsoprtionHelper(statement1,statement2){
  let connective1 = statement1.type;
  let LHS = statement1.parts[0];
  let RHS = statement1.parts[1];
  if (RHS.parts.length === 2){
    if (getString(RHS.parts[0]) === getString(LHS)){
      if (connective1 === "AND" && RHS.type === "OR") 
        return true; 
      else if (connective1 === "OR" && RHS.type === "AND") 
        return true;
    }
  }
  return false
}


let statement1 = getParsedStatement("A&(A|B)")//true
let statement2 = getParsedStatement("A")

let statement3 = getParsedStatement("A|(A&B)")//true
let statement4 = getParsedStatement("A")

let statement5 = getParsedStatement("A|(A|B)")//false
let statement6 = getParsedStatement("A")

let statement7 = getParsedStatement("A&(A&B)")//false
let statement8 = getParsedStatement("A")

let statement9 = getParsedStatement("(A|B)&((A&B)|C)")//false
let statement10 = getParsedStatement("(A&B)")

let statement11 = getParsedStatement("(A&B)&((A&B)|C)")//true
let statement12 = getParsedStatement("(A&B)")

console.log(AbsorptionVerifier(statement1, statement2))
console.log(AbsorptionVerifier(statement3, statement4))
console.log(AbsorptionVerifier(statement5, statement6))
console.log(AbsorptionVerifier(statement7, statement8))
console.log(AbsorptionVerifier(statement9,statement10))
console.log(AbsorptionVerifier(statement11,statement12))