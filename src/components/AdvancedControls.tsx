import React from "react";
import AspectRatioSlider from "./AspectRatioSlider";
import ControlNetSelector from "./ControlNetSelector";
import { Switch } from "./ui/switch";
import ColorGradingSelector from "./ColorGradingSelector";

interface AdvancedControlsProps {
  aspectRatio: string;
  setAspectRatio: (value: string) => void;
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
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg shadow-md dark:bg-zinc-900 dark:border-zinc-800">
      <AspectRatioSlider
        value={aspectRatio}
        baseSize={300}
        onChange={(value) => setAspectRatio(value)}
        className="my-1"
      />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {/* Control Net */}
        <ControlNetSelector value={controlNet} onChange={(model) => setControlNet(model)} />

        {/* Color Grading */}
        <ColorGradingSelector value={colorGrading} onChange={(grading) => setColorGrading(grading)} />

        {/* Super Resolution */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Super Resolution</label>
          <Switch checked={superResolution} onCheckedChange={setSuperResolution} />
        </div>

        {/* Film Grain */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Film Grain</label>
          <Switch checked={filmGrain} onCheckedChange={setFilmGrain} />
        </div>


        {/* High Resolution Fix */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Hi-Res Fix</label>
          <Switch checked={hiresFix} onCheckedChange={setHiresFix} disabled={!superResolution} />
        </div>


        {/* Face Correct */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Face Correct</label>
          <Switch checked={faceCorrect} onCheckedChange={setFaceCorrect} />
        </div>

        {/* Inpaint Faces */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Inpaint Faces</label>
          <Switch checked={inpaintFaces} onCheckedChange={setInpaintFaces} disabled={!superResolution} />
        </div>

        {/* Face Swap */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Face Swap</label>
          <Switch checked={faceSwap} onCheckedChange={setFaceSwap} />
        </div>
      </div>
    </div>
  );
};
