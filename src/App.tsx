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

function App() {
  const { state: gameState, actions: gameActions } = useGame();
  const { modalMessages, addMessage, removeMessage } = useModalMessage();
  // 검증함수를 App에서 정의, modal이 껴있음
  // keyboard로 전달후 고차함수
  // 커스텀 훅에서는 재료만 전달해서 최대한 재사용성을 확보하고
  // 사용처에서는 여러 재료들을 조합, 원하는 동작을 만들어보자
  // wordsEvaulated를 가지고 있어야 할까? 매번 계산하면 안될까?
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
