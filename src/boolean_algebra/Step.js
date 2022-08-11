/*
Implementation of the Step class. The Step holds the input statements from the users 
*/

import {getParsedStatement, getString} from "./Parser.js";
import {verifyStep} from "./Verifier.js";

class Step {
  constructor(isPremise) {
    this.isPremise = isPremise;
    this.statement = "";
    this.parsedStatement = {};
    this.parsedStatementString = "";
    this.parseError = false;
    this.rule = "";
    this.correct = true;
  }

  // Changes the statement when the user makes a new input
  updateStatement(statement) {
    if (statement) {
      this.statement = statement;
      try {
        this.parsedStatement = getParsedStatement(statement)
        this.parsedStatementString = getString(this.parsedStatement)
        this.parseError = false;
      } catch(e) {
        this.parsedStatement = {};
        this.parsedStatementString = "";
        this.parseError = true;
        console.log(e)
      }
    } else {
      this.statement = "";
      this.parsedStatement = {};
      this.parseError = false;
    }
  }

  // Changes the rule when the user selects a new rule
  updateRule(prevStep, rule) {
    console.log(prevStep.parsedStatementString, this.parsedStatementString)
    this.rule = rule;
    this.correct = verifyStep(prevStep.parsedStatement, this.parsedStatement, rule);
  }
}

export default Step;