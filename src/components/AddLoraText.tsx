import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { getTunes } from '@/api/prompts';

interface Tune {
    id: string;
    title: string;
    orig_images: string[];
}

interface AddLoraTextProps {
    loraTextList: string[];
    setLoraTextList: React.Dispatch<React.SetStateAction<string[]>>;
    onSelect?: (tune: Tune) => void;
    onRemove?: (loraText: string) => void;
}

const ITEMS_PER_PAGE = 12;

const AddLoraText: React.FC<AddLoraTextProps> = ({
    loraTextList,
    setLoraTextList,
    onSelect,
    onRemove,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tunes, setTunes] = useState<Tune[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1);
            setTunes([]);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchTunes = async () => {
        if (loading) return;

        try {
            setLoading(true);
            setError(null);

            const response = await getTunes(
                page,
                ITEMS_PER_PAGE,
                debouncedSearch
            );

            setTunes(prev => page === 1 ? response : [...prev, ...response]);
            setHasMore(response.length === ITEMS_PER_PAGE);
        } catch (err) {
            setError('Failed to load tunes. Please try again.');
            console.error('Error fetching tunes:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTunes();
    }, [page, debouncedSearch]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore && !loading) {
            setPage(prev => prev + 1);
        }
    };

    const handleSelect = (tune: Tune) => {
        setLoraTextList(prev => [...prev, `<lora:${tune.id}:1>`]);
        onSelect?.(tune);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Add Loras ({loraTextList.length})
                </label>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">
                            Browse Loras
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-[94%] md:max-w-3xl max-h-[90vh] p-3">
                        <DialogHeader>
                            <DialogTitle>Available Loras</DialogTitle>
                            <DialogDescription>
                                Select a lora to add to your prompt.
                            </DialogDescription>

                            <div className="mt-2">
                                <Input
                                    type="search"
                                    placeholder="Search loras..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-1/2 text-gray-800"
                                />
                            </div>
                        </DialogHeader>

                        <div
                            className="overflow-y-auto mt-1"
                            onScroll={handleScroll}
                            style={{ height: '100%' }}
                        >
                            {error && (
                                <div className="text-red-500 text-center p-4">
                                    {error}
                                    <Button
                                        variant="outline"
                                        onClick={fetchTunes}
                                        className="ml-2"
                                    >
                                        Retry
                                    </Button>
                                </div>
                            )}

                            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {tunes.map((tune) => (
                                    <Card
                                        key={tune.id}
                                        className="cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                                        onClick={() => handleSelect(tune)}
                                    >
                                        <div className="aspect-square relative overflow-clip">
                                            <img
                                                src={tune.orig_images[0]}
                                                alt={tune.title}
                                                className="object-cover w-full h-full rounded-t-md"
                                                loading="lazy"
                                            />
                                        </div>
                                        <CardHeader className="p-3">
                                            <CardTitle className="text-sm line-clamp-2">
                                                {tune.title}
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>

                            {loading && (
                                <div className="flex justify-center p-4">
                                    <Loader2 className="animate-spin" />
                                </div>
                            )}
                        </div>

                        <DialogFooter className="absolute top-0 right-0">
                            <DialogClose asChild>
                                <Button variant="ghost" className="text-black rounded-full hover:text-red-500">
                                    X
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {loraTextList.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {loraTextList.map((text, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                            {text}
                            <button
                                onClick={() => {
                                    setLoraTextList(prev => prev.filter((_, i) => i !== index));
                                    onRemove?.(loraTextList[index]);
                                }}
                                className="hover:text-red-500"
                                aria-label="Remove lora"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddLoraText;
