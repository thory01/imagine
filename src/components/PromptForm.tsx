import { useState } from 'react';
import { AdjustmentsHorizontalIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { Textarea } from '@/components/ui/textarea';
// import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const PromptForm: React.FC = () => {
    const [image, setImage] = useState<File | string | null>(null);
    const [model] = useState('Flux');
    const [aspectRatio] = useState('16:9');
    const [lora, setLora] = useState('');
    const [stylePreset] = useState('');
    const [mask, setMask] = useState<File | null>(null);
    const [controlNet, setControlNet] = useState(false);
    const [showAdvancedControls, setShowAdvancedControls] = useState(false); // Controls visibility of additional options

    // Image upload handler
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setImage(file);
    };

    const handleMaskUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setMask(file);
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log({
            prompt: '', // Extract prompt from the Textarea
            image,
            model,
            lora,
            aspectRatio,
            stylePreset,
            mask,
            controlNet,
        });
    };

    return (
        <div className="sticky top-0 z-10 w-full bg-gradient-to-b from-white from-35% pt-6">
            <div className="mx-auto max-w-[1020px] rounded-2xl border bg-white py-3 px-6 shadow-lg">
                <div className="flex items-center justify-between gap-3 mx-auto">
                    {/* Image Upload Section */}
                    <div className="flex gap-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                            <PhotoIcon className="h-6 w-6 text-gray-500" />
                        </label>
                    </div>

                    {/* Prompt Input */}
                    <Textarea
                        placeholder="Write a prompt"
                        className="flex-grow h-[24px] resize-none"
                    />

                    {/* Model Selection and Advanced Controls Trigger */}
                    <div className="flex gap-2 items-center">
                        <AdjustmentsHorizontalIcon
                            className="h-7 w-7 text-gray-500 cursor-pointer"
                            onClick={() => setShowAdvancedControls(!showAdvancedControls)}
                        />
                    </div>
                </div>
            </div>

            {/* Conditionally render additional controls when toggled */}
            {showAdvancedControls && (
                <div className="mx-auto max-w-[1020px] rounded-2xl border bg-white py-3 px-6 shadow-lg mt-2 grid grid-cols-2 gap-4">
                    <div>
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
                    </div>

                    <div>
                        <label htmlFor="aspect-ratio" className="block text-sm font-medium text-gray-700">
                            Aspect Ratio
                        </label>
                    </div>
                    <div>
                        <label htmlFor="style-preset" className="block text-sm font-medium text-gray-700">
                            Style Preset
                        </label>
                    </div>

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

                    <div>
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
                    </div>

                    <div className="mt-6">
                        <Button onClick={handleSubmit} className="w-full">
                            Generate
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PromptForm;
