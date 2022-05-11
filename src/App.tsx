import './App.css';
import { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GameBoard, KeyBoard } from './components';
import { darkTheme, lightTheme } from './assets/styles/theme';
import GlobalStyles from './assets/styles/GlobalStyles';
import useGame from './hooks/useGame';
import useModal from './hooks/useModal';
import { NavFadeModal, NavModalPortal } from './components/NavFadeModal';
import { ResultModal, ResultModalPortal } from './components/ResultModal';

function App() {
  const [theme, setTheme] = useState('dark')
  const currentTheme = useMemo(() => theme === 'light' ? lightTheme : darkTheme, [theme])
  
  const { state, dispatch } = useGame()
  const isModalOpen = useMemo(() => { 
    const isOpen = state.modalMessages.length !== 0
    return isOpen;
  }, [state.modalMessages])
  
  console.log(isModalOpen)
  
  const { open: isNavFadeModalOpen, setOpen: setNavModalOpen } = useModal({ 
    isOpen: isModalOpen,
  });
  const { open: isResultModalOpen, setOpen: setResultModalOpen } = useModal({ 
    isOpen: state.isGameComplete && !isNavFadeModalOpen
  });
  
  return (
    <ThemeProvider theme={{ currentTheme, setTheme }}>
      <GlobalStyles />
      <NavModalPortal>
        {isNavFadeModalOpen && state.modalMessages.map((message) => 
          <NavFadeModal
            {...state}
            fadeTime={2000}
            message={message}
            setOpen={setNavModalOpen}
          />)
        }
      </NavModalPortal>
      <div className="App">
        <GameBoard {...state} />
        <KeyBoard 
          {...state}
          dispatch={dispatch}
          />
      </div>
      <ResultModalPortal>
        {isResultModalOpen && 
          <ResultModal 
            status={isResultModalOpen} 
            setOpen={setResultModalOpen} 
          />
        }
      </ResultModalPortal>
    </ThemeProvider>
  );
}

export default App;
