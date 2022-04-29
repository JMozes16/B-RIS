import {getParsedStatement, getString} from "../Parser.js";

export function AnnihilationVerifier(statement1, statement2) {
  let state1 = statement1;
  let state2 = statement2;
  if (getString(statement1).length > getString(statement2).length) {
    state1 = statement1;
    state2 = statement2;
  } else if (getString(statement2).length > getString(statement1).length) {
    state1 = statement2;
    state2 = statement1;
  } else {
    return false;
  }
  return FindChanges(state1, state2, getString(state1), getString(state2));
}

function FindChanges(state1, state2, str1, str2) {
  if (AnnihilationHelper(state1, state2)) {
    return true;
  }
  let spot = -1;
  if (!state2.type) {
    return false;
  }
  for (let i=0; i<state2.parts.length; i++) {
    if (state2.type === state1.type) {
      if (state2.type === "ATOMIC") {
        if (state2.parts[i].type !== state1.parts[i].type || state2.parts[i] !== state1.parts[i]) {
          spot = i;
        }
      } else {
        if (state2.parts[i].type !== state1.parts[i].type || getString(state2.parts[i]) !== getString(state1.parts[i])) {
          spot = i;
        }
      }
    } else {
      return AnnihilationHelper(state1, state2);
    }
  }
  if (spot === -1) {
    return false;
  } else {
    if (FindChanges(state1.parts[spot], state2.parts[spot], str1, str2)) {
      if (str1.replace(getString(state1.parts[spot]), getString(state2.parts[spot])) === str2) {
        return true;
      }
    }
  }
  return false;
}

function AnnihilationHelper(statement1,statement2){
  if (!statement1.type || statement1.type === "ATOMIC") {
    return false;
  }
  let connective1 = statement1.type;
  for (let i=0; i<statement1.parts.length; i++) {
    if (getString(statement1.parts[i]) === getString(statement2)){
      if (statement1.parts[i].parts.length === 1) {
        if (statement1.parts[i].parts[0] === "⊥" && connective1 === "AND") {
          return true;
        }
        if (statement1.parts[i].parts[0] === "⊤" && connective1 === "OR") {
          return true;
        }
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

let statement9 = getParsedStatement("A&B&C&D&⊥")//true
let statement10 = getParsedStatement("⊥");

let statement11 = getParsedStatement("A&B&C&D&⊤&⊥&⊤")//true
let statement12 = getParsedStatement("⊥");

let statement13 = getParsedStatement("A|B|C|D|⊤|⊥")//true
let statement14 = getParsedStatement("⊤");

let statement15 = getParsedStatement("(A|B)&(A|B|C|D|⊤|⊥)&(C)")//true
let statement16 = getParsedStatement("(A|B)&⊤&(C)");

let statement17 = getParsedStatement("(A|B)&(A|B|C|D|⊤|⊥)&(C)")//false
let statement18 = getParsedStatement("(A|B)&⊤");


console.log(AnnihilationVerifier(statement1,statement2))
console.log(AnnihilationVerifier(statement3,statement4))
console.log(AnnihilationVerifier(statement5,statement6))
console.log(AnnihilationVerifier(statement7,statement8))
console.log(AnnihilationVerifier(statement9,statement10))
console.log(AnnihilationVerifier(statement11,statement12))
console.log(AnnihilationVerifier(statement13,statement14))
console.log(AnnihilationVerifier(statement15,statement16))
console.log(AnnihilationVerifier(statement17,statement18))