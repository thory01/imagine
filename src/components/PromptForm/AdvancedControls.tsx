import { useState } from "react";
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
    error?: string | string[] | null;
}

const RangeInput = ({ label, value, onChange, min = "0.0", max = "1.0", step = "0.01", error }: RangeInputProps) => (
    <div className="leading-0">
        <div className="flex items-center justify-between gap-1 my-2">
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
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
);

interface SwitchInputProps {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
}

const SwitchInput = ({ label, checked, onCheckedChange, disabled = false, error }: SwitchInputProps & { error?: string }) => (
    <div className="leading-0">
        <div className="flex items-center justify-between mt-3">
            <label className="text-sm font-[400] text-gray-700 dark:text-gray-200 gap-1">
                {label}
            </label>
            <Switch className="justify-self-end" checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
);

interface AdvancedControlsProps {
    image: File | null;
    imageUrl: string | null;
}

export const AdvancedControls = ({
    image,
    imageUrl
}: AdvancedControlsProps) => {
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const { controlNet, setControlNet, colorGrading, setColorGrading, filmGrain, setFilmGrain,
        superResolution, setSuperResolution, hiresFix, setHiresFix, inpaintFaces, setInpaintFaces,
        faceCorrect, setFaceCorrect, faceSwap, setFaceSwap, denoisingStrength, setDenoisingStrength,
        conditioningScale, setConditioningScale, numImages, setNumImages, promptText, setPromptText, error,
    } = usePromptFormStore();

    return (
        <div className="advanced-controls grid md:grid-rows-2 grid-cols-1 md:grid-cols-2 gap-1 overflow-auto h-[400px] md:h-[480px] scrollbar dark:bg-zinc-900 dark:border-zinc-800">
            <AspectRatioSlider
                baseSize={1024}
                className="rounded-t-lg md:rounded-tr-none md:rounded-tl-lg"
            />

            <div className={`md:row-span-2 scrollbar bg-gray-50 p-4 rounded-bl-lg rounded-br-lg md:rounded-bl-none md:rounded-r-lg order-3 md:order-2`}>
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-sm font-medium text-gray-800">Advance Settings</h2>
                </div>
                <AddLoraText onSelect={(tune) => {
                    setPromptText(`<lora:${tune.id}:1> ${promptText}`);
                }} onRemove={(loraText) => {
                    setPromptText(promptText.replace(loraText, ""));
                }} />
                <SwitchInput label="Super Resolution" checked={superResolution} onCheckedChange={setSuperResolution} error={error?.super_resolution?.join(" ")} />
                <div className="col-span-full justify-center flex items-center mt-6">
                    <button onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
                        <ChevronDown className={`w-6 h-6 ${showAdvancedOptions ? 'hidden' : 'block'}`} />
                    </button>
                </div>

                {showAdvancedOptions && (
                    <div className="space-y-3">
                        <SwitchInput label="Inpaint Faces" checked={inpaintFaces} onCheckedChange={setInpaintFaces} disabled={!superResolution} error={error?.inpaint_faces?.join(" ")} />
                        <SwitchInput label="Hi-Res Fix" checked={hiresFix} onCheckedChange={setHiresFix} disabled={!superResolution} error={error?.hires_fix?.join(" ")} />
                        <ColorGradingSelector value={colorGrading} onChange={setColorGrading} error={error?.color_grading?.join(" ")} />
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
                            {error?.num_images && <p className="text-red-500 text-xs ml-2">{error.num_images.join(" ")}</p>}
                        </div>
                        <SwitchInput label="Film Grain" checked={filmGrain} onCheckedChange={setFilmGrain} error={error?.film_grain?.join(" ")} />
                        <SwitchInput label="Face Correct" checked={faceCorrect} onCheckedChange={setFaceCorrect} error={error?.face_correct?.join(" ")} />
                        <SwitchInput label="Face Swap" checked={faceSwap} onCheckedChange={setFaceSwap} error={error?.face_swap?.join(" ")} />
                    </div>
                )}
                <div className="col-span-full justify-center flex items-center mt-4">
                    <button onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
                        <ChevronUp className={`w-6 h-6 ${showAdvancedOptions ? 'block' : 'hidden'}`} />
                    </button>
                </div>
            </div>

            <div className={`w-full grid grid-cols-1 p-4 bg-gray-50 rounded-bl-lg md:order-3 order-2 ${!image && !imageUrl ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-medium text-gray-800">ControlNet/Img2Img</h2>
                </div>
                {(!image && !imageUrl) && (
                    <p className="text-sm text-gray-500 mb-4">Please upload an image to use these controls</p>
                )}
                <ControlNetSelector error={error?.controlnet?.join(" ")} value={controlNet} onChange={setControlNet} />
                <RangeInput error={error?.denoising_strength?.join(" ") || null} label="Denoising Strength" value={denoisingStrength} onChange={setDenoisingStrength} />
                <RangeInput error={error?.controlnet_conditioning_scale?.join(" ") || null} label="Conditioning Scale" value={conditioningScale} onChange={setConditioningScale} />
            </div>
        </div>
    );
};
