import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export const ResultModalPortal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const el = document.getElementById("game-result-modal");
  if (!el) throw new Error("game-result-modal not present");
  return ReactDOM.createPortal(children, el);
};

interface Props {
  answer: string;
  callback?: () => void;
}

const ResultModal = ({ answer, callback }: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  const clickHandler = () => {
    setOpen((op) => !op);
    callback?.();
  };

  return (
    <>
      {open && (
        <ResultModalWrapper>
          <div onClick={clickHandler}>Reset</div>
        </ResultModalWrapper>
      )}
    </>
  );
};

export default React.memo(ResultModal);

const ResultModalWrapper = styled.div`
  width: 20rem;
  text-align: center;
  line-height: 20rem;
  background-color: black;
  font-size: -webkit-xxx-large;
`;
