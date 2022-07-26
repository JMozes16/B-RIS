import {getString} from "../../Parser.js";

function replace(str) {
  return str.replace(/~⊤/g, "⊥").replace(/~⊥/g, "⊤");
}

export function InverseVerifier(statement1, statement2) {
  return replace(getString(statement1)) === replace(getString(statement2)) && getString(statement1) !== getString(statement2);
}