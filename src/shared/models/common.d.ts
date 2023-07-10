interface Action {
  type: import('shared/const/actions').ACTIONS;
  payload: {
    digit?: number | string;
    operation?: string;
  };
}

interface State {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
}
