import { useCallback, useReducer } from "react";
import { GAME_STATUS, BUTTON_STATUS, WORDS } from "../constants";

interface Button {
  value: string;
  type: string;
}
interface gameState {
  answer: string;
  rowIndex: number;
  columnIndex: number;
  words: Button[][];
  gameStatus: string;
}

type reducerState = {type: 'clickEnter'} | {type: 'clickLetter'} | {type: 'clickDeleteButton'} | {type: 'setWord', value: string }

const useKeyboard = () => {
  const [state, dispatch] = useReducer(reducer, getIntialState())
  
  const checkWord = useCallback(() => {
    const inputWord = state.words[state.rowIndex].map(el => el.value).join("");
    if (!isInList(inputWord)) {
      alert('잘못된 단어 양식 입니다.')
      return false
    };
    return true;
  }, [])

  const clickEnter = useCallback(() => {
    dispatch({ type: "clickEnter" });
  }, [])

  const clickLetter = useCallback(() => {
    dispatch({ type: "clickLetter" });
  }, [])

  const clickDeleteButton = useCallback(() => {
    dispatch({ type: "clickDeleteButton" });
  }, [])

  const setWord = useCallback((word: string) => {
    dispatch({ type: 'setWord', value: word })
  }, [])

  return {
    rowIndex: state.rowIndex,
    columnIndex: state.columnIndex,
    words: state.words,
    checkWord,
    clickEnter,
    clickLetter,
    clickDeleteButton,
    setWord,
  }
}

const getAnswer = () => WORDS[~~(Math.random() * WORDS.length)]
const isInList = (word: string) => WORDS.includes(word) ? true : false;

const getIntialState = () => ({
  answer: getAnswer(),
  rowIndex: 0,
  columnIndex: 0,
  words: [
    Array.from({ length: 5 }, () => ({ type: BUTTON_STATUS.YET, value: "" })),
    Array.from({ length: 5 }, () => ({ type: BUTTON_STATUS.YET, value: "" })),
    Array.from({ length: 5 }, () => ({ type: BUTTON_STATUS.YET, value: "" })),
    Array.from({ length: 5 }, () => ({ type: BUTTON_STATUS.YET, value: "" })),
    Array.from({ length: 5 }, () => ({ type: BUTTON_STATUS.YET, value: "" })),
  ],
  gameStatus: GAME_STATUS.START,
});

const reducer = (prev: gameState, state: reducerState) => {
  switch (state.type) {
    case "clickEnter":
      return {
        ...prev,
        columnIndex: 0,
        rowIndex: prev.rowIndex + 1,
        words: prev.words.map((rowArray, rowIndex) =>
          rowArray.map(({ type, value }, colIndex) => {
            if (rowIndex === prev.rowIndex && colIndex === prev.columnIndex) {
              return { type: "", value: "" };
            }
            return { type, value };
          })
        ),
      };
    case "clickLetter":
      return {
        ...prev,
        columnIndex: Math.min(prev.columnIndex + 1, 4),
      };
    case "clickDeleteButton":
      return {
        ...prev,
        columnIndex: Math.max(prev.columnIndex - 1, 0),
        words: prev.words.map((rowArray, rowIndex) =>
          rowArray.map(({type, value}, colIndex) => {
            if (rowIndex === prev.rowIndex && colIndex === prev.columnIndex) {
              return {type: '', value: '' };
            }
            return { type, value };
          })
        ),
      };
    case 'setWord' :
      return {
        ...prev,
        words: prev.words.map((rowArray, rowIndex) =>
          rowArray.map(({type, value}, colIndex) => {
            if (prev.columnIndex === 4 && value !== '') {
              return {type, value};
            }
            if (rowIndex === prev.rowIndex && colIndex === prev.columnIndex) {
              return { type: '', value: state.value };
            }
            return { type, value };
          })
        ),
      };
    default:
      return getIntialState();
  }
};


export default useKeyboard;