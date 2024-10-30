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
  extraText?: string; // For any additional static text
  link?: string; // Optional link if the property needs documentation
}

const displayProperties: DisplayProperty[] = [
  { key: 'ar', label: 'Aspect Ratio' },
  { key: 'style', label: 'Style' },
  { key: 'cfg_scale', label: 'Scale' },
  { key: 'seed', label: 'Seed' },
  { key: 'steps', label: 'Steps' },
  { key: 'w', label: 'Size', extraText: 'x', link: '' },  // Adjust size display as needed
  { key: 'scheduler', label: 'Scheduler' },
  { key: 'color_grading', label: 'Color Grading' },
  { key: 'film_grain', label: 'Film Grain' },
  { key: 'super_resolution', label: 'Super-Resolution' },
  { key: 'only_upscale', label: 'Upscale', link: 'https://docs.astria.ai/docs/use-cases/upscale' },
  { key: 'tiled_upscale', label: 'Tiled Upscale', link: 'https://docs.astria.ai/docs/features/tiled-upscale' },
  { key: 'hires_fix', label: 'HiRes Fix' },
  { key: 'face_correct', label: 'Face Correct' },
  { key: 'face_swap', label: 'Face Swap', link: 'https://docs.astria.ai/docs/features/face-swap' },
  { key: 'inpaint_faces', label: 'Inpaint Faces', link: 'https://docs.astria.ai/docs/features/face-inpainting' },
  { key: 'is_multiperson', label: 'Multiperson' }, // This would require additional logic for multi-person vs multi-pass
  { key: 'prompt_expansion', label: 'Prompt Expansion' },
  { key: 'theme', label: 'Theme' },
  { key: 'input_image', label: 'Image' },
  { key: 'mask_image', label: 'Mask' },
  { key: 'controlnet', label: 'ControlNet', link: 'https://docs.astria.ai/docs/use-cases/controlnet' },
  { key: 'use_lpw', label: 'Weighted' },
];

interface PromptCardProps {
  prompt: Prompt;
}

const PromptCard: React.FC<PromptCardProps> = React.memo(({ prompt: initialPrompt }) => {
  const navigate = useNavigate();
  const { retrieveSinglePrompt, updateSinglePrompt } = useStore();

  const retrievedPrompt = usePromptPolling(initialPrompt, retrieveSinglePrompt, updateSinglePrompt);
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
      {displayProperties.map(({ key, label, extraText, link }) => {
        const value = displayPrompt[key];
        if (!value) return null;

        return (
          <span
            key={key}
            className="text-gray-700 text-[12px] font-medium bg-slate-200 px-2 rounded-sm"
          >
            {label}: {value}{extraText || ''}
            {link && (
              <a href={link} className="text-blue-500 underline ml-1" target="_blank" rel="noopener noreferrer">
                Docs
              </a>
            )}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="mb-[4px] w-full cursor-pointer flex flex-col-reverse md:flex-row">
      {renderImages()}

      <div className="md:w-[30%] p-2 flex flex-col text-sm text-black">
        <div className="flex-1">
          <p className="font-medium">{displayPrompt.text?.length > 100 ? (displayPrompt.text?.slice(0, 100) + '...') : displayPrompt.text}</p>
          {renderProperties()}
        </div>
        <div>
          sjndsjdnjsn
        </div>
      </div>
    </div>
  );
});

export default PromptCard;
