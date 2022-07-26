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

test('Test 3', () => {
  let statement1 = getParsedStatement("A&~⊥")
  let statement2 = getParsedStatement("A&⊤")
  expect(InverseVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("A&~⊥")
  let statement2 = getParsedStatement("B&⊤")
  expect(InverseVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("A&B&~⊥")
  let statement2 = getParsedStatement("A&B&⊤")
  expect(InverseVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("A&B&(C|~⊥)")
  let statement2 = getParsedStatement("A&B&(C|⊤)")
  expect(InverseVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 7', () => {
  let statement1 = getParsedStatement("A&B&(C|~⊥)")
  let statement2 = getParsedStatement("A&B&(C&⊤)")
  expect(InverseVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 8', () => {
  let statement1 = getParsedStatement("A&B&(C|~⊥)")
  let statement2 = getParsedStatement("A&B&(D|⊤)")
  expect(InverseVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 9', () => {
  let statement1 = getParsedStatement("(A&B)&~⊥")
  let statement2 = getParsedStatement("(A&B&C)&⊤")
  expect(InverseVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 10', () => {
  let statement1 = getParsedStatement("~⊥&B&~⊥")
  let statement2 = getParsedStatement("~⊥&B&⊤")
  expect(InverseVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 11', () => {
  let statement1 = getParsedStatement("~⊥&B&~⊥")
  let statement2 = getParsedStatement("⊤&B&⊤")
  expect(InverseVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 12', () => {
  let statement1 = getParsedStatement("~⊥&B&~⊥")
  let statement2 = getParsedStatement("~⊥&B&~⊥")
  expect(InverseVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 13', () => {
  let statement1 = getParsedStatement("~⊥&B&~⊥")
  let statement2 = getParsedStatement("⊤&B&~⊤")
  expect(InverseVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 14', () => {
  let statement1 = getParsedStatement("(~⊥&B)&~⊥")
  let statement2 = getParsedStatement("(⊤&B)&⊤")
  expect(InverseVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 15', () => {
  let statement1 = getParsedStatement("(~⊥&B)&~⊥")
  let statement2 = getParsedStatement("(B&⊤)&~⊤")
  expect(InverseVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 16', () => {
  let statement1 = getParsedStatement("~⊥")
  let statement2 = getParsedStatement("~⊤")
  expect(InverseVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 17', () => {
  let statement1 = getParsedStatement("~⊥")
  let statement2 = getParsedStatement("~⊥")
  expect(InverseVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 18', () => {
  let statement1 = getParsedStatement("⊤")
  let statement2 = getParsedStatement("⊤")
  expect(InverseVerifier(statement1, statement2)).toBeFalsy();
});