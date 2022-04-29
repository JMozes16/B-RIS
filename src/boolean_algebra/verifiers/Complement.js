import {getParsedStatement, getString} from "../Parser.js";

export function ComplementVerifier(statement1, statement2) {
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
  if (ComplementHelper(state1, state2)) {
    return true;
  }
  let spot = -1;
  for (let i=0; i<state2.parts.length; i++) {
    if (state2.type === state1.type) {
      if (state2.parts[i].type !== state1.parts[i].type || getString(state2.parts[i]) !== getString(state1.parts[i])) {
        spot = i
      }
    } else {
      return ComplementHelper(state1, state2);
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

function ComplementHelper(statement1, statement2) {
  if (statement1.parts.length !== 2) {
    return false;
  }
  if (statement2.parts.length !== 1) {
    return false;
  }
  if (statement1.parts[0].type === "NOT" && statement1.parts[1].type !== "NOT") {
    if (statement1.parts[0].parts.length === 1) {
      if (getString(statement1.parts[0].parts[0]) === getString(statement1.parts[1])) {
        return true;
      }
    }
  } else if (statement1.parts[0].type !== "NOT" && statement1.parts[1].type === "NOT") {
    if (statement1.parts[1].parts.length === 1) {
      if (getString(statement1.parts[0]) === getString(statement1.parts[1].parts[0])) {
        return true;
      }
    }
  } else {
    return false;
  }
  return false;
}

let statement1 = getParsedStatement("A&~A")
let statement2 = getParsedStatement("⊥")//true

let statement3 = getParsedStatement("A|~A")
let statement4 = getParsedStatement("⊤")//true

let statement5 = getParsedStatement("(A&B)|~(A&B)")
let statement6 = getParsedStatement("⊤")//true

let statement7 = getParsedStatement("(A&B)|~(A&C)")
let statement8 = getParsedStatement("⊤")//false

let statement9 = getParsedStatement("(A&B)|~((A&B)&C)")
let statement10 = getParsedStatement("⊤")//false

let statement11 = getParsedStatement("A&(B|((A&B)|~(A&B)))")
let statement12 = getParsedStatement("A&(B|⊤)")//true

let statement13 = getParsedStatement("A|((A&B)|~(A&B))")
let statement14 = getParsedStatement("A|⊤")//true

console.log(ComplementVerifier(statement1, statement2))
console.log(ComplementVerifier(statement3, statement4))
console.log(ComplementVerifier(statement5, statement6))
console.log(ComplementVerifier(statement7, statement8))
console.log(ComplementVerifier(statement9, statement10))
console.log(ComplementVerifier(statement11, statement12))
console.log(ComplementVerifier(statement13, statement14))