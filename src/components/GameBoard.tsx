import styled from "styled-components";
import GameRow from "./GameRow";

interface Props {
  guesses: string[];
  turn: number;
  currentInput: string[];
  guessEvaulations: Array<string[]>;
}

const GameBoard = ({
  guesses,
  turn,
  currentInput,
  guessEvaulations,
}: Props) => {
  console.log(guesses);
  return (
    <GameBoardWrapper>
      {guesses.map((guess, wordIndex) => {
        return (
          <GameRow
            contents={wordIndex === turn ? currentInput : guess.split("")}
            contentsValidate={guessEvaulations[wordIndex]}
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
