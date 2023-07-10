import React from 'react';
import { ACTIONS } from 'shared/const/actions';
import { BUTTON } from 'shared/const/button';
import { DigitButton } from 'shared/ui';
import './App.css';

const reducer = (state: State, { type, payload }: Reducer) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
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

      {BUTTON.map(({ digit, operand }, i) => {
        if (i === 0 || i === BUTTON.length - 1) {
          return <button className="span-two">{digit}</button>;
        }

        if (operand) return <button>{digit}</button>;

        return <DigitButton digit={digit} dispatch={dispatch} />;
      })}
    </div>
  );
};

export default App;
