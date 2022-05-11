import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { BOARD_INPUT_STATUS, firstLineOfKeyboard, GAME_STATUS, ROW_LENGTH, secondLineOfKeyboard, thirdLineOfKeyboard, WORDS, WORD_LENGTH } from '../constants';
import { GameState, reducerState } from '../hooks/useGame';
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
    updateGameStatus,
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
  
  const updateWordsEvaulated = ({
    answer,
    rowIndex,
    currentInput,
    wordsEvaulated,
  }: Pick<GameState, "currentInput" | "wordsEvaulated" | "rowIndex" | "answer">) =>
    wordsEvaulated.map((wordEvaluated, index) => {
      if (index === rowIndex) {
        return currentInput.map((val, index) => {
          const isValueInAnswer = answer.indexOf(val) === -1;
          if (isValueInAnswer) {
            return BOARD_INPUT_STATUS.ABSENT;
          }

          if (answer[index] === val) {
            return BOARD_INPUT_STATUS.CORRECT;
          }

          return BOARD_INPUT_STATUS.MISMATCH;
        });
      }
      return wordEvaluated;
    });


  const getGameStatus = ({
    rowIndex,
    wordsEvaulated,
  }: Pick<GameState, "wordsEvaulated" | "rowIndex">): string => {
    console.log(wordsEvaulated, rowIndex)
    // debugger
    const isComplete = wordsEvaulated[rowIndex].every((el) => el === BOARD_INPUT_STATUS.CORRECT);
    if (isComplete) return GAME_STATUS.COMPLETE;

    const isFail = rowIndex === ROW_LENGTH;
    if (isFail) return GAME_STATUS.FAIL;

    return GAME_STATUS.DOING;
  };

  const clickHandler = (e: React.SyntheticEvent) => {
    if (!(e.target instanceof HTMLButtonElement) || gameStatus === GAME_STATUS.COMPLETE) {
      return 
    }

    const buttonValue = e.target.dataset['key'];
    if (!buttonValue) return;

    if (buttonValue === 'enter') {
      if (!checkSentence(currentInput.join(""))) return;

      const updatedWordsEvaulated = updateWordsEvaulated({
        answer,
        rowIndex,
        currentInput,
        wordsEvaulated,
      });
      clickEnter({
        wordsEvaulated: updatedWordsEvaulated
      })

      const gameStatus = getGameStatus({
        rowIndex,
        wordsEvaulated: updatedWordsEvaulated,
      });  
      updateGameStatus({ 
        gameStatus
      })

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
