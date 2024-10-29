import * as React from "react";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const controlNetOptions = [
  { label: 'Composition', value: 'composition' },
  { label: 'Reference', value: 'reference' },
  { label: 'Segroom', value: 'segroom' },
  { label: 'IP Adapter', value: 'ipadapter' },
  { label: 'Lineart', value: 'lineart' },
  { label: 'Canny', value: 'canny' },
  { label: 'Depth', value: 'depth' },
  { label: 'MLSD', value: 'mlsd' },
  { label: 'HED', value: 'hed' },
  { label: 'Pose', value: 'pose' },
  { label: 'Tile', value: 'tile' },
  { label: 'QR', value: 'qr' },
];

interface ControlNetSelectorProps {
  value?: string;
  onChange?: (model: string) => void;
  className?: string;
}

const ControlNetSelector: React.FC<ControlNetSelectorProps> = ({
  value = 'composition',
  onChange,
  className = '',
}) => {
  const handleValueChange = (model: string) => {
    onChange?.(model);
  };

  return (
    <div className={cn("controlnet-selector", className)}>
      <label htmlFor="controlnet" className="text-gray-700 text-sm font-medium mb-2 block">
        ControlNet
      </label>
      <Select
        onValueChange={handleValueChange}
        defaultValue={value}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a model..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {controlNetOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ControlNetSelector;
