import React from 'react';
import WithLayout from '@/components/WithLayout';
import PromptForm from '@/components/PromptForm';
import MansoryGallery from '@/components/MansoryGallary';
import prompts from '../../src/test'
import { apiClient } from '@/services/api';

const Gallery: React.FC = () => {

    const fetchMoreData = async () => {
        const response = await apiClient.get('/prompts');
        return response.data
    }


    return (<div className='bg-white flex-1 relative'>
        <PromptForm />
        <MansoryGallery initialPrompts={prompts} fetchMoreData={fetchMoreData} />
    </div>
    );
};

export default WithLayout(Gallery);