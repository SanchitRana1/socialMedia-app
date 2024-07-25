import React from 'react'
import { useSelector } from 'react-redux';

const AdvertWidget = () => {
    
  const theme = useSelector((store) => store?.app?.mode);
  return (
    <div className={`px-6 pt-6 pb-3 rounded-md ${theme==="dark" ? "bg-[#404040] text-[#ffffff]":"bg-[#ffffff]"}`}>
        <div className="flex justify-between items-center">
            <p className='text-md font-bold'>Sponsered</p>
            <p className='text-sm text-[#a4a4a4]'>Create Ad</p>
        </div>
        <img className={`w-[100%] h-auto rounded-xl my-3`} src={`http://localhost:5000/assets/info4.jpeg`} alt="" />
        <div className="flex justify-between items-center">
            <p>MiKaCasom</p>
            <p className='text-[#a4a4a4]'>miKaCasom.com</p>
        </div>
        <p className='my-2 text-sm text-[#a4a4a4]'>Pathway to stunning and immaculate beauty</p>
    </div>
  )
}

export default AdvertWidget