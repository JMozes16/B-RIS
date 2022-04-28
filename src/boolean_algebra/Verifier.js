import {AssociationVerifier} from "./verifiers/Association";
import {CommutationVerifier} from "./verifiers/Commutation";
import {DoubleNegationVerifier} from "./verifiers/DoubleNegation";
import {DeMorganVerifier} from "./verifiers/DeMorgan";
import {DistributionVerifier} from "./verifiers/Distribution";
import {IdempotenceVerifier} from "./verifiers/Idempotence";
import {ComplementVerifier} from "./verifiers/Complement";
import {IdentityVerifier} from "./verifiers/Identity";
import {AnnihilationVerifier} from "./verifiers/Annihilation";
import {InverseVerifier} from "./verifiers/Inverse";
import {AbsorptionVerifier} from "./verifiers/Absorption";
import {ReductionVerifier} from "./verifiers/Reduction";
import {AdjacencyVerifier} from "./verifiers/Adjacency";

export const RULES = {
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
  return RULES[rule](statement1, statement2);
}

export function getRules() {
  return Object.keys(RULES);
}