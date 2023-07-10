import React from 'react';
import { ACTIONS } from 'shared/const/actions';
import { BUTTON } from 'shared/const/button';
import './App.css';

const reducer = (state: State, { type, payload }: Reducer) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${currentOperand || ''}${payload.digit}`,
      };
  }
};

const App: React.FC = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] =
    React.useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>

      {BUTTON.map((el, i) => {
        if (i === 0 || i === BUTTON.length - 1) {
          return <button className="span-two">{el}</button>;
        }
        return <button>{el}</button>;
      })}
    </div>
  );
};

export default App;
