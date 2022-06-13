import {getString} from "../../Parser.js";

export function AbsorptionVerifier(statement1, statement2) {
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
  if (AbsorptionHelper(state1, state2)) {
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
      return AbsorptionHelper(state1, state2);
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

function AbsorptionHelper(statement1,statement2){
  if (!statement1.type || statement1.type === "ATOMIC") {
    return false;
  }
  let connective1 = statement1.type;
  let RHS = statement1.parts[0];
  let LHS = statement1.parts[1];
  if (getString(statement1.parts[0]).length > getString(statement1.parts[1]).length) {
    RHS = statement1.parts[0];
    LHS = statement1.parts[1];
  } else {
    RHS = statement1.parts[1];
    LHS = statement1.parts[0];
  }
  if (!RHS.type || RHS.type === "ATOMIC") {
    return false;
  }
  if (RHS.parts.length === 2){
    if (getString(RHS.parts[0]) === getString(LHS)){
      if (connective1 === "AND" && RHS.type === "OR") {
        return (getString(RHS.parts[0]) === getString(statement2));
      }
      else if (connective1 === "OR" && RHS.type === "AND") {
        return (getString(RHS.parts[0]) === getString(statement2));
      }
    } else if (getString(RHS.parts[1]) === getString(LHS)) {
      if (connective1 === "AND" && RHS.type === "OR") {
        return (getString(RHS.parts[1]) === getString(statement2));
      }
      else if (connective1 === "OR" && RHS.type === "AND") {
        return (getString(RHS.parts[1]) === getString(statement2));
      }
    }

  }
  return false
}