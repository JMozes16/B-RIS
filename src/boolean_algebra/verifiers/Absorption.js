import {getParsedStatement} from "../Parser.js";

export function AbsorptionVerifier(statement1, statement2) {
  return false;
}

let statement1 = getParsedStatement("A&(A|B)")
let statement2 = getParsedStatement("A")

console.log(AbsorptionVerifier(statement1, statement2))