import {getParsedStatement} from "../../Parser.js";
import {CommutationVerifier} from "./Commutation";

test('Test 1', () => {
  let statement1 = getParsedStatement("A|B")
  let statement2 = getParsedStatement("B|A")
  expect(CommutationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("B|A")
  let statement2 = getParsedStatement("A|B")
  expect(CommutationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 3', () => {
  let statement1 = getParsedStatement("A&B")
  let statement2 = getParsedStatement("B&A")
  expect(CommutationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("B&A")
  let statement2 = getParsedStatement("A&B")
  expect(CommutationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("(A&B)|C")
  let statement2 = getParsedStatement("(B&A)|C")
  expect(CommutationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("(A|C)&B")
  let statement2 = getParsedStatement("(C|A)&B")
  expect(CommutationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 7', () => {
  let statement1 = getParsedStatement("(A&B)|(B&C)")
  let statement2 = getParsedStatement("(B&A)|(B&C)")
  expect(CommutationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 8', () => {
  let statement1 = getParsedStatement("a&b&c")
  let statement2 = getParsedStatement("c&a&b")
  expect(CommutationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 9', () => {
  let statement1 = getParsedStatement("A&B&C")
  let statement2 = getParsedStatement("a&b&c")
  expect(CommutationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 10', () => {
  let statement1 = getParsedStatement("(A&B)|C")
  let statement2 = getParsedStatement("(A&C)|B")
  expect(CommutationVerifier(statement1, statement2)).toBeFalsy(); 
});

test('Test 11', () => {
  let statement1 = getParsedStatement("(A&B)|C")
  let statement2 = getParsedStatement("(A|C)&B")
  expect(CommutationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 12', () => {
  let statement1 = getParsedStatement("A|B|C")
  let statement2 = getParsedStatement("A&B&C")
  expect(CommutationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 13', () => {
  let statement1 = getParsedStatement("a|B")
  let statement2 = getParsedStatement("b|A")
  expect(CommutationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 14', () => {
  let statement1 = getParsedStatement("((A&B&C)|g)|(E&f)")
  let statement2 = getParsedStatement("(E&f)|(g&(A&B&C))")
  expect(CommutationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 15', () => {
  let statement1 = getParsedStatement("(A&B&D)|(E&C)")
  let statement2 = getParsedStatement("(B&D&E)|(A&C)")
  expect(CommutationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 16', () => {
  let statement1 = getParsedStatement("((A&B&C)|g)|(E&f)")
  let statement2 = getParsedStatement("(E&f)|(g|(A&B&C))")
  expect(CommutationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 17', () => {
  let statement1 = getParsedStatement("((A&B&C)|g)|(E&f)")
  let statement2 = getParsedStatement("((A&B&C)|g)|(E&f)")
  expect(CommutationVerifier(statement1, statement2)).toBeFalsy();
});