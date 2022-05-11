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

  return {
    addMessage,
    removeMessage
  }
};

export default useModalMessage;
