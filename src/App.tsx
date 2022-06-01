import "./assets/css/modal.css";
import { useMemo } from "react";
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
import useInput from "./hooks/useInput";
import { GAME_STATUS, WORDS, WORD_LENGTH } from "./constants";
import { currentMessage, getGameStatus, updateGuessEvaulations } from "./utils";

const isWordInList = (word: string, words: string[]) => {
  if (words.includes(word)) return true;
  return false;
};
const isValidLength = (word: string, wordLength: number) => {
  if (word.length !== wordLength) return false;
  return true;
};

function App() {
  const {
    state: gameState,
    actions: { updateGameStatus, resetGame },
  } = useGame();
  const {
    state: inputState,
    actions: { resetCurrentInput, clickDeleteButton, clickLetter },
  } = useInput();
  const { modalMessages, addMessage, removeMessage } = useModalMessage();

  const handleKeyUp = ({ buttonValue }: { buttonValue: string }) => {
    if (buttonValue === "enter" || buttonValue === "Enter") {
      const word = inputState.currentInput.join("");
      if (!isValidLength(word, WORD_LENGTH)) {
        // addMessage({ id: Date.now(), message: MESSAGE.WRONG_LENGTH });
        return;
      }

      if (!isWordInList(word, WORDS)) {
        // addMessage({ id: Date.now(), message: MESSAGE.WRONG_ANSWER });
        return;
      }

      const updatedGuessesEvaulated = updateGuessEvaulations(
        inputState.currentInput
      )({
        answer: gameState.answer,
        turn: gameState.turn,
        guessEvaulations: gameState.guessEvaulations,
      });

      const gameStatus = getGameStatus({
        turn: gameState.turn,
        guessEvaulations: updatedGuessesEvaulated,
      });

      const message = currentMessage({
        turn: gameState.turn,
        gameStatus: gameState.gameStatus,
        answer: gameState.answer,
      });
      resetCurrentInput();
      updateGameStatus({
        guessEvaulations: updatedGuessesEvaulated,
        gameStatus,
        newGuess: inputState.currentInput.join(""),
      });
      if (gameStatus !== GAME_STATUS.DOING) {
        // addMessage({ id: Date.now(), message });
      }
      return;
    }

    if (buttonValue === "<" || buttonValue === "Backspace") {
      clickDeleteButton();
      return;
    }

    if (/[^A-Za-z]|[A-Za-z]{2}/.test(buttonValue)) return;

    clickLetter(buttonValue);
    return;
  };
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
        <GameBoard {...gameState} {...inputState} />
        <KeyBoard {...gameState} handleKeyUp={handleKeyUp} />
      </div>
      <ResultModalPortal>
        {isResultModalOpen && (
          <ResultModal {...gameState} callback={() => resetGame()} />
        )}
      </ResultModalPortal>
    </ThemeProvider>
  );
}

export default App;
