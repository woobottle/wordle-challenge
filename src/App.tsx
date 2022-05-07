import { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { GameBoard, GNB, KeyBoard } from './components';
import { darkTheme, lightTheme } from './assets/styles/theme';
import GlobalStyles from './assets/styles/GlobalStyles';
import useKeyboard from './hooks/useKeyboard';

function App() {
  const [theme, setTheme] = useState('dark')
  const currentTheme = useMemo(() => theme === 'light' ? lightTheme : darkTheme, [theme])
  
  const { 
    words, 
    rowIndex,
    currentInput,
    wordsEvaulated,
    checkWord, 
    clickEnter, 
    clickLetter, 
    clickDeleteButton, 
  } = useKeyboard()

  return (
    <ThemeProvider theme={{ currentTheme, setTheme }} >
      <GlobalStyles />
      <div className="App">
        {/* <GNB /> */}
        <GameBoard 
          words={words} 
          wordsEvaulated={wordsEvaulated}
          rowIndex={rowIndex} 
          currentInput={currentInput}
        />
        <KeyBoard 
          words={words} 
          wordsEvaulated={wordsEvaulated}
          checkWord={checkWord} 
          clickEnter={clickEnter} 
          clickLetter={clickLetter} 
          clickDeleteButton={clickDeleteButton} 
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
