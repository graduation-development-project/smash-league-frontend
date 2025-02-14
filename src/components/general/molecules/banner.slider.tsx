import React from 'react'
import SliderComponent from '../atoms/slider.component'

const BannerSlider = ({ width = "w-full" }: { width?: string }) => {
  return (
    <div className={`relative ${width} h-5/6` }>
      <div className='absolute z-1 bg-white inset-0 opacity-25 w-full h-full rounded-xl' />
      <div className='absolute z-2 w-full h-full -translate-x-5 translate-y-5 rounded-xl'>
        <SliderComponent />
      </div>
    </div>
  )
}

export default BannerSlider