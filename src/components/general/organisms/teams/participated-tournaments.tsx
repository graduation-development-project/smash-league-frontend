import React from 'react'
import SearchTeamsParticipatedTournaments from '../../atoms/teams/search-teams-participated-tournaments'
import TeamsTournamentsCard from '../../atoms/teams/teams-tournaments-card'
import PaginationCard from '../../atoms/pagination/pagination-card'

const ParticipatedTournamentsOfTeams = () => {
  return (
    <div className="w-full h-full flex flex-col gap-8 items-center p-5">
    <SearchTeamsParticipatedTournaments />
    <div className="w-full h-full flex flex-col justify-center items-center gap-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="w-full h-full">
          <TeamsTournamentsCard />
        </div>
      ))}
    </div>

    <PaginationCard />
  </div>
  )
}

export default ParticipatedTournamentsOfTeams
