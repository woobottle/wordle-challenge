import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface Props {
  message: string;
  fadeTime: number;
  callback: () => void;
}

export const NavModalPortal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById("game-nav-modal");
  if (!el) throw new Error("game-nav-modal not present");
  return ReactDOM.createPortal(children, el);
};

const NavFadeModal = ({ fadeTime, message, callback }: Props) => {
  useEffect(() => {
    const timer = setInterval(() => {
      callback?.();
    }, fadeTime);
    return () => clearInterval(timer);
  }, [fadeTime, callback]);

  return <FadeModalWrapper>{message}</FadeModalWrapper>;
};

const FadeModalWrapper = styled.div<{ time?: number }>`
  @keyframes fadeout {
    10% {
      opacity: 1;
    }
    90% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
    }
  }

  animation: fadeout 3s;
`;

export default React.memo(NavFadeModal);
