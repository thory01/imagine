import { useState } from "react";

export const useCopy = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return { isCopied, handleCopy };
};
