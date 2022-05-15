import React, { useMemo } from "react";
import styled from "styled-components";
import {
  WORDS,
  WORD_LENGTH,
  GAME_STATUS,
  firstLineOfKeyboard,
  secondLineOfKeyboard,
  thirdLineOfKeyboard,
} from "../constants";
import { GameState } from "../hooks/useGame";
import { ModalMessage } from "../hooks/useModalMessage";
import {
  currentMessage,
  getBackgroundColor,
  getGameStatus,
  updateKeyMapper,
  updateWordsEvaulated,
} from "../utils";

interface Props {
  answer: string;
  words: string[];
  rowIndex: number;
  gameStatus: string;
  currentInput: string[];
  wordsEvaulated: string[][];
  clickEnter: ({ wordsEvaulated }: Pick<GameState, "wordsEvaulated">) => void;
  clickLetter: (word: string) => void;
  updateGameStatus: ({ gameStatus }: Pick<GameState, "gameStatus">) => void;
  clickDeleteButton: () => void;
  addMessage: (message: ModalMessage) => void;
}

const KeyBoard = ({
  words,
  answer,
  rowIndex,
  gameStatus,
  currentInput,
  wordsEvaulated,
  clickEnter,
  clickLetter,
  updateGameStatus,
  clickDeleteButton,
  addMessage,
}: Props) => {
  const keyMapper = new Map<string, string>();
  const keyBoardMapper = useMemo(
    () => updateKeyMapper({ keyMapper, words, wordsEvaulated }),
    [words, wordsEvaulated]
  );

  const isWordInList = (word: string, words: string[]) => {
    if (words.includes(word)) return true;
    return false;
  };
  const isValidLength = (word: string, wordLength: number) => {
    if (word.length !== wordLength) return false;
    return true;
  };

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !(e.target instanceof HTMLButtonElement) ||
      gameStatus === GAME_STATUS.COMPLETE
    ) {
      return;
    }

    const buttonValue = e.target.dataset["key"];
    if (!buttonValue) return;

    if (buttonValue === "enter") {
      const word = currentInput.join("");
      if (!isValidLength(word, WORD_LENGTH)) {
        addMessage({ id: Date.now(), message: "단어 길이가 잘못되었습니다." });
        return;
      }

      if (!isWordInList(word, WORDS)) {
        addMessage({ id: Date.now(), message: "잘못된 단어입니다." });
        return;
      }

      const updatedWordsEvaulated = updateWordsEvaulated({
        answer,
        rowIndex,
        currentInput,
        wordsEvaulated,
      });
      const gameStatus = getGameStatus({
        rowIndex,
        wordsEvaulated: updatedWordsEvaulated,
      });
      const message = currentMessage({
        rowIndex,
        gameStatus,
        answer,
      });

      clickEnter({ wordsEvaulated: updatedWordsEvaulated });
      updateGameStatus({ gameStatus });
      if (gameStatus !== GAME_STATUS.DOING) {
        addMessage({ id: Date.now(), message });
      }
      return;
    }

    if (buttonValue === "<") {
      clickDeleteButton();
      return;
    }

    clickLetter(buttonValue);
    return;
  };

  return (
    <KeyBoardWrapper onClick={clickHandler}>
      <KeyRow>
        {firstLineOfKeyboard.map((word) => (
          <KeyButton
            key={word}
            data-key={word}
            status={keyBoardMapper.get(word)}
          >
            {word}
          </KeyButton>
        ))}
      </KeyRow>
      <KeyRow>
        {secondLineOfKeyboard.map((word) => (
          <KeyButton
            key={word}
            data-key={word}
            status={keyBoardMapper.get(word)}
          >
            {word}
          </KeyButton>
        ))}
      </KeyRow>
      <KeyRow>
        {thirdLineOfKeyboard.map((word) => (
          <KeyButton
            key={word}
            data-key={word}
            status={keyBoardMapper.get(word)}
          >
            {word}
          </KeyButton>
        ))}
      </KeyRow>
    </KeyBoardWrapper>
  );
};

export default KeyBoard;

const KeyBoardWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const KeyRow = styled.div`
  margin: 0 auto;
  display: flex;
`;

const KeyButton = styled.button<{ status?: string }>`
  border: unset;
  padding: 1rem;
  margin: 0.2rem;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border-radius: 0.5rem;
  text-transform: uppercase;
  background-color: ${({ status }) =>
    getBackgroundColor({ status, initial: "#818384" })};
`;
