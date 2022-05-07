import React from 'react';
import styled from 'styled-components';

interface Props {
  words: string[];
  rowIndex: number;
  currentInput: string[];
}

const GameBoard = ({ words, rowIndex, currentInput }: Props) => {
  return (
    <GameBoardWrapper>
      {words.map((word, index) => {
        if (index === rowIndex) {
          return (
            <InputRow>
              {currentInput.map((column, _index) => <InputBox>{column}</InputBox>)}
            </InputRow>
          )
        }
        
        return (
          <InputRow>
            {!!word === true
              ? word.split('').map((column, _index) => <InputBox>{column}</InputBox>)
              : Array.from({ length: 5 }).map((_column, _index) => <InputBox></InputBox>)
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

const InputBox = styled.div`
  border: 0.15rem solid black;
  border-color: gray;
  margin: 0.1rem;
  text-align: center;
  height: 5rem;
  line-height: 5rem;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
`