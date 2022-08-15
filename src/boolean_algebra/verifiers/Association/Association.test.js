import {getParsedStatement} from "../../Parser.js";
import {AssociationVerifier} from "./Association";

test('Test 1', () => {
  let statement1 = getParsedStatement("(A|B)|C")
  let statement2 = getParsedStatement("A|(B|C)")
  expect(AssociationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 2', () => {
  let statement1 = getParsedStatement("(A&B)&C")
  let statement2 = getParsedStatement("A&(B&C)")
  expect(AssociationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 3', () => {
  let statement1 = getParsedStatement("(A&B)&C")
  let statement2 = getParsedStatement("(A&C)&B")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 4', () => {
  let statement1 = getParsedStatement("(A&B)|(C&D)")
  let statement2 = getParsedStatement("(B&A)|(C&D)")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 5', () => {
  let statement1 = getParsedStatement("(H&I)|(J&K)")
  let statement2 = getParsedStatement("(I&H)|(J&K)")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 6', () => {
  let statement1 = getParsedStatement("(L&M)|(N&O)")
  let statement2 = getParsedStatement("(L&M)|(O&N)")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
}); 

test('Test 7', () => {
  let statement1 = getParsedStatement("(A|B)|C")
  let statement2 = getParsedStatement("(A|C)|B")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 8', () => {
  let statement1 = getParsedStatement("(A|B)&(C|D)")
  let statement2 = getParsedStatement("(B|A)&(D|C)")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy(); 
});

test('Test 9', () => {
  let statement1 = getParsedStatement("(A|B)&(C|D)")
  let statement2 = getParsedStatement("(B|A)&(C|D)")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 10', () => {
  let statement1 = getParsedStatement("(A|B)&(C|D)")
  let statement2 = getParsedStatement("(A|B)&(D|C)")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 11', () => {
  let statement1 = getParsedStatement("(A&B)&C")
  let statement2 = getParsedStatement("A&(b&C)")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 12', () => {
  let statement1 = getParsedStatement("(A&B)&C")
  let statement2 = getParsedStatement("(A&D)&C")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 13', () => {
  let statement1 = getParsedStatement("(A|B)&(C|D)")
  let statement2 = getParsedStatement("(A|C)&(B|D)")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 14', () => {
  let statement1 = getParsedStatement("(A&B)|(C&D)")
  let statement2 = getParsedStatement("(A&D)|(C&B)")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 15', () => {
  let statement1 = getParsedStatement("(A&B)&C")
  let statement2 = getParsedStatement("A|(B&C)")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 16', () => {
  let statement1 = getParsedStatement("(A&B&C)|((E|F)|(G))")
  let statement2 = getParsedStatement("(B&A&C)|((G)|(E|F))")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 17', () => {
  let statement1 = getParsedStatement("(C|B|A)&((E|F)&(G|H))")
  let statement2 = getParsedStatement("((C|B|A)&(E|F))&(G|H)")
  expect(AssociationVerifier(statement1, statement2)).toBeTruthy();
});

test('Test 18', () => {
  let statement1 = getParsedStatement("(A&(B|C)&(G|H|I)&(J|K))")
  let statement2 = getParsedStatement("(((A&(B|C))&(G|H|I))&(J|K))")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});

test('Test 19', () => {
  let statement1 = getParsedStatement("(A&B)|(C&D)")
  let statement2 = getParsedStatement("(A&B)|(C&D)")
  expect(AssociationVerifier(statement1, statement2)).toBeFalsy();
});