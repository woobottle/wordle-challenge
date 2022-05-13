import React, { useState } from "react";
import ReactDOM from "react-dom";

const ResultModalPortal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById('game-result-modal')
  if (!el) throw new Error('game-result-modal not present')
  return ReactDOM.createPortal(children, el);
}

interface Props {
  answer: string;
}

const ResultModal = ({ answer }: Props) => {
  const [open, setOpen] = useState<boolean>(true)
  console.log(answer)
  const clickHandler = () => setOpen(op => !op);

  return (
    <div>result<button onClick={clickHandler}>x</button></div>
  )
}

export { ResultModal, ResultModalPortal };
