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

test('Test 7', () => {
  let statement1 = getParsedStatement("A&(~A|B)")
  let statement2 = getParsedStatement("(A&~A)|(A&B)")
  expect(ReductionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 8', () => {
  let statement1 = getParsedStatement("~A&(C|D)")
  let statement2 = getParsedStatement("C&D")
  expect(ReductionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 9', () => {
  let statement1 = getParsedStatement("A&(A|B|~A)")
  let statement2 = getParsedStatement("A|B")
  expect(ReductionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 10', () => {
  let statement1 = getParsedStatement("(~A&A)|(b&~b)|(c&~C)")
  let statement2 = getParsedStatement("c")
  expect(ReductionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 11', () => {
  let statement1 = getParsedStatement("(c&~C)")
  let statement2 = getParsedStatement("")
  expect(ReductionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 12', () => {
  let statement1 = getParsedStatement("(A|~A)&(~A|A)")
  let statement2 = getParsedStatement("A&A")
  expect(ReductionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 13', () => {
  let statement1 = getParsedStatement("(x | y) & (x | ~y)")
  let statement2 = getParsedStatement("x")
  expect(ReductionVerifier(statement1, statement2)).toBeTruthy();
}); 

test('Test 14', () => {
  let statement1 = getParsedStatement("(x & y) | (x & ~y)")
  let statement2 = getParsedStatement("y")
  expect(ReductionVerifier(statement1, statement2)).toBeFalsy();
});
