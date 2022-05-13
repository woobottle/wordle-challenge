import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

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
  const clickHandler = () => setOpen(op => !op);

  return (
    <>
      {open &&
        <ResultModalWrapper>
          <div onClick={clickHandler}>Reset</div>
        </ResultModalWrapper>
      }
    </>
  )
}

export { ResultModal, ResultModalPortal };

const ResultModalWrapper = styled.div`
  width: 20rem;
  text-align: center;
  line-height: 20rem;
  background-color: black;
  font-size: -webkit-xxx-large;
`