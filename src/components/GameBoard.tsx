import React from 'react';
import styled from 'styled-components';
import { getBackgroundColor } from '../utils';

interface Props {
  words: string[];
  rowIndex: number;
  currentInput: string[];
  wordsEvaulated: Array<string[]>;
}

const GameBoard = ({ words, rowIndex, currentInput, wordsEvaulated }: Props) => {
  return (
    <GameBoardWrapper>
      {words.map((word, wordIndex) => {
        if (wordIndex === rowIndex) {
          return (
            <InputRow>
              {currentInput.map((column, _index) => <InputBox>{column}</InputBox>)}
            </InputRow>
          )
        }
        
        return (
          <InputRow>
            {!!word === true
              ? word.split('').map((column, columnIndex) => <InputBox status={wordsEvaulated[wordIndex][columnIndex]}>{column}</InputBox>)
              : Array.from({ length: 5 }).map((_column, _index) => <InputBox />)
            }
          </InputRow>
        )
      })}
    </GameBoardWrapper>
  )
}

export default React.memo(GameBoard);

const GameBoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 5rem);
  margin: 0 auto;
`

const InputBox = styled.div<{ status?: string }>`
  border: 0.15rem solid black;
  border-color: gray;
  margin: 0.1rem;
  text-align: center;
  height: 5rem;
  line-height: 5rem;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${(props) => getBackgroundColor(props.status)};
`