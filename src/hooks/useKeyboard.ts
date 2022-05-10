import { useCallback } from "react";
import { BOARD_INPUT_STATUS, GAME_STATUS, ROW_LENGTH } from "../constants";
import { GameState, reducerState } from "./useGame";

interface Props {
  answer: string;
  rowIndex: number;
  gameStatus: string;
  currentInput: string[];
  wordsEvaulated: string[][];
  dispatch: React.Dispatch<reducerState>;
}

const useKeyboard = ({
  answer,
  rowIndex,
  currentInput,
  wordsEvaulated,
  dispatch,
}: Props) => {
  const clickEnter = useCallback(() => {
    const updatedWordsEvaulated = updateWordsEvaulated({
      answer,
      rowIndex,
      currentInput,
      wordsEvaulated,
    });
    dispatch({ type: "clickEnter", value: updatedWordsEvaulated });
    const gameStatus = getGameStatus({
      rowIndex,
      wordsEvaulated,
    });
    dispatch({ type: "updateGameStatus", value: gameStatus });
  }, [answer, currentInput, dispatch, rowIndex, wordsEvaulated]);

  const clickDeleteButton = useCallback(() => {
    dispatch({ type: "clickDeleteButton" });
  }, [dispatch]);

  const clickLetter = useCallback((word: string) => {
    dispatch({ type: "clickLetter", value: word });
  }, [dispatch]);

  const updateGameStatus = useCallback(({ wordsEvaulated, rowIndex }: Pick<GameState, "wordsEvaulated" | "rowIndex">) => {
    const gameStatus = getGameStatus({
      rowIndex,
      wordsEvaulated,
    });  
    dispatch({ type: "updateGameStatus", value: gameStatus });
  }, [dispatch]);
  
  return {
    clickEnter,
    clickDeleteButton,
    clickLetter,
    updateGameStatus,
  };
};

const updateWordsEvaulated = ({
  answer,
  rowIndex,
  currentInput,
  wordsEvaulated,
}: Pick<GameState, "currentInput" | "wordsEvaulated" | "rowIndex" | "answer">) =>
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

const getGameStatus = ({
  rowIndex,
  wordsEvaulated,
}: Pick<GameState, "wordsEvaulated" | "rowIndex">): string => {
  const isComplete = wordsEvaulated[rowIndex].every((el) => el === BOARD_INPUT_STATUS.CORRECT);
  if (isComplete) return GAME_STATUS.COMPLETE;
  
  const isFail = rowIndex === ROW_LENGTH;
  if (isFail) return GAME_STATUS.FAIL;

  return GAME_STATUS.DOING;
};



export default useKeyboard;


