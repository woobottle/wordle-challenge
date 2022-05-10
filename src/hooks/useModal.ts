import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
}

const useModal = ({ isOpen }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return {
    open,
    setOpen
  };
};

export { useModal };
