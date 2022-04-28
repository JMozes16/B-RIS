import {getParsedStatement, getString} from "../Parser.js";

export function AnnihilationVerifier(statement1, statement2) {
  return (AnnihilationHelper(statement1, statement2) || AnnihilationHelper(statement2,statement1));
}

function AnnihilationHelper(statement1,statement2){
  if (statement1.parts.length !== 2) return false;
  let connective1 = statement1.type;
  if (getString(statement1.parts[1]) === getString(statement2)){
    if (statement1.parts[1].parts.length === 1) {
      if (statement1.parts[1].parts[0] === "⊥" && connective1 === "AND") {
        return true;
      }
      if (statement1.parts[1].parts[0] === "⊤" && connective1 === "OR") {
        return true;
      }
    }
  }
  return false;
}


let statement1 = getParsedStatement("A|⊤")//true
let statement2 = getParsedStatement("⊤")

let statement3 = getParsedStatement("A&⊥")//true
let statement4 = getParsedStatement("⊥")

let statement5 = getParsedStatement("(A&B)&⊥")//true
let statement6 = getParsedStatement("⊥")

let statement7 = getParsedStatement("(A|B)|⊤")//false
let statement8 = getParsedStatement("T")

let statement9 = getParsedStatement("A&B&C&D&⊥")//false
let statement10 = getParsedStatement("⊥");

console.log(AnnihilationVerifier(statement1,statement2))
console.log(AnnihilationVerifier(statement3,statement4))
console.log(AnnihilationVerifier(statement5,statement6))
console.log(AnnihilationVerifier(statement7,statement8))
console.log(AnnihilationVerifier(statement9,statement10))