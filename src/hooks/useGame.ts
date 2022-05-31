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
  turn: number;
  words: string[];
  gameStatus: string;
  isGameComplete: boolean;
  wordsEvaulated: string[][];
}

type GameReducerState =
  | { type: typeof REDUCER_ACTION_TYPE.UPDATE_GAME_STATUS; value: string }
  | { type: typeof REDUCER_ACTION_TYPE.CHECK_COMPLETE; value: boolean }
  | { type: typeof REDUCER_ACTION_TYPE.NEXT_TURN }
  | { type: typeof REDUCER_ACTION_TYPE.RESET_GAME };

const gameReducer = (prev: GameState, state: GameReducerState) => {
  switch (state.type) {
    case REDUCER_ACTION_TYPE.UPDATE_GAME_STATUS:
      return {
        ...prev,
        turn: prev.turn + 1,
        gameStatus: state.value,
        isGameComplete: state.value !== GAME_STATUS.DOING,
      };
    case REDUCER_ACTION_TYPE.NEXT_TURN:
      return {
        ...prev,
      };
    case REDUCER_ACTION_TYPE.RESET_GAME:
      return getIntialGameState({ reset: true });
    default:
      return getIntialGameState({});
  }
};

export interface InputState {
  currentInput: string[];
  columnIndex: number;
}

type InputReducerState =
  | { type: typeof REDUCER_ACTION_TYPE.CLICK_ENTER; value: string[][] }
  | { type: typeof REDUCER_ACTION_TYPE.CLICK_DELTE_BUTTON }
  | { type: typeof REDUCER_ACTION_TYPE.CLICK_LETTER; value: string };

const inputReducer = (prev: InputState, state: InputReducerState) => {
  switch (state.type) {
    case REDUCER_ACTION_TYPE.CLICK_ENTER:
      return {
        columnIndex: 0,
        currentInput: getInitialCurrentInput(),
      };
    case REDUCER_ACTION_TYPE.CLICK_LETTER:
      return {
        columnIndex: Math.min(prev.columnIndex + 1, WORD_LENGTH),
        currentInput: replacePrevInputByColumnIndex({
          currentInput: prev.currentInput,
          columnIndex: prev.columnIndex,
          value: state.value,
        }),
      };
    case REDUCER_ACTION_TYPE.CLICK_DELTE_BUTTON:
      return {
        columnIndex: Math.max(prev.columnIndex - 1, 0),
        currentInput: replacePrevInputByColumnIndex({
          currentInput: prev.currentInput,
          columnIndex: prev.columnIndex - 1,
          value: "",
        }),
      };
  }
};

const getInitialInputState = (): Input => ({
  currentInput: Array.from({ length: WORD_LENGTH }, () => ""),
  columnIndex: 0,
});

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, getIntialGameState({}));
  const [inputState, inputDispatch] = useReducer(
    inputReducer,
    getInitialInputState()
  );

  useEffect(() => {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY_VALUE,
      JSON.stringify({
        words: state.words,
        answer: state.answer,
        turn: state.turn,
        gameStatus: state.gameStatus,
        isGameComplete: state.isGameComplete,
        wordsEvaulated: state.wordsEvaulated,
      })
    );
  }, [
    state.words,
    state.answer,
    state.turn,
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
        turn: state.turn,
        currentInput: state.currentInput,
        wordsEvaulated: state.wordsEvaulated,
      });
      const gameStatus = getGameStatus({
        turn: state.turn,
        wordsEvaulated: updatedWordsEvaulated,
      });
      const message = currentMessage({
        turn: state.turn,
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

    if (/[^A-Za-z]|[A-Za-z]{2}/.test(buttonValue)) return;

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

const getIntialGameState = ({ reset }: { reset?: true }): GameState => {
  if (reset) removeValueFromLocalStorage();

  const {
    words = Array.from({ length: ROW_LENGTH }, () => ""),
    answer = getAnswer(),
    turn = 0,
    gameStatus = GAME_STATUS.DOING,
    currentInput = getInitialCurrentInput(),
    isGameComplete = false,
    wordsEvaulated = getInitialWordsEvaulated(),
    columnIndex = 0,
  } = getValueFromLocalStorage(LOCAL_STORAGE_KEY_VALUE, [
    "words",
    "answer",
    "turn",
    "gameStatus",
    "currentInput",
    "isGameComplete",
    "wordsEvaulated",
  ]);

  return {
    words,
    answer,
    turn,
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
