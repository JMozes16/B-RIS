import {getParsedStatement, getString} from "../Parser.js";

export function ComplementVerifier(statement1, statement2) {
  return (ComplementHelper(statement1, statement2) || ComplementHelper(statement1, statement2));
}

function ComplementHelper(statement1, statement2) {
  if (statement1.parts.length !== 2) {
    return false;
  }
  if (statement2.parts.length !== 1) {
    return false;
  }
  if (statement1.parts[0].type === "NOT" && statement1.parts[1].type !== "NOT") {
    if (statement1.parts[0].parts.length === 1) {
      if (getString(statement1.parts[0].parts[0]) === getString(statement1.parts[1])) {
        return true;
      }
    }
  } else if (statement1.parts[0].type !== "NOT" && statement1.parts[1].type === "NOT") {
    if (statement1.parts[1].parts.length === 1) {
      if (getString(statement1.parts[0]) === getString(statement1.parts[1].parts[0])) {
        return true;
      }
    }
  } else {
    return false;
  }
  return false;
}

let statement1 = getParsedStatement("A&~A")
let statement2 = getParsedStatement("⊥")//true

let statement3 = getParsedStatement("A|~A")
let statement4 = getParsedStatement("⊤")//true

let statement5 = getParsedStatement("(A&B)|~(A&B)")
let statement6 = getParsedStatement("⊤")//true

let statement7 = getParsedStatement("(A&B)|~(A&C)")
let statement8 = getParsedStatement("⊤")//false

let statement9 = getParsedStatement("(A&B)|~((A&B)&C)")
let statement10 = getParsedStatement("⊤")//false

console.log(ComplementVerifier(statement1, statement2))
console.log(ComplementVerifier(statement3, statement4))
console.log(ComplementVerifier(statement5, statement6))
console.log(ComplementVerifier(statement7, statement8))
console.log(ComplementVerifier(statement9, statement10))