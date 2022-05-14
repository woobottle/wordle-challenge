import './App.css';
import './assets/css/modal.css';
import { useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GameBoard, KeyBoard, NavFadeModal, NavModalPortal, ResultModal, ResultModalPortal } from './components';
import { darkTheme, lightTheme } from './assets/styles/theme';
import GlobalStyles from './assets/styles/GlobalStyles';
import useGame from './hooks/useGame';
import useModalMessage from './hooks/useModalMessage';

function App() {
  const [theme, setTheme] = useState('dark')
  const currentTheme = useMemo(() => theme === 'light' ? lightTheme : darkTheme, [theme])
  
  const { state, actions: keyBoardActions } = useGame()
  const { 
    modalMessages, 
    addMessage, 
    removeMessage } = useModalMessage()
  
  const isResultModalOpen = useMemo(() => { 
    const isOpen = modalMessages.length === 0 && state.isGameComplete;
    return isOpen;
  }, [state.isGameComplete, modalMessages])

  return (
    <ThemeProvider theme={{ currentTheme, setTheme }}>
      <GlobalStyles />
      <NavModalPortal>
        {modalMessages.reverse().map((message) => 
          <NavFadeModal
            fadeTime={3000}
            message={message.message}
            callback={() => removeMessage(message.id)}
          />)
        }
      </NavModalPortal>
      <div className="App">
        <GameBoard 
          {...state} />
        <KeyBoard
          {...state}
          {...keyBoardActions}
          addMessage={addMessage}
        />
      </div>
      <ResultModalPortal>
        {isResultModalOpen && 
          <ResultModal 
            {...state}
            callback={() => keyBoardActions.resetGame()}
          />
        }
      </ResultModalPortal>
    </ThemeProvider>
  );
}

export default App;
