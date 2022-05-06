import { useReducer } from "react";

interface cursorState {
  rowIndex: number;
  columnIndex: number;
  words: string[][];
}

type reducerState = {type: 'rowUp'} | {type: 'columnUp'} | {type: 'columnDown'} | {type: 'setWord', value: string }

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

  const onClick = (word: string) => {
    dispatch({ type: 'setWord', value: word })
  }

  return {
    rowIndex: state.rowIndex,
    columnIndex: state.columnIndex,
    words: state.words,
    rowUp,
    columnUp,
    columnDown,
    onClick,
  }
}

const getIntialState = () => ({
  rowIndex: 0,
  columnIndex: 0,
  words: [['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']],
});

const reducer = (prev: cursorState, state: reducerState) => {
  switch (state.type) {
    case "rowUp":
      return {
        ...prev,
        columnIndex: 0,
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
        words: prev.words.map((rowArray, rowIndex) =>
          rowArray.map((val, colIndex) => {
            if (rowIndex === prev.rowIndex && colIndex === prev.columnIndex) {
              return '';
            }
            return val;
          })
        ),
      };
    case 'setWord' :
      return {
        ...prev,
        words: prev.words.map((rowArray, rowIndex) =>
          rowArray.map((val, colIndex) => {
            if (prev.columnIndex === 4 && val !== '') {
              return val;
            }
            if (rowIndex === prev.rowIndex && colIndex === prev.columnIndex) {
              return state.value;
            }
            return val;
          })
        ),
      };
    default:
      return getIntialState();
  }
};


export default useRowColumn;