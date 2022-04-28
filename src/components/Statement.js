import React from "react";
import {getRules} from "../boolean_algebra/Verifier";

const RULES = getRules();

class Statement extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      highlight: false,
      ruleSelect: false,
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
          {/*{(!this.props.step.parseError && this.props.step.statement) &&*/}
          {/*  <div className={"min-w-64 h-10 p-2 font-semibold tracking-wide"}>*/}
          {/*    {this.props.step.parsedStatementString}*/}
          {/*  </div>*/}
          {/*}*/}
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
                {RULES.map((rule) => (
                  <button
                    className={"h-5 font-bold text-black"}
                    onClick={() => this.onRuleSelect(rule)}
                  >
                    {rule}
                  </button>
                ))}
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
