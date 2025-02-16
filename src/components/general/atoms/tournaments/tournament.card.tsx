"use client";
import {  CalendarClock, CalendarX, ClockAlert, MapPin, Users } from 'lucide-react'
import React from 'react'

const TournamentCard = () => {
    return (
        <div className='w-[350px] h-max flex flex-col gap-2 rounded-xl p-2 border '>
            <div className='w-full h-[200px]'>
                <img
                    className='w-full h-full object-cover rounded-lg'
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Badminton_at_the_2012_Summer_Olympics_9133.jpg/1200px-Badminton_at_the_2012_Summer_Olympics_9133.jpg"
                    alt=""
                />
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-base font-bold text-textColor'>BWF World Badminton Championships</h3>
                <div className=' flex w-max py-1 px-2 bg-gradient-orange bg-opacity-20 rounded-full text-center items-center'>
                    <span className='text-xs text-white font-semibold '>Price pool: 1.500.000VND</span>
                </div>
                <ul className='flex flex-col gap-1'>
                    <li className='flex flex-row items-center gap-2'><MapPin size={16} color='#ff8243'/> FPT University, Ho Chi Minh</li>
                    <li className='flex flex-row items-center gap-2'><CalendarClock size={16} color='#ff8243'/> 22 - 24 December, 2024</li>
                    <li className='flex flex-row items-center gap-2'><Users size={16} color='#ff8243'/> Up to 30 participants</li>
                    <li className='flex flex-row items-center gap-2 font-semibold text-primaryColor'><CalendarX size={16} color='#ff8243' strokeWidth={2}/> Expired on 21 December, 2024</li>
                </ul>
                <span className=' flex flex-row items-center gap-2 text-base text-red-600 font-bold'><ClockAlert size={20} strokeWidth={3}/> 3 days left</span>
                <button className='w-full py-2 bg-gradient-orange rounded-lg text-white font-bold hover:bg-gradient-orange'>Register now</button>
            </div>
        </div>
    )
}

export default TournamentCard