import {getParsedStatement, getString} from "./Parser";

class Step {
  constructor() {
    this.statement = "";
    this.parsedStatement = {};
    this.parsedStatementString = "";
    this.parseError = false;
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
}

export default Step;