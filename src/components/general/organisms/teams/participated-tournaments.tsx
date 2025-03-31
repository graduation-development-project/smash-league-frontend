import React from 'react'
import SearchTeamsParticipatedTournaments from '../../atoms/teams/search-teams-participated-tournaments'
import TeamsTournamentsCard from '../../atoms/teams/teams-tournaments-card'
import PaginationCard from '../../atoms/pagination/pagination-card'

const ParticipatedTournamentsOfTeams = () => {
  return (
    <div className="w-full h-full flex flex-col gap-8 items-center py-5 px-8">
    <SearchTeamsParticipatedTournaments />
    <div className="w-full h-full flex flex-col justify-center items-center gap-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="w-full h-full">
          {/* <TeamsTournamentsCard /> */}
        </div>
      ))}
    </div>

    <PaginationCard total={12} currentPage={1} totalPerPage={6} onChange={() => {}}/>
  </div>
  )
}

export default ParticipatedTournamentsOfTeams
