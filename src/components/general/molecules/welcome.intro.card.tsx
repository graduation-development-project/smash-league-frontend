import React from 'react'
import WelcomeCard from '../atoms/welcome.card'

const WelcomeIntroCard = ({ cardContent }: { cardContent: any }) => {

  return (
    <div className='flex flex-row gap-10'>
      {cardContent.map((card: any, index: number) => {
        return <WelcomeCard key={index} {...card} />
      })
      }
    </div>
  )
}

export default WelcomeIntroCard