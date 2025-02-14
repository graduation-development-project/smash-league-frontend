
import { AlignJustify, Award, Crown, Dot } from 'lucide-react'
import { List } from 'postcss/lib/list'
import React from 'react'

const StandingScoreCard = ({ card }: { card: StandingScoreCardProps }) => {
    const medalColor = (rank: number) => {
        return rank === 1 ? "#FFD700" : rank === 2 ? "#C0C0C0" : rank === 3 ? "#CD7F32" : "white"
    }
    return (

        <div className='flex flex-col h-max w-96 border rounded-xl text-textColor'>
            <div >
                <div className='flex flex-col bg-gradient-green text-white p-3 rounded-t-xl gap-2'>
                    <h2 className='font-bold'>{card.cate}</h2>
                    <span className='text-md'>{card.title}</span>
                </div>
                <div className='h-[500px] px-5 overflow-auto scrollbar-webkit scrollbar-thin'>
                    <table className='table-auto w-full'>
                        <thead>
                            <tr>
                                <th>Pos.</th>
                                <th>{card.cate.toLowerCase().includes("team") ? "Team" : "Player"}</th>
                                {/* <th>Award</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            {
                                card.cate.toLowerCase().includes("team") ?
                                    card.podium.map((position: any, index) => {
                                        return (
                                            <tr key={index} className=''>
                                                <td className=''>
                                                    <div className='h-full flex flex-row gap-2 items-center justify-center'>{index + 1}<Award fill={medalColor(position.rank)} strokeWidth={0} /></div>
                                                </td>
                                                <td>
                                                    <div className='flex flex-col my-3 mx-4 font-normal'>
                                                        <span className='font-semibold'>{position.name1} /<br/>
                                                            {position.name2}</span>
                                                        <span className=' text-textColor2 text-sm'>{position.teamName}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : card.podium.map((position: any, index) => {


                                        return (
                                            <tr key={index} className=''>
                                                <td className=''>
                                                    <div className='h-full flex flex-row gap-2 items-center justify-center font-semibold'>{index + 1}<Award fill={medalColor(position.rank)} strokeWidth={0} /></div>
                                                </td>
                                                <td>
                                                    <div className='flex flex-col my-3 mx-4 text-sm'>
                                                        <span className='font-semibold text-lg'>{position.name}</span>
                                                        <span className=''>{position.address}</span>
                                                        <span className='flex flex-row '>Age: {position.age}<Dot className='text-textColor2' /> Height: {position.height} cm</span>

                                                    </div>
                                                </td>
                                            </tr>

                                        )

                                    })

                            }
                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    )
}

export default StandingScoreCard