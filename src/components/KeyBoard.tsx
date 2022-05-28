import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import {
  GAME_STATUS,
  firstLineOfKeyboard,
  secondLineOfKeyboard,
  thirdLineOfKeyboard,
} from "../constants";
import { ModalMessage } from "../hooks/useModalMessage";
import { getBackgroundColor, updateKeyMapper } from "../utils";

interface Props {
  answer: string;
  words: string[];
  rowIndex: number;
  gameStatus: string;
  currentInput: string[];
  wordsEvaulated: string[][];
  handleKeyUp: ({ buttonValue }: { buttonValue: string }) => void;
  addMessage: (message: ModalMessage) => void;
}

const KeyBoard = ({
  words,
  gameStatus,
  wordsEvaulated,
  handleKeyUp,
}: Props) => {
  const keyMapper = new Map<string, string>();
  const keyBoardMapper = useMemo(
    () => updateKeyMapper({ keyMapper, words, wordsEvaulated }),
    [words, wordsEvaulated]
  );

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !(e.target instanceof HTMLButtonElement) ||
      gameStatus === GAME_STATUS.COMPLETE
    ) {
      return;
    }
    const buttonValue = e.target.dataset["key"];
    if (!buttonValue) return;

    handleKeyUp({ buttonValue });
  };

  useEffect(() => {
    const eventListener = (event: KeyboardEvent) =>
      handleKeyUp({ buttonValue: event.key });

    addEventListener("keyup", eventListener);
    return () => removeEventListener("keyup", eventListener);
  }, [handleKeyUp]);

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
