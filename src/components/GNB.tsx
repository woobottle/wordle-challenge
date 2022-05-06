import { useTheme } from "styled-components";

const GNB = () => {
  const theme = useTheme()
  const { currentTheme, setTheme }: any = theme
  
  const test = () => {
    if (currentTheme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  return (
    <>
      <header>hihi</header>
      <button onClick={test}>check</button>
    </>
  )
}

export default GNB;