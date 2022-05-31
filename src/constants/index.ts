export const LOCAL_STORAGE_KEY_VALUE = "boardStatus";
export const WORD_LENGTH = 5;
export const ROW_LENGTH = 6;
export const GAME_STATUS = {
  DOING: "doing",
  FAIL: "fail",
  COMPLETE: "complete",
} as const; // readonly 역할

export const GAME_REDUCER_ACTION_TYPE = {
  UPDATE_GAME_STATUS: "updateGameStatus",
  NEXT_TURN: "next_turn",
  RESET_GAME: "resetGame",
  CHECK_COMPLETE: "checkComplete",
} as const;

export const INPUT_REDUCER_ACTION_TYPE = {
  CLICK_ENTER: "clickEnter",
  CLICK_DELTE_BUTTON: "clickDeleteButton",
  CLICK_LETTER: "clickLetter",
} as const;

export const BOARD_INPUT_STATUS = {
  YET: "yet",
  ABSENT: "absent",
  CORRECT: "correct",
  MISMATCH: "mismatch",
} as const;

export * from "./keyboards";
export * from "./messages";
export * from "./reactions";
export * from "./viewSize";
export * from "./words";
