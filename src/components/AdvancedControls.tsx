import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AdvancedControlsProps {
  lora: string;
  setLora: (value: string) => void;
  controlNet: boolean;
  setControlNet: (value: boolean) => void;
  mask: File | null;
  setMask: (file: File | null) => void;
  handleSubmit: () => void;
}

export const AdvancedControls: React.FC<AdvancedControlsProps> = ({
  lora,
  setLora,
  controlNet,
  setControlNet,
  mask,
  setMask,
  handleSubmit,
}) => {
  const handleMaskUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setMask(file);
  };

  return (
    <div>
      {/* <div>
        <label htmlFor="lora" className="block text-sm font-medium text-gray-700">
          LORA Model
        </label>
        <Input
          id="lora"
          type="text"
          value={lora}
          onChange={(e) => setLora(e.target.value)}
          placeholder="Enter LORA model"
        />
      </div> */}

      <div className="flex items-center gap-2">
        <label htmlFor="controlnet" className="block text-sm font-medium text-gray-700">
          ControlNet
        </label>
        <input
          id="controlnet"
          type="checkbox"
          checked={controlNet}
          onChange={() => setControlNet(!controlNet)}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>

      {/* <div>
        <label htmlFor="mask-upload" className="block text-sm font-medium text-gray-700">
          Mask (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleMaskUpload}
          id="mask-upload"
          className="mt-1 block w-full"
        />
      </div> */}
    </div>
  );
};
