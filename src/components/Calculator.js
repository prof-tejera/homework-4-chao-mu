import { useState, useReducer } from "react";

import "./Calculator.css";

import Button from "./Button";
import Screen from "./Screen";

const ClearAction = {
  type: "clear",
  payload: { label: "clear" },
};

const EvalAction = {
  type: "eval",
  payload: { label: "=" },
};

const Operations = [
  { label: "+", func: (a) => (b) => a + b },
  { label: "-", func: (a) => (b) => a - b },
  { label: "*", func: (a) => (b) => a * b },
  { label: "/", func: (a) => (b) => a / b },
];

const operationToAction = (op) => {
  return {
    type: "operation",
    payload: op,
  };
};

const numberToAction = (num) => {
  return {
    type: "number",
    payload: {
      label: num.toString(),
      value: num,
    },
  };
};

const DefaultCalculatorState = {
  history: [],
  total: 0,
  total_internal: (a) => a,
};

const reducer = (state, action) => {
  const history = [...state.history, action.payload.label];

  switch (action.type) {
    case "number":
      return {
        ...state,
        history,
        total: state.total_internal(action.payload.value),
      };
    case "operation":
      return {
        ...state,
        history,
        total_internal: action.payload.func(state.total),
      };
    case "clear":
      return DefaultCalculatorState;
    case "eval":
      return {
        ...state,
        total_internal: DefaultCalculatorState.total_internal,
        total: state.total,
        history: [...history, state.total],
      };
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};

const Calculator = () => {
  const [entry, setEntry] = useState("");
  const [calculator, dispatchCalculator] = useReducer(reducer, {
    ...DefaultCalculatorState,
  });

  const enterNumber = (num) => {
    setEntry((entry) => entry + num);
  };

  const dispatchWithNumber = (action) => {
    if (entry !== "") {
      dispatchCalculator(numberToAction(Number(entry)));
      setEntry("");
    }

    dispatchCalculator(action);
  };

  const clear = () => {
    dispatchCalculator(ClearAction);
    setEntry("");
  };

  const numbers = [...Array.from({ length: 10 }).keys()];

  return (
    <div className="Calculator">
      <Screen
        history={calculator.history}
        total={calculator.total}
        entry={entry}
      />
      <div className="buttons">
        {numbers.map((num) => (
          <Button key={num} onClick={() => enterNumber(num)}>
            {num}
          </Button>
        ))}
        {Operations.map((op) => (
          <Button
            key={op.label}
            onClick={() => dispatchWithNumber(operationToAction(op))}
          >
            {op.label}
          </Button>
        ))}
        <Button onClick={() => clear()}>{ClearAction.payload.label}</Button>
        <Button onClick={() => dispatchWithNumber(EvalAction)}>
          {EvalAction.payload.label}
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
