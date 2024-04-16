import React from 'react'

const Loading = () => {
    return (
        <div className='fixed inset-0 bg-transparent bg-opacity-50 flex flex-col items-center z-50 pt-48'>
            <span className="icon-[svg-spinners--8-dots-rotate] bg-slate-700 w-[70px] h-[70px]"></span>
        </div>
    )
}

export default Loading

export const LoadingTask = () => {
    return (
        <div className='inset-0 bg-transparent bg-opacity-50 flex flex-col items-center z-50 pt-48'>
            <span className="icon-[eos-icons--three-dots-loading] bg-slate-700 w-[70px] h-[70px]"></span>
        </div>
    )
}
