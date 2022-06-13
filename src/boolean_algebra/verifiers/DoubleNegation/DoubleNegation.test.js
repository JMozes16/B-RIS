import {getParsedStatement} from "../../Parser.js";
import {DoubleNegationVerifier} from "./DoubleNegation";

test('Test 1', () => {
  let statement1 = getParsedStatement("~~A")
  let statement2 = getParsedStatement("A")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});