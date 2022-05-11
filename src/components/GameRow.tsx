import styled from "styled-components";
import { getBackgroundColor } from "../utils";

interface Props {
  contents: string[]
  contentsValidate: string[]
}

const GameRow = ({ contents, contentsValidate }: Props) => {
  console.log(!contents)
  return (
    <Row>
      {contents.length !== 0
        ? contents.map((column, columnIndex) => <Column className="box" data-state={contentsValidate[columnIndex]}>{column}</Column>) 
        : Array.from({ length: 5 }).map((_column, _index) => <Column />)
      }
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  margin: 0 auto;
`

const Column = styled.div<{ status?: string }>`
  border: 0.1rem solid black;
  border-color: gray;
  margin: 0.3rem;
  text-align: center;
  box-sizing: border-box;
  width: 4rem;
  height: 4rem;
  line-height: 4rem;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${(props) => getBackgroundColor(props.status)};
`

export default GameRow;