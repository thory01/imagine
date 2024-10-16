import React from 'react';
import WithLayout from '@/components/WithLayout';
import PromptForm from '@/components/PromptForm';
import MasonryGallery from '@/components/MansoryGallary';
import prompts from '@/test';


const UsersPrompts: React.FC = () => {
    return (
        <div className='w-full'>
            <PromptForm />
            <MasonryGallery initialPrompts={prompts} fetchMoreData={async () => []} />
        </div>
    );
};

export default WithLayout(UsersPrompts);