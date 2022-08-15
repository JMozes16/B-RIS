/*
Implementation of the Commutation rule
*/

import {getString, sortStatement} from "../../Parser.js";

// Commutation logic (just recursively sorts each statement)
export function CommutationVerifier(statement1, statement2) {
  if (getString(statement1) === getString(statement2)) {
    return false;
  }
  sortStatement(statement1)
  sortStatement(statement2)
  return getString(statement1) === getString(statement2);
}

