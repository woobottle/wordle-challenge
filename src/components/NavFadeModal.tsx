import { useEffect } from "react";
import ReactDOM from "react-dom";
import { GAME_STATUS } from "../constants";

interface Props {
  answer: string;
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

const NavFadeModal = ({ setOpen, fadeTime, rowIndex: currentRound, gameStatus, answer}: Props) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setOpen(false)
    }, fadeTime)
    return () => clearInterval(timer)
  }, [setOpen, fadeTime])

  const currentMessage = (currentRound: number, gameStatus: string) => {
    if (gameStatus === GAME_STATUS.FAIL) {
      return answer
    }
    if (currentRound === 0) {
      return 'Genius'
    }
    if (currentRound === 1) {
      return 'Magnificent'
    }
    if (currentRound === 2) {
      return 'Impressive'
    }
    if (currentRound === 3) {
      return 'Splendid'
    }
    if (currentRound === 4) {
      return 'Great'
    }
    if (currentRound === 5) {
      return 'Phew'
    }
  };

  return (
    <NavModalPortal>
      <div>{currentMessage(currentRound, gameStatus)}</div>
    </NavModalPortal>
  )
}

export default NavFadeModal;