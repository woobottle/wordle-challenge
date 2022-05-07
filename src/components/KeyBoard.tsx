import React from 'react';
import styled from 'styled-components';
import { firstLineOfKeyboard, secondLineOfKeyboard, thirdLineOfKeyboard } from '../constants';

interface Props {
  clickLetter: () => void;
  clickDeleteButton: () => void;
  setWord: (word: string) => void;
  clickEnter: () => void;
  checkWord: () => boolean;
}

const KeyBoard = ({ clickLetter, clickDeleteButton, setWord, clickEnter, checkWord }: Props) => {
  const clickHandler = (e: React.SyntheticEvent) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      return 
    }

    const buttonValue = e.target.dataset['key'];
    if (!buttonValue) return;

    if (buttonValue === 'enter') {
      if(!checkWord()) return;
      clickEnter()
      return
    }

    if (buttonValue === '<') {
      clickDeleteButton()
      return
    }

    setWord(buttonValue);
    clickLetter()
    return
  }

  return (
    <KeyBoardWrapper onClick={clickHandler}>
      <KeyRow>
        {firstLineOfKeyboard.map(word => <KeyButton key={word} data-key={word}>{word}</KeyButton>)}
      </KeyRow>
      <KeyRow>
        {secondLineOfKeyboard.map(word => <KeyButton key={word} data-key={word}>{word}</KeyButton>)}
      </KeyRow>
      <KeyRow>
        {thirdLineOfKeyboard.map(word => <KeyButton key={word} data-key={word}>{word}</KeyButton>)}
      </KeyRow>
    </KeyBoardWrapper>
  ) }

export default React.memo(KeyBoard);

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
  border-radius: 0.5rem;
  border: unset;
`