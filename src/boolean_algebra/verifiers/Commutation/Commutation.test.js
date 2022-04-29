import {getParsedStatement} from "../../Parser.js";
import {CommutationVerifier} from "./Commutation";

test('Test 1', () => {
  let statement1 = getParsedStatement("A|B")
  let statement2 = getParsedStatement("B|A")
  expect(CommutationVerifier(statement1, statement2)).toBeTruthy();
});