import {getParsedStatement, getString} from "../Parser.js";

export function IdentityVerifier(statement1, statement2) {
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
  if (IdentityHelper(state1, state2)) {
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
      return IdentityHelper(state1, state2);
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

function IdentityHelper(statement1, statement2) {
  if (!statement1.type || statement1.type === "ATOMIC") {
    return false;
  }
  if (statement1.parts.length !== 2) {
    return false;
  }
  let connective1 = statement1.type;
  if (getString(statement1.parts[0]) === getString(statement2)) {
    if (statement1.parts[1].parts.length === 1) {
      if (statement1.parts[1].parts[0] === "⊤" && connective1 === "AND") {
        return true;
      }
      if (statement1.parts[1].parts[0] === "⊥" && connective1 === "OR") {
        return true;
      }
    }
  }
  return false;
}

let statement1 = getParsedStatement("A&⊤")
let statement2 = getParsedStatement("A")//true

let statement3 = getParsedStatement("A|⊥")
let statement4 = getParsedStatement("A")//true

let statement5 = getParsedStatement("(A&B)&⊤")
let statement6 = getParsedStatement("(A&B)")//true

let statement17 = getParsedStatement("(A|B)&⊤")
let statement18 = getParsedStatement("(A|B)")//true

let statement7 = getParsedStatement("A|B")
let statement8 = getParsedStatement("A")//false

let statement9 = getParsedStatement("A&(⊤|B)")
let statement10 = getParsedStatement("A")//false

let statement11 = getParsedStatement("(B&A)|(A|⊥)")
let statement12 = getParsedStatement("(B&A)|A")//true

let statement13 = getParsedStatement("(B&A)|(A|⊥)")
let statement14 = getParsedStatement("(B|A)|A")//false

let statement15 = getParsedStatement("(A|⊥)|(B&A)")
let statement16 = getParsedStatement("A|(B|A)")//false

let statement19 = getParsedStatement("((A&B)&⊤)|(C&D)")
let statement20 = getParsedStatement("((A&B)|(C&D))")//true

let statement21 = getParsedStatement("(C&D)|((A&B)&⊤)")
let statement22 = getParsedStatement("((C|D)|(A&B))")//false

console.log(IdentityVerifier(statement1, statement2))
console.log(IdentityVerifier(statement3, statement4))
console.log(IdentityVerifier(statement4, statement3))
console.log(IdentityVerifier(statement5, statement6))
console.log(IdentityVerifier(statement17, statement18))
console.log(IdentityVerifier(statement7, statement8))
console.log(IdentityVerifier(statement9, statement10))
console.log(IdentityVerifier(statement11, statement12))
console.log(IdentityVerifier(statement13, statement14))
console.log(IdentityVerifier(statement15, statement16))
console.log(IdentityVerifier(statement19, statement20))
console.log(IdentityVerifier(statement21, statement22))