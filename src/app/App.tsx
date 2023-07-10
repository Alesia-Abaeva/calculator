import React from 'react';
import { ACTIONS, BUTTON } from 'shared/const';
import { initialState, reducer } from 'shared/reducer';
import { DigitButton, OperationButton } from 'shared/ui';
import { formatOperand } from 'shared/utils';
import './App.css';

const App: React.FC = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] =
    React.useReducer(reducer, initialState);

  const handlerClear = () => {
    dispatch({ type: ACTIONS.CLEAR });
  };

  const handlerEvaluate = () => {
    dispatch({ type: ACTIONS.EVALUATE });
  };

  const handlerDelete = () => {
    dispatch({ type: ACTIONS.DELETE_DIGIT });
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>

      <button className="span-two" onClick={handlerClear}>
        AC
      </button>
      <button onClick={handlerDelete}>DEL</button>

      {BUTTON.map(({ digit, operand }) => {
        if (operand) {
          return (
            <OperationButton
              dispatch={dispatch}
              operation={digit}
              key={digit}
            />
          );
        }

        return <DigitButton digit={digit} dispatch={dispatch} key={digit} />;
      })}

      <button className="span-two" onClick={handlerEvaluate}>
        =
      </button>
    </div>
  );
};

export default App;
