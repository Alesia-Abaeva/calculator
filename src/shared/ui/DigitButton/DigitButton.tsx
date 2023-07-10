interface DigitButton {
  digit: string | number;
  dispatch: ({ type, payload }: Reducer) => void;
  className?: string;
}

const DigitButton: React.FC<DigitButton> = ({ dispatch, digit }) => {
  return (
    <button className="span-two" onClick={dispatch}>
      {digit}
    </button>
  );
};

export default DigitButton;
