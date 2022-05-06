import { useCallback, useReducer, useState } from "react";

interface cursorState {
  rowIndex: number;
  columnIndex: number;
}

type reducerState = {type: 'rowUp'} | {type: 'columnUp'} | {type: 'columnDown'}

const useRowColumn = () => {
  const [state, dispatch] = useReducer(reducer, getIntialState())

  const rowUp = () => {
    dispatch({type: 'rowUp'})
  }

  const columnUp = () => {
    dispatch({ type: "columnUp" });
  }

  const columnDown = () => {
    dispatch({ type: "columnDown" });
  }

  return {
    rowIndex: state.rowIndex,
    columnIndex: state.columnIndex,
    rowUp,
    columnUp,
    columnDown,
  }
}

const getIntialState = () => ({
  rowIndex: 0,
  columnIndex: 0,
})

const reducer = (prev: cursorState, state: reducerState) => {
  switch (state.type) {
    case "rowUp":
      return {
        ...prev,
        rowIndex: prev.rowIndex + 1,
      };
    case "columnUp":
      return {
        ...prev,
        columnIndex: Math.min(prev.columnIndex + 1, 4),
      };
    case "columnDown":
      return {
        ...prev,
        columnIndex: Math.max(prev.columnIndex - 1, 0),
      };
    default:
      return getIntialState();
  }
};


export default useRowColumn;