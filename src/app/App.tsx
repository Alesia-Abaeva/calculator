import { BUTTON } from 'shared/const/button';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand"></div>
        <div className="current-operand"></div>
      </div>

      {BUTTON.map((el, i) => {
        if (i === 0 || i === BUTTON.length) {
          return <button className="span-two">{el}</button>;
        }
        return <button>{el}</button>;
      })}
    </div>
  );
};

export default App;
