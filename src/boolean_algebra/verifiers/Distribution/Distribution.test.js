import {getParsedStatement} from "../../Parser";
import {DistributionVerifier} from "./Distribution";

let statement1 = getParsedStatement("A|(B&C)")
let statement2 = getParsedStatement("(A|B)&(A|C)")

let statement3 = getParsedStatement("(A&B)|(C&D)")
let statement4 = getParsedStatement("(A|C)&(A|D)&(B|C)&(B|D)")

let statement5 = getParsedStatement("(A|B)&(C|D)&(E|F)")
let statement6 = getParsedStatement("(((A&C)&E)|((A&C)&F)|((A&D)&E)|((A&D)&F)|((B&C)&E)|((B&C)&F)|((B&D)&E)|((B&D)&F))")

let statement7 = getParsedStatement("(A|B)&(C|D)&(E|F)")
let statement8 = getParsedStatement("(((A&C)&E)|((A&C)&F)|((A&D)&E)|((A&D)&F)|((B&C)&E)|((B&C)&F)|((B&D)&E)|((B&D)&E))")

let statement9 = getParsedStatement("(A|B)&(C|(D&E))")
let statement10 = getParsedStatement("(A&C)|(A&(D&E))|(B&C)|(B&(D&E))")

let statement11 = getParsedStatement("A|A")
let statement12 = getParsedStatement("A|A")

let statement13 = getParsedStatement("((A&B)|(C&D))&((E&F)|(G&H))")
let statement14 = getParsedStatement("((A&B)&(E&F))|((A&B)&(G&H))|((C&D)&(E&F))|((C&D)&(G&H))")

console.log(DistributionVerifier(statement1, statement2))
console.log(DistributionVerifier(statement2, statement1))
console.log(DistributionVerifier(statement3, statement4))
console.log(DistributionVerifier(statement5, statement6))
console.log(DistributionVerifier(statement7, statement8))
console.log(DistributionVerifier(statement9, statement10))
console.log(DistributionVerifier(statement11, statement12))
console.log(DistributionVerifier(statement13, statement14))