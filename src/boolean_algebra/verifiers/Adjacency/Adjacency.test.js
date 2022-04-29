import {getParsedStatement} from "../../Parser.js";
import {AdjacencyVerifier} from "./Adjacency";

test('Test 1', () => {
  let statement1 = getParsedStatement("(A|B)&(A|~B)")
  let statement2 = getParsedStatement("A")//true
  expect(AdjacencyVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("(A&B)|(A&~B)")
  let statement2 = getParsedStatement("A")
  expect(AdjacencyVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 3', () => {
  let statement1 = getParsedStatement("(~B&A)|(A&B)")
  let statement2 = getParsedStatement("A")
  expect(AdjacencyVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("(A&~B)|(A&B)")
  let statement2 = getParsedStatement("A")
  expect(AdjacencyVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("(A&~B)|(A&B)")
  let statement2 = getParsedStatement("B")
  expect(AdjacencyVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("(A&~B)&(A&B)")
  let statement2 = getParsedStatement("A")
  expect(AdjacencyVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 7', () => {
  let statement1 = getParsedStatement("((A&C)&~B)|((A&C)&B)")
  let statement2 = getParsedStatement("(A&C)")
  expect(AdjacencyVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 8', () => {
  let statement1 = getParsedStatement("A|C")
  let statement2 = getParsedStatement("A")
  expect(AdjacencyVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 9', () => {
  let statement1 = getParsedStatement("A&(B|((C|B)&(C|~B)))")
  let statement2 = getParsedStatement("A&(B|C)")
  expect(AdjacencyVerifier(statement1, statement2)).toBeTruthy();
});