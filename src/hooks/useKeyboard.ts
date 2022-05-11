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
    ({ wordsEvaulated }: Pick<Props, "wordsEvaulated">) => {
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
    ({ gameStatus }: Pick<Props, "gameStatus">) => {
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


