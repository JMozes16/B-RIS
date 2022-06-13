import {getParsedStatement} from "../../Parser.js";
import {IdentityVerifier} from "./Identity";

test('Test 1', () => {
  let statement1 = getParsedStatement("A&⊤")
  let statement2 = getParsedStatement("A")
  expect(IdentityVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("A|⊥")
  let statement2 = getParsedStatement("A")
  expect(IdentityVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 3', () => {
  let statement1 = getParsedStatement("(A&B)&⊤")
  let statement2 = getParsedStatement("(A&B)")
  expect(IdentityVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("(A|B)&⊤")
  let statement2 = getParsedStatement("(A|B)")
  expect(IdentityVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("A|B")
  let statement2 = getParsedStatement("A")
  expect(IdentityVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("A&(⊤|B)")
  let statement2 = getParsedStatement("A")
  expect(IdentityVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 7', () => {
  let statement1 = getParsedStatement("(B&A)|(A|⊥)")
  let statement2 = getParsedStatement("(B&A)|A")
  expect(IdentityVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 8', () => {
  let statement1 = getParsedStatement("(B&A)|(A|⊥)")
  let statement2 = getParsedStatement("(B|A)|A")
  expect(IdentityVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 9', () => {
  let statement1 = getParsedStatement("(A|⊥)|(B&A)")
  let statement2 = getParsedStatement("A|(B|A)")
  expect(IdentityVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 10', () => {
  let statement1 = getParsedStatement("((A&B)&⊤)|(C&D)")
  let statement2 = getParsedStatement("((A&B)|(C&D))")
  expect(IdentityVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 11', () => {
  let statement1 = getParsedStatement("(C&D)|((A&B)&⊤)")
  let statement2 = getParsedStatement("((C|D)|(A&B))")
  expect(IdentityVerifier(statement1, statement2)).toBeFalsy();
});