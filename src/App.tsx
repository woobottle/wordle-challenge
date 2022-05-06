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
  const [words, setWords] = useState([[], [], [], [], []]);
  const { columnUp, columnDown } = useRowColumn()
  
  return (
    <ThemeProvider theme={{ currentTheme, setTheme }} >
      <GlobalStyles />
      <div className="App">
        <GNB />
        <GameBoard />
        <KeyBoard columnUp={columnUp} columnDown={columnDown}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
