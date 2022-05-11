import { useCallback } from "react";
import { reducerState } from "./useGame";

interface Props {
  answer: string;
  rowIndex: number;
  gameStatus: string;
  currentInput: string[];
  wordsEvaulated: string[][];
  dispatch: React.Dispatch<reducerState>;
}

const useKeyboard = ({
  dispatch,
}: Props) => {
  const clickEnter = useCallback(
    ({ wordsEvaulated }: { wordsEvaulated: string[][] }) => {
      dispatch({ type: "clickEnter", value: wordsEvaulated });
    },
    [dispatch]
  );

  const clickDeleteButton = useCallback(() => {
    dispatch({ type: "clickDeleteButton" });
  }, [dispatch]);

  const clickLetter = useCallback((word: string) => {
    dispatch({ type: "clickLetter", value: word });
  }, [dispatch]);

  const updateGameStatus = useCallback(
    ({ gameStatus }: { gameStatus: string }) => {
      dispatch({ type: "updateGameStatus", value: gameStatus });
    },
    [dispatch]
  );
  
  return {
    clickEnter,
    clickDeleteButton,
    clickLetter,
    updateGameStatus,
  };
};


export default useKeyboard;


