import { ACTIONS } from 'shared/const/actions';

interface DigitButton {
  digit: string | number;
  dispatch: ({ type, payload }: Reducer) => void;
  className?: string;
}

const DigitButton: React.FC<DigitButton> = ({ dispatch, digit }) => {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
