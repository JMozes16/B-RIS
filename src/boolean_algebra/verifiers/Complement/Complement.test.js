import {getParsedStatement} from "../../Parser.js";
import {ComplementVerifier} from "./Complement";















test('Test 1', () => {
  let statement1 = getParsedStatement("A&~A")
  let statement2 = getParsedStatement("⊥")
  expect(ComplementVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("A|~A")
  let statement2 = getParsedStatement("⊤")
  expect(ComplementVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 3', () => {
  let statement1 = getParsedStatement("(A&B)|~(A&B)")
  let statement2 = getParsedStatement("⊤")
  expect(ComplementVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("(A&B)|~(A&C)")
  let statement2 = getParsedStatement("⊤")
  expect(ComplementVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("(A&B)|~((A&B)&C)")
  let statement2 = getParsedStatement("⊤")
  expect(ComplementVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("A&(B|((A&B)|~(A&B)))")
  let statement2 = getParsedStatement("A&(B|⊤)")
  expect(ComplementVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 7', () => {
  let statement1 = getParsedStatement("A|((A&B)|~(A&B))")
  let statement2 = getParsedStatement("A|⊤")
  expect(ComplementVerifier(statement1, statement2)).toBeTruthy();
});