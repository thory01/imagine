import { create } from 'zustand';
import { PromptFormState } from '@/types';

export const usePromptFormStore = create<PromptFormState>((set) => ({
    promptText: '', setPromptText: (text) => set({ promptText: text }),
    width: 1024, setWidth: (width) => set({ width }),
    height: 1024, setHeight: (height) => set({ height }),

    controlNet: '', setControlNet: (controlNet) => set({ controlNet }),
    colorGrading: '', setColorGrading: (colorGrading) => set({ colorGrading }),
    filmGrain: false, setFilmGrain: (filmGrain) => set({ filmGrain }),

    superResolution: false, setSuperResolution: (superResolution) => set({ superResolution }),
    hiresFix: false, setHiresFix: (hiresFix) => set({ hiresFix }),
    inpaintFaces: false, setInpaintFaces: (inpaintFaces) => set({ inpaintFaces }),
    faceCorrect: false, setFaceCorrect: (faceCorrect) => set({ faceCorrect }),
    faceSwap: false, setFaceSwap: (faceSwap) => set({ faceSwap }),

    denoisingStrength: 0.8, setDenoisingStrength: (denoisingStrength) => set({ denoisingStrength }),
    conditioningScale: 0.8, setConditioningScale: (conditioningScale) => set({ conditioningScale }),
    numImages: 4, setNumImages: (numImages) => set({ numImages }),
    loraTextList: [], setLoraTextList: (loraTextList) => set({ loraTextList }),
    error: {}, setError: (error) => set({ error }),
    isLoading: false, setIsLoading: (isLoading) => set({ isLoading }),
}));

