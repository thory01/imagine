import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';

interface UseImageUploadProps {
    initialImage?: File | null;
    initialUrl?: string;
}

interface UseImageUploadReturn {
    image: File | null;
    urlImage: string | null;
    uploadError: string | null;
    getRootProps: any;
    getInputProps: any;
    setImage: (file: File | null) => void;
    setUrl: (url: string) => void;
    handleUrlUpload: () => Promise<void>;
    clearImage: () => void;
    isDragActive: boolean;
}

export const useImageUpload = ({ initialImage = null, initialUrl = '' }: UseImageUploadProps): UseImageUploadReturn => {
    const [image, setImage] = useState<File | null>(initialImage);
    const [urlImage, setUrlImage] = useState<string | null>(null);
    const [url, setUrl] = useState<string>(initialUrl);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const onDrop = (acceptedFiles: File[]) => {
        const isValid = acceptedFiles.every(file => file.type.startsWith('image/'));
        if (isValid) {
            setUploadError(null);
            setImage(acceptedFiles[0]);
            setUrlImage(null);
        } else {
            setUploadError('Only image files are accepted.');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false,
    });

    useEffect(() => {
        const handlePaste = (event: ClipboardEvent) => {
            const items = event.clipboardData?.items;
            if (items) {
                const imageItem = Array.from(items).find(item => item.type.startsWith('image/'));
                if (imageItem) {
                    const file = imageItem.getAsFile();
                    if (file) {
                        setUploadError(null);
                        setImage(file);
                        setUrlImage(null);
                    }
                } else {
                    setUploadError('Only image files are accepted from clipboard.');
                }
            }
        };

        document.addEventListener('paste', handlePaste);
        return () => document.removeEventListener('paste', handlePaste);
    }, []);

    const handleUrlUpload = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Image could not be fetched.');
            const blob = await response.blob();
            if (!blob.type.startsWith('image/')) {
                setUploadError('The provided URL does not point to an image.');
                return;
            }
            setImage(null);
            setUrlImage(URL.createObjectURL(blob));
            setUploadError(null);
        } catch (error) {
            setUploadError('Invalid URL or unable to fetch image.');
        }
    };

    const clearImage = () => {
        setImage(null);
        setUrlImage(null);
    };

    return {
        image,
        urlImage,
        uploadError,
        getRootProps,
        getInputProps,
        setImage,
        setUrl,
        handleUrlUpload,
        clearImage,
        isDragActive,
    };
};
