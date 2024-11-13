import { usePromptFormStore } from "@/store/promptFormStore";
import { createPrompt } from "@/api/prompts";
import { toast } from "react-toastify";
import { useStore } from "@/store/promptStore";

async function convertImageToBase64(image: File | null): Promise<string | null> {
  if (!image) return null;

  const reader = new FileReader();
  
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result.split(',')[1]); // Return the Base64 part
      } else {
        reject(new Error("Failed to read image as a string"));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(image);
  });
}

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
    return text
      .split(' ')
      .filter(part => !allowedKeys.has(part.split('=')[0]))
      .join(' ');
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
        input_image: image ? await convertImageToBase64(image) : null,
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

      // Append each entry in `promptData` to formData
      Object.entries(promptData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(`prompt[${key}]`, String(value));
        }
      });

      await createPrompt(formData);
      toast.success("Prompt created successfully!");
      refreshUserPrompts();
      return true;
    } catch (error) {
      console.error(error);
      setError(error.response?.data || "Error creating prompt");
      toast.error("Error creating prompt: " + (error.response?.data?.base.join(', ') || "Unknown error"));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit };
};
