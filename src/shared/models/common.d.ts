interface Reducer {
  type: import('shared/const/actions').ACTIONS;
  payload: {
    digit: number | string;
  };
}

interface State {
  currentOperand: string;
  previousOperand: string;
  operation: string;
}
