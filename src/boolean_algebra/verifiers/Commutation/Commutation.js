import {getString, sortStatement} from "../../Parser.js";

export function CommutationVerifier(statement1, statement2) {
  sortStatement(statement1)
  sortStatement(statement2)
  return getString(statement1) === getString(statement2);
}

