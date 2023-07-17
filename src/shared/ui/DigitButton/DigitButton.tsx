interface DigitButton {
  digit: string | number;
  dispatch: () => void;
  className?: string;
}

const DigitButton: React.FC<DigitButton> = ({ dispatch, digit }) => {
  return <button onClick={dispatch}>{digit}</button>;
};

export default DigitButton;
