import React from 'react';
import WithPrompt from '@/components/WithLayout'

const Prompt: React.FC = () => {
    return (
        <div>
            <h1>Prompt</h1>
            <p>Welcome to the Prompt page.</p>
        </div>
    );
};

export default WithPrompt(Prompt);