import React, { useState } from "react";
import { Button } from "../ui/button";
import { Redo, Copy, Loader2 } from "lucide-react";
import { Prompt } from "@/types";
import { useCopy } from "@/hooks/useCopy";
import { createPrompt } from "@/api/prompts";
import { useStore } from "@/store/promptStore";

interface ActionButtonsProps {
  prompt: Prompt;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ prompt }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isCopied, handleCopy } = useCopy();
  const { refreshUserPrompts } = useStore();

  const handleRerun = async () => {
    setIsLoading(true);
    const formData = new FormData();
    // (Populate formData with allowed keys and prompt values as before)
    await createPrompt(formData);
    refreshUserPrompts();
    setIsLoading(false);
  };

  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" onClick={handleRerun} disabled={isLoading} className="flex items-center gap-1">
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Redo className="w-4 h-4" />}
        <span className="hidden md:inline">Rerun</span>
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleCopy(prompt)} className="flex items-center gap-1">
        <Copy className="w-4 h-4" />
        <span className="hidden md:inline">{isCopied ? "Copied!" : "Copy"}</span>
      </Button>
    </div>
  );
};
