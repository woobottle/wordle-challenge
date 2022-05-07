import React, { useMemo } from 'react';
import styled from 'styled-components';
import { firstLineOfKeyboard, GAME_STATUS, secondLineOfKeyboard, thirdLineOfKeyboard } from '../constants';
import { getBackgroundColor } from '../utils';
const keyMapper = new Map();

interface Props {
  words: string[];
  gameStatus: string;
  wordsEvaulated: string[][];
  checkWord: () => boolean;
  clickEnter: () => void;
  clickLetter: (word: string) => void;
  clickDeleteButton: () => void;
}

const KeyBoard = ({ 
  words, 
  gameStatus,
  wordsEvaulated,
  checkWord, 
  clickEnter, 
  clickLetter, 
  clickDeleteButton, 
}: Props) => {
  const keyBoardMapper = useMemo(() => {
    const flattenWords = words.join('').split('')
    
    flattenWords.forEach((char, index) => {
      if (char === '') return
      const value = wordsEvaulated[~~(index/5)][index%5];
      if (!keyMapper.has(char)) {
        keyMapper.set(char, value);
      }
      if (value === 'correct') {
        keyMapper.set(char, value);
      } 
    })

    return keyMapper;
  }, [words, wordsEvaulated]);

  const clickHandler = (e: React.SyntheticEvent) => {
    if (!(e.target instanceof HTMLButtonElement) || gameStatus === GAME_STATUS.COMPLETE) {
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

    clickLetter(buttonValue)
    return
  }

  return (
    <KeyBoardWrapper onClick={clickHandler}>
      <KeyRow>
        {firstLineOfKeyboard.map(word => <KeyButton key={word} data-key={word} status={keyBoardMapper.get(word)}>{word}</KeyButton>)}
      </KeyRow>
      <KeyRow>
        {secondLineOfKeyboard.map(word => <KeyButton key={word} data-key={word} status={keyBoardMapper.get(word)}>{word}</KeyButton>)}
      </KeyRow>
      <KeyRow>
        {thirdLineOfKeyboard.map(word => <KeyButton key={word} data-key={word} status={keyBoardMapper.get(word)}>{word}</KeyButton>)}
      </KeyRow>
    </KeyBoardWrapper>
  )}

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

const KeyButton = styled.button<{ status?: string }>`
  color: white;
  background-color: #818384;
  padding: 1rem;
  margin: 0.2rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 0.5rem;
  border: unset;
  background-color: ${({status}) => getBackgroundColor(status)};
`

