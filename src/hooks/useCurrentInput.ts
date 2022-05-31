import { useState } from "react";
import { WORD_LENGTH } from "../constants";

const useCurrentInput = () => {
  const [currentInput, setCurrentInput] = useState<string[]>(
    Array.from({ length: WORD_LENGTH }, () => "")
  );

  return {
    currentInput,
    setCurrentInput,
  };
};

const getInitialCurrentInput = () =>
  Array.from({ length: WORD_LENGTH }, () => "");

export default useCurrentInput;
