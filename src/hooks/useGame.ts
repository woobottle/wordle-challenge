import { useEffect, useReducer } from "react";
import {
  GAME_STATUS,
  BOARD_INPUT_STATUS,
  WORDS,
  WORD_LENGTH,
  ROW_LENGTH,
  REDUCER_ACTION_TYPE,
  LOCAL_STORAGE_KEY_VALUE,
  MESSAGE,
} from "../constants";
import { currentMessage, getGameStatus, updateWordsEvaulated } from "../utils";

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

type reducerState =
  | { type: typeof REDUCER_ACTION_TYPE.CLICK_ENTER; value: string[][] }
  | { type: typeof REDUCER_ACTION_TYPE.CLICK_DELTE_BUTTON }
  | { type: typeof REDUCER_ACTION_TYPE.CLICK_LETTER; value: string }
  | { type: typeof REDUCER_ACTION_TYPE.UPDATE_GAME_STATUS; value: string }
  | { type: typeof REDUCER_ACTION_TYPE.CHECK_COMPLETE; value: boolean }
  | { type: typeof REDUCER_ACTION_TYPE.ADD_ROW_INDEX }
  | { type: typeof REDUCER_ACTION_TYPE.RESET_GAME };

const reducer = (prev: GameState, state: reducerState) => {
  switch (state.type) {
    case REDUCER_ACTION_TYPE.CLICK_ENTER:
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
    case REDUCER_ACTION_TYPE.CLICK_LETTER:
      return {
        ...prev,
        columnIndex: Math.min(prev.columnIndex + 1, WORD_LENGTH),
        currentInput: replacePrevInputByColumnIndex({
          currentInput: prev.currentInput,
          columnIndex: prev.columnIndex,
          value: state.value,
        }),
      };
    case REDUCER_ACTION_TYPE.CLICK_DELTE_BUTTON:
      return {
        ...prev,
        columnIndex: Math.max(prev.columnIndex - 1, 0),
        currentInput: replacePrevInputByColumnIndex({
          currentInput: prev.currentInput,
          columnIndex: prev.columnIndex - 1,
          value: "",
        }),
      };
    case REDUCER_ACTION_TYPE.UPDATE_GAME_STATUS:
      return {
        ...prev,
        rowIndex: prev.rowIndex + 1,
        gameStatus: state.value,
        isGameComplete: state.value !== GAME_STATUS.DOING,
      };
    case REDUCER_ACTION_TYPE.ADD_ROW_INDEX:
      return {
        ...prev,
      };
    case REDUCER_ACTION_TYPE.RESET_GAME:
      return getIntialState({ reset: true });
    default:
      return getIntialState({});
  }
};

const useGame = () => {
  const [state, dispatch] = useReducer(reducer, getIntialState({}));
  useEffect(() => {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY_VALUE,
      JSON.stringify({
        words: state.words,
        answer: state.answer,
        rowIndex: state.rowIndex,
        gameStatus: state.gameStatus,
        isGameComplete: state.isGameComplete,
        wordsEvaulated: state.wordsEvaulated,
      })
    );
  }, [
    state.words,
    state.answer,
    state.rowIndex,
    state.gameStatus,
    state.wordsEvaulated,
    state.isGameComplete,
  ]);

  const clickEnter = ({ wordsEvaulated }: Pick<GameState, "wordsEvaulated">) =>
    dispatch({ type: REDUCER_ACTION_TYPE.CLICK_ENTER, value: wordsEvaulated });

  const clickDeleteButton = () =>
    dispatch({ type: REDUCER_ACTION_TYPE.CLICK_DELTE_BUTTON });

  const clickLetter = (word: string) => {
    dispatch({ type: REDUCER_ACTION_TYPE.CLICK_LETTER, value: word });
  };

  const updateGameStatus = ({ gameStatus }: Pick<GameState, "gameStatus">) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.UPDATE_GAME_STATUS,
      value: gameStatus,
    });
  };

  const resetGame = () => dispatch({ type: REDUCER_ACTION_TYPE.RESET_GAME });

  const handleKeyUp = ({ buttonValue }: { buttonValue: string }) => {
    if (buttonValue === "enter" || buttonValue === "Enter") {
      const word = state.currentInput.join("");
      if (!isValidLength(word, WORD_LENGTH)) {
        // addMessage({ id: Date.now(), message: MESSAGE.WRONG_LENGTH });
        return;
      }

      if (!isWordInList(word, WORDS)) {
        // addMessage({ id: Date.now(), message: MESSAGE.WRONG_ANSWER });
        return;
      }

      const updatedWordsEvaulated = updateWordsEvaulated({
        answer: state.answer,
        rowIndex: state.rowIndex,
        currentInput: state.currentInput,
        wordsEvaulated: state.wordsEvaulated,
      });
      const gameStatus = getGameStatus({
        rowIndex: state.rowIndex,
        wordsEvaulated: updatedWordsEvaulated,
      });
      const message = currentMessage({
        rowIndex: state.rowIndex,
        gameStatus: state.gameStatus,
        answer: state.answer,
      });

      clickEnter({ wordsEvaulated: updatedWordsEvaulated });
      updateGameStatus({ gameStatus });
      if (gameStatus !== GAME_STATUS.DOING) {
        // addMessage({ id: Date.now(), message });
      }
      return;
    }

    if (buttonValue === "<" || buttonValue === "Backspace") {
      clickDeleteButton();
      return;
    }

    clickLetter(buttonValue);
    return;
  };

  return {
    state,
    actions: {
      resetGame,
      handleKeyUp,
      updateGameStatus,
    },
  };
};

const isWordInList = (word: string, words: string[]) => {
  if (words.includes(word)) return true;
  return false;
};
const isValidLength = (word: string, wordLength: number) => {
  if (word.length !== wordLength) return false;
  return true;
};

const getAnswer = () => WORDS[~~(Math.random() * WORDS.length)];

const getValueFromLocalStorage = (key: string, properties: string[]) => {
  const result: { [key: string]: any } = {};
  properties.forEach((property) => {
    result[property as keyof GameState] = window.localStorage.getItem(key)
      ? JSON.parse(String(window.localStorage.getItem(key)))[`${property}`]
      : undefined;
  });
  return result;
};

const removeValueFromLocalStorage = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY_VALUE);
};

const getInitialWordsEvaulated = () =>
  Array.from({ length: ROW_LENGTH }, () =>
    Array.from({ length: WORD_LENGTH }, () => BOARD_INPUT_STATUS.YET)
  );

const getInitialCurrentInput = () =>
  Array.from({ length: WORD_LENGTH }, () => "");

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
  } = getValueFromLocalStorage(LOCAL_STORAGE_KEY_VALUE, [
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
