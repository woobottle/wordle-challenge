import { useCallback } from 'react';
import { ModalMessage, reducerState } from "./useGame";

interface Props {
  dispatch: React.Dispatch<reducerState>;
}

const useModalMessage = ({ dispatch }: Props) => {
  const addMessage = useCallback((message: ModalMessage) => {
    dispatch({ type: 'addModalMessage', value: message })
  }, [dispatch])
  
  const removeMessage = useCallback((endTime: number) => {
    dispatch({ type: "removeModalMessage", value: endTime });
  }, [dispatch])

  // resetGame의 위치가 적절치는 않은것 같은데
  const resetGame = useCallback(() => {
    dispatch({ type: "resetGame" });
  }, [dispatch])

  return {
    resetGame,
    addMessage,
    removeMessage
  }
};

export default useModalMessage;
