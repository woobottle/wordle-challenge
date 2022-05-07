import { useReducer } from "react";
import { GAME_STATUS, BOARD_INPUT_STATUS, WORDS } from "../constants";

interface gameState {
  answer: string;
  rowIndex: number;
  columnIndex: number;
  words: string[];
  currentInput: string[];
  gameStatus: string;
  wordsEvaulated: Array<string[] | null> | null[];
}

type reducerState =
  | { type: "clickEnter" }
  | { type: "clickDeleteButton" }
  | { type: "clickLetter"; value: string };

const useKeyboard = () => {
  const [state, dispatch] = useReducer(reducer, getIntialState())
  
  const checkWord = () => {
    const inputWord = state.currentInput.join("");
    if (!isInList(inputWord)) {
      alert("잘못된 단어 양식 입니다.");
      return false;
    }
    return true;
  };

  const clickEnter = () => {
    dispatch({ type: "clickEnter" });
  };

  const clickDeleteButton = () => {
    dispatch({ type: "clickDeleteButton" });
  };

  const clickLetter = (word: string) => {
    dispatch({ type: "clickLetter", value: word });
  };

  return {
    currentInput: state.currentInput,
    words: state.words,
    columnIndex: state.columnIndex,
    rowIndex: state.rowIndex,
    checkWord,
    clickEnter,
    clickLetter,
    clickDeleteButton,
  }
}

const getAnswer = () => WORDS[~~(Math.random() * WORDS.length)]
const isInList = (word: string) => WORDS.includes(word) ? true : false;

const getIntialState = () => ({
  answer: getAnswer(),
  rowIndex: 0,
  columnIndex: 0,
  currentInput: Array.from({ length: 5 }, () => ""),
  words: Array.from({ length: 6 }, () => ""),
  wordsEvaulated: Array.from({ length: 6 }, () => null),
  gameStatus: GAME_STATUS.START,
});

const reducer = (prev: gameState, state: reducerState) => {
  switch (state.type) {
    case "clickEnter":
      return {
        ...prev,
        columnIndex: 0,
        rowIndex: prev.rowIndex + 1,
        currentInput: Array.from({ length: 5 }, () => ""),
        wordsEvaulated: prev.wordsEvaulated.map((wordEvaluated, index) => {
          if (index === prev.rowIndex) {
            return prev.currentInput.map((val, index) => {
              const valueIndex = prev.answer.indexOf(val);
              if (valueIndex === -1) {
                return BOARD_INPUT_STATUS.ABSENT
              }
              if (valueIndex !== index) {
                return BOARD_INPUT_STATUS.MISMATCH;
              }
              return BOARD_INPUT_STATUS.CORRECT;
            })
          }
          return wordEvaluated;
        }),
        words: prev.words.map((word, index) => {
          if (index === prev.rowIndex) {
            return prev.currentInput.join('');
          }
          return word;
        })
      };
    case "clickLetter":
      return {
        ...prev,
        columnIndex: Math.min(prev.columnIndex + 1, 4),
        currentInput: prev.currentInput.map((el, index) => {
          if (index === prev.columnIndex) {
            return state.value;
          }
          return el;
        })
      };
    case "clickDeleteButton":
      return {
        ...prev,
        columnIndex: Math.max(prev.columnIndex - 1, 0),
        currentInput: prev.currentInput.map((el, index) => {
          if (index === prev.columnIndex) {
            return '';
          }
          return el;
        }),
      };
    default:
      return getIntialState();
  }
};


export default useKeyboard;