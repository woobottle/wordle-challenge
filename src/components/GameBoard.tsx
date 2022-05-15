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
        let contents = word.split("");
        const contentsValidate = wordsEvaulated[wordIndex];
        if (wordIndex === rowIndex) {
          contents = currentInput;
        }

        return (
          <GameRow contents={contents} contentsValidate={contentsValidate} />
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
