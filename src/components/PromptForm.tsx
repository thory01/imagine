import { useEffect, useState } from 'react';
import { AdjustmentsHorizontalIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { AdvancedControls } from './AdvancedControls';
import { createPrompt } from '@/api/prompts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useStore } from '@/store/promptStore';
import { useImageUpload } from '@/hooks/useImageUpload';
import usePaste from '@/hooks/usePaste';
import { SendIcon } from 'lucide-react';

interface PromptFormProps {
    tabDisplay?: boolean;
}

const PromptForm: React.FC<PromptFormProps> = () => {
    const [showAdvancedControls, setShowAdvancedControls] = useState(false);
    const [showImageControls, setShowImageControls] = useState(false);
    const [promptText, setPromptText] = useState('');
    const [loraTextList, setLoraTextList] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [width, setWidth] = useState(1024);
    const [height, setHeight] = useState(1024);
    const [controlNet, setControlNet] = useState<string>('');
    const [colorGrading, setColorGrading] = useState<string>('');
    const [filmGrain, setFilmGrain] = useState(false);
    const [superResolution, setSuperResolution] = useState(false);
    const [hiresFix, setHiresFix] = useState(false);
    const [inpaintFaces, setInpaintFaces] = useState(false);
    const [faceCorrect, setFaceCorrect] = useState(false);
    const [faceSwap, setFaceSwap] = useState(false);
    const [denoisingStrength, setDenoisingStrength] = useState(0.5);
    const [conditioningScale, setConditioningScale] = useState(0.5);
    const [numImages, setNumImages] = useState(4);

    usePaste((pasteText, pasteObject) => {
        console.log('Paste di:', pasteText, pasteObject);
        if (pasteText) {
            setPromptText((prev) => {
                console.log('prev:', prev);
                return pasteText;
            });
        }
        if (pasteObject) {
            if (pasteObject.controlnet) {
                setControlNet(pasteObject.controlnet);
            }
            if (pasteObject.color_grading) {
                setColorGrading(pasteObject.color_grading);
            }
            if (pasteObject.super_resolution === 'true' || pasteObject.super_resolution === 'false') {
                setSuperResolution(pasteObject.super_resolution === 'true');
            }
            if (pasteObject.hires_fix === 'true' || pasteObject.hires_fix === 'false') {
                setHiresFix(pasteObject.hires_fix === 'true');
            }
            if (pasteObject.inpaint_faces === 'true' || pasteObject.inpaint_faces === 'false') {
                setInpaintFaces(pasteObject.inpaint_faces === 'true');
            }
            if (pasteObject.face_correct === 'true' || pasteObject.face_correct === 'false') {
                setFaceCorrect(pasteObject.face_correct === 'true');
            }
            if (pasteObject.face_swap === 'true' || pasteObject.face_swap === 'false') {
                setFaceSwap(pasteObject.face_swap === 'true');
            }
            if (pasteObject.ar) {
                setAspectRatio(pasteObject.ar);
            }
            if (!isNaN(parseFloat(pasteObject.denoising_strength))) {
                setDenoisingStrength(parseFloat(pasteObject.denoising_strength));
            }
            if (!isNaN(parseFloat(pasteObject.controlnet_conditioning_scale))) {
                setConditioningScale(parseFloat(pasteObject.controlnet_conditioning_scale));
            }
            if (!isNaN(parseInt(pasteObject.num_images))) {
                setNumImages(parseInt(pasteObject.num_images));
            }
            if (!isNaN(parseInt(pasteObject.w))) {
                setWidth(parseInt(pasteObject.w));
            }
            if (!isNaN(parseInt(pasteObject.h))) {
                setHeight(parseInt(pasteObject.h));
            }
        }
    });

    const { refreshUserPrompts } = useStore();

    const {
        image,
        urlImage,
        uploadError,
        getRootProps,
        getInputProps,
        // setUrl,
        // handleUrlUpload,
        clearImage,
        // isDragActive,
    } = useImageUpload({});

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

            if (image) {
                formData.append('prompt[image]', image);
            }

            // add optional settings
            formData.append('prompt[control_net]', controlNet);
            formData.append('prompt[color_grading]', colorGrading);
            formData.append('prompt[super_resolution]', superResolution.toString());
            formData.append('prompt[hires_fix]', hiresFix.toString());
            formData.append('prompt[inpaint_faces]', inpaintFaces.toString());
            formData.append('prompt[face_correct]', faceCorrect.toString());
            formData.append('prompt[face_swap]', faceSwap.toString());
            formData.append('prompt[aspect_ratio]', aspectRatio);

            formData.append('prompt[denoising_strength]', denoisingStrength.toString());
            formData.append('prompt[conditioning_scale]', conditioningScale.toString());
            formData.append('prompt[num_images]', numImages.toString());
            formData.append('prompt[w]', width.toString());
            formData.append('prompt[h]', height.toString());

            formData.append('prompt[backend_version]', '0');

            console.log('formData', {
                promptText,
                controlNet,
                colorGrading,
                superResolution,
                hiresFix,
                inpaintFaces,
                faceCorrect,
                faceSwap,
                aspectRatio,
                denoisingStrength,
                conditioningScale,
                numImages,
                width,
                height,
            });

            const response = await createPrompt(formData);
            console.log(response);
            toast.success('Prompt created successfully!');
            refreshUserPrompts();
            setPromptText('');
            setShowImageControls(false);
            setShowAdvancedControls(false);
        } catch (error) {
            const errorMessage = (error as any)?.response?.data?.text?.join(', ') || (error as any).message;
            toast.error(`Error creating prompt: ${errorMessage}`);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // enter key to submit

    useEffect(() => {
        if (promptText.trim() && !isLoading) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [promptText, isLoading, handleSubmit]);

    return (
        <div className={`sticky top-0 z-10 w-full bg-gradient-to-b from-[#fafbfc] pb-4 md:pb-6`}>
            <div className="px-0 pt-6 md:px-6 max-w-7xl mx-auto">
                <Card className="w-full">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row items-stretch">
                            {/* Main Input Area */}
                            <div className="flex-1">

                                <div className="flex items-center h-12">
                                    <div className="flex gap-2 mx-1">
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
                                        className="resize-none flex-1"
                                        value={`${promptText}`}
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
                                                    className="h-8 w-8 mr-0 md:mr-1"
                                                >
                                                    <AdjustmentsHorizontalIcon className="h-5 w-5" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent sideOffset={4}>
                                                Advanced settings
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    {/* Generate Button */}
                                    <Button
                                        variant={'ghost'}
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="h-full pl-1 md:hidden"
                                    >
                                        {/* use icon for small screens */}
                                        <span className="inline">
                                            <SendIcon className="w-4 h-4" />
                                        </span>
                                    </Button>
                                </div>

                                {/* Image Upload */}
                                {showImageControls && <div className='flex m-2'>
                                    <div
                                        {...getRootProps()}
                                        className="border-2 border-dashed p-1 rounded-lg cursor-pointer transition-all duration-200 w-24 h-24 flex items-center justify-center"
                                    >
                                        <input {...getInputProps()} />
                                        {image || urlImage ? (
                                            <div className="relative w-full h-full">
                                                <img
                                                    src={image ? URL.createObjectURL(image) : urlImage!}
                                                    alt="Uploaded"
                                                    className="object-cover h-full rounded-md"
                                                />
                                                <button
                                                    onClick={clearImage}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                >
                                                    <XMarkIcon className="h-2 w-2" />
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 text-center text-[12px]">
                                                Drag, paste, or click to upload image
                                            </p>
                                        )}
                                    </div>

                                    {uploadError && <p className="text-red-600 text-sm mt-2">{uploadError}</p>}

                                </div>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Controls Panels */}
                <div className="mt-2 space-y-2">
                    {showAdvancedControls && (
                        <Card className="w-full">
                            <CardContent className="p-4">
                                <AdvancedControls
                                    controlNet={controlNet}
                                    setControlNet={setControlNet}
                                    colorGrading={colorGrading}
                                    setColorGrading={setColorGrading}
                                    filmGrain={filmGrain}
                                    setFilmGrain={setFilmGrain}
                                    aspectRatio={aspectRatio}
                                    setAspectRatio={setAspectRatio}
                                    superResolution={superResolution}
                                    setSuperResolution={setSuperResolution}
                                    hiresFix={hiresFix}
                                    setHiresFix={setHiresFix}
                                    inpaintFaces={inpaintFaces}
                                    setInpaintFaces={setInpaintFaces}
                                    faceCorrect={faceCorrect}
                                    setFaceCorrect={setFaceCorrect}
                                    faceSwap={faceSwap}
                                    setFaceSwap={setFaceSwap}
                                    denoisingStrength={denoisingStrength}
                                    setDenoisingStrength={setDenoisingStrength}
                                    conditioningScale={conditioningScale}
                                    setConditioningScale={setConditioningScale}
                                    numImages={numImages}
                                    setNumImages={setNumImages}
                                    setWidth={setWidth}
                                    setHeight={setHeight}
                                    loraTextList={loraTextList}
                                    setLoraTextList={setLoraTextList}
                                    setPromptText={setPromptText}
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
            <ToastContainer 
            position="top-right"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        </div>
    );
};

export default PromptForm;