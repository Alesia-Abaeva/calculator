import './App.css';

const App: React.FC = () => {
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand"></div>
        <div className="current-operand"></div>
      </div>
      <button className="span-two">AC</button>
      <button className="span-two">DEL</button>
    </div>
  );
};

export default App;
