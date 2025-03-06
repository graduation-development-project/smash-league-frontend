import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react'

const MatchCard = () => {
  const mainColor = "#60a5fa";
  const bgColor = "bg-[#60a5fa]";
  const name = "H.D.T.Nguyen";
  const setScore = [
    {
      player1: 17,
      player2: 15
    },
    {
      player1: 16,
      player2: 15
    },
    {
      player1: 21,
      player2: 10
    },
    {
      player1: 10,
      player2: 13
    },
    {
      player1: 20,
      player2: 21
    },
  ]
  const player = (player: boolean) => {
    return (
      <div className='flex justify-between items-center gap-4'>
        <Avatar style={{ backgroundColor: 'white', color: '' }}
          size={85}
          src={"https://img.bwfbadminton.com/image/upload/w_308,h_359,c_thumb,g_face:center/v1697765036/assets/players/thumbnail/87442.png"}
        />
        <div className='w-2/3 flex flex-col'>
          <b className={player? 'text-[#93e093]' : 'text-[#8e8e8e]'}>H.D.T.Nguyen</b>
          <span className='text-base'>FPT University</span>
        </div>
      </div>
    )
  }


  const sets = () => {

    return (
      <div className='flex flex-row gap-4 font-bold text-xl items-center'>
        <div className='w-[3px] h-8 bg-[#8e8e8e] rounded-full' />
        {
          setScore.map((item: any, index) => {
            return (
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1 bg-[#ffffff2a] px-5 py-1 rounded-md'>
                  <span className={item.player1 > item.player2 ? 'text-[#93e093]' : ''}>{item.player1}</span>       
                  -
                  <span className={item.player2 > item.player1 ? 'text-[#93e093]' : ''}>{item.player2}</span>
                </div>
                <div className='w-[3px] h-8 bg-[#8e8e8e] rounded-full' />
              </div>

            )
          })
        }

      </div>
    )

  }

  return (
    <div className='relative w-full h-max flex flex-col items-center '>
      <div className='relative w-full h-[300px]  bg-[#2c2c2c] rounded-xl text-white shadow-shadowBtn'>
        <div className='w-full h-full flex flex-col justify-between items-center px-5 py-5 font-medium'>
          <div className='flex w-max h-max text-base gap-3 items-center'>
            <span>MS</span>
            <div className='w-[2px] h-5 bg-[#8e8e8e] rounded-full' />
            <span>20-30</span>
            <div className='w-[2px] h-5 bg-[#8e8e8e] rounded-full' />
            <span>R16</span>
            <div className='w-[2px] h-5 bg-[#8e8e8e] rounded-full' />
            <span>Court 1</span>
          </div>
          <div className='w-full flex justify-around items-center text-white text-2xl'>
            {player(true)}
            <span className='font-bold'>VS</span>
            {player(false)}
          </div>
          <div>
            {sets()}
          </div>
          <div className={`w-1/2 h-1 rounded-full ${bgColor}`}  />

        </div>
      </div>
      <div
        className={`absolute w-1/3 h-12 -top-7 flex text-white text-3xl rounded-lg font-bold items-center justify-center shadow-shadowBtn`}
        style={{
          background: `linear-gradient(to bottom, ${mainColor}, #2c2c2c 70%)`,
        }}
      >
        Match 1
      </div>
    </div>
  )
}

export default MatchCard