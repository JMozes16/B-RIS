/*
Implementation of the Complement rule
*/

import {getString, findChanges} from "../../Parser.js";

// Finds if user is doing Complement from statement 1 to 2 or vice-versa
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
  return findChanges(state1, state2, ComplementHelper, getString(state1), getString(state2));
}

// Complement logic
export function ComplementHelper(statement1, statement2) {
  if (!statement1.type || statement1.type === "ATOMIC") {
    return false;
  }
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