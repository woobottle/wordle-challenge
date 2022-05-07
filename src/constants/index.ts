import { WORDS } from "./words";

const deskTopSize = "1200px"
const tabletSize = "784px"
const mobileSize = "414px"
const maxWidth = deskTopSize

const GAME_STATUS = {
  START: 'start',
  DOING: 'doing',
  END: 'end'
} as const

const BUTTON_STATUS = {
  YET: 'yet',
  WRONG: 'wrong',
  CORRECT: 'correct',
  PRESENT: 'present',
} as const

const firstLineOfKeyboard = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const secondLineOfKeyboard = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const thirdLineOfKeyboard = ["enter", "z", "x", "c", "v", "b", "n", "m", "<"];

export {
  WORDS,
  deskTopSize,
  tabletSize,
  mobileSize,
  maxWidth,
  GAME_STATUS,
  BUTTON_STATUS,
  firstLineOfKeyboard,
  secondLineOfKeyboard,
  thirdLineOfKeyboard
}