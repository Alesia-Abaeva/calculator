import { BUTTON } from 'shared/const/button';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">123313</div>
        <div className="current-operand">133488</div>
      </div>

      {BUTTON.map((el, i) => {
        if (i === 0 || i === BUTTON.length - 1) {
          return <button className="span-two">{el}</button>;
        }
        return <button>{el}</button>;
      })}
    </div>
  );
};

export default App;
