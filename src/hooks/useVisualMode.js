/* useVisualMode.js */

import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prevHistory =>
      replace ? [...prevHistory.slice(0, -1), newMode] : [...prevHistory, newMode]
    );
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prevHistory => prevHistory.slice(0, -1));
    }
  };

  return { mode, transition, back };
}



/* 
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode, replace = false) => {
    setMode(newMode);

    if (replace) {
      setHistory(() => [...history.slice(0, history.length - 1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  };
  const back = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setMode(newHistory[newHistory.length - 1]);
      setHistory(() => [...newHistory]);
    }
  };
  return { mode, transition, back };
}

 */