import { usePromptFormStore } from "@/store/promptFormStore";
import { createPrompt } from "@/api/prompts";
import { toast } from "react-toastify";
import { useStore } from "@/store/promptStore";

export const usePromptSubmit = () => {
  const {
    promptText,
    image,
    urlImage,
    controlNet,
    colorGrading,
    filmGrain,
    superResolution,
    hiresFix,
    inpaintFaces,
    faceCorrect,
    faceSwap,
    denoisingStrength,
    conditioningScale,
    numImages,
    width,
    height,
    setIsLoading,
    setError,
  } = usePromptFormStore();

  const { refreshUserPrompts } = useStore();

    const extractPromptText = (text: string) => {
    const allowedKeys = new Set([
      'controlnet', 'color_grading', 'super_resolution', 'hires_fix', 'inpaint_faces',
      'face_correct', 'face_swap', 'ar', 'denoising_strength', 'controlnet_conditioning_scale',
      'num_images', 'w', 'h', 'input_image'
    ]);

    const remainingParts: string[] = [];

    text.split(' ').forEach(part => {
      const [key] = part.split('=');
      if (!allowedKeys.has(key)) {
        remainingParts.push(part);
      }
    });

    return remainingParts.join(' ');
  };

  const handleSubmit = async () => {
    if (!promptText.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      const promptData = {
        text: extractPromptText(promptText),
        tune_id: "1504944",
        input_image: URL.createObjectURL(image),
        input_image_url: urlImage,
        control_net: controlNet,
        color_grading: colorGrading,
        film_grain: filmGrain,
        super_resolution: superResolution,
        hires_fix: hiresFix,
        inpaint_faces: inpaintFaces,
        face_correct: faceCorrect,
        face_swap: faceSwap,
        denoising_strength: denoisingStrength,
        conditioning_scale: conditioningScale,
        num_images: numImages,
        w: width,
        h: height,
        backend_version: "0",
      };

      Object.entries(promptData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(`prompt[${key}]`, String(value));
        }
      });

      await createPrompt(formData);
      toast.success("Prompt created successfully!");
      refreshUserPrompts();
      return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data || "Error creating prompt");
      toast.error("Error creating prompt" + error.response?.data?.base.join(', '));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit };
};