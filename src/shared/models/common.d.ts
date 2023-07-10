interface Action {
  type: import('shared/const').ACTIONS;
  payload?: {
    digit?: number | string;
    operation?: string;
  };
}

interface State {
  overwrite: boolean;
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
}
