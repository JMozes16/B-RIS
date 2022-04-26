import React from "react";

class Statement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parseError: false,
    }
  }

  render() {
    return (
      <div className={"flex gap-2"}>
        <div className={"w-10 h-10 bg-blue rounded-md font-bold flex justify-center items-center text-white text-xl select-none"}>
          {this.props.statementNumber}
        </div>
        <input
          className={"border-2 border-blue rounded-lg w-64 h-10 outline-none p-2 font-semibold tracking-wide"}
          type="text"
          value={this.props.statement}
          onInput={this.props.onInput}
        />

        {this.props.parseError ?
        <div className={"w-32 h-10 flex justify-center items-center text-white select-none rounded-md font-bold bg-orange"}>
          Parse Error
        </div> : this.props.statement &&
        <div className={"min-w-64 h-10 p-2 font-semibold tracking-wide"}>
          {this.props.parsedStatementString}
        </div>
        }
        <div
          className={"w-10 h-10 bg-red hover:bg-red-dark rounded-md font-bold flex justify-center items-center text-white text-xl select-none"}
          onClick={this.props.onRemove}
        >
          x
        </div>
      </div>
    )
  }
}

export default Statement;
