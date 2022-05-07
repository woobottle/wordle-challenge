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
    currentInput,
    wordsEvaulated,
    words, 
    rowIndex,
    clickEnter, 
    checkWord, 
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
