import { useEffect, useReducer } from "react";
import { GAME_STATUS, BOARD_INPUT_STATUS, WORDS, WORD_LENGTH, ROW_LENGTH } from "../constants";

export interface GameState {
  answer: string;
  rowIndex: number;
  columnIndex: number;
  words: string[];
  currentInput: string[];
  gameStatus: string;
  isGameComplete: boolean;
  wordsEvaulated: string[][];
}

export type reducerState =
  | { type: "clickEnter"; value: string[][] }
  | { type: "clickDeleteButton" }
  | { type: "clickLetter"; value: string }
  | { type: "updateGameStatus"; value: string }
  | { type: "checkComplete"; value: boolean }
  | { type: "addRowIndex" }
  | { type: "resetGame" };

const useGame = () => {
  const [state, dispatch] = useReducer(reducer, getIntialState({}))
  useEffect(() => {
    window.localStorage.setItem('boardStatus', JSON.stringify({
      words: state.words,
      answer: state.answer,
      rowIndex: state.rowIndex,
      gameStatus: state.gameStatus,
      isGameComplete: state.isGameComplete,
      wordsEvaulated: state.wordsEvaulated,
    }))
  }, [
    state.words, 
    state.answer, 
    state.rowIndex, 
    state.gameStatus, 
    state.wordsEvaulated, 
    state.isGameComplete
  ])

  const clickEnter = ({ wordsEvaulated }: Pick<GameState, "wordsEvaulated">) => dispatch({ type: "clickEnter", value: wordsEvaulated });
  
  const clickDeleteButton = () => dispatch({ type: "clickDeleteButton" });

  const clickLetter = (word: string) => {
      dispatch({ type: "clickLetter", value: word });
    };

  const updateGameStatus = ({ gameStatus }: Pick<GameState, "gameStatus">) => {
    dispatch({ type: "updateGameStatus", value: gameStatus });
  };

  const resetGame = () => dispatch({ type: "resetGame" })

  return {
    state,
    actions: {
      resetGame,
      clickEnter,
      clickLetter,
      updateGameStatus,
      clickDeleteButton,
    },
  };
}

const reducer = (prev: GameState, state: reducerState) => {
  switch (state.type) {
    case "clickEnter":
      return {
        ...prev,
        columnIndex: 0,
        wordsEvaulated: state.value,
        currentInput: getInitialCurrentInput(),
        words: prev.words.map((word, index) => {
          if (index === prev.rowIndex) {
            return prev.currentInput.join("");
          }
          return word;
        }),
      };
    case "clickLetter":
      return {
        ...prev,
        columnIndex: Math.min(prev.columnIndex + 1, WORD_LENGTH),
        currentInput: replacePrevInputByColumnIndex({
          currentInput: prev.currentInput,
          columnIndex: prev.columnIndex,
          value: state.value,
        }),
      };
    case "clickDeleteButton":
      return {
        ...prev,
        columnIndex: Math.max(prev.columnIndex - 1, 0),
        currentInput: replacePrevInputByColumnIndex({
          currentInput: prev.currentInput,
          columnIndex: prev.columnIndex - 1,
          value: "",
        }),
      };
    case "updateGameStatus":
      return {
        ...prev,
        rowIndex: prev.rowIndex + 1,
        gameStatus: state.value,
        isGameComplete: state.value !== GAME_STATUS.DOING,
      };
    case "addRowIndex":
      return {
        ...prev,
      };
    case "resetGame":
      return getIntialState({ reset: true });
    default:
      return getIntialState({});
  }
};

const getAnswer = () => WORDS[~~(Math.random() * WORDS.length)];

const getValueFromLocalStorage = (key: string, properties: string[]) => {
  const result: { [key: string]: any } = {}
  properties.forEach((property) => {
    result[property as keyof GameState] = window.localStorage.getItem(key)
      ? JSON.parse(String(window.localStorage.getItem(key)))[`${property}`]
      : undefined;
    });
  return result
}

const removeValueFromLocalStorage = () => { window.localStorage.removeItem("boardStatus") }

const getInitialWordsEvaulated = () => Array.from({ length: ROW_LENGTH }, () => Array.from({ length: WORD_LENGTH }, () => BOARD_INPUT_STATUS.YET));

const getInitialCurrentInput = () => Array.from({ length: WORD_LENGTH }, () => "");

const getIntialState = ({ reset }: { reset?: true }): GameState => {
  if (reset) removeValueFromLocalStorage();

  const {
    words = Array.from({ length: ROW_LENGTH }, () => ""),
    answer = getAnswer(),
    rowIndex = 0,
    gameStatus = GAME_STATUS.DOING,
    currentInput = getInitialCurrentInput(),
    isGameComplete = false,
    wordsEvaulated = getInitialWordsEvaulated(),
    columnIndex = 0,
  } = getValueFromLocalStorage("boardStatus", [
    "words",
    "answer",
    "rowIndex",
    "gameStatus",
    "currentInput",
    "isGameComplete",
    "wordsEvaulated",
  ]);

  return {
    words,
    answer,
    rowIndex,
    gameStatus,
    columnIndex,
    currentInput,
    isGameComplete,
    wordsEvaulated,
  };
};

const replacePrevInputByColumnIndex = ({
  currentInput,
  columnIndex,
  value,
}: Pick<GameState, "currentInput" | "columnIndex"> & { value: string }) =>
  currentInput.map((el, index) => {
    if (index === columnIndex) {
      return value;
    }
    return el;
  });


export default useGame;