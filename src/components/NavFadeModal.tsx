import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ModalMessage } from "../hooks/useGame";

interface Props {
  message: ModalMessage;
  fadeTime: number;
}

const NavModalPortal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById('game-nav-modal')
  if (!el) throw new Error('game-nav-modal not present')
  return ReactDOM.createPortal(children, el);
}

const NavFadeModal = ({ 
  fadeTime, 
  message
}: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setOpen(!open)
    }, fadeTime)
    return () => clearInterval(timer)
  }, [setOpen, fadeTime, open])

  return (
    <div>{message.message}</div>
  )
}

export { NavFadeModal, NavModalPortal };