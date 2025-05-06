
import { getStandingBoardTourEventAPI } from '@/services/home-page';
import { EVENT_ENUM } from '@/utils/enum';
import { AlignJustify, Award, Crown, Dot } from 'lucide-react'
import { List } from 'postcss/lib/list'
import React, { useEffect } from 'react'

const StandingScoreCard = ({
    eventId,
    card
}: {
    eventId: string;
    card: any;
}) => {

    const [scoreBoard, setScoreBoard] = React.useState<any>([]);

    const medalColor = (rank: string) => {
        return rank === "championship" ? "#FFD700" : rank === "runnerUp" ? "#C0C0C0" : rank === "thirdPlace" ? "#CD7F32" : "white"
    }

    const fetchGetStandingBoardTourEventAPI = async (id: string) => {
        const response = await getStandingBoardTourEventAPI(id);
        setScoreBoard(response?.data);
        // setTourList(tours);
    }

    useEffect(() => {
        fetchGetStandingBoardTourEventAPI(eventId);
    }, [])

    return (

        <div className='flex flex-col h-max w-96 border rounded-xl text-textColor'>
            <div >
                <div
                    className='flex flex-col bg-gradient-green text-white p-3 rounded-t-xl gap-2'
                    style={{ background: card?.tournamentEvent?.includes("DOUBLE") ? "linear-gradient(97deg, #2B927F 0%, #74BA74 80%)" : "linear-gradient(97deg, #FF8243 0%, #FFAE00 100%)" }}
                >
                    <h2 className='font-bold'>{EVENT_ENUM[card?.tournamentEvent as keyof typeof EVENT_ENUM]}</h2>
                    {/* <span className='text-md'>{card.title}</span> */}
                </div>
                <div className='h-[300px] px-5 overflow-auto scrollbar-webkit scrollbar-thin'>
                    <table className='table-auto w-full'>
                        <thead className='font-bold text-lg'>
                            <tr className=''>
                                <th className='py-2 px-4 text-center'>Pos.</th>
                                <th className='py-2 px-4 text-center'>{card?.championship?.partner ? "Team" : "Player"}</th>
                                {/* <th>Award</th> */}
                            </tr>
                        </thead>

                        {
                            card?.championship?.partner ?
                                (
                                    <tbody>
                                        <tr className='border-t border-gray-300'>
                                            <td className=''>
                                                <div className='h-full flex flex-row gap-2 items-center justify-center font-semibold'>
                                                    1<Award fill={medalColor("championship")} strokeWidth={0} />
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex flex-col my-3 mx-4 font-normal'>
                                                    <span className='font-semibold'>
                                                        {card?.championship?.user?.name} /<br />
                                                        {card?.championship?.partner?.name}
                                                    </span>
                                                    <span className=' text-textColor2 text-sm'>
                                                        { }
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr className='border-t border-gray-300'>
                                            <td className=''>
                                                <div className='h-full flex flex-row gap-2 items-center justify-center font-semibold'>
                                                    2 <Award fill={medalColor("runnerUp")} strokeWidth={0} />
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex flex-col my-3 mx-4 font-normal'>
                                                    <span className='font-semibold'>
                                                        {card?.runnerUp?.user?.name} /<br />
                                                        {card?.runnerUp?.partner?.name}
                                                    </span>
                                                    <span className=' text-textColor2 text-sm'>
                                                        { }
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className='border-t border-gray-300'>
                                            <td className=''>
                                                <div className='h-full flex flex-row gap-2 items-center justify-center font-semibold'>
                                                    3 <Award fill={medalColor("thirdPlace")} strokeWidth={0} />
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex flex-col my-3 mx-4 font-normal'>
                                                    <span className='font-semibold'>
                                                        {card?.thirdPlace?.user?.name} /<br />
                                                        {card?.thirdPlace?.partner?.name}
                                                    </span>
                                                    <span className=' text-textColor2 text-sm'>
                                                        { }
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                                // ["champiopnship","runnerUp","thirdPlace"].map((position: any, index: number) => {
                                //     return (
                                //         <tr key={index} className=''>
                                //             <td className=''>
                                //                 <div className='h-full flex flex-row gap-2 items-center justify-center'>
                                //                     {index + 1}<Award fill={medalColor(position)} strokeWidth={0} />
                                //                 </div>
                                //             </td>
                                //             <td>
                                //                 <div className='flex flex-col my-3 mx-4 font-normal'>
                                //                     <span className='font-semibold'>
                                //                         {position.name1} /<br />
                                //                         {position.name2}
                                //                     </span>
                                //                     <span className=' text-textColor2 text-sm'>
                                //                         {position.teamName}
                                //                     </span>
                                //                 </div>
                                //             </td>
                                //         </tr>
                                //     )
                                // })
                                :
                                (
                                    <tbody>
                                        <tr className='border-t border-gray-300'>
                                            <td className=''>
                                                <div
                                                    className='h-full flex flex-row gap-2 items-center justify-center font-semibold'
                                                >
                                                    1 <Award fill={medalColor("championship")} strokeWidth={0} />
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex flex-col my-3 mx-4 text-sm'>
                                                    <span className='font-semibold text-lg'>
                                                        {card?.championship?.user?.name}
                                                    </span>
                                                    {/* <span className=''>
                                                        {position.address}
                                                    </span> */}
                                                    <span className='flex flex-row '>
                                                        Age: {card?.championship?.user?.age || "N/A"}
                                                        <Dot className='text-textColor2' />
                                                        Height: {card?.championship?.user?.height || "N/A"} cm
                                                    </span>

                                                </div>
                                            </td>
                                        </tr>
                                        <tr className='border-t border-gray-300'>
                                            <td className=''>
                                                <div
                                                    className='h-full flex flex-row gap-2 items-center justify-center font-semibold'
                                                >
                                                    2 <Award fill={medalColor("runnerUp")} strokeWidth={0} />
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex flex-col my-3 mx-4 text-sm'>
                                                    <span className='font-semibold text-lg'>
                                                        {card?.runnerUp?.user?.name}
                                                    </span>
                                                    {/* <span className=''>
                                                        {position.address}
                                                    </span> */}
                                                    <span className='flex flex-row '>
                                                        Age: {card?.runnerUp?.user?.age || "N/A"}
                                                        <Dot className='text-textColor2' />
                                                        Height: {card?.runnerUp?.user?.height || "N/A"} cm
                                                    </span>

                                                </div>
                                            </td>
                                        </tr>
                                        <tr className='border-t border-gray-300'>
                                            <td className=''>
                                                <div
                                                    className='h-full flex flex-row gap-2 items-center justify-center font-semibold'
                                                >
                                                    3 <Award fill={medalColor("thirdPlace")} strokeWidth={0} />
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex flex-col my-3 mx-4 text-sm'>
                                                    <span className='font-semibold text-lg'>
                                                        {card?.thirdPlace?.user?.name}
                                                    </span>
                                                    {/* <span className=''>
                                                        {position.address}
                                                    </span> */}
                                                    <span className='flex flex-row '>
                                                        Age: {card?.thirdPlace?.user?.age || "N/A"}
                                                        <Dot className='text-textColor2' />
                                                        Height: {card?.thirdPlace?.user?.height || "N/A"} cm
                                                    </span>

                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                )
                            // card.podium.map((position: any, index: number) => {


                            //     return (
                            //         <tr key={index} className=''>
                            //             <td className=''>
                            //                 <div
                            //                     className='h-full flex flex-row gap-2 items-center justify-center font-semibold'
                            //                 >
                            //                     {index + 1}<Award fill={medalColor(position.rank)} strokeWidth={0} />
                            //                 </div>
                            //             </td>
                            //             <td>
                            //                 <div className='flex flex-col my-3 mx-4 text-sm'>
                            //                     <span className='font-semibold text-lg'>
                            //                         {position.name}
                            //                     </span>
                            //                     <span className=''>
                            //                         {position.address}
                            //                     </span>
                            //                     <span className='flex flex-row '>
                            //                         Age: {position.age}<Dot className='text-textColor2' /> Height: {position.height} cm
                            //                     </span>

                            //                 </div>
                            //             </td>
                            //         </tr>

                            //     )

                            // })

                        }


                    </table>
                </div>

            </div>
        </div>
    )
}

export default StandingScoreCard