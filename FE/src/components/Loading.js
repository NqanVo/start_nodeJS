import React from 'react';
import { useSelector } from 'react-redux';

const Loading = () => {
    const loading = useSelector((state) => state.auth.loading)
    return (
        <div className="">
            {
                loading ? (
                    <div className='fixed inset-0 bg-black/50 flex justify-center items-center'>
                        <div className="absolute w-40 h-40 bg-[#C6FFDD]/50 rounded-full animate-ping"></div>
                        <div className="absolute w-32 h-32 bg-[#FBD786]/50 rounded-full animate-ping"></div>
                        <div className="absolute w-20 h-20 bg-[#f7797d]/50 rounded-full animate-ping"></div>
                    </div>
                ) : ""
            }
        </div>
    );
};

export default Loading;