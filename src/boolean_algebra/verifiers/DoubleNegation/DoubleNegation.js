/*
Implementation of the Double Negation rule
*/

import {getString} from "../../Parser.js";

// Double Negation logic
export function DoubleNegationVerifier(statement1, statement2) {
  if (getString(statement1) === getString(statement2)) {
    return false;
  }
  let string1 = getString(statement1).replace(/~~/g, "");
  let string2 = getString(statement2).replace(/~~/g, "");
  return string1 === string2;
}