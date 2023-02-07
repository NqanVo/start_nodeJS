import React from 'react';

const DefaultPage = (props) => {
    return (
        <div className='bg-slate-200 w-full min-h-screen mx-auto flex flex-col gap-4'>
            {
                props.children
            }
        </div>
    );
};

export default DefaultPage;