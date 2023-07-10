import { ACTIONS } from 'shared/const/actions';

interface OperationButton {
  operation: string;
  dispatch: ({ type, payload }: Action) => void;
  className?: string;
}

const OperationButton: React.FC<OperationButton> = ({
  dispatch,
  operation,
}) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
};

export default OperationButton;
