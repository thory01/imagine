import { useState } from 'react';
import { AdjustmentsHorizontalIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ImageUpload } from './ImageUpload';
import { AdvancedControls } from './AdvancedControls';
import { createPrompt } from '@/api/prompts';
// import TabNavigation from './TabNavigation';
import { toast } from 'react-toastify';
import { useStore } from '@/store/promptStore';
// import AstriaHeader from './AstriaHeader';

interface PromptFormProps {
    tabDisplay?: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ tabDisplay = true }) => {
    const [images, setImages] = useState<File[]>([]);
    // const [model, setModel] = useState('Flux');
    // const [aspectRatio, setAspectRatio] = useState('16:9');
    const [lora, setLora] = useState('');
    const [mask, setMask] = useState<File | null>(null);
    const [controlNet, setControlNet] = useState(false);
    const [showAdvancedControls, setShowAdvancedControls] = useState(false);
    const [showImageControls, setShowImageControls] = useState(false);
    const [promptText, setPromptText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { refreshUserPrompts } = useStore();

    const handleSubmit = async () => {
        if (!promptText.trim()) {
            toast.error('Please enter a prompt');
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('prompt[text]', promptText);
            formData.append('prompt[tune_id]', "1504944");

            if (images.length > 0) {
                images.forEach((image) => {
                    formData.append(`prompt[images][]`, image);
                });
            }

            const response = await createPrompt(formData);
            console.log(response);
            toast.success('Prompt generated successfully!');
            refreshUserPrompts();
            setPromptText('');
            setImages([]);
            setShowImageControls(false);
            setShowAdvancedControls(false);
        } catch (error) {
            toast.error('Failed to generate. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !isLoading) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="sticky top-0 z-10 w-full bg-gradient-to-b from-[#fafbfc] pb-4 md:pb-6">
            {/* <AstriaHeader /> */}
            <div className="px-4 pt-6 md:px-6 max-w-7xl mx-auto">
                <Card className="w-full">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row items-stretch">
                            {/* Main Input Area */}
                            <div className="flex-1 px-3 md:px-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-2">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            setShowAdvancedControls(false);
                                                            setShowImageControls(!showImageControls);
                                                        }}
                                                        className="h-8 w-8"
                                                    >
                                                        <PhotoIcon className="h-5 w-5" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent sideOffset={4}>
                                                    Upload images
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                    </div>

                                    <Textarea
                                        placeholder="Write a prompt..."
                                        className="min-h-[44px] h-auto resize-none flex-1 pt-3"
                                        value={promptText}
                                        onChange={(e) => setPromptText(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        aria-label="Prompt text"
                                        rows={1}
                                    />
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setShowImageControls(false);
                                                        setShowAdvancedControls(!showAdvancedControls);
                                                    }}
                                                    className="h-8 w-8"
                                                >
                                                    <AdjustmentsHorizontalIcon className="h-5 w-5" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent sideOffset={4}>
                                                Advanced settings
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                                {/* Image Preview */}
                                {images.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Upload ${index + 1}`}
                                                    className="h-16 w-16 object-cover rounded"
                                                />
                                                <Button
                                                    variant="secondary"
                                                    size="icon"
                                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                                    onClick={() => {
                                                        const newImages = [...images];
                                                        newImages.splice(index, 1);
                                                        setImages(newImages);
                                                    }}
                                                >
                                                    <XMarkIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Generate Button */}
                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="m-3 md:m-0 md:w-24 md:rounded-l-none h-auto"
                            >
                                {isLoading ? "Generating..." : "Generate"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Controls Panels */}
                <div className="mt-2 space-y-2">
                    {showImageControls && (
                        <Card className="w-full">
                            <CardContent className="p-4">
                                <ImageUpload
                                    images={images}
                                    setImages={setImages}
                                    removeImage={(index) => {
                                        const newImages = [...images];
                                        newImages.splice(index, 1);
                                        setImages(newImages);
                                    }}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {showAdvancedControls && (
                        <Card className="w-full">
                            <CardContent className="p-4">
                                <AdvancedControls
                                    lora={lora}
                                    setLora={setLora}
                                    controlNet={controlNet}
                                    setControlNet={setControlNet}
                                    mask={mask}
                                    setMask={setMask}
                                    handleSubmit={handleSubmit}
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {tabDisplay && null}
        </div>
    );
};

export default PromptForm;