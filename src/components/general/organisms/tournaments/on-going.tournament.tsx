import React from 'react'
import FeaturedTournamentMain from '../tournaments.main'
import TourListBoard from '../../molecules/tournaments/tour-list.board'
import { Search } from 'lucide-react'
import SearchTeamBar from '../../atoms/teams/search-teams-bar'
import CreateBanner from '../../molecules/create.banner'


const OnGoingTournament = () => {
    return (
        <div className='w-full h-max flex flex-col gap-10 justify-center items-center mt-20'>
            <div className='w-full h-max'>
                <CreateBanner />
            </div>

            <div className='flex flex-col justify-center items-center h-max w-full'>
                <SearchTeamBar />
            </div>
            <div className='flex flex-col justify-center items-center h-max w-full'>
                <FeaturedTournamentMain />
            </div>
            <div className='w-full h-max px-52 flex flex-col justify-center items-center'>
                <TourListBoard />
            </div>
        </div>
    )
}

export default OnGoingTournament