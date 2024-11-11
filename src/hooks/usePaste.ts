import { useState, useEffect } from 'react';

const usePaste = (callback: (pasteText: string, prompt: Record<string, any>, event: ClipboardEvent) => void) => {
  const [pasteText, setPasteText] = useState<string>('');
  const [prompt, setPrompt] = useState<Record<string, any>>({});

  const handlePaste = (event: ClipboardEvent) => {
    const text = event.clipboardData?.getData('text');

    const allowedKeys = new Set([
      'controlnet', 'color_grading', 'super_resolution', 'hires_fix', 'inpaint_faces',
      'face_correct', 'face_swap', 'ar', 'denoising_strength', 'controlnet_conditioning_scale',
      'num_images', 'w', 'h', 'input_image'
    ]);

    if (text) {
      setPasteText(text);
      const promptObj: Record<string, any> = {};
      text.split(' ').forEach(part => {
        const [key, value] = part.split('=');
        if (allowedKeys.has(key)) {
          promptObj[key] = value;
        }
      });

      setPrompt(promptObj);
      callback(text, promptObj, event);
    }
  };

  const getPromptText = (text: string) => {
    const allowedKeys = new Set([
      'controlnet', 'color_grading', 'super_resolution', 'hires_fix', 'inpaint_faces',
      'face_correct', 'face_swap', 'ar', 'denoising_strength', 'controlnet_conditioning_scale',
      'num_images', 'w', 'h', 'input_image'
    ]);

    const remainingParts: string[] = [];
    
    text.split(' ').forEach(part => {
      const [key] = part.split('=');
      if (!allowedKeys.has(key)) {
        remainingParts.push(part);  // If the key isn't in the allowed list, it's part of the remaining prompt text
      }
    });

    return remainingParts.join(' ');  // Join remaining parts to form the full prompt text
  };

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  return { pasteText, prompt, getPromptText };
};

export default usePaste;