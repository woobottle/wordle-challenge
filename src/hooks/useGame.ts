import { useEffect, useReducer } from "react";
import {
  GAME_STATUS,
  BOARD_INPUT_STATUS,
  WORDS,
  WORD_LENGTH,
  ROW_LENGTH,
  GAME_REDUCER_ACTION_TYPE,
  INPUT_REDUCER_ACTION_TYPE,
  LOCAL_STORAGE_KEY_VALUE,
  MESSAGE,
} from "../constants";
import {
  currentMessage,
  getGameStatus,
  updateGuessEvaulations,
} from "../utils";

export interface GameState {
  answer: string;
  turn: number;
  guesses: string[];
  gameStatus: string;
  isGameComplete: boolean;
  guessEvaulations: string[][];
}

type GameReducerState =
  | { type: typeof GAME_REDUCER_ACTION_TYPE.ADD_GUESS; value: string }
  | { type: typeof GAME_REDUCER_ACTION_TYPE.UPDATE_GAME_STATUS; value: string }
  | { type: typeof GAME_REDUCER_ACTION_TYPE.NEXT_TURN }
  | { type: typeof GAME_REDUCER_ACTION_TYPE.RESET_GAME };

const gameReducer = (prev: GameState, state: GameReducerState) => {
  switch (state.type) {
    case GAME_REDUCER_ACTION_TYPE.UPDATE_GAME_STATUS:
      return {
        ...prev,
        turn: prev.turn + 1,
        gameStatus: state.value,
        isGameComplete: state.value !== GAME_STATUS.DOING,
      };
    case GAME_REDUCER_ACTION_TYPE.NEXT_TURN:
      return {
        ...prev,
      };
    case GAME_REDUCER_ACTION_TYPE.RESET_GAME:
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
  | { type: typeof INPUT_REDUCER_ACTION_TYPE.CLICK_ENTER; value: string[][] }
  | { type: typeof INPUT_REDUCER_ACTION_TYPE.CLICK_DELTE_BUTTON }
  | { type: typeof INPUT_REDUCER_ACTION_TYPE.CLICK_LETTER; value: string };

const inputReducer = (prev: InputState, state: InputReducerState) => {
  switch (state.type) {
    case INPUT_REDUCER_ACTION_TYPE.CLICK_ENTER:
      return {
        columnIndex: 0,
        currentInput: getInitialCurrentInput(),
      };
    case INPUT_REDUCER_ACTION_TYPE.CLICK_LETTER:
      return {
        columnIndex: Math.min(prev.columnIndex + 1, WORD_LENGTH),
        currentInput: replacePrevInputByColumnIndex({
          currentInput: prev.currentInput,
          columnIndex: prev.columnIndex,
          value: state.value,
        }),
      };
    case INPUT_REDUCER_ACTION_TYPE.CLICK_DELTE_BUTTON:
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

const useGame = () => {
  const [gameState, gameDispatch] = useReducer(
    gameReducer,
    getIntialGameState({})
  );
  const [inputState, inputDispatch] = useReducer(
    inputReducer,
    getInitialInputState()
  );

  useEffect(() => {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY_VALUE,
      JSON.stringify({
        guesses: gameState.guesses,
        answer: gameState.answer,
        turn: gameState.turn,
        gameStatus: gameState.gameStatus,
        isGameComplete: gameState.isGameComplete,
        guessEvaulations: gameState.guessEvaulations,
      })
    );
  }, [
    gameState.guesses,
    gameState.answer,
    gameState.turn,
    gameState.gameStatus,
    gameState.guessEvaulations,
    gameState.isGameComplete,
  ]);

  const clickEnter = ({
    guessEvaulations,
  }: Pick<GameState, "guessEvaulations">) =>
    inputDispatch({
      type: INPUT_REDUCER_ACTION_TYPE.CLICK_ENTER,
      value: guessEvaulations,
    });

  const clickDeleteButton = () =>
    inputDispatch({ type: INPUT_REDUCER_ACTION_TYPE.CLICK_DELTE_BUTTON });

  const clickLetter = (word: string) => {
    inputDispatch({
      type: INPUT_REDUCER_ACTION_TYPE.CLICK_LETTER,
      value: word,
    });
  };

  const updateGameStatus = ({ gameStatus }: Pick<GameState, "gameStatus">) => {
    gameDispatch({
      type: GAME_REDUCER_ACTION_TYPE.UPDATE_GAME_STATUS,
      value: gameStatus,
    });
  };

  const resetGame = () =>
    gameDispatch({ type: GAME_REDUCER_ACTION_TYPE.RESET_GAME });

  const handleKeyUp = ({ buttonValue }: { buttonValue: string }) => {
    if (buttonValue === "enter" || buttonValue === "Enter") {
      const word = inputState.currentInput.join("");
      if (!isValidLength(word, WORD_LENGTH)) {
        // addMessage({ id: Date.now(), message: MESSAGE.WRONG_LENGTH });
        return;
      }

      if (!isWordInList(word, WORDS)) {
        // addMessage({ id: Date.now(), message: MESSAGE.WRONG_ANSWER });
        return;
      }

      const updatedWordsEvaulated = updateGuessEvaulations(
        inputState.currentInput
      )({
        answer: gameState.answer,
        turn: gameState.turn,
        guessEvaulations: gameState.guessEvaulations,
      });

      const gameStatus = getGameStatus({
        turn: gameState.turn,
        guessEvaulations: updatedWordsEvaulated,
      });

      const message = currentMessage({
        turn: gameState.turn,
        gameStatus: gameState.gameStatus,
        answer: gameState.answer,
      });

      clickEnter({ guessEvaulations: updatedWordsEvaulated });
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
    state: {
      ...gameState,
      ...inputState,
    },
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

const getInitialGuessesEvaulated = () =>
  Array.from({ length: ROW_LENGTH }, () =>
    Array.from({ length: WORD_LENGTH }, () => BOARD_INPUT_STATUS.YET)
  );

const getInitialCurrentInput = () =>
  Array.from({ length: WORD_LENGTH }, () => "");

const getInitialInputState = (): InputState => ({
  currentInput: Array.from({ length: WORD_LENGTH }, () => ""),
  columnIndex: 0,
});

const getIntialGameState = ({ reset }: { reset?: true }): GameState => {
  if (reset) removeValueFromLocalStorage();

  const {
    guesses = Array.from({ length: ROW_LENGTH }, () => ""),
    answer = getAnswer(),
    turn = 0,
    gameStatus = GAME_STATUS.DOING,
    isGameComplete = false,
    guessEvaulations = getInitialGuessesEvaulated(),
  } = getValueFromLocalStorage(LOCAL_STORAGE_KEY_VALUE, [
    "guesses",
    "answer",
    "turn",
    "gameStatus",
    "currentInput",
    "isGameComplete",
    "wordsEvaulated",
  ]);

  return {
    guesses,
    answer,
    turn,
    gameStatus,
    isGameComplete,
    guessEvaulations,
  };
};

const replacePrevInputByColumnIndex = ({
  currentInput,
  columnIndex,
  value,
}: Pick<InputState, "currentInput" | "columnIndex"> & { value: string }) =>
  currentInput.map((el, index) => {
    if (index === columnIndex) {
      return value;
    }
    return el;
  });

export default useGame;
