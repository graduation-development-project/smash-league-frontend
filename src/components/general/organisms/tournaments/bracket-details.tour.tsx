"use client"
import SingleTeamEliminationBracket from '@/bracket-single/single-team-elim-bracket';
import TeamMatch from '@/components/team-match';
import { Button } from '@/components/ui/button';
import { teamBrackets } from '@/mock-data/simple-data';
import React, { useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll';

const BracketDetailsTour = () => {
    const ref = useRef<HTMLDivElement | null>(null); // Ensure it can be null initially
    const { events } = useDraggable(ref as React.MutableRefObject<HTMLElement>)
    const color = '#60a5fa';
    const bgColor = `bg-[${color}]`;
    const borderColor = `border-[${color}]`;
    return (
        <div className='w-full h-max p-5'>
            <div className='w-full h-max min-h-56 flex flex-col gap-8'>
                <h3 className='w-max text-4xl font-extrabold '>
                    Battle&apos;s Bracket
                    <div className={`w-1/2 h-1 rounded-full ${bgColor} mt-1`}/>
                </h3>
                <div className='w-full flex flex-row gap-5'>
                    <Button >Age 10-20</Button>
                    <Button >Age 21-35</Button>
                    <Button >Age 36-50</Button>
                </div>

                <div className={`w-1/2 flex gap-10 text-base text-white p-5 bg-[#2c2c2c] rounded-r-lg border-b-4 border-[#60a5fa] `}>
                    <th className='text-start flex flex-col gap-3'>
                        <li>Players:</li>
                        <li>Format:</li>
                        <li>Game:</li>
                        <li>Start Time:</li>
                    </th>

                    <td className='text-start flex flex-col gap-3'>
                        <li>20</li>
                        <li>Single Elimination</li>
                        <li>Knockout</li>
                        <li>March 2rd, 2025 at 2:30 PM</li>
                    </td>
                </div>

                <div className='w-[1200px] h-[800px]  bg-[#e2e2e2] rounded-lg overflow-x-auto overflow-y-auto cursor-grab' {...events} ref={ref}>
                    {/* <div className='w-[5000px] h-[3000px] bg-red-600'/> */}
                    <SingleTeamEliminationBracket
                        matches={teamBrackets}
                        matchComponent={TeamMatch}
                    />
                </div>
            </div>
        </div>
    )
}

export default BracketDetailsTour;