import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ImageZoomProps {
    src: string;
    alt: string;
    display?: boolean;
    setDisplay?: React.Dispatch<React.SetStateAction<boolean>>;
}


const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, display, setDisplay }) => {

    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            setDisplay && setDisplay(false);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        }
    }, []);

    return (
        <div className={"fixed inset-0 z-50 flex items-center cursor-zoom-out justify-center bg-black bg-opacity-70" + (
            display ? " visible" : " invisible"
        )} onClick={
            () => setDisplay && setDisplay(false)
        }>
            <div className="relative w-full h-full max-w-[90%] max-h-[90%] mx-auto">
                <button
                    onClick={() => setDisplay && setDisplay(false)}
                    className="absolute right-6 top-2 p-2 bg-white rounded-full hover:bg-gray-300"
                >
                    <X className="text-black" />
                </button>
                <img
                    src={src}
                    alt={alt}
                    className="object-contain max-h-full max-w-full rounded-lg mx-auto"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                            "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png";
                    }}
                />
            </div>
        </div>
    );
};

export default ImageZoom;