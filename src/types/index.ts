export interface Prompt {
  id: number;
  callback: string | null;
  trained_at: string;
  started_training_at: string;
  created_at: string;
  updated_at: string;
  tune_id: number;
  text: string;
  negative_prompt: string;
  cfg_scale: number | null;
  steps: number | null;
  super_resolution: boolean;
  ar: string;
  num_images: number;
  seed: number | null;
  controlnet_conditioning_scale: number | null;
  controlnet_txt2img: boolean;
  denoising_strength: number | null;
  style: string | null;
  url: string;
  images: string[];
  prompt_likes_count: number;
  liked: boolean;
}

export interface PromptsState {
  galleryPrompts: Prompt[];
  userPrompts: Prompt[];
  galleryOffset: number;
  userOffset: number;
  limit: number;
  addGalleryPrompts: (prompts: Prompt[]) => void;
  addUserPrompts: (prompts: Prompt[]) => void;
  resetGalleryPrompts: () => void;
  resetUserPrompts: () => void;
  refreshGalleryPrompts: () => Promise<void>;
  refreshUserPrompts: () => Promise<void>;
  retrieveSinglePrompt: (tuneId: number, promptId: number) => Promise<Prompt>;
  updateSinglePrompt: (tuneId: number, promptId: number) => Promise<void>;
}


export interface PromptDetailsProps {
  prompt: Prompt;
  imageUrl: string;
}