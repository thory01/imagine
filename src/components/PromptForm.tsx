import { AdjustmentsHorizontalIcon, PhotoIcon } from '@heroicons/react/16/solid';
import { Textarea } from '@/components/ui/textarea';

const PromptForm: React.FC = () => {
    return (
        <div className="sticky top-0 z-10 w-full h-24 bg-gradient-to-b from-white from-35% pt-6">
            <div className="mx-auto max-w-[1020px] rounded-2xl border bg-white py-3 px-6 shadow-lg text-lg font-bold">
                <div className="flex items-center justify-between gap-3 mx-auto">
                    <PhotoIcon className="h-6 w-6 text-gray-500" />
                    <Textarea
                        placeholder="Write a prompt"
                        className="h-[24px] resize-none"
                    />
                    <AdjustmentsHorizontalIcon className="h-7 w-7 text-gray-500" />
                </div>
            </div>
        </div>
    );
};

export default PromptForm;
