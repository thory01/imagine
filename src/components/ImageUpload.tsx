import { useDropzone } from 'react-dropzone';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ImageUploadProps {
  images: File[]; 
  setImages: (files: File[]) => void;
  removeImage: (index: number) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ images, setImages, removeImage }) => {
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const onDrop = (acceptedFiles: File[]) => {
    const isValid = acceptedFiles.every(file => file.type.startsWith('image/'));
    
    if (isValid) {
      setUploadError(null);
      setImages([...images, ...acceptedFiles]);
    } else {
      setUploadError('Only image files are accepted.');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Images</h3>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-8 rounded-lg cursor-pointer flex flex-col items-center transition-all duration-200 ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 bg-gray-50'}`}
      >
        <input {...getInputProps()} />
        {images.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-md shadow-md"
                />
                <button 
                  onClick={() => removeImage(index)} 
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            {isDragActive ? 'Drop the images here' : 'Drag and drop, or click to upload images'}
          </p>
        )}
      </div>

      {uploadError && (
        <p className="text-red-600 text-sm mt-2">{uploadError}</p>
      )}

      {images.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-600 mb-3">Uploaded Files</h4>
          <ul className="space-y-2">
            {images.map((image, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 rounded-md py-2 px-4 shadow-sm">
                <p className="text-gray-700">{image.name}</p>
                <Button variant="destructive" onClick={() => removeImage(index)} size="sm">
                  <TrashIcon className="h-5 w-5 mr-1" /> Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
