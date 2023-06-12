/* useVisualMode.js */

import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      setHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory[newHistory.length - 1] = newMode;
        return newHistory;
      });
    } else {
      setMode(newMode);
      setHistory(prevHistory => [...prevHistory, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1));
    }
  }

  return { mode, transition, back };
}
