/*
Implementation of the Inverse rule
*/

import {getString} from "../../Parser.js";

// Replaces sybols for identity
function replace(str) {
  return str.replace(/~⊤/g, "⊥").replace(/~⊥/g, "⊤");
}

// Checks if replaced symbols result in same statement
export function InverseVerifier(statement1, statement2) {
  return replace(getString(statement1)) === replace(getString(statement2)) && getString(statement1) !== getString(statement2);
}