import {getString, findChanges} from "../../Parser.js";

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
  return findChanges(state1, state2, ReductionHelper, getString(state1), getString(state2));
}

export function ReductionHelper(statement1, statement2) {
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

