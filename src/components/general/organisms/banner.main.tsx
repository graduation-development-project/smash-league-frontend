
import React from 'react'
import BannerContent from '../molecules/banner.content'
import BannerSlider from '../molecules/banner.slider'
import Image from 'next/image'

const BannerMain = () => {
    return (
        <div className='relative w-full h-[600px] flex shadow-shadowComp'>
            <div className='absolute z-0 flex w-full h-full '>
                <div className='absolute w-full h-full inset-0 bg-black opacity-40'/>
                <Image className='w-full h-full object-cover opacity-' src="https://seumelhorjogo.com/wp-content/uploads/2024/02/badminton.jpg" alt="" />
                
            </div>
            <div className='absolute z-10 w-full h-full flex gap-5 p-10 items-center '>
                <div className='w-1/2 h-full flex items-center justify-center '>
                    <BannerContent buttonColor='green'/>
                </div>
                <div className='w-1/2 h-full flex items-center justify-end '>
                    <BannerSlider width='w-4/5'/>
                </div>
            </div>

        </div>
    )
}

export default BannerMain