import {getParsedStatement} from "../../Parser.js";
import {AssociationVerifier} from "./Association";

test('Test 1', () => {
  let statement1 = getParsedStatement("(A|B)|C")
  let statement2 = getParsedStatement("A|(B|C)")
  expect(AssociationVerifier(statement1, statement2)).toBeTruthy();
});