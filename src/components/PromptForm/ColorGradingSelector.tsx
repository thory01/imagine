import * as React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

const colorGradingOptions = [
  { label: 'Film Velvia', value: 'film-velvia' },
  { label: 'Film Portra', value: 'film-portra' },
  { label: 'Ektar', value: 'ektar' },
];

interface ColorGradingSelectorProps {
  value?: string;
  onChange?: (grading: string) => void;
  className?: string;
}

const ColorGradingSelector: React.FC<ColorGradingSelectorProps> = ({
  value = 'film-velvia',
  onChange,
  className = '',
}) => {
  const handleValueChange = (grading: string) => {
    onChange?.(grading);
  };

  return (
    <div className={cn("color-grading-selector gap-1 grid grid-cols-3 items-center", className)}>
      <label htmlFor="color-grading" className="text-gray-700 text-sm font-medium mb-2">
        Color Grading
      </label>
      <div className="col-span-2 ml-auto">
        <ToggleGroup.Root
          type="single"
          value={value}
          onValueChange={handleValueChange}
          className="flex space-x-2"
        >
          {colorGradingOptions.map((option) => (
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

export default ColorGradingSelector;
