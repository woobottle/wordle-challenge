import "./assets/css/modal.css";
import { useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  GameBoard,
  KeyBoard,
  NavFadeModal,
  NavModalPortal,
  ResultModal,
  ResultModalPortal,
} from "./components";
import GlobalStyles from "./assets/styles/GlobalStyles";
import useGame from "./hooks/useGame";
import useModalMessage from "./hooks/useModalMessage";
import useCurrentInput from "./hooks/useCurrentInput";

function App() {
  const { gameState, gameActions } = useGame();
  const { modalMessages, addMessage, removeMessage } = useModalMessage();

  const isResultModalOpen = useMemo(() => {
    const isOpen = modalMessages.length === 0 && gameState.isGameComplete;
    return isOpen;
  }, [gameState.isGameComplete, modalMessages]);

  return (
    <ThemeProvider theme={{}}>
      <GlobalStyles />
      <NavModalPortal>
        {modalMessages.reverse().map((message) => (
          <NavFadeModal
            fadeTime={3000}
            message={message.message}
            callback={() => removeMessage(message.id)}
          />
        ))}
      </NavModalPortal>
      <div className="App">
        <GameBoard {...gameState} />
        <KeyBoard {...gameState} {...gameActions} />
      </div>
      <ResultModalPortal>
        {isResultModalOpen && (
          <ResultModal
            {...gameState}
            callback={() => gameActions.resetGame()}
          />
        )}
      </ResultModalPortal>
    </ThemeProvider>
  );
}

export default App;
