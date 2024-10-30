import React, { useState } from "react";
import AspectRatioSlider from "./AspectRatioSlider";
import ControlNetSelector from "./ControlNetSelector";
import { Switch } from "./ui/switch";
import ColorGradingSelector from "./ColorGradingSelector";
import AddLoraText from "./AddLoraText";

interface AdvancedControlsProps {
  aspectRatio: string;
  setAspectRatio: (value: string) => void;
  setWidth: (value: number) => void;
  setHeight: (value: number) => void;
  controlNet: string;
  setControlNet: (value: string) => void;
  colorGrading: string;
  setColorGrading: (value: string) => void;
  filmGrain: boolean;
  setFilmGrain: (value: boolean) => void;
  superResolution: boolean;
  setSuperResolution: (value: boolean) => void;
  hiresFix: boolean;
  setHiresFix: (value: boolean) => void;
  inpaintFaces: boolean;
  setInpaintFaces: (value: boolean) => void;
  faceCorrect: boolean;
  setFaceCorrect: (value: boolean) => void;
  faceSwap: boolean;
  setFaceSwap: (value: boolean) => void;
  denoisingStrength: number;
  setDenoisingStrength: (value: number) => void;
  conditioningScale: number;
  setConditioningScale: (value: number) => void;
  numImages: number;
  setNumImages: (value: number) => void;
  loraTextList: string[];
  setLoraTextList: React.Dispatch<React.SetStateAction<string[]>>;
  setPromptText: React.Dispatch<React.SetStateAction<string>>;
}

export const AdvancedControls: React.FC<AdvancedControlsProps> = ({
  aspectRatio,
  setAspectRatio,
  controlNet,
  setControlNet,
  colorGrading,
  setColorGrading,
  filmGrain,
  setFilmGrain,
  superResolution,
  setSuperResolution,
  hiresFix,
  setHiresFix,
  inpaintFaces,
  setInpaintFaces,
  faceCorrect,
  setFaceCorrect,
  faceSwap,
  setFaceSwap,
  denoisingStrength,
  setDenoisingStrength,
  conditioningScale,
  setConditioningScale,
  numImages,
  setNumImages,
  setWidth,
  setHeight,
  loraTextList,
  setLoraTextList,
  setPromptText,
}) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 overflow-auto h-[400px] scrollbar dark:bg-zinc-900 dark:border-zinc-800">
      <AspectRatioSlider
        value={aspectRatio}
        baseSize={1024}
        onChange={(value, width, height) => {
          setAspectRatio(value);
          setWidth(width);
          setHeight(height);
        }}
        className="my-1"
      />

      <div className="grid grid-cols-1 gap-4">
        <AddLoraText loraTextList={loraTextList} setLoraTextList={setLoraTextList} onSelect={(tune) => {
          setPromptText((prevText) => `<lora:${tune.id}:1> ${prevText}`);
        }} onRemove={
          (loraText) => {
            setPromptText((prevText) => prevText.replace(loraText, ""));
          }
        } />
        <ControlNetSelector value={controlNet} onChange={(model) => setControlNet(model)} />
        <ColorGradingSelector value={colorGrading} onChange={(grading) => setColorGrading(grading)} />

        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Denoising Strength
          </label>
          <input
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            value={denoisingStrength}
            onChange={(e) => setDenoisingStrength(parseFloat(e.target.value))}
            className="col-span-2 w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            ControlNet Conditioning Scale
          </label>
          <input
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            value={conditioningScale}
            onChange={(e) => setConditioningScale(parseFloat(e.target.value))}
            className="col-span-2 w-3/5 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Super Resolution
          </label>
          <Switch className="col-span-2 justify-self-end" checked={superResolution} onCheckedChange={setSuperResolution} />
        </div>

        <div className="col-span-full flex justify-between items-center mt-6">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Show Advanced Options
          </label>
          <button onClick={() => setShowAdvancedOptions(!showAdvancedOptions)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
            {showAdvancedOptions ? "▼" : "▶"}
          </button>
        </div>

      </div>
      <div></div>
      {showAdvancedOptions && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Inpaint Faces
            </label>
            <Switch className="justify-self-end" checked={inpaintFaces} onCheckedChange={setInpaintFaces} disabled={!superResolution} />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Hi-Res Fix
            </label>
            <Switch className="justify-self-end" checked={hiresFix} onCheckedChange={setHiresFix} disabled={!superResolution} />
          </div>

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

          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Film Grain
            </label>
            <Switch className="justify-self-end" checked={filmGrain} onCheckedChange={setFilmGrain} />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Face Correct
            </label>
            <Switch className="justify-self-end" checked={faceCorrect} onCheckedChange={setFaceCorrect} />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Face Swap
            </label>
            <Switch className="justify-self-end" checked={faceSwap} onCheckedChange={setFaceSwap} />
          </div>
        </div>
      )}
    </div>
  );
};
