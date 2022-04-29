import {getParsedStatement, getString} from "../Parser.js";

export function ReductionVerifier(statement1, statement2) {
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
  if (ReductionHelper(state1, state2)) {
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
      return ReductionHelper(state1, state2);
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

function ReductionHelper(statement1, statement2) {
  if (!statement1.type || statement1.type === "ATOMIC") {
    return false;
  }
  let connective1 = statement1.type;
  let LHS = statement1.parts[0];
  let RHS = statement1.parts[1];
  if (getString(statement1.parts[0]).length > getString(statement1.parts[1]).length) {
    RHS = statement1.parts[0];
    LHS = statement1.parts[1];
  } else {
    RHS = statement1.parts[1];
    LHS = statement1.parts[0];
  }
  let reductStr = "(";
  if (RHS.parts.length === 2) { 
    if (RHS.parts[0].type === "NOT") {
      if (getString(RHS.parts[0].parts[0]) === getString(LHS)) {
        if (LHS.type === "ATOMIC" && RHS.parts[1].type === "ATOMIC") {
          reductStr += LHS.parts[0] + connective1 + RHS.parts[1].parts[0];
        } else if (LHS.type !== "ATOMIC" && RHS.parts[1].type === "ATOMIC") {
          reductStr += getString(LHS) + connective1 + RHS.parts[1].parts[0];
        } else if (LHS.type === "ATOMIC" && RHS.parts[1].type !== "ATOMIC") {
          reductStr += LHS.parts[0] + connective1 + getString(RHS.parts[1]);
        } else {
          reductStr += getString(LHS) + connective1 + getString(RHS.parts[1]);
        }
      }
    } else if (RHS.parts[1].type === "NOT") {
      if (getString(RHS.parts[1].parts[0]) === getString(LHS)) {
        if (LHS.type === "ATOMIC" && RHS.parts[0].type === "ATOMIC") {
          reductStr += LHS.parts[0] + connective1 + RHS.parts[0].parts[0];
        } else if (LHS.type !== "ATOMIC" && RHS.parts[0].type === "ATOMIC") {
          reductStr += getString(LHS) + connective1 + RHS.parts[0].parts[0];
        } else if (LHS.type === "ATOMIC" && RHS.parts[0].type !== "ATOMIC") {
          reductStr += LHS.parts[0] + connective1 + getString(RHS.parts[0]);
        } else {
          reductStr += getString(LHS) + connective1 + getString(RHS.parts[0]);
        }
      }
    }
  }
  reductStr += ")";
  reductStr = reductStr.replace("AND", "&");
  reductStr = reductStr.replace("OR", "|");
  reductStr = reductStr.replace("NOT", "~");
  return (reductStr === getString(statement2));
}

let statement1 = getParsedStatement("A&(~A|B)")
let statement2 = getParsedStatement("A&B")//true

let statement3 = getParsedStatement("A|(~A&B)")
let statement4 = getParsedStatement("A|B")//true

let statement3_2 = getParsedStatement("(~A&B)|A")
let statement4_2 = getParsedStatement("A|B")//true

let statement5 = getParsedStatement("(A&B)|(~(A&B)&(C|D))")
let statement6 = getParsedStatement("(A&B)|(C|D)")//true

let statement7 = getParsedStatement("A|(~A&B)")
let statement8 = getParsedStatement("A|B")//true

let statement9 = getParsedStatement("C&(A|(~A&B))&D")
let statement10 = getParsedStatement("C&(A|B)&D")//true

console.log(ReductionVerifier(statement1, statement2))
console.log(ReductionVerifier(statement3, statement4))
console.log(ReductionVerifier(statement3_2, statement4_2))
console.log(ReductionVerifier(statement5, statement6))
console.log(ReductionVerifier(statement7, statement8))
console.log(ReductionVerifier(statement9, statement10))