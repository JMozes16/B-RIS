import {getParsedStatement} from "../../Parser.js";
import {AnnihilationVerifier} from "./Annihilation";

test('Test 1', () => {
  let statement1 = getParsedStatement("A|⊤")
  let statement2 = getParsedStatement("⊤")
  expect(AnnihilationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("A&⊥")
  let statement2 = getParsedStatement("⊥")
  expect(AnnihilationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 3', () => {
  let statement1 = getParsedStatement("(A&B)&⊥")
  let statement2 = getParsedStatement("⊥")
  expect(AnnihilationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("(A|B)|⊤")
  let statement2 = getParsedStatement("T")
  expect(AnnihilationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("A&B&C&D&⊥")
  let statement2 = getParsedStatement("⊥");
  expect(AnnihilationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("A&B&C&D&⊤&⊥&⊤")
  let statement2 = getParsedStatement("⊥");
  expect(AnnihilationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 7', () => {
  let statement1 = getParsedStatement("A|B|C|D|⊤|⊥")
  let statement2 = getParsedStatement("⊤");
  expect(AnnihilationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 8', () => {
  let statement1 = getParsedStatement("(A|B)&(A|B|C|D|⊤|⊥)&(C)")
  let statement2 = getParsedStatement("(A|B)&⊤&(C)");
  expect(AnnihilationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 9', () => {
  let statement1 = getParsedStatement("(A|B)&(A|B|C|D|⊤|⊥)&(C)")
  let statement2 = getParsedStatement("(A|B)&⊤");
  expect(AnnihilationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 10', () => {
  let statement1 = getParsedStatement("(A|B)&(A|B|C|D|⊤|⊥)")
  let statement2 = getParsedStatement("(A|B)&(A|B|C|D|⊤|⊥)");
  expect(AnnihilationVerifier(statement1, statement2)).toBeFalsy();
});