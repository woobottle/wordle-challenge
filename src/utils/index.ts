import { BOARD_INPUT_STATUS, GAME_STATUS, ROW_LENGTH } from "../constants";
import { GameState } from "../hooks/useGame";

export const getBackgroundColor = (status: string | undefined) => {
  if (status === undefined) return "";
  if (status === "absent") return "#3a3a3c";
  if (status === "mismatch") return "#b59f3b";
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
  if (rowIndex === 0) {
    return "Genius";
  }
  if (rowIndex === 1) {
    return "Magnificent";
  }
  if (rowIndex === 2) {
    return "Impressive";
  }
  if (rowIndex === 3) {
    return "Splendid";
  }
  if (rowIndex === 4) {
    return "Great";
  }
  return "Phew";
};