import { useReducer } from "react";
import { INPUT_REDUCER_ACTION_TYPE, WORD_LENGTH } from "../constants";

export interface InputState {
  currentInput: string[];
  columnIndex: number;
}

type InputReducerState =
  | { type: typeof INPUT_REDUCER_ACTION_TYPE.RESET_INPUT }
  | { type: typeof INPUT_REDUCER_ACTION_TYPE.CLICK_DELTE_BUTTON }
  | { type: typeof INPUT_REDUCER_ACTION_TYPE.CLICK_LETTER; value: string };

const inputReducer = (prev: InputState, state: InputReducerState) => {
  switch (state.type) {
    case INPUT_REDUCER_ACTION_TYPE.RESET_INPUT:
      return {
        ...getInitialInputState(),
      };
    case INPUT_REDUCER_ACTION_TYPE.CLICK_LETTER:
      return {
        columnIndex: Math.min(prev.columnIndex + 1, WORD_LENGTH),
        currentInput: replacePrevInputByColumnIndex({
          currentInput: prev.currentInput,
          columnIndex: prev.columnIndex,
          value: state.value,
        }),
      };
    case INPUT_REDUCER_ACTION_TYPE.CLICK_DELTE_BUTTON:
      return {
        columnIndex: Math.max(prev.columnIndex - 1, 0),
        currentInput: replacePrevInputByColumnIndex({
          currentInput: prev.currentInput,
          columnIndex: prev.columnIndex - 1,
          value: "",
        }),
      };
  }
};

const useInput = () => {
  const [inputState, inputDispatch] = useReducer(
    inputReducer,
    getInitialInputState()
  );

  const resetCurrentInput = () =>
    inputDispatch({ type: INPUT_REDUCER_ACTION_TYPE.RESET_INPUT });

  const clickDeleteButton = () =>
    inputDispatch({ type: INPUT_REDUCER_ACTION_TYPE.CLICK_DELTE_BUTTON });

  const clickLetter = (word: string) => {
    inputDispatch({
      type: INPUT_REDUCER_ACTION_TYPE.CLICK_LETTER,
      value: word,
    });
  };

  return {
    state: inputState,
    actions: {
      resetCurrentInput,
      clickDeleteButton,
      clickLetter,
    },
  };
};

const getInitialInputState = (): InputState => ({
  currentInput: Array.from({ length: WORD_LENGTH }, () => ""),
  columnIndex: 0,
});

const replacePrevInputByColumnIndex = ({
  value,
  columnIndex,
  currentInput,
}: Pick<InputState, "currentInput" | "columnIndex"> & { value: string }) =>
  currentInput.map((el, index) => {
    if (index === columnIndex) {
      return value;
    }
    return el;
  });

export default useInput;
