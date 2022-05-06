import { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { GameBoard, GNB, KeyBoard } from './components';
import { darkTheme, lightTheme } from './assets/styles/theme';
import GlobalStyles from './assets/styles/GlobalStyles';
import useRowColumn from './hooks/useRowColumn';

function App() {
  const [theme, setTheme] = useState('dark')
  const currentTheme = useMemo(() => theme === 'light' ? lightTheme : darkTheme, [theme])
  
  const { columnUp, columnDown, onClick, words, rowUp } = useRowColumn()
  
  return (
    <ThemeProvider theme={{ currentTheme, setTheme }} >
      <GlobalStyles />
      <div className="App">
        {/* <GNB /> */}
        <GameBoard words={words} />
        <KeyBoard columnUp={columnUp} columnDown={columnDown} onClick={onClick} rowUp={rowUp} />
      </div>
    </ThemeProvider>
  );
}

export default App;
