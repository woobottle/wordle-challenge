import "../assets/css/modal.css";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  GameBoard,
  KeyBoard,
  NavFadeModal,
  NavModalPortal,
  ResultModal,
  ResultModalPortal,
} from "../components";
import GlobalStyles from "../assets/styles/GlobalStyles";
import useGame from "../hooks/useGame";
import useModalMessage from "../hooks/useModalMessage";
import useInput from "../hooks/useInput";
import { GAME_STATUS, MESSAGE, WORDS, WORD_LENGTH } from "../constants";
import {
  getMessage,
  getGameStatus,
  updateGuessEvaulations,
  isValidLength,
  isWordInList,
} from "../utils";

const Wordle = () => {
  const {
    state: gameState,
    actions: { updateGameStatus, resetGame },
  } = useGame();
  const {
    state: inputState,
    actions: { resetCurrentInput, clickDeleteButton, clickLetter },
  } = useInput();
  const { modalMessages, addMessage, removeMessage } = useModalMessage();
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const handleKeyUp = ({ buttonValue }: { buttonValue: string }) => {
    if (buttonValue === "enter" || buttonValue === "Enter") {
      const newGuess = inputState.currentInput.join("");
      if (!isValidLength(newGuess, WORD_LENGTH)) {
        addMessage({ id: Date.now(), message: MESSAGE.WRONG_LENGTH });
        return;
      }

      if (!isWordInList(newGuess, WORDS)) {
        addMessage({ id: Date.now(), message: MESSAGE.WRONG_ANSWER });
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
        updatedGuessesEvaulated,
      });

      resetCurrentInput();
      updateGameStatus({
        guessEvaulations: updatedGuessesEvaulated,
        gameStatus,
        newGuess,
      });
      if (gameStatus !== GAME_STATUS.DOING) {
        addMessage({
          id: Date.now(),
          message: getMessage({
            turn: gameState.turn,
            gameStatus: gameState.gameStatus,
            answer: gameState.answer,
          }),
        });
      }
      if (gameStatus === GAME_STATUS.COMPLETE) {
        setTimeout(() => {
          setIsResultModalOpen(true);
        }, 2000);
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
          <ResultModal
            {...gameState}
            callback={() => {
              resetGame();
              setIsResultModalOpen(false);
            }}
          />
        )}
      </ResultModalPortal>
    </ThemeProvider>
  );
};

export default Wordle;
