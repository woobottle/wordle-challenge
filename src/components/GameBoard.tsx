import styled from "styled-components";
import GameRow from "./GameRow";

interface Props {
  words: string[];
  rowIndex: number;
  currentInput: string[];
  wordsEvaulated: Array<string[]>;
}

const GameBoard = ({
  words,
  rowIndex,
  currentInput,
  wordsEvaulated,
}: Props) => {
  return (
    <GameBoardWrapper>
      {words.map((word, wordIndex) => {
        return (
          <GameRow
            contents={wordIndex === rowIndex ? currentInput : word.split("")}
            contentsValidate={wordsEvaulated[wordIndex]}
          />
        );
      })}
    </GameBoardWrapper>
  );
};

export default GameBoard;

const GameBoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 10rem;
`;
