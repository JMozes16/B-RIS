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

  updateRule(prevStep, rule) {
    console.log(prevStep.parsedStatementString, this.parsedStatementString)
    this.rule = rule;
    this.correct = verifyStep(prevStep.parsedStatement, this.parsedStatement, rule);
  }
}

export default Step;