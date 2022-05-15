import { WORDS } from "./words";

const deskTopSize = "1200px";
const tabletSize = "784px";
const mobileSize = "414px";
const maxWidth = deskTopSize;

const WORD_LENGTH = 5;
const ROW_LENGTH = 6;
const GAME_STATUS = {
  DOING: "doing",
  FAIL: "fail",
  COMPLETE: "complete",
} as const;

const BOARD_INPUT_STATUS = {
  YET: "yet",
  ABSENT: "absent",
  CORRECT: "correct",
  MISMATCH: "mismatch",
} as const;

const firstLineOfKeyboard = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const secondLineOfKeyboard = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const thirdLineOfKeyboard = ["enter", "z", "x", "c", "v", "b", "n", "m", "<"];

export {
  WORDS,
  WORD_LENGTH,
  ROW_LENGTH,
  deskTopSize,
  tabletSize,
  mobileSize,
  maxWidth,
  GAME_STATUS,
  BOARD_INPUT_STATUS,
  firstLineOfKeyboard,
  secondLineOfKeyboard,
  thirdLineOfKeyboard,
};
