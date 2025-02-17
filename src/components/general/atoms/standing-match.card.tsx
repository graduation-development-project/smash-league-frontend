import { AlignJustify, Dot } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const StandingMatchCard = () => {


    const user = [
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
                    name: "John Doe",
                    avatar: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png",
                    score: "1",
                    address: "123 Main St, Anytown, USA",
                    age: 30,
                    height: 175,
                },
            ],
        },
        {
            round: "Semi-Final Round",
            cate: "Women Singles",
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
                    name: "John Doe",
                    avatar: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png",
                    score: "1",
                    address: "123 Main St, Anytown, USA",
                    age: 30,
                    height: 175,
                },
            ],
        },
        {
            round: "Quarter-Final Round",
            cate: "Mixed Doubles",
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
                    name: "John Doe",
                    avatar: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png",
                    score: "1",
                    address: "123 Main St, Anytown, USA",
                    age: 30,
                    height: 175,
                },
            ],
        },
        {
            round: "Elimination Round A-5",
            cate: "Women Doubles",
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
                    name: "John Doe",
                    avatar: "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png",
                    score: "1",
                    address: "123 Main St, Anytown, USA",
                    age: 30,
                    height: 175,
                },
            ],
        },

    ]


    // console.log(isCollapsible, "isCollapsible");




    return (
        <div className='flex flex-col h-max max-h-[550px] w-96 border rounded-xl'>
            <div className='flex flex-col bg-gradient-orange text-white p-3 rounded-t-xl gap-2'>
                <h2 className='font-bold'>Featured Match</h2>
                <span className='text-md'>The Shuttlecock Master Championship</span>
            </div>
            <div className='h-full flex flex-col py-3 overflow-y-scroll scrollbar-webkit-orange scrollbar-thin'>
                {user?.map((card, index) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [isCollapsible, setIsCollapsible] = useState(false);
                    return (
                        <div key={index} className='flex flex-col px-3 py-1'>
                            <div className='h-fit flex flex-col px-2 gap-2 py-1 rounded-md border '>
                                <div className='w-full flex flex-row gap-2 justify-between items-center'>
                                    <div className='flex flex-col align-center'>
                                        <b className='text-primaryColor'>{card.round}</b>
                                        <span className='text-sm'>{card.cate}</span>
                                    </div>
                                    <AlignJustify onClick={() => setIsCollapsible(!isCollapsible)} />
                                </div>
                                {
                                    card.match?.map((user, index) => {
                                        return (
                                            <div key={index} className={`h-fit w-full flex-row justify-between items-center ${isCollapsible ? "flex" : "hidden"}`}>
                                                <div className='h-fit flex flex-row justify-center gap-3 items-center'>
                                                    <div className='w-12 h-12 rounded-full'>
                                                        <Image
                                                            className='w-full h-full object-cover rounded-full border'
                                                            src={user.avatar}
                                                            alt="User Avatar"
                                                        />
                                                    </div>
                                                    <div className='h-fit flex flex-col justify-between text-[12px]'>
                                                        <b className='text-sm'>{user.name}</b>
                                                        <span>{user.address}</span>
                                                        <span className='h-fit flex flex-row itwems-center'>Age: {user.age}<Dot />Height: {user.height} cm</span>
                                                    </div>
                                                </div>
                                                <span className='text-xl mr-2'>{user.score}</span>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
                }
            </div>

        </div>
    )
}

export default StandingMatchCard