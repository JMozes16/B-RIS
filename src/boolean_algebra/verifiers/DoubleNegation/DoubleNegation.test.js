import {getParsedStatement} from "../../Parser.js";
import {DoubleNegationVerifier} from "./DoubleNegation";

test('Test 1', () => {
  let statement1 = getParsedStatement("~~A")
  let statement2 = getParsedStatement("A")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("~A")
  let statement2 = getParsedStatement("A")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 3', () => {
  let statement1 = getParsedStatement("~~A&B")
  let statement2 = getParsedStatement("A&B")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("A&~~B")
  let statement2 = getParsedStatement("A&B")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("~~A|B")
  let statement2 = getParsedStatement("A|B")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("~~~A")
  let statement2 = getParsedStatement("A")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 7', () => {
let statement1 = getParsedStatement("~(~~(~~A))")
let statement2 = getParsedStatement("((A))")
expect(DoubleNegationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 8', () => {
  let statement1 = getParsedStatement("~(~~(~~A))")
  let statement2 = getParsedStatement("~((A))")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
  });

test('Test 9', () => {
  let statement1 = getParsedStatement("~~~~A")
  let statement2 = getParsedStatement("A")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 10', () => {
  let statement1 = getParsedStatement("~~(~~A)")
  let statement2 = getParsedStatement("(A)")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 11', () => { 
  let statement1 = getParsedStatement("~(~A|~B)")
  let statement2 = getParsedStatement("(A&B)")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeFalsy();
});