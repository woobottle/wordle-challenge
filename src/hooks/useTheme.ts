import { ThemeContext } from 'styled-components';
import { useContext } from "react"

const useTheme = () => {
  const { currentTheme, setTheme } = useContext(ThemeContext)
  console.log(currentTheme, setTheme)
  
  const toggleTheme = () => {
    if (currentTheme === 'light') {
      setTheme('dark')
      return
    } 
    setTheme('light')
    return
  }
  
  return {
    toggleTheme,
  }
}

export default useTheme