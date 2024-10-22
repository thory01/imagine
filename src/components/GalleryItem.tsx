import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Clipboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLike } from "@/hooks/useLike";
import { useCopy } from "@/hooks/useCopy";
import { Prompt } from "@/types";

interface GalleryItemProps {
  prompt: Prompt;
  index: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ prompt, index }) => {
  const navigate = useNavigate();
  const { isLiked, handleLike } = useLike(false); // Pass initial state as needed
  const { isCopied, handleCopy } = useCopy();

  return (
    <div
      key={prompt.id}
      className="mb-[2px] cursor-pointer"
      onClick={() =>
        navigate(`/prompt/${prompt.id}`, { state: { type: "gallery", index: 0 } })
      }
    >
      <div className="relative group">
        <img
          className="w-full h-auto max-w-full max-h-[600px] object-cover"
          src={
            prompt.images?.[0] ??
            "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png"
          }
          alt={`Image ${prompt.id}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png";
          }}
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black from-0% bg-opacity-50 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center">
          <div className="text-sm text-white font-medium hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-full cursor-pointer">
            {index + 1}
          </div>
          <div className="text-white flex">
            <div
              className={`mr-2 p-2 rounded-full cursor-pointer ${isCopied ? "bg-green-500" : "hover:bg-white hover:bg-opacity-20"
                }`}
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(prompt.text);
              }}
            >
              <Clipboard size={18} />
            </div>
            <div
              className={`p-2 rounded-full cursor-pointer ${isLiked ? "text-red-500" : "hover:bg-white hover:bg-opacity-20"
                }`}
              onClick={(e) => {
                e.stopPropagation();
                handleLike(prompt.id);
              }}
            >
              <HeartIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
