import { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { GameBoard, GNB, KeyBoard } from './components';
import { darkTheme, lightTheme } from './assets/styles/theme';
import GlobalStyles from './assets/styles/GlobalStyles';

function App() {
  const [theme, setTheme] = useState('light')
  const currentTheme = useMemo(() => theme === 'light' ? lightTheme : darkTheme, [theme])

  return (
    <ThemeProvider theme={{ currentTheme, setTheme }} >
      <GlobalStyles />
      <div className="App">
        <GNB />
        <GameBoard />
        <KeyBoard />
      </div>
    </ThemeProvider>
  );
}

export default App;
