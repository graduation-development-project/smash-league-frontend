"use client"
import { Button } from '@/components/ui/button'
import { FaLocationDot, FaRegCalendar } from "react-icons/fa6";
import { FaClock, FaUserCircle, FaUsers } from "react-icons/fa";
import { HiMiniTrophy } from "react-icons/hi2";
import React from 'react'
import { formatDate, formatDateTime, formatOccurDate } from '@/utils/format';

const InfoDetailsTour = ({tour} : any) => {
    const styleCard = 'w-full flex py-5 px-8 border rounded-md'
    const color = tour?.mainColor || "#FF8243";
    const bgColor = `bg-[${tour?.mainColor}]` || "bg-[#FF8243]";
    console.log(bgColor);
    
    const titleCard = (title: string) => {
        return (
            <h3 className='text-2xl font-bold '>
                {title}
                <div className={`w-24 h-1 ${bgColor} rounded-full`} />
            </h3>
        )
    }

    return (
        <div className='w-full h-max flex flex-col gap-5 p-3'>
            <div className={`${styleCard} justify-between items-center text-2xl ${bgColor} text-white`}>
                <h3 className='font-bold '>{tour?.tournamentSerie?.tournamentSerieName}</h3>
                <Button>View series</Button>
            </div>
            <div className={`${styleCard} flex-col gap-4 text-base `}>
                {titleCard('Basic Info')}

                <div className='flex gap-5'>
                    <ul className='flex flex-col gap-2 font-semibold'>
                        <li className='flex gap-2 items-center'><FaLocationDot color={`${color}`} size={18} />Location</li>
                        <li className='flex gap-2 items-center'><FaRegCalendar color={`${color}`} size={18} />Registration Date</li>
                        <li className='flex gap-2 items-center'><FaRegCalendar color={`${color}`} size={18} />Occur Date</li>
                        <li className='flex gap-2 items-center'><FaClock color={`${color}`} size={18} />Draw Date</li>
                        
                        <li className='flex gap-2 items-center'><FaUserCircle color={`${color}`} size={18} />Host</li>
                        <li className='flex gap-2 items-center'><FaUsers color={`${color}`} size={18} />Co-orgainzers</li>
                        <li className='flex gap-2 items-center'><FaClock color={`${color}`} size={18} />Date left</li>

                    </ul>
                    <ul className='flex flex-col gap-2'>
                        <li>{tour?.location}</li>
                        <li>{formatOccurDate(tour?.registrationOpeningDate, tour?.registrationClosingDate)}</li>
                        <li>{formatOccurDate(tour?.startDate, tour?.endDate)}</li>
                        <li>{formatDateTime(tour?.drawDate)}</li>
                        <li>{tour?.organizer?.name}</li>
                        <li>{tour?.organizers || "None"}</li>
                        <li className='text-[red] font-semibold'>{tour?.expiredTimeLeft}</li>
                    </ul>
                </div>
                <div className='w-max flex py-2 px-8 gap-2 items-center bg-gradient-orange rounded-full text-white font-bold '><HiMiniTrophy color="#f3c900" size={25} />Prize Pool : 1.500.000VND</div>
            </div>
            <div className={`${styleCard} flex-col gap-4 text-base `}>
                {titleCard('Introduction')}
                <p>
                    <b>🏸 Welcome to the 2025 Summer Open Badminton Tournament!</b><br />
                    🏸 Experience the Thrill of Summer Badminton! ☀️
                    <br />
                    Get ready for an exciting and competitive badminton tournament this summer!
                    <br />
                    The 2025 Summer Open invites players of all skill levels to showcase their talent, compete with top athletes, and enjoy the electrifying atmosphere of one of the most anticipated badminton events of the year.
                </p>
            </div>
            <div className={`${styleCard} flex-col gap-4 text-base `}>
                {titleCard('Description')}
                <p>
                    1. Scoring System
                    A match is played best of three games to 21 points.
                    A player/team scores a point when they win a rally.
                    If the score reaches 20-20, a player must lead by 2 points to win.
                    If the score reaches 29-29, the first to 30 points wins the game.
                    <br />
                    2. Serving Rules
                    The shuttle must be hit below the server’s waist.
                    The serve must be diagonal to the opponent’s service court.
                    Players switch service courts after every point won while serving.
                    In doubles, only one player serves per turn until the opposing team wins a rally.
                    <br />
                    3. Faults (Errors)
                    A player commits a fault if:
                    The shuttle lands outside the court boundaries.
                    The shuttle passes under the net.
                    The shuttle touches the ceiling or walls.
                    The player touches the net with their racket or body.
                    The player hits the shuttle twice in one stroke.
                    <br />
                    4. Change of Ends
                    Players switch sides:

                    After the first game.
                    After the second game, if a third game is needed.
                    In the third game, when the leading player/team reaches 11 points.
                    <br />
                    5. Let (Rally Replay)
                    A rally is replayed (let) if:

                    The shuttle gets stuck on the net after a serve.
                    Both players are unsure whether the shuttle landed in or out.
                    A player is distracted by an unexpected disturbance.
                </p>

            </div>

        </div>
    )
}

export default InfoDetailsTour