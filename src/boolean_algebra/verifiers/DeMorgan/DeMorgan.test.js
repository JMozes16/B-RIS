import {getParsedStatement} from "../../Parser.js";
import {DeMorganVerifier} from "./DeMorgan";

test('Test 1', () => {
  let statement1 = getParsedStatement("~(A|B)")
  let statement2 = getParsedStatement("~A&~B")
  expect(DeMorganVerifier(statement1, statement2)).toBeTruthy();
});