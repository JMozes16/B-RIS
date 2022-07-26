import React from "react";
import {getRules} from "../boolean_algebra/Verifier.js";

const RULES = getRules();

class Statement extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      highlight: false,
      ruleSelect: false,
      showParsedStatement: false,
    }
  }

  toggleRuleSelect = () => {
    this.setState((prevState) => {
      return {
        ruleSelect: !prevState.ruleSelect,
      }
    })
  }

  onRuleSelect = (rule) => {
    this.setState({
      ruleSelect: false,
    })
    this.props.onRuleSelect(rule)
  }

  render() {
    return (
      
      <div className={"flex items-center"}>
      
        <div className={"h-14 w-2 bg-blue"}/>
        <div className={"flex gap-2 items-center px-2 h-14 rounded-r-lg bg-opacity-30 " + (this.state.highlight ? "bg-blue" : "bg-none")}>
          <div className={"w-10 h-10 bg-blue rounded-md font-bold flex justify-center items-center text-white text-xl select-none"}>
            {this.props.statementNumber}
          </div>
          <input
            className={"border-2 border-blue rounded-lg w-64 h-10 outline-none p-2 font-semibold tracking-wide"}
            type="text"
            value={this.props.step.statement}
            onInput={this.props.onInput}
          />
          {this.props.step.parseError &&
            <div className={"w-32 h-10 flex justify-center items-center text-white select-none rounded-md font-bold bg-orange"}>
              Parse Error
            </div>
          }
          {(!this.props.step.parseError && this.props.step.statement && this.state.showParsedStatement) &&
            <div className={"min-w-64 h-10 p-2 font-semibold tracking-wide"}>
              {this.props.step.parsedStatementString}
            </div>
          }
          {(!this.props.step.parseError && !this.props.step.isPremise && !this.props.step.rule) &&
            <button
              className={"w-32 h-10 flex justify-center items-center text-white select-none rounded-md font-bold bg-blue"}
              onClick={this.toggleRuleSelect}
            >
              Choose a Rule
            </button>
          }
          {(!this.props.step.parseError && this.props.step.rule) &&
            <div>
              <button
                className={"w-32 h-10 flex justify-center items-center text-white select-none rounded-md font-bold " + (this.props.step.correct ? "bg-green" : "bg-red")}
                onClick={this.toggleRuleSelect}
              >

                {this.props.step.rule}
              </button>
            </div>

          }
          {this.state.ruleSelect &&
            <div className={"relative inline-block w-64 bg-white p-2 border-blue rounded-lg border-2 flex flex-col justify-center items-center"}>
              <div className={"text-black font-bold"}>
                Boolean Algebra Rules
              </div>
              <div className={"h-0.5 bg-black w-full rounded-lg my-1"}/>
              <div className={"flex flex-col gap-1"}>
                {RULES.map(rule => {
                  if(rule === "Association"){
                    return  <button title = "Rearranging the parenthesis in an expression of the same operation will not change the result. EX: (x ∨ y) ∨ z ≡ x ∨ (y ∨ z) and  (x ∧ y) ∧ z ≡ x ∧ (y ∧ z)"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Commutation"){
                    return <button title = "Allows you to move multiple propositions around a conjunction or disjunction. EX: (x ∧ y) ≡ (y ∧ x) and (x ∨ y) ≡ (y ∨ x)"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Double Negation"){
                    return <button title = "If a statement is true, then it is not the case that the statement is not true. EX: x ≡ ¬(¬x) and ¬(¬y) ≡ y"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  
                  else if(rule === "DeMorgan"){
                    return <button title = "The expression of conjunctions and disjunctions in terms of their negations. EX: ¬(x ∧ y) ≡ ¬x ∨ ¬y and ¬(x ∨ y) ≡ ¬x ∧ ¬y"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Distribution"){
                    return <button title = "Expand individual occurrences of connectives into separate applications of connectives in the expression. EX: x ∧ (y ∨ z) ≡ (x ∧ y) ∨ (x ∨ z) and  x | (y ∧ z) ≡ (x ∨ y) ∧ (x ∨ z)"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Idempotence"){
                    return <button title = "Combining a quantity with itself will result in itself. EX: x ∨ x ≡ x and y ∧ y ≡ y"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Complement"){
                    return <button title = "Logical disjunction of a quantity with its negation will result in a 1, logical conjunction of a quantity with its negation will result in a zero. EX: x + ¬x ≡ ⊤ and y ∨ ¬y ≡ ⊥"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Identity"){
                    return <button title = "Each thing is identical with itself. EX: x ∧ ⊤ ≡ x and x ∨ ⊥ ≡ x and x ∨ ⊤ ≡ ⊤ and x ∧ ⊥ ≡ ⊥"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Annihilation"){
                    return <button title = "There is a constant that when combined with a variable cancels out the variable. EX: x ∧ ⊤ ≡ ⊤ and y ∨ ⊥ ≡ ⊥"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Inverse"){
                    return <button title = "Replaces ⊥ with ¬⊤ and ⊤ with ¬⊥. EX: ⊥ ≡ ¬⊤ and ⊤ ≡ ¬⊥"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Absorption"){
                    return <button title = "The second variable is absorbed by the first. EX: x ∨ (x ∧ y) ≡ x and x ∧ (x ∨ y) ≡ x"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Reduction"){
                    return <button title = "Expression is reduced to its simplest form. EX: (x ∨ y)(x ∨ z) ≡ x ∨ (y ∧ z) and x ∨ (x ∧ y) ≡ x"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Adjacency"){
                    return <button title = "When an expression contains the same variables appears in but one appears in different forms in each term. EX: (x ∨ y) ∧ (x ∨ ¬y) ≡ x and (x ∧ y) ∨ (x ∧ ¬y) ≡ x"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else{
                    return <button> {rule} </button>
                  }
                }             
                )}
              </div>
            </div>
          }

          {!this.props.step.isPremise &&
            <div
              className={"w-10 h-10 bg-red hover:bg-red-dark rounded-md font-bold flex justify-center items-center text-white text-xl select-none"}
              onClick={this.props.onRemove}
            >
              x
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Statement;
