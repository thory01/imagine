import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface AspectRatioSelectorProps {
  aspectRatio: string;
  setAspectRatio: (aspectRatio: string) => void;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({
  aspectRatio,
  setAspectRatio,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{aspectRatio}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {['1:1', '16:9', '4:3'].map((ratioOption) => (
          <DropdownMenuItem key={ratioOption} onClick={() => setAspectRatio(ratioOption)}>
            {ratioOption}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
