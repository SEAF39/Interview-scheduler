/* useVisualMode.test.js */
import { renderHook, fireEvent } from "@testing-library/react-hooks";
import useVisualMode from "../hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  fireEvent(result.current.transition, SECOND);
  expect(result.current.mode).toBe(SECOND);

  fireEvent(result.current.transition, THIRD);
  expect(result.current.mode).toBe(THIRD);

  fireEvent(result.current.back);
  expect(result.current.mode).toBe(SECOND);

  fireEvent(result.current.back);
  expect(result.current.mode).toBe(FIRST);
});



/* 
import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "../hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should return to previous mode", () => {
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
 */