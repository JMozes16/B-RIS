import {getString, findChanges} from "../../Parser.js";

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
  return findChanges(state1, state2, IdempotenceHelper);
}

export function IdempotenceHelper(statement1,statement2){
  if (!statement1.type) {
    return false;
  }
  let count = false;
  let answers = []; 
  let str = "(";
  if (statement1.type !== "AND" && statement1.type !== "OR") {
    return false;
  }
  for (let i = 0; i < statement1.parts.length-1; i++){
    if (getString(statement1.parts[i]) === getString(statement1.parts[i+1])){
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
    if (getString(statement2) === answers[i]) return true;
  }


  return false;
}



