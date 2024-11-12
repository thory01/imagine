import React from "react";
import { Skeleton } from "../ui/skeleton";

interface ImageGridProps {
  images: string[] | undefined;
  onClick: (index: number) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, onClick }) => {
  if (!images || images.length === 0) {
    return (
      <div className="flex-1 grid grid-cols-4 gap-2 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-[300px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-4 gap-2 w-full">
      {images.map((image, i) => (
        <div key={i} className="flex items-center w-full justify-center rounded-md overflow-hidden">
          <img src={image} alt={`prompt-${i}`} className="object-cover w-full h-auto max-h-[900px]" onClick={() => onClick(i)} />
        </div>
      ))}
    </div>
  );
};
