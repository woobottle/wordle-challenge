import './App.css';
import './assets/css/modal.css';
import { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GameBoard, KeyBoard } from './components';
import { darkTheme, lightTheme } from './assets/styles/theme';
import GlobalStyles from './assets/styles/GlobalStyles';
import useGame from './hooks/useGame';
import NavFadeModal, { NavModalPortal } from './components/NavFadeModal';
import { ResultModal, ResultModalPortal } from './components/ResultModal';
import useModalMessage from './hooks/useModalMessage';

function App() {
  const [theme, setTheme] = useState('dark')
  const currentTheme = useMemo(() => theme === 'light' ? lightTheme : darkTheme, [theme])
  
  const { state, dispatch } = useGame()
  const { removeMessage } = useModalMessage({ dispatch })
  
  const isResultModalOpen = useMemo(() => { 
    const isOpen = state.modalMessages.length === 0 && state.isGameComplete;
    return isOpen;
  }, [state.isGameComplete, state.modalMessages.length])

  return (
    <ThemeProvider theme={{ currentTheme, setTheme }}>
      <GlobalStyles />
      <NavModalPortal>
        {state.modalMessages.reverse().map((message) => 
          <NavFadeModal
            fadeTime={3000}
            message={message.message}
            callback={() => removeMessage(message.id)}
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
            {...state}
          />
        }
      </ResultModalPortal>
    </ThemeProvider>
  );
}

export default App;
