import {getParsedStatement, getString} from "../Parser.js";

export function IdempotenceVerifier(statement1, statement2) {
  let state1 = statement1;
  let state2 = statement2;
  if (getString(statement1).length > getString(statement2).length) {
    state1 = statement1;
    state2 = statement2;
  } else if (getString(statement2).length > getString(statement1).length) {
    state1 = statement2;
    state2 = statement1;
  } else {
    return false;
  }
  return FindChanges(state1, state2, getString(state1), getString(state2));
}

function FindChanges(state1, state2, str1, str2) {
  if (IdempotenceHelper(state1, state2)) {
    return true;
  }
  let spot = -1;
  if (!state2.type) {
    return false;
  }
  for (let i=0; i<state2.parts.length; i++) {
    if (state2.type === state1.type) {
      if (state2.type === "ATOMIC") {
        if (state2.parts[i].type !== state1.parts[i].type || state2.parts[i] !== state1.parts[i]) {
          spot = i;
        }
      } else {
        if (state2.parts[i].type !== state1.parts[i].type || getString(state2.parts[i]) !== getString(state1.parts[i])) {
          spot = i;
        }
      }
    } else {
      return IdempotenceHelper(state1, state2);
    }
  }
  if (spot === -1) {
    return false;
  } else {
    if (FindChanges(state1.parts[spot], state2.parts[spot], str1, str2)) {
      if (str1.replace(getString(state1.parts[spot]), getString(state2.parts[spot])) === str2) {
        return true;
      }
    }
  }
  return false;
}

function IdempotenceHelper(statement1,statement2){
  let count = false;
  let answers = []; 
  let str = "(";
  if (statement1.type !== "AND" && statement1.type !== "OR") {
    return false;
  }
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

let statement10 = getParsedStatement("((A&B)&(A&B)&(A&B))&(E|F)");
let statement11 = getParsedStatement("((A&B)&(A&B))&(E|F)");

let statement12 = getParsedStatement("(C|D)&((A&B)&(A&B)&(A&B))&(E|F)");
let statement13 = getParsedStatement("(C|D)&((A&B)&(A&B))&(E|G)");

let statement14 = getParsedStatement("(C|D)&((A&B)&(A&B)&(A&B))&(E|F)");
let statement15 = getParsedStatement("(C|D)&((A&B)&(A&B))&(E|F)");

console.log(IdempotenceVerifier(statement3,statement1)); //true
console.log(IdempotenceVerifier(statement3,statement2)); //true 
console.log(IdempotenceVerifier(statement4,statement5)); //true
console.log(IdempotenceVerifier(statement6,statement7)); //true
console.log(IdempotenceVerifier(statement8,statement9)); //true
console.log(IdempotenceVerifier(statement10,statement11)); //true
console.log(IdempotenceVerifier(statement12,statement13)); //false
console.log(IdempotenceVerifier(statement14,statement15)); //true

