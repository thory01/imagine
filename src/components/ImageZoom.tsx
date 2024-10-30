import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Dialog, DialogOverlay, DialogContent, DialogClose } from "@/components/ui/dialog";

type ImageZoomProps = {
  /** URL of the image to display */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Whether the zoom modal is displayed */
  display?: boolean;
  /** Function to control the display state */
  setDisplay?: (display: boolean) => void;
};

export const ImageZoom: React.FC<ImageZoomProps> = ({
  src,
  alt,
  display,
  setDisplay,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  console.log("ImageZoom rendered", display);


  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleClose = () => {
    if (setDisplay) {
      setDisplay(false);
      setIsLoading(true);
    }
  };

  return (
    <Dialog open={display} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
      <DialogContent className="flex items-center justify-center p-0 border-none bg-transparent max-w-screen-lg w-full sm:w-[90vw]">
        <div className="relative w-full h-full flex items-center justify-center">
          <DialogClose asChild>
          </DialogClose>

          <div className="relative flex items-center justify-center w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
            
            <img
              src={src}
              alt={alt}
              className={`
                max-h-[80vh] max-w-[90vw] object-contain rounded-lg
                transition-opacity duration-300
                ${isLoading ? 'opacity-0' : 'opacity-100'}
              `}
              onLoad={handleImageLoad}
              loading="eager"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageZoom;