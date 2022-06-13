import {getString} from "../../Parser.js";

export function DoubleNegationVerifier(statement1, statement2) {
  let string1 = getString(statement1).replace(/~~/g, "");
  let string2 = getString(statement2).replace(/~~/g, "");
  return string1 === string2;
}