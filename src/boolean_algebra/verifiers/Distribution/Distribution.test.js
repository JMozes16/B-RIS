import {getParsedStatement} from "../../Parser.js";
import {DistributionVerifier} from "./Distribution.js";

let statement1 = getParsedStatement("A|(B&C)")
let statement2 = getParsedStatement("(A|B)&(A|C)")//true

let statement3 = getParsedStatement("(A&B)|(C&D)")
let statement4 = getParsedStatement("(A|C)&(A|D)&(B|C)&(B|D)")//true
let statement4_2 = getParsedStatement("((A&B)|C)&((A&B)|D)")//true

let statement5 = getParsedStatement("(A|B)&(C|D)&(E|F)")
let statement6 = getParsedStatement("(((A&C)&E)|((A&C)&F)|((A&D)&E)|((A&D)&F)|((B&C)&E)|((B&C)&F)|((B&D)&E)|((B&D)&F))")//true

let statement7 = getParsedStatement("(A|B)&(C|D)&(E|F)")
let statement8 = getParsedStatement("(((A&C)&E)|((A&C)&F)|((A&D)&E)|((A&D)&F)|((B&C)&E)|((B&C)&F)|((B&D)&E)|((B&D)&E))")//false

let statement9 = getParsedStatement("(A|B)&(C|(D&E))")
let statement10 = getParsedStatement("(A&C)|(A&(D&E))|(B&C)|(B&(D&E))")//true

let statement11 = getParsedStatement("A|A")
let statement12 = getParsedStatement("A|A")//false

let statement13 = getParsedStatement("((A&B)|(C&D))&((E&F)|(G&H))")
let statement14 = getParsedStatement("((A&B)&(E&F))|((A&B)&(G&H))|((C&D)&(E&F))|((C&D)&(G&H))")//true

let statement15 = getParsedStatement("(A|B)|(C&D)")
let statement16 = getParsedStatement("(A|B|C)&((A|B)&C)")//false

let statement17 = getParsedStatement("(A|B)|(C&D)")
let statement18 = getParsedStatement("((A|B)|C)&((A|B)|D)")//true

console.log(DistributionVerifier(statement1, statement2))
console.log(DistributionVerifier(statement2, statement1))
console.log(DistributionVerifier(statement3, statement4))
console.log(DistributionVerifier(statement3, statement4_2))
console.log(DistributionVerifier(statement5, statement6))
console.log(DistributionVerifier(statement7, statement8))
console.log(DistributionVerifier(statement9, statement10))
console.log(DistributionVerifier(statement11, statement12))
console.log(DistributionVerifier(statement13, statement14))
console.log(DistributionVerifier(statement15, statement16))
console.log(DistributionVerifier(statement17, statement18))
