import React, { useState } from "react";
import { HeartIcon, DownloadIcon, CheckIcon, CopyIcon } from "lucide-react";
import { PromptDetailsProps } from "@/types";
import { likePrompt } from "@/api/prompts";


const PromptDetails: React.FC<PromptDetailsProps> = ({ prompt, imageUrl }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Function to handle copying prompt text
  const handleCopy = () => {
    if (prompt?.text) {
      navigator.clipboard.writeText(prompt.text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Function to handle liking/unliking the prompt
  const handleLike = async () => {
    if (prompt?.id) {
      const response = await likePrompt(prompt.id);

      if (response) {
        setIsLiked(!isLiked);
      }

    }
  };

  // Function to handle downloading the prompt image
  const handleDownload = () => {
    if (imageUrl) {
      const element = document.createElement("a");
      element.href = imageUrl;
      element.download = `${prompt?.id || "image"}.png`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="hidden md:w-1/3 h-full md:flex flex-col justify-between rounded-xl p-6 shadow-lg bg-white">
      <div>
        <div className="flex mb-5 justify-between items-center">
          <h2 className="text-lg font-semibold">{prompt?.id}</h2>
          <div className="p-2 flex items-center gap-2">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={handleDownload}
            >
              <DownloadIcon className="text-gray-600" />
            </button>
            <button
              className={`p-2 rounded-full hover:bg-gray-100 ${isLiked ? "text-red-500" : "text-gray-600"
                }`}
              onClick={handleLike}
            >
              {isLiked ? (<HeartIcon className="text-red-500" />) : (<HeartIcon className="text-gray-600" />)}
            </button>
          </div>
        </div>
        <p className="overflow-y-auto max-h-48 text-sm text-gray-700">
          {prompt?.text}
        </p>
      </div>
      <div className="flex justify-center p-2 mt-4">
        <button
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-700 hover:text-white transition duration-200 flex items-center gap-2"
          onClick={handleCopy}
        >
          {isCopied ? (
            <>
              <CheckIcon className="text-green-500" /> Copied!
            </>
          ) : (
            <>
              <CopyIcon /> Copy Prompt
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptDetails;
