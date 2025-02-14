import React from 'react'
import NewsCard from '../atoms/news.card'
import FeaturedNewsCard from '../molecules/featured.news.card'
import FeaturedNewsCardMain from '../molecules/featured.news.card.main'

const NewsBulletinMain = () => {
    return (
        <div className=' bg-white flex flex-col w-full px-[100px] py-[40px] gap-7 shadow-shadowComp '>
            <div className="">
                <h2 className="text-textColor text-[32px] font-bold">
                    The Smash <span className="text-primaryColor">Bulletin</span>

                </h2>
                <span className="div">
                    Stay ahead in the game with the latest updates from the world of Smash League
                </span>
            </div>
            <div className='flex flex-row gap-32  w-full h-full'>
                
                <FeaturedNewsCard />
                <FeaturedNewsCardMain />

            </div>
        </div>
    )
}

export default NewsBulletinMain 