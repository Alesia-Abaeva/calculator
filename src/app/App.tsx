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
  overwrite: false,
};

const reducer = (state: State, { type, payload }: Action): State => {
  console.log(state);

  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return { ...state, currentOperand: payload?.digit, overwrite: false };
      }

      // проверка на внесение двух 0, таких цифр не бывает
      if (payload?.digit === '0' && state.currentOperand === '0') return state;

      // проверка на внесение двух точек
      if (payload?.digit === '.' && state.currentOperand?.includes('.')) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload?.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === null && state.previousOperand === null) {
        return state;
      }

      if (state.currentOperand === null) {
        return { ...state, operation: payload?.operation };
      }

      if (state.previousOperand === null) {
        return {
          ...state,
          operation: payload?.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload?.operation,
        currentOperand: null,
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation === null ||
        state.currentOperand === null ||
        state.previousOperand === null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    case ACTIONS.CLEAR:
      return initialState;

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }

      if (state.currentOperand === null) return state;

      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
};

const App: React.FC = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] =
    React.useReducer(reducer, initialState);

  const handlerClear = (digit: string) => {
    dispatch({ type: ACTIONS.CLEAR, payload: { digit } });
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

        if (i === 1) {
          return (
            <button onClick={handlerDelete} key={digit}>
              {digit}
            </button>
          );
        }

        if (i === BUTTON.length - 1) {
          return (
            <button className="span-two" key={digit} onClick={handlerEvaluate}>
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
