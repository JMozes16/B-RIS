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

test('Test 12', () => { 
  let statement1 = getParsedStatement("~~(~A|~B)")
  let statement2 = getParsedStatement("(~A|~B)")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 13', () => { 
  let statement1 = getParsedStatement("~~(~A|~B)")
  let statement2 = getParsedStatement("(~A&~B)")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 14', () => { 
  let statement1 = getParsedStatement("~~A")
  let statement2 = getParsedStatement("(C)")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 15', () => { 
  let statement1 = getParsedStatement("~~A&B")
  let statement2 = getParsedStatement("(A&C)")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 16', () => { 
  let statement1 = getParsedStatement("~~A&~B")
  let statement2 = getParsedStatement("(A&~B)")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 17', () => { 
  let statement1 = getParsedStatement("~~A&~B")
  let statement2 = getParsedStatement("(A&B)")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 18', () => { 
  let statement1 = getParsedStatement("A&B")
  let statement2 = getParsedStatement("(~~A&~~B)")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 19', () => { 
  let statement1 = getParsedStatement("A&B")
  let statement2 = getParsedStatement("(~A&~~B)")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 20', () => { 
  let statement1 = getParsedStatement("~~A&~~B")
  let statement2 = getParsedStatement("A&~~B")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 21', () => { 
  let statement1 = getParsedStatement("A&~~B")
  let statement2 = getParsedStatement("~~A&~~B")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 22', () => { 
  let statement1 = getParsedStatement("~~~A&~~B")
  let statement2 = getParsedStatement("~A&~~B")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 23', () => { 
  let statement1 = getParsedStatement("~~~~A&~~B")
  let statement2 = getParsedStatement("~~A&~~B")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 24', () => { 
  let statement1 = getParsedStatement("A&~~B")
  let statement2 = getParsedStatement("~~A&~~~~B")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 25', () => { 
  let statement1 = getParsedStatement("A&~~B")
  let statement2 = getParsedStatement("~~A&~~~~C")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 26', () => { 
  let statement1 = getParsedStatement("~~(A&~~B)")
  let statement2 = getParsedStatement("(A&~~B)")
  expect(DoubleNegationVerifier(statement1, statement2)).toBeTruthy();
});
