import * as React from "react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const colorGradingOptions = [
  { label: 'Film Velvia', value: 'Film Velvia' },
  { label: 'Film Portra', value: 'Film Portra' },
  { label: 'Ektar', value: 'Ektar' },
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
    <div className={cn("color-grading-selector grid grid-cols-3 items-center", className)}>
      <label htmlFor="color-grading" className="text-gray-700 text-sm font-medium mb-2">
        Color Grading
      </label>
      <div className="col-span-2">
      <Select
        onValueChange={handleValueChange}
        defaultValue={value}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select grading..." />
        </SelectTrigger>
        <SelectContent>
          {colorGradingOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>
    </div>
  );
};

export default ColorGradingSelector;