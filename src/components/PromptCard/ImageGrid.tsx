import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface ImageGridProps {
  images?: string[];
  onClick: (index: number) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images = [],
  onClick,
}) => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    Array(images.length).fill(false)
  );

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const getRoundedClass = (index: number, total: number) => {
    if (total === 1) return "rounded-md";
    if (total === 2) return index === 0 ? "rounded-l-md" : "rounded-r-md";
    if (total === 3) return ["rounded-tl-md", "rounded-tr-md", "rounded-b-md"][index];
    if (total === 4) return ["", "rounded-tr-md", "rounded-bl-md", "rounded-br-md"][index];
    if (total > 4) {
      if (index === 0) return "rounded-tl-md";
      if (index === 3) return "rounded-tr-md";
      if (index === total - 2) return "rounded-bl-md";
      if (index === total - 1) return "rounded-br-md";
    }
    return "";
  };

  if (!images.length) {
    return (
      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-[300px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-[2px] md:gap-2 w-full">
      {images.map((image, i) => (
        <div
          key={i}
          className={`flex items-center w-full justify-center overflow-hidden md:rounded-md ${getRoundedClass(
            i,
            images.length
          )}`}
        >
         {!loadedImages[i] ? (
            loadedImages.some((value) => value) ? (
              <Skeleton className="w-full h-full max-h-[900px]" />
            ) : (
              <Skeleton className="w-full h-[250px]" />
            )
          ) : null}
          <img
            src={image}
            alt={`Image ${i + 1} of ${images.length}`}
            className={`object-cover w-full h-auto max-h-[900px] ${loadedImages[i] ? "" : "hidden"
              }`}
            onLoad={() => handleImageLoad(i)}
            onError={() => console.warn(`Failed to load image at index ${i}`)}
            onClick={() => onClick(i)}
          />
        </div>
      ))}
    </div>
  );
};
