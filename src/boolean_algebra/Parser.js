function getNextStatement(str, index) {
  if (/A-Z⊤⊥/.test(str[index])) {
    return index + 1;
  } else {
    let count = 0;
    let start = false;
    let i = index;
    while (i < str.length) {
      if (str[i] === "(") {
        start = true;
        count++;
      } else if (str[i] === ")") {
        count--;
      }
      i++;
      if (start && count === 0) {
        return i
      }
    }
  }
}

function parseStatement(str) {
  let statement = {
    type: "",
    parts: [],
  };

  if (str.length === 1) {
    statement.type = "ATOMIC"
    statement.parts.push(str)
    return statement
  }

  let statementParts = [];
  let connective = "";
  let start = 0
  let end = 0
  while (end !== str.length) {
    start = end
    end = getNextStatement(str, end);
    statementParts.push(str.slice(start, end))
    if (end === str.length) break;
    let nextConnective = str[end];
    if (nextConnective === "&" || nextConnective === "|") {
      if (!connective) {
        connective = nextConnective;
      } else if(connective !== nextConnective) {
        throw new Error("Duplicate Connectives in same statement")
      }
      end += 1;
    } else {
      throw new Error("No Connective")
    }
  }

  if (statementParts.length === 1 && !connective) {
    if (str[0] === "~") {
      let subStatement = parseStatement(str.slice(1, str.length));
      statement = {
        type: "NOT",
        parts: [subStatement],
      }
    } else {
      statement = parseStatement(str.slice(1, str.length - 1))
    }
  } else if (statementParts.length >= 2 && connective) {
    if(connective === "&") statement.type = "AND";
    else if(connective === "|") statement.type = "OR";
    for (let i = 0; i < statementParts.length; i++) {
      if (statementParts[i][0] === "~") {
        let subStatement = parseStatement(statementParts[i].slice(1, statementParts[i].length));
        statement.parts.push({
          type: "NOT",
          parts: [subStatement],
        })
      } else {
        statement.parts.push(parseStatement(statementParts[i]))
      }
    }
  } else {
    throw new Error("Empty Statement")
  }
  return statement;
}

function replaceAtomics(str) {
  return str.replace(/[a-zA-Z⊤⊥]/g, (match, index, string) => {
    return "(" + match + ")";
  });
}

function matchedParenthesis(str) {
  let count = 0;
  let i = 0;
  while (i < str.length) {
    if (str[i] === "(") {
      count++;
    } else if (str[i] === ")") {
      count--;
    }
    i++;
  }
  return count === 0;
}

export function getString(statement) {
  if (!statement.type) {  // essentially does the same thing as the "=== ATOMIC" line jsut below, but sometimes the findChanges() may just pass the string...
    return statement;
  }
  if (statement.type === "ATOMIC") {
    return statement.parts[0];
  } else if (statement.type === "NOT")  {
    return "~" + getString(statement.parts[0])
  } else {
    let string = "(";
    for (let i = 0; i < statement.parts.length; i++) {
      string += getString(statement.parts[i])
      if (i < statement.parts.length - 1) {
        if (statement.type === "AND") {
          string += "&";
        } else if (statement.type === "OR"){
          string += "|";
        }
      }
    }
    return string + ")"
  }
}

export function sortStatement(statement1) {
  if (statement1.type === "ATOMIC") {
    let value = statement1.parts[0].charCodeAt(0)
    if (statement1.parts[0] === "⊤" || statement1.parts[0] === "⊥") {
      value -= 102;
    }
    value -= 65
    statement1.value = value;
  } else if (statement1.type === "NOT") {
    sortStatement(statement1.parts[0]);
    statement1.value = 2 * statement1.parts[0].value
  } else {
    let value = 1000;
    for (let i = 0; i < statement1.parts.length; i++) {
      sortStatement(statement1.parts[i])
      value += statement1.parts[i].value;
    }
    statement1.parts.sort((a1, b1) => {
      return a1.value - b1.value;
    })
    statement1.value = value;
  }
}

export function getParsedStatement(statement) {
  if (/^$|^[()~&|A-Z⊤⊥]*$/.test(statement)) {
    if (matchedParenthesis(statement)) {
      let parsedStatement = parseStatement(replaceAtomics(statement))
      return parsedStatement;
    } else {
      throw new Error("Parenthesis Not Matched")
    }
  } else {
    throw new Error("Invalid Characters");
  }
}

export function findChanges(state1, state2, helperFunc) {
  let str1 = getString(state1);
  let str2 = getString(state2);
  if (helperFunc(state1, state2)) {
    return true;
  }
  let spot = -1;
  if (!state2.type) {
    return false;
  }
  for (let i=0; i<state2.parts.length; i++) {
    if (state2.type === state1.type) {
      if (state2.type === "ATOMIC") {
        if (state2.parts[i].type !== state1.parts[i].type || state2.parts[i] !== state1.parts[i]) {
          spot = i;
        }
      } else {
        if (state2.parts[i].type !== state1.parts[i].type || getString(state2.parts[i]) !== getString(state1.parts[i])) {
        spot = i;
        }
      }
    } else {
      return helperFunc(state1, state2);
    }
  }
  if (spot === -1) {
      return false;
  } else {
    if (findChanges(state1.parts[spot], state2.parts[spot], helperFunc)) {
      if (str1.replace(getString(state1.parts[spot]), getString(state2.parts[spot])) === str2) {
        return true;
      }
    }
  }
  return false;
}
