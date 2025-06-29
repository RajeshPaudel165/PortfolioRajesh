import React, { useState } from "react";
import "../Styles/Calculator.css";

const Calculator = ({ darkMode }) => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    if (!previousValue || !operation) return;

    const inputValue = parseFloat(display);
    const newValue = calculate(previousValue, inputValue, operation);

    setDisplay(String(newValue));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const handlePercent = () => {
    const currentValue = parseFloat(display);
    const newValue = currentValue / 100;
    setDisplay(String(newValue));
  };

  const handlePlusMinus = () => {
    const currentValue = parseFloat(display);
    const newValue = -currentValue;
    setDisplay(String(newValue));
  };

  return (
    <div className={`calculator ${darkMode ? "" : "light-mode"}`}>
      <div className="calculator-display">
        <div className="calculator-result">{display}</div>
      </div>
      <div className="calculator-buttons">
        <button className="calc-btn function" onClick={clearDisplay}>
          AC
        </button>
        <button className="calc-btn function" onClick={handlePlusMinus}>
          ±
        </button>
        <button className="calc-btn function" onClick={handlePercent}>
          %
        </button>
        <button
          className={`calc-btn operator ${operation === "÷" ? "active" : ""}`}
          onClick={() => performOperation("÷")}
        >
          ÷
        </button>

        <button className="calc-btn number" onClick={() => inputDigit(7)}>
          7
        </button>
        <button className="calc-btn number" onClick={() => inputDigit(8)}>
          8
        </button>
        <button className="calc-btn number" onClick={() => inputDigit(9)}>
          9
        </button>
        <button
          className={`calc-btn operator ${operation === "×" ? "active" : ""}`}
          onClick={() => performOperation("×")}
        >
          ×
        </button>

        <button className="calc-btn number" onClick={() => inputDigit(4)}>
          4
        </button>
        <button className="calc-btn number" onClick={() => inputDigit(5)}>
          5
        </button>
        <button className="calc-btn number" onClick={() => inputDigit(6)}>
          6
        </button>
        <button
          className={`calc-btn operator ${operation === "-" ? "active" : ""}`}
          onClick={() => performOperation("-")}
        >
          −
        </button>

        <button className="calc-btn number" onClick={() => inputDigit(1)}>
          1
        </button>
        <button className="calc-btn number" onClick={() => inputDigit(2)}>
          2
        </button>
        <button className="calc-btn number" onClick={() => inputDigit(3)}>
          3
        </button>
        <button
          className={`calc-btn operator ${operation === "+" ? "active" : ""}`}
          onClick={() => performOperation("+")}
        >
          +
        </button>

        <button className="calc-btn number zero" onClick={() => inputDigit(0)}>
          0
        </button>
        <button className="calc-btn number" onClick={inputDecimal}>
          .
        </button>
        <button className="calc-btn equals" onClick={handleEquals}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
