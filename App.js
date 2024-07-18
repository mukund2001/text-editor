import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [texts, setTexts] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState('#000000');
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const containerRef = useRef(null);

  const handleChangeText = (e) => {
    setCurrentText(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleAddText = () => {
    const newText = { text: currentText, fontSize, color, left: 50, top: 50 };
    setTexts([...texts, newText]);
    setHistory([...history, texts]);
    setFuture([]);
    setCurrentText('');
  };

  const handleDrag = (e, index) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const updatedTexts = [...texts];
    updatedTexts[index].left = e.clientX - containerRect.left;
    updatedTexts[index].top = e.clientY - containerRect.top;
    setTexts(updatedTexts);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const previousTexts = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setFuture([texts, ...future]);
      setTexts(previousTexts);
    }
  };

  const handleRedo = () => {
    if (future.length > 0) {
      const nextTexts = future[0];
      setHistory([...history, texts]);
      setFuture(future.slice(1));
      setTexts(nextTexts);
    }
  };

  return (
    <div className="App">
      <div className="card">
        <div className="controls">
          <input
            type="text"
            value={currentText}
            onChange={handleChangeText}
            placeholder="Enter text here"
          />
          <input
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            placeholder="Font Size"
            min="10"
          />
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
          />
          <button onClick={handleAddText} className="control-button">Add Text</button>
          <button onClick={handleUndo} className="control-button">Undo</button>
          <button onClick={handleRedo} className="control-button">Redo</button>
        </div>
        <div className="text-container" ref={containerRef}>
          {texts.map((textItem, index) => (
            <div
              key={index}
              className="text-box"
              draggable="true"
              onDragEnd={(e) => handleDrag(e, index)}
              style={{
                fontSize: `${textItem.fontSize}px`,
                color: textItem.color,
                left: `${textItem.left}px`,
                top: `${textItem.top}px`,
                position: 'absolute',
              }}
            >
              {textItem.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
