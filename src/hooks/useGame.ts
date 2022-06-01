import { GAME_STATUS } from "./../constants/index";
import { useEffect, useReducer } from "react";
import {
  BOARD_INPUT_STATUS,
  WORDS,
  WORD_LENGTH,
  ROW_LENGTH,
  GAME_REDUCER_ACTION_TYPE,
  LOCAL_STORAGE_KEY_VALUE,
  MESSAGE,
} from "../constants";

export interface GameState {
  answer: string;
  turn: number;
  guesses: string[];
  gameStatus: string;
  isGameComplete: boolean;
  guessEvaulations: string[][];
}

type GameReducerState =
  | { type: typeof GAME_REDUCER_ACTION_TYPE.ADD_GUESS; value: string[] }
  | {
      type: typeof GAME_REDUCER_ACTION_TYPE.ADD_GUESS_EVALUATIONS;
      value: string[][];
    }
  | { type: typeof GAME_REDUCER_ACTION_TYPE.UPDATE_GAME_STATUS; value: string }
  | { type: typeof GAME_REDUCER_ACTION_TYPE.NEXT_TURN }
  | { type: typeof GAME_REDUCER_ACTION_TYPE.RESET_GAME };

const gameReducer = (prev: GameState, state: GameReducerState) => {
  switch (state.type) {
    case GAME_REDUCER_ACTION_TYPE.ADD_GUESS:
      return {
        ...prev,
        guesses: state.value,
      };
    case GAME_REDUCER_ACTION_TYPE.ADD_GUESS_EVALUATIONS:
      return {
        ...prev,
        guessEvaulations: state.value,
      };
    case GAME_REDUCER_ACTION_TYPE.UPDATE_GAME_STATUS:
      return {
        ...prev,
        gameStatus: state.value,
        isGameComplete: state.value !== GAME_STATUS.DOING,
      };
    case GAME_REDUCER_ACTION_TYPE.NEXT_TURN:
      return {
        ...prev,
        turn: prev.turn + 1,
      };
    case GAME_REDUCER_ACTION_TYPE.RESET_GAME:
      return getIntialGameState({ reset: true });
    default:
      return getIntialGameState({});
  }
};

const useGame = () => {
  const [gameState, gameDispatch] = useReducer(
    gameReducer,
    getIntialGameState({ reset: false })
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

  const nextTurn = () => {
    gameDispatch({
      type: GAME_REDUCER_ACTION_TYPE.NEXT_TURN,
    });
  };

  const addGuessEvaulations = ({
    guessEvaulations,
  }: Pick<GameState, "guessEvaulations">) =>
    gameDispatch({
      type: GAME_REDUCER_ACTION_TYPE.ADD_GUESS_EVALUATIONS,
      value: guessEvaulations,
    });

  const addNewGuess = ({ newGuess }: { newGuess: string }) => {
    const { guesses, turn } = gameState;
    const newGuesses = [...guesses];
    newGuesses[turn] = newGuess;

    gameDispatch({
      type: GAME_REDUCER_ACTION_TYPE.ADD_GUESS,
      value: newGuesses,
    });
  };

  const setGameStatus = ({ gameStatus }: Pick<GameState, "gameStatus">) => {
    gameDispatch({
      type: GAME_REDUCER_ACTION_TYPE.UPDATE_GAME_STATUS,
      value: gameStatus,
    });
  };

  const resetGame = () =>
    gameDispatch({ type: GAME_REDUCER_ACTION_TYPE.RESET_GAME });

  const updateGameStatus = ({
    guessEvaulations,
    newGuess,
    gameStatus,
  }:
    | Pick<GameState, "guessEvaulations" | "gameStatus"> & {
        newGuess: string;
      }) => {
    nextTurn();
    addGuessEvaulations({ guessEvaulations });
    addNewGuess({ newGuess });
    setGameStatus({ gameStatus });
  };

  return {
    state: gameState,
    actions: {
      resetGame,
      updateGameStatus,
    },
  };
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

const getIntialGameState = ({
  reset = true,
}: {
  reset?: boolean;
}): GameState => {
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
    "guessEvaulations",
  ]);

  return {
    turn,
    answer,
    guesses,
    gameStatus,
    isGameComplete,
    guessEvaulations,
  };
};

export default useGame;
