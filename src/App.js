import React from "react";
import Header from "./components/Header";
import Step from "./boolean_algebra/Step";
import Statement from "./components/Statement";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      premises: [],
      steps: [],
    }
  }

  addPremise = () => {
    this.setState((prevState) => {
      let premises = [...prevState.premises]
      premises.push(new Step())
      return {
        premises: premises,
      }
    })
  }

  addStep = () => {
    this.setState((prevState) => {
      let steps = [...prevState.steps]
      steps.push(new Step())
      return {
        steps: steps,
      }
    })
  }

  removePremise = (index) => {
    this.setState((prevState) => {
      let premises = [...prevState.premises]
      premises.splice(index, 1)
      return {
        premises: premises,
      }
    })
  }

  removeStep = (index) => {
    this.setState((prevState) => {
      let steps = [...prevState.steps]
      steps.splice(index, 1)
      return {
        steps: steps,
      }
    })
  }

  onPremiseInput = (index, e) => {
    this.setState((prevState) => {
      let premises = [...prevState.premises]
      premises[index].updateStatement(e.target.value)
      return {
        premises: premises,
      }
    })
  }

  onStepInput = (index, e) => {
    this.setState((prevState) => {
      let steps = [...prevState.steps]
      steps[index].updateStatement(e.target.value)
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
            <div className={"font-bold text-2xl my-2"}>
              Premises
            </div>
            <div className={"gap-2 flex flex-col"}>
              {this.state.premises.map((premise, index) => (
                <Statement
                  statementNumber={index + 1}
                  statement={premise.statement}
                  parseError={premise.parseError}
                  parsedStatementString={premise.parsedStatementString}
                  onRemove={() => {this.removePremise(index)}}
                  onInput={(e) => {this.onPremiseInput(index, e)}}
                />
              ))}
            </div>
            <button
              className={"w-48 h-12 bg-blue rounded-lg text-white font-bold my-2 hover:bg-blue-dark"}
              onClick={this.addPremise}
            >
              Add Premise
            </button>
          </div>
          <div className={"h-1 bg-black rounded-lg my-2"}/>
          <div>
            <div className={"font-bold text-2xl mb-2 mt-6"}>
              Steps
            </div>
            <div className={"gap-2 flex flex-col"}>
              <div className={"gap-2 flex flex-col"}>
                {this.state.steps.map((step, index) => (
                  <Statement
                    statementNumber={index + 1}
                    statement={step.statement}
                    parseError={step.parseError}
                    parsedStatementString={step.parsedStatementString}
                    onRemove={() => {this.removeStep(index)}}
                    onInput={(e) => {this.onStepInput(index, e)}}
                  />
                ))}
              </div>
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
