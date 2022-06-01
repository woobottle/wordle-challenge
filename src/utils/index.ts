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

export const updateGuessEvaulations =
  (currentInput: string[]) =>
  ({
    answer,
    turn,
    guessEvaulations,
  }: Pick<GameState, "guessEvaulations" | "turn" | "answer">) =>
    guessEvaulations.map((guessEvaluation, index) => {
      if (index === turn) {
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
      return guessEvaluation;
    });

export const getGameStatus = ({
  turn,
  updatedGuessesEvaulated,
}: Pick<GameState, "turn"> & {
  updatedGuessesEvaulated: string[][];
}): string => {
  const isComplete = updatedGuessesEvaulated[turn].every(
    (el) => el === BOARD_INPUT_STATUS.CORRECT
  );
  if (isComplete) return GAME_STATUS.COMPLETE;

  const isFail = turn === ROW_LENGTH;
  if (isFail) return GAME_STATUS.FAIL;

  return GAME_STATUS.DOING;
};

export const getMessage = ({
  turn,
  gameStatus,
  answer,
}: Pick<GameState, "turn" | "gameStatus" | "answer">) => {
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

  return messageTable[turn];
};

export const updateKeyMapper = ({
  guesses,
  keyMapper,
  guessEvaulations,
}: {
  guesses: string[];
  keyMapper: Map<string, string>;
  guessEvaulations: string[][];
}) => {
  const flattenWords = guesses.join("").split("");
  flattenWords.forEach((char, index) => {
    if (char === "") return;
    const value =
      guessEvaulations[~~(index / WORD_LENGTH)][index % WORD_LENGTH];
    if (!keyMapper.has(char)) {
      keyMapper.set(char, value);
    }
    if (value === "correct") {
      keyMapper.set(char, value);
    }
  });

  return keyMapper;
};

export const isWordInList = (word: string, words: string[]) => {
  if (words.includes(word)) return true;
  return false;
};
export const isValidLength = (word: string, wordLength: number) => {
  if (word.length !== wordLength) return false;
  return true;
};
