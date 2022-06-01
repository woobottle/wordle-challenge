import styled, { css, keyframes } from "styled-components";
import { WORD_LENGTH } from "../constants";
import { getBackgroundColor } from "../utils";

interface Props {
  contents: string[];
  contentsValidate: string[];
}

const GameRow = ({ contents, contentsValidate }: Props) => {
  return (
    <Row>
      {contents.length !== 0
        ? contents.map((column, columnIndex) => (
            <Column
              className="box"
              animated={!!column}
              columnIndex={columnIndex}
              status={contentsValidate[columnIndex]}
              data-state={contentsValidate[columnIndex]}
            >
              {column}
            </Column>
          ))
        : Array.from({ length: WORD_LENGTH }).map(() => <Column />)}
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  margin: 0 auto;
`;

const Column = styled.div<{
  status?: string;
  animated?: boolean;
  columnIndex?: number;
}>`
  width: 4rem;
  height: 4rem;
  margin: 0.3rem;
  font-size: 2rem;
  font-weight: bold;
  line-height: 4rem;
  text-align: center;
  box-sizing: border-box;
  border-color: lightgray;
  text-transform: uppercase;
  border: 0.1rem solid black;
  --background-color: ${({ status }) => getBackgroundColor({ status })};

  animation: ${({ status, columnIndex = 0 }) => {
    return status && status !== "yet"
      ? css`
          ${rotateColumn} 1s ease-in ${columnIndex * 0.2}s forwards
        `
      : "";
  }};

  animation: ${({ animated, status }) => {
    return animated && status === "yet"
      ? css`
          ${bounce} 0.5s;
        `
      : "";
  }};
`;

const rotateColumn = keyframes`
  0% {
    transform: rotateX(0);
  }
  50% {
    transform: rotateX(-90deg);
  }
  100% {
    transform: rotateX(0);
    background-color: var(--background-color);
  }  
`;

const bounce = keyframes`
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export default GameRow;
