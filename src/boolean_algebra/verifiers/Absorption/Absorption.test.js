import {getParsedStatement} from "../../Parser.js";
import {AbsorptionVerifier} from "./Absorption.js";

test('Test 1', () => {
  let statement1 = getParsedStatement("A&(A|B)")
  let statement2 = getParsedStatement("A")
  expect(AbsorptionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("(A&B)|A")
  let statement2 = getParsedStatement("A")
  expect(AbsorptionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 3', () => {
  let statement1 = getParsedStatement("A|(A|B)")
  let statement2 = getParsedStatement("A")
  expect(AbsorptionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("A&(A&B)")
  let statement2 = getParsedStatement("A")
  expect(AbsorptionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("(A|B)&((A&B)|C)")
  let statement2 = getParsedStatement("(A&B)")
  expect(AbsorptionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("(A&B)&((A&B)|C)")
  let statement2 = getParsedStatement("(A&B)")
  expect(AbsorptionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 7', () => {
  let statement1 = getParsedStatement("D&((A&B)&((A&B)|C))")
  let statement2 = getParsedStatement("D&(A&B)")
  expect(AbsorptionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 8', () => {
  let statement1 = getParsedStatement("D&((A&B)&(C|(A&B)))&E")
  let statement2 = getParsedStatement("D&(A&B)&F")
  expect(AbsorptionVerifier(statement1, statement2)).toBeFalsy();
});