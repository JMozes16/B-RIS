import {getParsedStatement} from "../../Parser.js";
import {ReductionVerifier} from "./Reduction";

test('Test 1', () => {
  let statement1 = getParsedStatement("A&(~A|B)")
  let statement2 = getParsedStatement("A&B")
  expect(ReductionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("A|(~A&B)")
  let statement2 = getParsedStatement("A|B")
  expect(ReductionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 3', () => {
  let statement1 = getParsedStatement("(~A&B)|A")
  let statement2 = getParsedStatement("A|B")
  expect(ReductionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("(A&B)|(~(A&B)&(C|D))")
  let statement2 = getParsedStatement("(A&B)|(C|D)")
  expect(ReductionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("A|(~A&B)")
  let statement2 = getParsedStatement("A|B")
  expect(ReductionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("C&(A|(~A&B))&D")
  let statement2 = getParsedStatement("C&(A|B)&D")
  expect(ReductionVerifier(statement1, statement2)).toBeTruthy();
});