/*
Implementation of the Identity rule
*/

import {getString, findChanges} from "../../Parser.js";

// Finds if user is doing Identity from statement 1 to 2 or vice-versa
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
  return findChanges(state1, state2, IdentityHelper, getString(state1), getString(state2));
}

// Identity logic
export function IdentityHelper(statement1, statement2) {
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

