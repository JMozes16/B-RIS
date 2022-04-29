import {getString} from "../Parser";

function DeMorgan(statement) {
  let newStatement = {
    type: "",
    parts: [],
  };
  if (statement.parts[0].type === "AND") {
    newStatement.type = "OR";
  } else if(statement.parts[0].type === "OR") {
    newStatement.type = "AND";
  }
  for (let i = 0; i < statement.parts[0].parts.length; i++) {
    newStatement.parts.push({
      type: "NOT",
      parts: [statement.parts[0].parts[i]],
    });
  }
  return newStatement;
}

function DeMorganHelper(statement1, statement2) {
  if (getString(statement1) === getString(statement2)) {
    return true;
  }
  if (statement1.type === "AND" || statement1.type === "OR") {
    if ((statement1.type !== statement2.type) ||
      (statement1.parts.length !== statement2.parts.length)) {
      return false;
    }
    for (let i = 0; i < statement1.parts.length; i++) {
      if (!DeMorganVerifier(statement1.parts[i], statement2.parts[i])) {
        return false;
      }
    }
    return true
  } else if(statement1.type === "NOT") {
    if (statement2.type === "NOT") {
      return DeMorganVerifier(statement1.parts[0], statement2.parts[0]);
    } else {
      return getString(DeMorgan(statement1)) === getString(statement2);
    }
  } else {
    return false;
  }
}

export function DeMorganVerifier(statement1, statement2) {
  return DeMorganHelper(statement1, statement2) || DeMorganHelper(statement2, statement1);
}