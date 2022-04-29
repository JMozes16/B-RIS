import {getParsedStatement, getString} from "../Parser.js";

export function AdjacencyVerifier(statement1, statement2) {
  return FindChanges(statement1, statement2);
}

function FindChanges(statement1, statement2) {
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

  if (state2.type === "ATOMIC") {
    return AdjacencyHelper(state1, state2);
  }
  let spot = -1;
  for (let i=0; i<state2.parts.length; i++) {
    if (state2.type === state1.type) {
      if (state2.parts[i].type !== state1.parts[i].type || getString(state2.parts[i]) !== getString(state1.parts[i])) {
        spot = i
      }
    } else {
      return AdjacencyHelper(state1, state2);
    }
  }
  if (spot === -1) {
    return false;
  } else {
    return FindChanges(state1.parts[spot], state2.parts[spot]);
  }
}

function AdjacencyHelper(statement1, statement2) {
  if (statement1.parts.length !== 2) {
    return false;
  }
  let LHS = statement1.parts[0];
  let RHS = statement1.parts[1];
  let connective1 = statement1.type;
  if ((LHS.type !== "OR" && LHS.type !== "AND") || (LHS.type !== RHS.type || LHS.type === connective1)) {
    return false;
  }
  let result = statement2;
  let LHSResFirst = false;
  let RHSResFirst = false;
  if (getString(LHS.parts[0]) === getString(result)) {  //LHSResFirst
    LHSResFirst = true;
    if (getString(RHS.parts[0]) === getString(result)) {  //RHSResFirst
      RHSResFirst = true;
    } else if (getString(RHS.parts[1]) === getString(result)) { //!RHSResFirst
      RHSResFirst = false;
    } else {
      return false;
    }
  } else if (getString(LHS.parts[1]) === getString(result)) { //!LHSResFirst
    LHSResFirst = false;
    if (getString(RHS.parts[0]) === getString(result)) {  //RHSResFirst
      RHSResFirst = true;
    } else if (getString(RHS.parts[1]) === getString(result)) { //!RHSResFirst
      RHSResFirst = false;
    } else {
      return false;
    }
  } else {
    return false;
  }

  if (LHSResFirst && RHSResFirst) {
    if (LHS.parts[1].type === "NOT" && RHS.parts[1].type !== "NOT") {
      if (getString(LHS.parts[1].parts[0]) === getString(RHS.parts[1])) {
        return true;
      }
    } else if (RHS.parts[1].type === "NOT" && LHS.parts[1].type !== "NOT") {
      if (getString(RHS.parts[1].parts[0]) === getString(LHS.parts[1])) {
        return true;
      }
    } else {
      return false;
    }
  } else if (!LHSResFirst && RHSResFirst) {
    if (LHS.parts[0].type === "NOT" && RHS.parts[1].type !== "NOT") {
      if (getString(LHS.parts[0].parts[0]) === getString(RHS.parts[1])) {
        return true;
      }
    } else if (RHS.parts[1].type === "NOT" && LHS.parts[0].type !== "NOT") {
      if (getString(RHS.parts[1].parts[0]) === getString(LHS.parts[0])) {
        return true;
      }
    } else {
      return false;
    }
  } else if (LHSResFirst && !RHSResFirst) {
    if (LHS.parts[1].type === "NOT" && RHS.parts[0].type !== "NOT") {
      if (getString(LHS.parts[1].parts[0]) === getString(RHS.parts[0])) {
        return true;
      }
    } else if (RHS.parts[0].type === "NOT" && LHS.parts[1].type !== "NOT") {
      if (getString(RHS.parts[0].parts[0]) === getString(LHS.parts[1])) {
        return true;
      }
    } else {
      return false;
    }
  } else {  // !LHSResFirst && !RHSResFirst
    if (LHS.parts[0].type === "NOT" && RHS.parts[0].type !== "NOT") {
      if (getString(LHS.parts[0].parts[0]) === getString(RHS.parts[0])) {
        return true;
      }
    } else if (RHS.parts[0].type === "NOT" && LHS.parts[0].type !== "NOT") {
      if (getString(RHS.parts[0].parts[0]) === getString(LHS.parts[0])) {
        return true;
      }
    } else {
      return false;
    }
  }
}

let statement1 = getParsedStatement("(A|B)&(A|~B)")
let statement2 = getParsedStatement("A")//true

let statement3 = getParsedStatement("(A&B)|(A&~B)")
let statement4 = getParsedStatement("A")//true

let statement5 = getParsedStatement("(~B&A)|(A&B)")
let statement6 = getParsedStatement("A")//true

let statement7 = getParsedStatement("(A&~B)|(A&B)")
let statement8 = getParsedStatement("A")//true

let statement9 = getParsedStatement("(A&~B)|(A&B)")
let statement10 = getParsedStatement("B")//false

let statement11 = getParsedStatement("(A&~B)&(A&B)")
let statement12 = getParsedStatement("A")//false

let statement13 = getParsedStatement("((A&C)&~B)|((A&C)&B)")
let statement14 = getParsedStatement("(A&C)")//true

let statement15 = getParsedStatement("A|C")
let statement16 = getParsedStatement("A")//false

let statement17 = getParsedStatement("A&(B|((C|B)&(C|~B)))")
let statement18 = getParsedStatement("A&(B|C)")//true

console.log(AdjacencyVerifier(statement1, statement2))
console.log(AdjacencyVerifier(statement3, statement4))
console.log(AdjacencyVerifier(statement5, statement6))
console.log(AdjacencyVerifier(statement7, statement8))
console.log(AdjacencyVerifier(statement9, statement10))
console.log(AdjacencyVerifier(statement11, statement12))
console.log(AdjacencyVerifier(statement13, statement14))
console.log(AdjacencyVerifier(statement15, statement16))
console.log(AdjacencyVerifier(statement17, statement18))