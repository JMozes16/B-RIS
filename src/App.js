import React from "react";
import Header from "./components/Header.js";
import Step from "./boolean_algebra/Step.js";
import Statement from "./components/Statement.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [new Step(true)],
    }
  }

  // Adds a new step to the end of the list
  addStep = () => {
    this.setState((prevState) => {
      let steps = [...prevState.steps]
      steps.push(new Step(false))
      return {
        steps: steps,
      }
    })
  }

  // Removes the selected step
  removeStep = (index) => {
    this.setState((prevState) => {
      let steps = [...prevState.steps]
      steps.splice(index, 1)
      return {
        steps: steps,
      }
    })
  }

  // Updates the statement on user input
  onStepInput = (index, e) => {
    this.setState((prevState) => {
      let steps = [...prevState.steps]
      steps[index].updateStatement(e.target.value)
      if (steps[index].rule) {
        steps[index].updateRule(steps[index-1], steps[index].rule);
      }
      if (index < steps.length-1 && steps[index+1].rule) {
        steps[index+1].updateRule(steps[index], steps[index+1].rule);
      }
      return {
        steps: steps,
      }
    })
  }

  // Updates the selcted rule on user input
  onRuleSelect = (index, rule) => {
    this.setState((prevState) => {
      let steps = [...prevState.steps]
      steps[index].updateRule(steps[index-1], rule)
      return {
        steps: steps,
      }
    })
  }

  render() {
    return (
      <div className={"w-full font-quicksand"}>
        <Header />
        <div className={"w-full p-8"}>
          <div>
            <div className={"flex flex-col"}>
              {this.state.steps.map((step, index) => (
                <Statement
                  step={step}
                  statementNumber={index + 1}
                  statement={step.statement}
                  onRemove={() => {this.removeStep(index)}}
                  onInput={(e) => {this.onStepInput(index, e)}}
                  onRuleSelect={(rule) => {this.onRuleSelect(index, rule)}}
                />
              ))}
            </div>
            <button
              className={"w-48 h-12 bg-blue rounded-lg text-white font-bold my-2 hover:bg-blue-dark"}
              onClick={this.addStep}
            >
              Add Step
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
