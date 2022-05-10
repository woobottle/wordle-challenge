import React, { useMemo } from 'react';
import styled from 'styled-components';
import { firstLineOfKeyboard, GAME_STATUS, secondLineOfKeyboard, thirdLineOfKeyboard, WORDS, WORD_LENGTH } from '../constants';
import { reducerState } from '../hooks/useGame';
import useKeyboard from '../hooks/useKeyboard';
import { getBackgroundColor } from '../utils';
const keyMapper = new Map();


interface Props {
  words: string[];
  gameStatus: string;
  wordsEvaulated: string[][];
  currentInput: string[],
  rowIndex: number,
  answer: string,
  dispatch: React.Dispatch<reducerState>
}

const KeyBoard = ({ 
  words, 
  answer,
  rowIndex,
  gameStatus,
  currentInput,
  wordsEvaulated,
  dispatch
}: Props) => {
  const { 
    clickEnter,
    clickLetter,
    clickDeleteButton } = useKeyboard({ currentInput, wordsEvaulated, rowIndex, answer, gameStatus, dispatch})

  const keyBoardMapper = useMemo(() => {
    const flattenWords = words.join('').split('')
    
    flattenWords.forEach((char, index) => {
      if (char === '') return
      const value = wordsEvaulated[~~(index / WORD_LENGTH)][index % WORD_LENGTH];
      if (!keyMapper.has(char)) {
        keyMapper.set(char, value);
      }
      if (value === 'correct') {
        keyMapper.set(char, value);
      } 
    })

    return keyMapper;
  }, [words, wordsEvaulated]);
  
  const isInList = (word: string) => (WORDS.includes(word) ? true : false);
  const checkSentence = (sentence: string) => {
    if (sentence.length !== WORD_LENGTH) return false;
    if (!isInList(sentence)) {
      alert("잘못된 단어 입니다.");
      return false;
    }
    return true;
  };

  const clickHandler = (e: React.SyntheticEvent) => {
    if (!(e.target instanceof HTMLButtonElement) || gameStatus === GAME_STATUS.COMPLETE) {
      return 
    }

    const buttonValue = e.target.dataset['key'];
    if (!buttonValue) return;

    if (buttonValue === 'enter') {
      if (!checkSentence(currentInput.join(""))) return;
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

  // useEffect(() => {
  //   console.log('hihi')
  //   updateGameStatus({ wordsEvaulated, rowIndex})
  // }, [rowIndex, wordsEvaulated])

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
  )
}

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

