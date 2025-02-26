import React from 'react'
import WelcomeIntroCard from '../molecules/welcome/welcome.intro.card'

const WelcomeIntroMain = () => {
  const cardContent = [
    {
      bgColor: 'white',
      titleColor: 'orange',
      title: 'Elevate your Game',
      content: 'Effortlessly set up and manage  tournaments with our intuitive tools.',
      content2: 'Customize brackets and schedules, Real-time updates and notifications, Automated results tracking'
    },
    {
      bgColor: 'green',
      titleColor: 'white',
      title: 'Smash the League',
      content: 'Join competitive events as an individual or team and showcase your skills.',
      content2: 'Easy registration process, Track your performance and stats, Connect with other players'
    },
    {
      bgColor: 'white',
      titleColor: 'green',
      title: 'Master of Whistles',
      content: 'Take on an official referee and contribute to fair play in tournaments.',
      content2: 'Easy-to-use digital scorekeeping, Access to rules and guidelines, Opportunity to gain experience'
    }
  ]
  return (
    <div className='flex flex-col gap-8 justify-center items-center h-fit w-full mt-32 py-12 px-[100px]'>
        <div className='flex flex-col text-center'>
            <h2 className='text-textColor text-[32px] font-bold'>Welcome to <span className='text-primaryColor'>SMASH LEAGUE</span></h2>
            <span className='text-textColor2 font-semibold'>Your all-in-one platform for organizing, officiating, and competing in badminton tournaments</span>
        </div>
        <div className='px-14'>
            <WelcomeIntroCard cardContent={cardContent}/>
        </div>
      
    </div>
  )
}

export default WelcomeIntroMain