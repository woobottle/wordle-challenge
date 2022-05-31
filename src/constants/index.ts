export const LOCAL_STORAGE_KEY_VALUE = "boardStatus";
export const WORD_LENGTH = 5;
export const ROW_LENGTH = 6;
export const GAME_STATUS = {
  COMPLETE: "complete",
  DOING: "doing",
  FAIL: "fail",
} as const; // readonly 역할

export const GAME_REDUCER_ACTION_TYPE = {
  UPDATE_GAME_STATUS: "updateGameStatus",
  RESET_GAME: "resetGame",
  ADD_GUESS: "addGuess",
  NEXT_TURN: "nextTurn",
} as const;

export const INPUT_REDUCER_ACTION_TYPE = {
  CLICK_DELTE_BUTTON: "clickDeleteButton",
  CLICK_LETTER: "clickLetter",
  CLICK_ENTER: "clickEnter",
} as const;

export const BOARD_INPUT_STATUS = {
  MISMATCH: "mismatch",
  CORRECT: "correct",
  ABSENT: "absent",
  YET: "yet",
} as const;

export * from "./keyboards";
export * from "./messages";
export * from "./reactions";
export * from "./viewSize";
export * from "./words";
