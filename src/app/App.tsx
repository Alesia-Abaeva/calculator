import React from 'react';
import { ACTIONS } from 'shared/const/actions';
import { BUTTON } from 'shared/const/button';
import { DigitButton, OperationButton } from 'shared/ui';
import { evaluate } from 'shared/utils/evaluate';
import './App.css';

const initialState: State = {
  operation: null,
  previousOperand: null,
  currentOperand: null,
};

const reducer = (state: State, { type, payload }: Action): State => {
  console.log(state);

  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // проверка на внесение двух 0, таких цифр не бывает
      if (payload.digit === '0' && state.currentOperand === '0') return state;

      // проверка на внесение двух точек
      if (payload.digit === '.' && state.currentOperand?.includes('.')) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === null && state.previousOperand === null) {
        return state;
      }

      if (state.currentOperand === null) {
        return { ...state, operation: payload.operation };
      }

      if (state.previousOperand === null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return initialState;
  }
};

const App: React.FC = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] =
    React.useReducer(reducer, initialState);

  const handlerClear = (digit: string) => {
    dispatch({ type: ACTIONS.CLEAR, payload: { digit } });
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>

      {BUTTON.map(({ digit, operand }, i) => {
        if (i === 0)
          return (
            <button
              className="span-two"
              onClick={() => handlerClear(digit)}
              key={digit}
            >
              {digit}
            </button>
          );

        if (i === 0 || i === BUTTON.length - 1) {
          return (
            <button className="span-two" key={digit}>
              {digit}
            </button>
          );
        }

        if (operand)
          return (
            <OperationButton
              dispatch={dispatch}
              operation={digit}
              key={digit}
            />
          );

        return <DigitButton digit={digit} dispatch={dispatch} key={digit} />;
      })}
    </div>
  );
};

export default App;
