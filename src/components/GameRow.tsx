import styled from "styled-components";
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
  @keyframes rotateColumn {
    0% {
      -webkit-transform: rotateX(0);
    }
    50% {
      -webkit-transform: rotateX(-90deg);
    }
    100% {
      -webkit-transform: rotateX(0);
    }
  }

  background-color: ${({ status }) => getBackgroundColor({ status })};

  @keyframes scaling {
    50% {
      -webkit-transform: scale(1.2);
    }
    100% {
      -webkit-transform: scale(1);
    }
  }

  animation: ${({ animated }) => {
    return animated ? "scaling 0.5s;" : "";
  }};
`;

export default GameRow;
