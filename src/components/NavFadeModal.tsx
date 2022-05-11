import { useEffect } from "react";
import ReactDOM from "react-dom";
import { ModalMessage } from "../hooks/useGame";

interface Props {
  answer: string;
  message: ModalMessage;
  gameStatus: string;
  rowIndex: number;
  fadeTime: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavModalPortal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById('game-nav-modal')
  if (!el) throw new Error('game-nav-modal not present')
  return ReactDOM.createPortal(children, el);
}

const NavFadeModal = ({ 
  setOpen, 
  fadeTime, 
  message
}: Props) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setOpen(false)
    }, fadeTime)
    return () => clearInterval(timer)
  }, [setOpen, fadeTime])

  return (
    <div>{message.message}</div>
  )
}

export { NavFadeModal, NavModalPortal };