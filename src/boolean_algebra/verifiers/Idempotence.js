import {getParsedStatement, getString} from "../Parser.js";

export function IdempotenceVerifier(statement1, statement2) {
  return IdempotenceHelper(statement1,statement2);
}

function IdempotenceHelper(statement1,statement2){
  let count = false;
  let answers = []; 
  let str = "(";
  for (let i = 0; i < statement1.parts.length-1; i++){
    if (getString(statement1.parts[i]) == getString(statement1.parts[i+1])){
      if (statement1.parts[i].type !== "ATOMIC") {
        count = true;
      }
       if (i === statement1.parts.length-2) 
        str+= getString(statement1.parts[i]);
      else 
        str += getString(statement1.parts[i]) + statement1.type;
      if (statement2.type === "ATOMIC") answers.push(getString(statement1.parts[i]));
      else{
        str = str.replace("AND","&");
        str = str.replace("OR","|");
        str = str.replace("NOT","~");
        answers.push(str);
      } 
    }
  }
  for(let i = 0; i < answers.length; i++){
    if (count === true){
      answers[i] = answers[i].substring(1,answers[i].length-1);
    }
    if (statement2.parts.length > 1){
      if (statement2.parts[0].parts.length > 1) {
        let temp = "(";
        temp += answers[i] + ")";
        answers[i] = temp
      }
    }
    if (statement2.type !== "ATOMIC") answers[i] += ")";
    console.log("Ans",answers[i]);
    console.log("state2",getString(statement2))
    if (getString(statement2) == answers[i]) return true;
  }


  return false;
}

let statement1 = getParsedStatement("A&A");
let statement2 = getParsedStatement("A");

let statement3 = getParsedStatement("A&A&A");

let statement4 = getParsedStatement("(A|A)|(A|A)");
let statement5 = getParsedStatement("(A|A)");

let statement6 = getParsedStatement("A&A&A&B&B&B");
let statement7 = getParsedStatement("A&A&B&B");

let statement8 = getParsedStatement("(A&B)&(A&B)&(A&B)");
let statement9 = getParsedStatement("(A&B)&(A&B)");
console.log(IdempotenceVerifier(statement3,statement1)); //true
console.log(IdempotenceVerifier(statement3,statement2)); //true 
console.log(IdempotenceVerifier(statement4,statement5));
console.log(IdempotenceVerifier(statement6,statement7))
console.log(IdempotenceVerifier(statement8,statement9))
