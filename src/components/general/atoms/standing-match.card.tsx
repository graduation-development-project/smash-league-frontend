import { AlignJustify, Dot } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const StandingMatchCard = () => {
    const [isCollapsible, setIsCollapsible] = useState<{ [key: number]: boolean }>({});

    const toggleCollapse = (index: number) => {
        setIsCollapsible(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const matches = [
        {
            round: "Final Round",
            cate: "Men Singles",
            match: [
                {
                    name: "John Doe",
                    avatar: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png",
                    score: "1",
                    address: "123 Main St, Anytown, USA",
                    age: 30,
                    height: 175,
                },
                {
                    name: "Jane Doe",
                    avatar: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-female-2.png",
                    score: "2",
                    address: "456 Oak Ave, Somewhere, Earth",
                    age: 28,
                    height: 168,
                },
            ],
        },
        {
            round: "Semi-Final Round",
            cate: "Women Singles",
            match: [
                {
                    name: "Alice Johnson",
                    avatar: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-female-3.png",
                    score: "3",
                    address: "789 Pine Rd, City, Country",
                    age: 25,
                    height: 165,
                },
                {
                    name: "Emma Watson",
                    avatar: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-female-4.png",
                    score: "0",
                    address: "987 Maple St, Townsville",
                    age: 32,
                    height: 170,
                },
            ],
        },
    ];

    return (
        <div className='flex flex-col h-max max-h-[550px] w-96 border rounded-xl shadow-lg'>
            {/* Header */}
            <div className='flex flex-col bg-gradient-orange text-white p-3 rounded-t-xl gap-2'>
                <h2 className='font-bold'>Featured Match</h2>
                <span className='text-md'>The Shuttlecock Master Championship</span>
            </div>

            {/* Match List */}
            <div className='h-full flex flex-col py-3 overflow-y-auto scrollbar-webkit-orange scrollbar-thin'>
                {matches.map((card, index) => (
                    <div key={index} className='flex flex-col px-3 py-1'>
                        <div className='h-fit flex flex-col px-2 gap-2 py-2 rounded-md border'>
                            {/* Round Header */}
                            <div className='w-full flex flex-row justify-between items-center'>
                                <div className='flex flex-col'>
                                    <b className='text-primaryColor'>{card.round}</b>
                                    <span className='text-sm'>{card.cate}</span>
                                </div>
                                <AlignJustify
                                    className="cursor-pointer"
                                    onClick={() => toggleCollapse(index)}
                                />
                            </div>

                            {/* Match Details */}
                            <div className={`transition-all duration-300 ${isCollapsible[index] ? "block" : "hidden"}`}>
                                {card.match.map((player, idx) => (
                                    <div key={idx} className='flex flex-row justify-between items-center mt-2'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-12 h-12 rounded-full overflow-hidden border'>
                                                <Image
                                                    className='object-cover w-full h-full'
                                                    src={player.avatar}
                                                    alt={`${player.name}'s avatar`}
                                                    width={48}
                                                    height={48}
                                                />
                                            </div>
                                            <div className='flex flex-col text-[12px]'>
                                                <b className='text-sm'>{player.name}</b>
                                                <span>{player.address}</span>
                                                <span className='flex items-center'>
                                                    Age: {player.age} <Dot /> Height: {player.height} cm
                                                </span>
                                            </div>
                                        </div>
                                        <span className='text-xl font-bold mr-2'>{player.score}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StandingMatchCard;