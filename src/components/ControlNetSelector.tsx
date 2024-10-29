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
  { label: 'Canny', value: 'canny' },
  { label: 'Depth', value: 'depth' },
  { label: 'Pose', value: 'pose' },
];

interface ControlNetSelectorProps {
  value?: string;
  onChange?: (model: string) => void;
  className?: string;
}

const ControlNetSelector: React.FC<ControlNetSelectorProps> = ({
  value = '',
  onChange,
  className = '',
}) => {
  const handleValueChange = (model: string) => {
    onChange?.(model);
  };

  return (
    <div className={cn("controlnet-selector grid grid-cols-3 items-center", className)}>
      <label htmlFor="controlnet" className="text-gray-700 text-sm font-medium block">
        ControlNet
      </label>
      <div className="col-span-2">
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
    </div>
  );
};

export default ControlNetSelector;
