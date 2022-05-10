import './App.css';
import { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GameBoard, KeyBoard } from './components';
import { darkTheme, lightTheme } from './assets/styles/theme';
import GlobalStyles from './assets/styles/GlobalStyles';
import useGame from './hooks/useGame';
import { useModal } from './hooks/useModal';
import { GAME_STATUS } from './constants';
import NavFadeModal from './components/NavFadeModal';
import ResultModal from './components/ResultModal';

function App() {
  const [theme, setTheme] = useState('dark')
  const currentTheme = useMemo(() => theme === 'light' ? lightTheme : darkTheme, [theme])
  
  const { state, dispatch } = useGame()
  const isModalOpen = useMemo(() => { 
    const isOpen = state.gameStatus !== GAME_STATUS.DOING && !state.isGameComplete
    return isOpen;
  }, [state.gameStatus, state.isGameComplete])
  
  const { open: isNavFadeModalOpen, setOpen: setNavModalOpen } = useModal({ 
    isOpen: isModalOpen,
  });
  const { open: isResultModalOpen, setOpen: setResultModalOpen } = useModal({ 
    isOpen: state.isGameComplete && !isNavFadeModalOpen
  });
  
  return (
    <ThemeProvider theme={{ currentTheme, setTheme }}>
      <GlobalStyles />
      <div className="App">
        {isNavFadeModalOpen && 
          <NavFadeModal 
            {...state} 
            fadeTime={2000} 
            setOpen={setNavModalOpen} 
          />
        }
        <GameBoard {...state} />
        <KeyBoard 
          {...state}
          dispatch={dispatch}
        />
        {isResultModalOpen && 
          <ResultModal 
            status={isResultModalOpen} 
            setOpen={setResultModalOpen} 
          />
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
