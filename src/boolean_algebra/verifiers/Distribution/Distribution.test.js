import {getParsedStatement} from "../../Parser.js";
import {DistributionVerifier} from "./Distribution.js";

test('Test 1', () => {
  let statement1 = getParsedStatement("A|(B&C)")
  let statement2 = getParsedStatement("(A|B)&(A|C)")
  expect(DistributionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("(A&B)|(C&D)")
  let statement2 = getParsedStatement("(A|C)&(A|D)&(B|C)&(B|D)")
  let statement3 = getParsedStatement("((A&B)|C)&((A&B)|D)")
  expect(DistributionVerifier(statement1, statement2)).toBeTruthy();
  expect(DistributionVerifier(statement1, statement3)).toBeTruthy();
});

test('Test 3', () => {
  let statement1 = getParsedStatement("(A|B)&(C|D)&(E|F)")
  let statement2 = getParsedStatement("(((A&C)&E)|((A&C)&F)|((A&D)&E)|((A&D)&F)|((B&C)&E)|((B&C)&F)|((B&D)&E)|((B&D)&F))")
  expect(DistributionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("(A|B)&(C|D)&(E|F)")
  let statement2 = getParsedStatement("(((A&C)&E)|((A&C)&F)|((A&D)&E)|((A&D)&F)|((B&C)&E)|((B&C)&F)|((B&D)&E)|((B&D)&E))")
  expect(DistributionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("(A|B)&(C|(D&E))")
  let statement2 = getParsedStatement("(A&C)|(A&(D&E))|(B&C)|(B&(D&E))")
  expect(DistributionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("A|A")
  let statement2 = getParsedStatement("A|A")
  expect(DistributionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 7', () => {
  let statement1 = getParsedStatement("((A&B)|(C&D))&((E&F)|(G&H))")
  let statement2 = getParsedStatement("((A&B)&(E&F))|((A&B)&(G&H))|((C&D)&(E&F))|((C&D)&(G&H))")
  expect(DistributionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 8', () => {
  let statement1 = getParsedStatement("(A|B)|(C&D)")
  let statement2 = getParsedStatement("(A|B|C)&((A|B)&C)")
  expect(DistributionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 9', () => {
  let statement1 = getParsedStatement("(A|B)|(C&D)")
  let statement2 = getParsedStatement("((A|B)|C)&((A|B)|D)")
  expect(DistributionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 10', () => {
  let statement1 = getParsedStatement("(D|A)&((A|B)|(C&D))")
  let statement2 = getParsedStatement("(D|A)&(((A|B)|C)&((A|B)|D))")
  expect(DistributionVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 11', () => {
  let statement1 = getParsedStatement("(D|A)&((A|B)|(C&D))")
  let statement2 = getParsedStatement("(D&A)&(((A|B)|C)&((A|B)|D))")
  expect(DistributionVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 12', () => {
  let statement1 = getParsedStatement("(D|A)&((A|B)|(C&D))&(E|F)")
  let statement2 = getParsedStatement("(D|A)&(((A|B)|C)&((A|B)|D))&(E|F)")
  expect(DistributionVerifier(statement1, statement2)).toBeTruthy();
});
