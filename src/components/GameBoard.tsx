import React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';

interface Button {
  value: string;
  type: string;
}
interface Props {
  words?: Button[][];
}

const GameBoard = ({ words }: Props) => {
  const flatWords = useMemo(() => words?.flat(), [words])

  return (
    <GameBoardWrapper>
      <InputRow>
        {flatWords && flatWords.map(({type, value}) => <InputBox>{value}</InputBox>)}
      </InputRow>
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
  grid-template-rows: repeat(6, 5rem);
  grid-template-columns: repeat(5, 5rem);
  margin: 0 auto;
`

const InputBox = styled.div`
  border: 0.15rem solid black;
  border-color: gray;
  margin: 0.1rem;
  text-align: center;
  line-height: 5rem;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
`