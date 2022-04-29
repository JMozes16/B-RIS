import {getParsedStatement} from "../../Parser.js";
import {IdempotenceVerifier} from "./Idempotence";

test('Test 1', () => {
  let statement1 = getParsedStatement("A&A&A");
  let statement2 = getParsedStatement("A&A");
  let statement3 = getParsedStatement("A");
  expect(IdempotenceVerifier(statement1, statement2)).toBeTruthy();
  expect(IdempotenceVerifier(statement1, statement3)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("(A|A)|(A|A)");
  let statement2 = getParsedStatement("(A|A)");
  expect(IdempotenceVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 3', () => {
  let statement1 = getParsedStatement("A&A&A&B&B&B");
  let statement2 = getParsedStatement("A&A&B&B");
  expect(IdempotenceVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("(A&B)&(A&B)&(A&B)");
  let statement2 = getParsedStatement("(A&B)&(A&B)");
  expect(IdempotenceVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("((A&B)&(A&B)&(A&B))&(E|F)");
  let statement2 = getParsedStatement("((A&B)&(A&B))&(E|F)");
  expect(IdempotenceVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("(C|D)&((A&B)&(A&B)&(A&B))&(E|F)");
  let statement2 = getParsedStatement("(C|D)&((A&B)&(A&B))&(E|G)");
  expect(IdempotenceVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 7', () => {
  let statement1 = getParsedStatement("(C|D)&((A&B)&(A&B)&(A&B))&(E|F)");
  let statement2 = getParsedStatement("(C|D)&((A&B)&(A&B))&(E|F)");
  expect(IdempotenceVerifier(statement1, statement2)).toBeTruthy();
});
