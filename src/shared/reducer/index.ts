import { ACTIONS } from 'shared/const';
import { evaluate } from 'shared/utils';

export const initialState: State = {
  operation: null,
  previousOperand: null,
  currentOperand: null,
  overwrite: false,
};

export const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload?.digit as string | null,
          overwrite: false,
        };
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
        return { ...state, operation: payload?.operation as string | null };
      }

      if (state.previousOperand === null) {
        return {
          ...state,
          operation: payload?.operation as string | null,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload?.operation as string | null,
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
