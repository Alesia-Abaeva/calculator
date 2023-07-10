export const evaluate = ({
  currentOperand,
  previousOperand,
  operation,
}: State) => {
  if (!currentOperand || !previousOperand) return '';

  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  let computation: string | number = '';

  switch (operation) {
    case '+':
      computation = prev + current;
      break;

    case '-':
      computation = prev - current;
      break;

    case '*':
      computation = prev * current;
      break;

    case '÷':
      computation = prev / current;
      break;
  }

  return computation.toString();
};
