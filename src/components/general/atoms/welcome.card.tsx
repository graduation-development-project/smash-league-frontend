import React from 'react'

const WelcomeCard = ({titleColor, bgColor, title, content, content2 }: {titleColor: string, bgColor: string, title: string, content: string, content2: string}) => {
  const styleTitleAndBg = bgColor === 'green' ? 'bg-gradient-green text-white' : titleColor === 'orange' ? 'text-primaryColor bg-white' : 'text-secondColor bg-white'
  const styleContent = bgColor === 'green' ? 'text-white' : 'text-textColor2'
  const styleContent2 = bgColor === 'green' ? 'text-white' : 'text-textColor'

  const bulletContent = content2.split(', ').map((item: string, index: number) => <li key={index}>{item}</li>)

  return (
    <div className={`flex flex-col ${styleTitleAndBg} py-7 px-6 rounded-lg shadow-shadowBtn`}>
      <div className={` text-center text-[20px]`}>
        <h3 className='font-extrabold'>{title}</h3>
      </div>
      <p className={`text-[14px] font-medium ${styleContent}`}>{content}</p>
      <ul className={`list-disc list-inside p-2 ${styleContent2} text-[16px] font-semibold`}>
        {bulletContent}
      </ul>
    </div>
  )
}

export default WelcomeCard