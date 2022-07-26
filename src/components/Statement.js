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
                    return  <button title = "This property tells us we can associate groups of added or multiplied variables together with parentheses without altering the truth of the equation"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Commutation"){
                    return <button title = "Distributive property illustrates how to expand a Boolean expression formed by the product of a sum, and in reverse shows us how terms may be factored out of Boolean sums-of-products:"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Double Negation"){
                    return <button title = "double negation is the theorem that states that \"If a statement is true, then it is not the case that the statement is not true.\""
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  
                  else if(rule === "DeMorgan"){
                    return <button title = "De Morgan's Laws describe how mathematical statements and concepts are related through their opposites. In set theory, De Morgan's Laws relate the intersection and union of sets through complements. In propositional logic, De Morgan's Laws relate conjunctions and disjunctions of propositions through negation."
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Distribution"){
                    return <button title = "distributive property, illustrating how to expand a Boolean expression formed by the product of a sum, and in reverse shows us how terms may be factored out of Boolean sums-of-products:"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Idempotence"){
                    return <button title = "Boolean logic has idempotence within both AND and OR gates. A logical AND gate with two inputs A will also have an output of A. (1 AND 1 = 1, 0 AND 0 = 0). An OR gate has idempotence because 0 OR 0 = 0, and 1 OR 1 = 1."
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Complement"){
                    return <button title = "A two-input gate that provides both the AND and the NAND functions in a single circuit. Such gates do exist and they are referred to as complementary output gates. The general symbology for such a gate is the basic gate figure with a bar and two output lines protruding from it."
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Identity"){
                    return <button title = "An identity is a statement true for all possible values of its variable or variables. The algebraic identity of x + 0 = x tells us that anything (x) added to zero equals the original “anything,” no matter what value that “anything” (x) may be."
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Annihilation"){
                    return <button title = "Annihilation description"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Inverse"){
                    return <button title = "Inverse description"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Absorption"){
                    return <button title = "Absorption description"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Reduction"){
                    return <button title = "Reduction description"
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                  }
                  else if(rule === "Adjacency"){
                    return <button title = "Adjacency description"
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
