/*
Implementation of the Annihilation rule
*/

import {getString, findChanges} from "../../Parser.js";

// Finds if user is doing Adjacency from statement 1 to 2 or vice-versa
export function AnnihilationVerifier(statement1, statement2) {
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
  return findChanges(state1, state2, AnnihilationHelper, getString(state1), getString(state2));
}

// Annihilation logic
export function AnnihilationHelper(statement1,statement2){
  if (!statement1.type || statement1.type === "ATOMIC") {
    return false;
  }
  let connective1 = statement1.type;
  for (let i=0; i<statement1.parts.length; i++) {
    if (getString(statement1.parts[i]) === getString(statement2)){
      if (statement1.parts[i].parts.length === 1) {
        if (statement1.parts[i].parts[0] === "⊥" && connective1 === "AND") {
          return true;
        }
        if (statement1.parts[i].parts[0] === "⊤" && connective1 === "OR") {
          return true;
        }
      }
    }
  }
  return false;
}