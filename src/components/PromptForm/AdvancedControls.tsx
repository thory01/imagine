import { useState, useRef, useEffect } from "react";
import AspectRatioSlider from "./AspectRatioSlider";
import ControlNetSelector from "./ControlNetSelector";
import { Switch } from "../ui/switch";
import ColorGradingSelector from "./ColorGradingSelector";
import AddLoraText from "./AddLoraText";
import { usePromptFormStore } from '@/store/promptFormStore';
import { ChevronUp, ChevronDown } from "lucide-react";

interface RangeInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: string;
    max?: string;
    step?: string;
}

const RangeInput = ({ label, value, onChange, min = "0.0", max = "1.0", step = "0.01" }: RangeInputProps) => (
    <div className="flex items-center justify-between gap-1">
        <label className="text-sm font-[400] text-gray-700 dark:text-gray-200">
            {label}
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="col-span-2 w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
    </div>
);

interface SwitchInputProps {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
}

const SwitchInput = ({ label, checked, onCheckedChange, disabled = false }: SwitchInputProps) => (
    <div className="flex items-center justify-between mt-3">
        <label className="text-sm font-[400] text-gray-700 dark:text-gray-200 gap-1">
            {label}
        </label>
        <Switch className="justify-self-end" checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
    </div>
);

export const AdvancedControls = () => {
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const advancedOptionsRef = useRef<HTMLDivElement>(null);
    const { controlNet, setControlNet, colorGrading, setColorGrading, filmGrain, setFilmGrain,
        superResolution, setSuperResolution, hiresFix, setHiresFix, inpaintFaces, setInpaintFaces,
        faceCorrect, setFaceCorrect, faceSwap, setFaceSwap, denoisingStrength, setDenoisingStrength,
        conditioningScale, setConditioningScale, numImages, setNumImages, promptText, setPromptText
    } = usePromptFormStore();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (advancedOptionsRef.current && !advancedOptionsRef.current.contains(event.target as Node)) {
                setShowAdvancedOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [advancedOptionsRef]);

    return (
        <div className="grid grid-rows-2 grid-cols-1 md:grid-cols-2 gap-2 overflow-auto h-[450px] scrollbar dark:bg-zinc-900 dark:border-zinc-800">
            <AspectRatioSlider
                baseSize={1024}
                className="my-1 h-fit"
            />

            <div ref={advancedOptionsRef} className={`row-span-2 scrollbar bg-gray-50 p-4 rounded-md`}>
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-sm font-medium text-gray-800">Advance Settings</h2>
                </div>
                <AddLoraText onSelect={(tune) => {
                    setPromptText(`<lora:${tune.id}:1> ${promptText}`);
                }} onRemove={(loraText) => {
                    setPromptText(promptText.replace(loraText, ""));
                }} />
                <SwitchInput label="Super Resolution" checked={superResolution} onCheckedChange={setSuperResolution} />
                <div className="col-span-full justify-center flex items-center mt-6">
                    <button onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
                        <ChevronDown className={`w-6 h-6 ${showAdvancedOptions ? 'hidden' : 'block'}`} />
                    </button>
                </div>

                {showAdvancedOptions && (
                    <div className="space-y-3">
                        <SwitchInput label="Inpaint Faces" checked={inpaintFaces} onCheckedChange={setInpaintFaces} disabled={!superResolution} />
                        <SwitchInput label="Hi-Res Fix" checked={hiresFix} onCheckedChange={setHiresFix} disabled={!superResolution} />
                        <ColorGradingSelector value={colorGrading} onChange={setColorGrading} />
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-[400] text-gray-700 dark:text-gray-200">
                                Number of Images
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="8"
                                value={numImages}
                                onChange={(e) => setNumImages(parseInt(e.target.value, 10))}
                                className="col-span-2 border rounded-full h-6 py-1 text-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <SwitchInput label="Film Grain" checked={filmGrain} onCheckedChange={setFilmGrain} />
                        <SwitchInput label="Face Correct" checked={faceCorrect} onCheckedChange={setFaceCorrect} />
                        <SwitchInput label="Face Swap" checked={faceSwap} onCheckedChange={setFaceSwap} />
                    </div>
                )}
                <div className="col-span-full justify-center flex items-center mt-6">
                    <button onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
                        <ChevronUp className={`w-6 h-6 ${showAdvancedOptions ? 'block' : 'hidden'}`} />
                    </button>
                </div>
            </div>

            <div className={`w-full grid grid-cols-1 p-4 bg-gray-50 rounded-lg`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-medium text-gray-800">ControlNet/Img2Img</h2>
                </div>
                <ControlNetSelector value={controlNet} onChange={setControlNet} />
                <RangeInput label="Denoising Strength" value={denoisingStrength} onChange={setDenoisingStrength} />
                <RangeInput label="Conditioning Scale" value={conditioningScale} onChange={setConditioningScale} />
            </div>
        </div>
    );
};
