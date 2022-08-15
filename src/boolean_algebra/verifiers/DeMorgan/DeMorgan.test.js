import {getParsedStatement} from "../../Parser.js";
import {DeMorganVerifier} from "./DeMorgan";

test('Test 1', () => {
  let statement1 = getParsedStatement("~(A|B)")
  let statement2 = getParsedStatement("~A&~B")
  expect(DeMorganVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("~(A&B)")
  let statement2 = getParsedStatement("~A|~B")
  expect(DeMorganVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 3', () => {
  let statement1 = getParsedStatement("~((A&B)|(C&D))")
  let statement2 = getParsedStatement("~(A&B)&~(C&D)")
  expect(DeMorganVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("~((A&B)|(C&D))")
  let statement2 = getParsedStatement("(~A&~B)&(~C&~D)")
  expect(DeMorganVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("~((A&B)|(C&D)|(E&G))")
  let statement2 = getParsedStatement("~(A&B)&~(C&D)&~(E&G)")
  expect(DeMorganVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("~(A|(B&C))")
  let statement2 = getParsedStatement("~A&~(B&C)")
  expect(DeMorganVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 7', () => {
  let statement1 = getParsedStatement("~(A|(B&C&~D))")
  let statement2 = getParsedStatement("~A&~(B&C&~D)")
  expect(DeMorganVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 8', () => {
  let statement1 = getParsedStatement("~(A|(B&C&~D))")
  let statement2 = getParsedStatement("~A&~(F&C&~D)")
  expect(DeMorganVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 9', () => {
  let statement1 = getParsedStatement("~(A|(B&C)|D)")
  let statement2 = getParsedStatement("~A&~(B&C)&~D")
  expect(DeMorganVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 10', () => {
  let statement2 = getParsedStatement("~(A|(B&C)|(D&E))")
  let statement1 = getParsedStatement("~A&~(B&C)&~(D&E)")
  expect(DeMorganVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 11', () => {
  let statement1 = getParsedStatement("(~(A|B)|~(C|D))&G")
  let statement2 = getParsedStatement("~((A|B)&(C|D))&G")
  expect(DeMorganVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 12', () => {
  let statement1 = getParsedStatement("(~((A|B))|~((C|D)))&G")
  let statement2 = getParsedStatement("((~A&~B)|(~C&~D))&G")
  expect(DeMorganVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 13', () => {
  let statement1 = getParsedStatement("~((A&G)|(B&C)|(D&E))")
  let statement2 = getParsedStatement("~(P&G)&~(B&C)&~(D&E)")
  expect(DeMorganVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 14', () => {
  let statement1 = getParsedStatement("~(A|((B&C)&(D&~E)))")
  let statement2 = getParsedStatement("~A&(~(B&C)&(D&~E))")
  expect(DeMorganVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 15', () => {
  let statement1 = getParsedStatement("~((A&G)|(B&C)|(D&E))")
  let statement2 = getParsedStatement("~(A&G)|~(B&C)|~(D&E)")
  expect(DeMorganVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 16', () => {
  let statement1 = getParsedStatement("(~(A|B)|(C|D))&G")
  let statement2 = getParsedStatement("~((A|B)&(C|D))&G")
  expect(DeMorganVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 17', () => {
  let statement1 = getParsedStatement("(~(A|B)|(C|D))")
  let statement2 = getParsedStatement("(~(A|B)|(C|D))")
  expect(DeMorganVerifier(statement1, statement2)).toBeFalsy();
});