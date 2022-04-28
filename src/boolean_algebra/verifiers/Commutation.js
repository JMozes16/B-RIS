import {getString} from "../Parser.js";

function Commutation(statement1, statement2) {
  if (statement1.type === statement2.type) {
    if (statement1.parts.length === statement2.parts.length) {
      let length = statement1.parts.length;
      let statement1Parts = []
      let statement2Parts = []
      for (let i = 0; i < length; i++) {
        statement1Parts.push(getString(statement1.parts[i]))
        statement2Parts.push(getString(statement2.parts[i]))
      }
      for (let i = 0; i < length; i++) {
        let index = statement1Parts.findIndex(statement2Parts[i])
        if (index >= 0) {
          if (index == i) {
            Commutation(statement1.parts[i], statement2.parts[i])
          }
        }
      }
    }
  }
  return false;
}

export function CommutationVerifier(statement1, statement2) {
  return false;
}