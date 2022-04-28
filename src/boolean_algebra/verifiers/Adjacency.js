import {getParsedStatement} from "../Parser.js";

export function AdjacencyVerifier(statement1, statement2) {
  return false;
}

let statement1 = getParsedStatement("(A|B)&(A|~B)")
let statement2 = getParsedStatement("A")

console.log(AdjacencyVerifier(statement1, statement2))