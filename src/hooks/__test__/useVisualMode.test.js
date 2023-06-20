/* useVisualMode.test.js */

/* useVisualMode.test.js */
import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode initialize default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode replace current mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
  act(() => result.current.transition(THIRD, true));
  expect(result.current.mode).toBe(THIRD);
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});


test("useVisualMode transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});

test("useVisualMode not return to previous mode if it's already initial", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);
  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});
