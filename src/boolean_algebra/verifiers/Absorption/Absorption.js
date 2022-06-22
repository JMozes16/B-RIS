import {getString, findChanges} from "../../Parser.js";

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
  return findChanges(state1, state2, AbsorptionHelper, getString(state1), getString(state2));
}

export function AbsorptionHelper(statement1,statement2){
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