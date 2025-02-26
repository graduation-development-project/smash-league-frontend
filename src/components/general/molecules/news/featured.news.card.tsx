import React from 'react'
import NewsCard from '../../atoms/news.card'

const FeaturedNewsCard = () => {
  return (
    <div className='w-1/2 h-fit flex flex-col gap-2'>
      <div className='w-full h-12 bg-gradient-orange    flex items-center p-5 rounded-t-lg shadow-shadowBtn'>
        <h2 className='font-bold text-white text-[20px]'>Hot News</h2>
      </div>
      <div className='flex flex-col gap-6  w-full h-full p-4'>
        <NewsCard />
        <NewsCard />
        <NewsCard />
        {/* <NewsCard /> */}
      </div>
    </div>

  )
}

export default FeaturedNewsCard