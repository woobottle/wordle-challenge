import { REACTIONS } from "./../constants/reactions";
import {
  BOARD_INPUT_STATUS,
  GAME_STATUS,
  ROW_LENGTH,
  WORD_LENGTH,
} from "../constants";
import { GameState } from "../hooks/useGame";
interface ArrayWithNumberIndex {
  [key: number]: string;
}

export const getBackgroundColor = ({
  status,
  initial,
}: {
  status: string | undefined;
  initial?: string;
}) => {
  if (status === BOARD_INPUT_STATUS.YET || status === undefined) return initial;
  if (status === BOARD_INPUT_STATUS.ABSENT) return "#3a3a3c";
  if (status === BOARD_INPUT_STATUS.MISMATCH) return "#b59f3b";
  return "#538d4e";
};

export const updateWordsEvaulated = ({
  answer,
  rowIndex,
  currentInput,
  wordsEvaulated,
}: Pick<
  GameState,
  "currentInput" | "wordsEvaulated" | "rowIndex" | "answer"
>) =>
  wordsEvaulated.map((wordEvaluated, index) => {
    if (index === rowIndex) {
      return currentInput.map((val, index) => {
        const isValueInAnswer = answer.indexOf(val) === -1;
        if (isValueInAnswer) {
          return BOARD_INPUT_STATUS.ABSENT;
        }

        if (answer[index] === val) {
          return BOARD_INPUT_STATUS.CORRECT;
        }

        return BOARD_INPUT_STATUS.MISMATCH;
      });
    }
    return wordEvaluated;
  });

export const getGameStatus = ({
  rowIndex,
  wordsEvaulated,
}: Pick<GameState, "wordsEvaulated" | "rowIndex">): string => {
  const isComplete = wordsEvaulated[rowIndex].every(
    (el) => el === BOARD_INPUT_STATUS.CORRECT
  );
  if (isComplete) return GAME_STATUS.COMPLETE;

  const isFail = rowIndex === ROW_LENGTH;
  if (isFail) return GAME_STATUS.FAIL;

  return GAME_STATUS.DOING;
};

export const currentMessage = ({
  rowIndex,
  gameStatus,
  answer,
}: Pick<GameState, "rowIndex" | "gameStatus" | "answer">) => {
  if (gameStatus === GAME_STATUS.FAIL) {
    return answer;
  }

  const messageTable: ArrayWithNumberIndex = {
    0: REACTIONS.GENIUS,
    1: REACTIONS.MAGNIFICENT,
    2: REACTIONS.IMPRESSIVE,
    3: REACTIONS.SPLENDID,
    4: REACTIONS.GREAT,
    5: REACTIONS.PHEW,
  };

  return messageTable[rowIndex];
};

export const updateKeyMapper = ({
  words,
  keyMapper,
  wordsEvaulated,
}: {
  keyMapper: Map<string, string>;
  words: string[];
  wordsEvaulated: string[][];
}) => {
  const flattenWords = words.join("").split("");
  flattenWords.forEach((char, index) => {
    if (char === "") return;
    const value = wordsEvaulated[~~(index / WORD_LENGTH)][index % WORD_LENGTH];
    if (!keyMapper.has(char)) {
      keyMapper.set(char, value);
    }
    if (value === "correct") {
      keyMapper.set(char, value);
    }
  });

  return keyMapper;
};
