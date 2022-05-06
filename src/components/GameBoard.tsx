import styled from 'styled-components';

const GameBoard = () => {
  return (
    <GameBoardWrapper>
      <InputRow>
        {Array.from({ length: 30 }, (v, i) => i).map(el => <InputBox key={el}>1</InputBox>)}
      </InputRow>
    </GameBoardWrapper>
  )
}

export default GameBoard;

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
  border: 1.5px solid black;
  margin: 2px;
  text-align: center;
  line-height: 5rem;
  font-size: 2rem;
  font-weight: bold;
`