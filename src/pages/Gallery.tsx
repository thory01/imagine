import React from 'react';
import WithLayout from '@/components/WithLayout'

const Gallery: React.FC = () => {
    return (
        <div>
            <h1>Gallery</h1>
            <p>Welcome to the gallery page.</p>
        </div>
    );
};

export default WithLayout(Gallery);