import {AssociationVerifier} from "./verifiers/Association/Association.js";
import {CommutationVerifier} from "./verifiers/Commutation/Commutation.js";
import {DoubleNegationVerifier} from "./verifiers/DoubleNegation/DoubleNegation.js";
import {DeMorganVerifier} from "./verifiers/DeMorgan/DeMorgan.js";
import {DistributionVerifier} from "./verifiers/Distribution/Distribution.js";
import {IdempotenceVerifier} from "./verifiers/Idempotence/Idempotence.js";
import {ComplementVerifier} from "./verifiers/Complement/Complement.js";
import {IdentityVerifier} from "./verifiers/Identity/Identity.js";
import {AnnihilationVerifier} from "./verifiers/Annihilation/Annihilation.js";
import {InverseVerifier} from "./verifiers/Inverse/Inverse.js";
import {AbsorptionVerifier} from "./verifiers/Absorption/Absorption.js";
import {ReductionVerifier} from "./verifiers/Reduction/Reduction.js";
import {AdjacencyVerifier} from "./verifiers/Adjacency/Adjacency.js";

const RULES = {
  "Association": AssociationVerifier,
  "Commutation": CommutationVerifier,
  "Double Negation": DoubleNegationVerifier,
  "DeMorgan": DeMorganVerifier,
  "Distribution": DistributionVerifier,
  "Idempotence": IdempotenceVerifier,
  "Complement": ComplementVerifier,
  "Identity": IdentityVerifier,
  "Annihilation": AnnihilationVerifier,
  "Inverse": InverseVerifier,
  "Absorption": AbsorptionVerifier,
  "Reduction": ReductionVerifier,
  "Adjacency": AdjacencyVerifier,
}

export function verifyStep(statement1, statement2, rule) {
  if (!RULES[rule]) return false;
  return RULES[rule](JSON.parse(JSON.stringify(statement1)), JSON.parse(JSON.stringify(statement2)));
}

export function getRules() {
  return Object.keys(RULES);
}