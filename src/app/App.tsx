import React from 'react';
import { ACTIONS, BUTTON, DIGIT, OPERATION } from 'shared/const';
import { initialState, reducer } from 'shared/reducer';
import { DigitButton, OperationButton } from 'shared/ui';
import { formatOperand } from 'shared/utils';
import './App.css';

const App: React.FC = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] =
    React.useReducer(reducer, initialState);

  const downHandler = ({ key }: KeyboardEvent) => {
    // digit button
    if (DIGIT.includes(key)) {
      dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: key } });
      return;
    }

    if (OPERATION.includes(key)) {
      dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: key } });
      return;
    }

    if (key === '/') {
      dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '÷' } });
      return;
    }

    if (key === 'Enter' || key === '=') {
      handlerEvaluate();
      return;
    }

    if (key === 'Backspace' || key === 'Delete') {
      handlerDelete();
      return;
    }

    if (key === 'Escape') {
      handlerClear();
      return;
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);

  const handlerClear = () => {
    dispatch({ type: ACTIONS.CLEAR });
  };

  const handlerEvaluate = () => {
    dispatch({ type: ACTIONS.EVALUATE });
  };

  const handlerDelete = () => {
    dispatch({ type: ACTIONS.DELETE_DIGIT });
  };

  const handlerDigit = (digit: string) => {
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
  };

  const handlerOperand = (operation: string) => {
    dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
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
        // if (operand) {
        //   return (
        //     <OperationButton
        //       dispatch={() => handlerOperand(digit)}
        //       operation={digit}
        //       key={digit}
        //     />
        //   );
        // }

        return (
          <DigitButton
            digit={digit}
            dispatch={() =>
              operand ? handlerOperand(digit) : handlerDigit(digit)
            }
            key={digit}
          />
        );
      })}

      <button className="span-two" onClick={handlerEvaluate}>
        =
      </button>
    </div>
  );
};

export default App;
