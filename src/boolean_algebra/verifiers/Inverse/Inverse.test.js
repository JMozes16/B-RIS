import {getParsedStatement} from "../../Parser.js";
import {InverseVerifier} from "./Inverse";

test('Test 1', () => {
  let statement1 = getParsedStatement("~⊤")
  let statement2 = getParsedStatement("⊥")
  expect(InverseVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("~⊥")
  let statement2 = getParsedStatement("⊤")
  expect(InverseVerifier(statement1, statement2)).toBeTruthy();
});