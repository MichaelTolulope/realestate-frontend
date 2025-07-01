import React from 'react'

const PropertyTileLoading = () => {
  return (
    <div className='flex flex-col gap-2 animate-pulse max-w-[350px]'>
        <div className='w-[350px] h-[230px] rounded-xl  bg-gray-300 animate-pulse'></div>
        <div className='w-[300px] h-[10px]  rounded-xl bg-gray-300 animate-pulse'></div>
        <div className='w-[300px] h-[10px]  rounded-xl bg-gray-300 animate-pulse'></div>
        <div className='w-[100px] h-[10px]  rounded-xl bg-gray-300 animate-pulse'></div>
        <div className='w-[100px] h-[10px]  rounded-xl bg-gray-300 animate-pulse'></div>


    </div>
  )
}

export default PropertyTileLoading