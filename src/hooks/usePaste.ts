import { useState, useEffect } from 'react';

const usePaste = (callback: (pasteText: string, prompt: Record<string, any>) => void) => {
  const [pasteText, setPasteText] = useState<string>('');
  const [prompt, setPrompt] = useState<Record<string, any>>({});

  const handlePaste = (event: ClipboardEvent) => {
    const text = event.clipboardData?.getData('text');
    console.log('Pasted text:', text);

    const allowedKeys = new Set([
      'controlnet', 'color_grading', 'super_resolution', 'hires_fix', 'inpaint_faces',
      'face_correct', 'face_swap', 'ar', 'denoising_strength', 'controlnet_conditioning_scale',
      'num_images', 'w', 'h'
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
      callback(pasteText, promptObj);
    }
  };

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  return { pasteText, prompt };
};

export default usePaste;