import {getParsedStatement, getString} from "../Parser.js";

export function IdentityVerifier(statement1, statement2) {
  return (IdentityHelper(statement1, statement2) || IdentityHelper(statement2, statement1));
}

function IdentityHelper(statement1, statement2) {
  if (statement1.parts.length !== 2) {
    return false;
  }
  let connective1 = statement1.type;
  if (getString(statement1.parts[0]) === getString(statement2)) {
    if (statement1.parts[1].parts.length === 1) {
      if (statement1.parts[1].parts[0] === "⊤" && connective1 === "AND") {
        return true;
      }
      if (statement1.parts[1].parts[0] === "⊥" && connective1 === "OR") {
        return true;
      }
    }
  }
  return false;
}

let statement1 = getParsedStatement("A&⊤")
let statement2 = getParsedStatement("A")

let statement3 = getParsedStatement("A|⊥")
let statement4 = getParsedStatement("A")

let statement5 = getParsedStatement("(A&B)&⊤")
let statement6 = getParsedStatement("(A&B)")

let statement7 = getParsedStatement("A|B")
let statement8 = getParsedStatement("A")

let statement9 = getParsedStatement("A&(⊤|B)")
let statement10 = getParsedStatement("A")

console.log(IdentityVerifier(statement1, statement2))
console.log(IdentityVerifier(statement3, statement4))
console.log(IdentityVerifier(statement4, statement3))
console.log(IdentityVerifier(statement5, statement6))
console.log(IdentityVerifier(statement7, statement8))
console.log(IdentityVerifier(statement9, statement10))
