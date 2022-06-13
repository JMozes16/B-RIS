import {getString} from "../../Parser.js";

export function AdjacencyVerifier(statement1, statement2) {
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
  if (AdjacencyHelper(state1, state2)) {
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
      return AdjacencyHelper(state1, state2);
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

function AdjacencyHelper(statement1, statement2) {
  if (!statement1.type || statement1.type === "ATOMIC") {
    return false;
  }
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