interface OperationButton {
  operation: string;
  dispatch: () => void;
  className?: string;
}

const OperationButton: React.FC<OperationButton> = ({
  dispatch,
  operation,
}) => {
  return <button onClick={dispatch}>{operation}</button>;
};

export default OperationButton;
