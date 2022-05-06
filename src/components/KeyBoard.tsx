import styled from 'styled-components';

const firstLine = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
const secondLine = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
const thirdLine = ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<']

const KeyBoard = () => {
  return (
    <KeyBoardWrapper>
      <KeyRow>
        {firstLine.map(word => <KeyButton key={word} data-key={word}>{word}</KeyButton>)}
      </KeyRow>
      <KeyRow>
        {secondLine.map(word => <KeyButton key={word} data-key={word}>{word}</KeyButton>)}
      </KeyRow>
      <KeyRow>
        {thirdLine.map(word => <KeyButton key={word} data-key={word}>{word}</KeyButton>)}
      </KeyRow>
    </KeyBoardWrapper>
  ) }

export default KeyBoard

const KeyBoardWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const KeyRow = styled.div`
  margin: 0 auto;
  display: flex;
`

const KeyButton = styled.button`
  color: white;
  background-color: #818384;
  padding: 1rem;
  margin: 0.2rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
`