import { useState } from "react";
import AspectRatioSlider from "./AspectRatioSlider";
import ControlNetSelector from "./ControlNetSelector";
import { Switch } from "../ui/switch";
import ColorGradingSelector from "./ColorGradingSelector";
import AddLoraText from "./AddLoraText";
import { usePromptFormStore } from '@/store/promptFormStore';

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
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
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
    <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 gap-1">
            {label}
        </label>
        <Switch className="justify-self-end" checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
    </div>
);

export const AdvancedControls = () => {
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const { width, setWidth, height, setHeight,
        controlNet, setControlNet, colorGrading, setColorGrading, filmGrain, setFilmGrain,
        superResolution, setSuperResolution, hiresFix, setHiresFix, inpaintFaces, setInpaintFaces,
        faceCorrect, setFaceCorrect, faceSwap, setFaceSwap, denoisingStrength, setDenoisingStrength,
        conditioningScale, setConditioningScale, numImages, setNumImages, promptText, setPromptText
    } = usePromptFormStore();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 overflow-auto h-[400px] scrollbar dark:bg-zinc-900 dark:border-zinc-800">
            <AspectRatioSlider
                width={width}
                height={height}
                baseSize={1024}
                onChange={(value, width, height) => {
                    console.log(value);
                    setWidth(width);
                    setHeight(height);
                }}
                className="my-1 h-fit"
            />

            <div className="grid grid-cols-1 gap-4 overflow-auto scrollbar">
                <AddLoraText onSelect={(tune) => {
                    setPromptText(`<lora:${tune.id}:1> ${promptText}`);
                }} onRemove={(loraText) => {
                    setPromptText(promptText.replace(loraText, ""));
                }} />
                <ControlNetSelector value={controlNet} onChange={setControlNet} />

                <RangeInput label="Denoising Strength" value={denoisingStrength} onChange={setDenoisingStrength} />
                <RangeInput label="ControlNet Conditioning Scale" value={conditioningScale} onChange={setConditioningScale} />

                <SwitchInput label="Super Resolution" checked={superResolution} onCheckedChange={setSuperResolution} />

                <div className="col-span-full flex justify-between items-center mt-6">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Show Advanced Options
                    </label>
                    <button onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
                        {showAdvancedOptions ? "▼" : "▶"}
                    </button>
                </div>
                {showAdvancedOptions && (
                    <div className="mt-4 space-y-3">
                        <SwitchInput label="Inpaint Faces" checked={inpaintFaces} onCheckedChange={setInpaintFaces} disabled={!superResolution} />
                        <SwitchInput label="Hi-Res Fix" checked={hiresFix} onCheckedChange={setHiresFix} disabled={!superResolution} />
                        <ColorGradingSelector value={colorGrading} onChange={setColorGrading} />
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Number of Images
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="8"
                                value={numImages}
                                onChange={(e) => setNumImages(parseInt(e.target.value, 10))}
                                className="col-span-2 border rounded-lg px-2 py-1 text-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                            />
                        </div>
                        <SwitchInput label="Film Grain" checked={filmGrain} onCheckedChange={setFilmGrain} />
                        <SwitchInput label="Face Correct" checked={faceCorrect} onCheckedChange={setFaceCorrect} />
                        <SwitchInput label="Face Swap" checked={faceSwap} onCheckedChange={setFaceSwap} />
                    </div>
                )}
            </div>
        </div>
    );
};
