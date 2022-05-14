import { useState } from 'react';

export interface ModalMessage {
  id: number;
  message: string
}

const useModalMessage = () => {
  const [modalMessages, setModalMessages] = useState<ModalMessage[]>([])
  
  const addMessage = (message: ModalMessage) => {
    setModalMessages(prev => [...prev, message])
  }
  
  const removeMessage = (messageId: number) => {
    setModalMessages(prev => prev.filter(message => message.id !== messageId))
  }
  
  return {
    modalMessages,
    addMessage,
    removeMessage
  }
};

export default useModalMessage;
