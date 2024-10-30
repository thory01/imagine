import React, { useEffect } from "react";
import WithPrompt from "@/components/WithLayout";
import PromptForm from "@/components/PromptForm";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "@/store/promptStore";
import PromptImage from "@/components/PromptImage";
import PromptDetails from "@/components/PromptDetails";
import { usePromptNavigation } from "@/hooks/usePromptNavigation";
import ImageZoom from "@/components/ImageZoom";

const Prompt: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { type, index } = location.state || {};
  const { galleryPrompts, userPrompts } = useStore();
  const [zoomImage, setZoomImage] = React.useState(false);

  const prompts = type === "gallery" ? galleryPrompts : userPrompts;
  const currentPromptIndex = prompts.findIndex((e) => `${e?.id}` === id);
  const prompt = prompts[currentPromptIndex];

  usePromptNavigation(currentPromptIndex, prompts, type, index);

  const navigate = useNavigate();

  // Capture phase listener to override Escape behavior
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      e.preventDefault(); // Prevent default behavior, if any
      console.log("Escape key pressed - overridden by parent");
      console.log("Custom Escape action");
      if (zoomImage) {
        setZoomImage(false);
      } else {
        navigate(type === "gallery" ? "/gallery" : "/");
      }
    }
  }

  useEffect(() => {
    if (!prompt) {
      navigate("/gallery");
    }

    // Adding the Escape key listener in the capture phase
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [prompt, navigate, zoomImage]); // Keep dependencies minimal

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <PromptForm />
      <div className="flex-1 p-4 overflow-auto">
        <div className="w-full h-full flex flex-col md:flex-row bg-light-mode">
          <PromptImage imageUrl={prompt?.images[index as number]} type={type} setDisplay={setZoomImage} />
          <PromptDetails prompt={prompt} imageUrl={prompt?.images[index as number]} />
        </div>
      </div>
      <ImageZoom
        src={prompt?.images[index as number]}
        alt={"prompt image"}
        display={zoomImage}
        setDisplay={setZoomImage}
      />
    </div>
  );
};

export default WithPrompt(Prompt);
