import {getParsedStatement, getString} from "../Parser.js";

export function ReductionVerifier(statement1, statement2) {
  if (getString(statement1).length > getString(statement2).length) {
    return ReductionHelper(statement1, statement2);
  } else if (getString(statement2).length > getString(statement1).length) {
    return ReductionHelper(statement2, statement1);
  } else {
    return false;
  }
}

function ReductionHelper(statement1, statement2) {
  let connective1 = statement1.type;
  let LHS = statement1.parts[0];
  let RHS = statement1.parts[1];
  let reductStr = "(";
  if (RHS.parts.length === 2) { 
    if (RHS.parts[0].type === "NOT") {
      if (getString(RHS.parts[0].parts[0]) === getString(LHS)) {
        if (LHS.type === "ATOMIC" && RHS.parts[1].type === "ATOMIC") {
          reductStr += LHS.parts[0] + connective1 + RHS.parts[1].parts[0];
        } else if (LHS.type !== "ATOMIC" && RHS.parts[1].type === "ATOMIC") {
          reductStr += getString(LHS) + connective1 + RHS.parts[1].parts[0];
        } else if (LHS.type === "ATOMIC" && RHS.parts[1].type !== "ATOMIC") {
          reductStr += LHS.parts[0] + connective1 + getString(RHS.parts[1]);
        } else {
          reductStr += getString(LHS) + connective1 + getString(RHS.parts[1]);
        }
      }
    }    
  }
  reductStr += ")";
  reductStr = reductStr.replace("AND", "&");
  reductStr = reductStr.replace("OR", "|");
  reductStr = reductStr.replace("NOT", "~");
  console.log(reductStr);
  return (reductStr === getString(statement2));
}

let statement1 = getParsedStatement("A&(~A|B)")
let statement2 = getParsedStatement("A&B")

let statement3 = getParsedStatement("A|(~A&B)")
let statement4 = getParsedStatement("A|B")

let statement5 = getParsedStatement("(A&B)|(~(A&B)&(C|D))")
let statement6 = getParsedStatement("(A&B)|(C|D)")

let statement7 = getParsedStatement("A|(~A&B)")
let statement8 = getParsedStatement("A|B")

console.log(ReductionVerifier(statement1, statement2))
console.log(ReductionVerifier(statement3, statement4))
console.log(ReductionVerifier(statement5, statement6))
console.log(ReductionVerifier(statement7, statement8))