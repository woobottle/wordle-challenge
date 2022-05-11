import React from "react";
import ReactDOM from "react-dom";

const ResultModalPortal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById('game-result-modal')
  if (!el) throw new Error('game-result-modal not present')
  return ReactDOM.createPortal(children, el);
}

interface Props {
  status: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultModal = ({ setOpen, status }: Props) => {
  const clickHandler = () => setOpen(!status);

  return (
    <div>result<button onClick={clickHandler}>x</button></div>
  )
}

export { ResultModal, ResultModalPortal };
