import React from 'react'
import MatchCard from '../../atoms/tournaments/match.card'
import { match } from 'assert';

const MatchDetailsTour = ({mainColor, matchList} : {mainColor: string, matchList: any}) => {
  const linearBgColor = `bg-[linear-gradient(180deg,_${mainColor}_0%,_#2c2c2c_50%)]`;
  const matchCourt = [
    {
      court: 'Court 1',
      match: [1, 2,3,,4,5],
    },
    {
      court: 'Court 1',
      match: [1, 2,3,,4,5],
    },
    {
      court: 'Court 1',
      match: [1, 2,3,,4,5],
    },
    {
      court: 'Court 1',
      match: [1, 2,3,,4,5],
    },
  ]

  return (
    <div className='w-full h-max'>
      <div className={`w-full h-max flex flex-col  items-center`}>
        <div className='w-3/4 h-max flex flex-col gap-5'>
          {
            matchCourt.map((item, index) => {
              return (
                <div key={index} className='w-full h-max flex flex-col gap-20 items-center'>
                  <h2 className='text-3xl font-bold text-textColor2'>{item.court}</h2>
                  <div className='w-full h-max flex flex-col justify-between items-center gap-16'>
                    {
                      item.match.map((_, index) => {
                        return (
                          <div key={index} className='w-full h-max'>
                            <MatchCard />
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
          <MatchCard />
        </div>
      </div>
    </div>
  )
}

export default MatchDetailsTour