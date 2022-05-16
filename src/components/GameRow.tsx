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

const Column = styled.div<{ status?: string }>`
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
  background-color: ${({ status }) => getBackgroundColor({ status })};
`;

export default GameRow;
