import * as React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
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
    <div className={cn("color-grading-selector gap-1 grid grid-cols-3 items-center", className)}>
      <label htmlFor="color-grading" className="text-gray-700 text-sm font-medium mb-2">
        Control Net
      </label>
      <div className="col-span-2 ml-auto">
        <ToggleGroup.Root
          type="single"
          value={value}
          onValueChange={handleValueChange}
          className="flex space-x-2"
        >
          {controlNetOptions.map((option) => (
            <ToggleGroup.Item
              key={option.value}
              value={option.value}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium",
                value === option.value ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              )}
            >
              {option.label}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
    </div>
  );
};

export default ControlNetSelector;
