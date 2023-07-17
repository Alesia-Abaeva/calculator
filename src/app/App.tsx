import React from 'react';
import { ACTIONS, BUTTON, DIGIT, OPERATION } from 'shared/const';
import { initialState, reducer } from 'shared/reducer';
import { formatOperand } from 'shared/utils';
import './App.css';

const App: React.FC = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] =
    React.useReducer(reducer, initialState);

  const downHandler = ({ key }: KeyboardEvent) => {
    switch (key) {
      case '/':
        handlerOperand('÷');
        break;
      case 'Enter' || '=':
        handlerEvaluate();
        break;
      case 'Backspace' || 'Delete':
        handlerDelete();
        break;
      case 'Escape':
        handlerDelete();
        break;

      default:
        if (DIGIT.includes(key)) {
          handlerDigit(key);
          return;
        }

        if (OPERATION.includes(key)) {
          handlerOperand(key);
          return;
        }
        break;
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
        return (
          <button
            key={digit}
            onClick={() =>
              operand ? handlerOperand(digit) : handlerDigit(digit)
            }
          >
            {digit}
          </button>
        );
      })}

      <button className="span-two" onClick={handlerEvaluate}>
        =
      </button>
    </div>
  );
};

export default App;
