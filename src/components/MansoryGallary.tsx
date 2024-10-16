import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Clipboard } from 'lucide-react';
import { LoaderPinwheel } from 'lucide-react';

interface Tune {
  id: number;
  callback: string | null;
  trained_at: string;
  started_training_at: string;
  created_at: string;
  updated_at: string;
  tune_id: number;
  text: string;
  negative_prompt: string;
  cfg_scale: number | null;
  steps: number | null;
  super_resolution: boolean;
  ar: string;
  num_images: number;
  seed: number | null;
  controlnet_conditioning_scale: number | null;
  controlnet_txt2img: boolean;
  denoising_strength: number | null;
  style: string | null;
  url: string;
  images: string[];
}

interface MasonryGalleryProps {
  initialPrompts: Tune[];
  fetchMoreData: () => Promise<Tune[]>;
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ initialPrompts, fetchMoreData }) => {
  const [prompts, setPrompts] = useState<Tune[]>(initialPrompts);
  const [hasMore, setHasMore] = useState(true);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  const loadMorePrompts = async () => {
    const newPrompts = await fetchMoreData();
    if (newPrompts.length === 0) {
      setHasMore(false);
    } else {
      setPrompts(prevPrompts => [...prevPrompts, ...newPrompts]);
    }
  };

  return (
    <div className="p-8 max-w-[1140px] mx-auto">
      <InfiniteScroll
        dataLength={prompts.length}
        next={loadMorePrompts}
        hasMore={hasMore}
        loader={<LoaderPinwheel className="mx-auto" />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-[2px]"
          columnClassName="pl-[2px] bg-clip-padding"
        >
          {prompts.map((prompt) => (
            <div key={prompt.id} className="mb-[2px]">
              <div className="relative group">
                <img 
                  className="w-full h-auto" 
                  src={prompt.images[0]} 
                  alt={`Image ${prompt.id}`} 
                />
                
                {/* Hidden by default, shows on hover */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black from-0% bg-opacity-50 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center">
                  <div className="text-sm text-white font-medium hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-full cursor-pointer">
                    Prompt {prompt.id}
                  </div>
                  
                  {/* Like button */}
                  <div className="text-white flex">
                    <div className="mr-2 hover:bg-white hover:bg-opacity-20 p-2 rounded-full cursor-pointer">
                      <Clipboard size={18} />
                    </div>
                    <div className='hover:bg-white hover:bg-opacity-20 p-2 rounded-full cursor-pointer'>
                       <HeartIcon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default MasonryGallery;