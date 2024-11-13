import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

type ImageZoomProps = {
  src: string;
  alt: string;
  display?: boolean;
  setDisplay?: (display: boolean) => void;
};

export const ImageZoom: React.FC<ImageZoomProps> = ({
  src,
  alt,
  display = false,
  setDisplay,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (display) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [display]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleClose = () => {
    if (setDisplay) {
      setDisplay(false);
      setIsLoading(true);
    }
  };

  if (!display) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-zoom-out"
        onClick={handleClose}
      />
      <div className="relative max-w-[100vw] max-h-[100vh] z-[51]">
        <div className="relative flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
          
          <img
            src={src}
            alt={alt}
            className={`max-h-[98vh] max-w-[99vw] object-contain rounded-lg transition-opacity duration-300 cursor-zoom-out
              ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoad}
            loading="eager"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageZoom;
