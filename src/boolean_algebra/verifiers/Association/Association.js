/*
Implementation of the Association rule
*/

import {getString} from "../../Parser.js";

// Recursively iterates through statements to get rid of all extra parentheses
// If the rule works both statements should then be the same
function dissolve(statement) {
  if (statement.type === "ATOMIC") {
    return statement
  } else if (statement.type === "NOT") {
    return dissolve(statement.parts[0])
  } else {
    let length = statement.parts.length;
    let newParts = [];
    for (let i = 0; i < length; i++) {
      if (statement.type === statement.parts[i].type) {
        for (let x = 0; x < statement.parts[i].parts.length; x++) {
          dissolve(statement.parts[i].parts[x])
          newParts.push(statement.parts[i].parts[x])
        }
      } else {
        dissolve(statement.parts[i])
        newParts.push(statement.parts[i])
      }
    }
    statement.parts = newParts;
  }
}

// Checks if the statements are the same after dissolving
export function AssociationVerifier(statement1, statement2) {
  dissolve(statement1)
  dissolve(statement2)
  return getString(statement1) === getString(statement2);
}
