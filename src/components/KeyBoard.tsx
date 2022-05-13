import React, { useMemo } from 'react';
import styled from 'styled-components';
import { 
  WORDS, 
  WORD_LENGTH,
  GAME_STATUS, 
  firstLineOfKeyboard, 
  secondLineOfKeyboard, 
  thirdLineOfKeyboard, 
} from '../constants';
import { reducerState } from '../hooks/useGame';
import useKeyboard from '../hooks/useKeyboard';
import useModalMessage from '../hooks/useModalMessage';
import { currentMessage, getBackgroundColor, getGameStatus, updateWordsEvaulated } from '../utils';
const keyMapper = new Map();

interface Props {
  answer: string,
  words: string[];
  rowIndex: number,
  gameStatus: string;
  currentInput: string[],
  wordsEvaulated: string[][];
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
    updateGameStatus,
    clickDeleteButton } = useKeyboard({ currentInput, wordsEvaulated, rowIndex, answer, gameStatus, dispatch})
  const { addMessage } = useModalMessage({ dispatch })
  
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
  
  const isWordInList = (word: string, words: string[]) => {
    if(words.includes(word)) return true;
    return false;
  }
  const isValidLength = (word: string, wordLength: number) => {
    if (word.length !== wordLength) return false;
    return true;
  };
  
  const clickHandler = (e: React.SyntheticEvent) => {
    if (!(e.target instanceof HTMLButtonElement) || gameStatus === GAME_STATUS.COMPLETE) {
      return 
    }

    const buttonValue = e.target.dataset['key'];
    if (!buttonValue) return;

    if (buttonValue === 'enter') {
      const word = currentInput.join("");
      if (!isValidLength(word, WORD_LENGTH)) {
        addMessage({ id: Date.now(), message: '단어 길이가 잘못되었습니다.'})
        return;
      }

      if (!isWordInList(word, WORDS)) {
        addMessage({ id: Date.now(), message: '잘못된 단어입니다.' })
        return;
      }

      const updatedWordsEvaulated = updateWordsEvaulated({
        answer,
        rowIndex,
        currentInput,
        wordsEvaulated,
      });
      const gameStatus = getGameStatus({
        rowIndex,
        wordsEvaulated: updatedWordsEvaulated,
      });
      const message = currentMessage({
        rowIndex,
        gameStatus,
        answer,
      })
      
      clickEnter({ wordsEvaulated: updatedWordsEvaulated })
      updateGameStatus({ gameStatus })
      if (gameStatus !== GAME_STATUS.DOING) {
        addMessage({ id: Date.now(), message })
      }
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
  border: unset;
  padding: 1rem;
  margin: 0.2rem;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border-radius: 0.5rem;
  text-transform: uppercase;
  background-color: ${({ status }) => getBackgroundColor({ status, initial: "#818384"})};
`
