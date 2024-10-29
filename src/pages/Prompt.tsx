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

  useEffect(() => {
    if (!prompt) {
      navigate("/gallery");
    }
  }, [prompt, navigate]);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <PromptForm />
      <div className="flex-1 p-4 overflow-auto">
        <div className="w-full h-full flex flex-col md:flex-row bg-light-mode">
          <PromptImage imageUrl={prompt?.images[index as number]} type={type} setZoomImage={setZoomImage} />
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
