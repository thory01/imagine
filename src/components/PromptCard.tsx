import React from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { useStore } from "@/store/promptStore";
import { Prompt } from "@/types";
import usePromptPolling from "@/hooks/usePromptPolling";


type PromptKeys = keyof Prompt;

interface DisplayProperty {
  key: PromptKeys;
  label: string;
}

const displayProperties: DisplayProperty[] = [
  { key: 'ar', label: 'Aspect Ratio' },
  { key: 'style', label: 'Style' },
];

interface PromptCardProps {
  prompt: Prompt;
}

const PromptCard: React.FC<PromptCardProps> = React.memo(({ prompt: initialPrompt }) => {
  const navigate = useNavigate();
  const { retrieveSinglePrompt, updateSinglePrompt } = useStore();

  // Use the custom polling hook and get the latest retrieved prompt
  const retrievedPrompt = usePromptPolling(initialPrompt, retrieveSinglePrompt, updateSinglePrompt);
  
  // Use retrieved prompt if available, otherwise use initial prompt
  const displayPrompt = retrievedPrompt || initialPrompt;

  const handleImageClick = (index: number) => {
    navigate(`/prompt/${displayPrompt.id}`, {
      state: { type: "user", index },
    });
  };

  const renderImages = () => {
    if (!displayPrompt?.images?.length) {
      return renderSkeletons();
    }

    return (
      <div className="flex-1 grid grid-cols-4 gap-1 w-full">
        {displayPrompt.images.map((image: string, i: number) => (
          <div
            key={i}
            className="flex items-center w-full justify-center rounded-lg overflow-hidden"
          >
            <img
              src={image}
              alt={`prompt-${i}`}
              className="object-cover w-full h-auto max-h-[900px]"
              onClick={() => handleImageClick(i)}
            />
          </div>
        ))}
      </div>
    );
  };

  const renderSkeletons = () => (
    <div className="flex-1 grid grid-cols-4 gap-1 w-full">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-[300px]" />
      ))}
    </div>
  );

  const renderProperties = () => (
    <div className="flex flex-wrap gap-2 mt-2">
      {displayProperties.map(({ key, label }) =>
        displayPrompt[key] && (
          <span 
            key={key} 
            className="text-gray-700 font-medium bg-slate-200 px-3 rounded-sm"
          >
            {label}: {displayPrompt[key]}
          </span>
        )
      )}
    </div>
  );

  return (
    <div className="mb-[4px] w-full cursor-pointer flex flex-col-reverse md:flex-row">
      {renderImages()}
      <div className="md:w-[30%] p-2 flex flex-col text-sm">
        <p className="font-medium">{displayPrompt.text}</p>
        {renderProperties()}
      </div>
    </div>
  );
});

export default PromptCard;