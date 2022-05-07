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
    columnIndex,
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
          currentInput={currentInput}
          words={words} 
          rowIndex={rowIndex} 
          />
        <KeyBoard 
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
