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
  
  const { clickLetter, clickDeleteButton, setWord, words, clickEnter, checkWord } = useKeyboard()
  
  return (
    <ThemeProvider theme={{ currentTheme, setTheme }} >
      <GlobalStyles />
      <div className="App">
        {/* <GNB /> */}
        <GameBoard words={words} />
        <KeyBoard 
          clickEnter={clickEnter} 
          clickLetter={clickLetter} 
          clickDeleteButton={clickDeleteButton} 
          setWord={setWord} 
          checkWord={checkWord} 
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
