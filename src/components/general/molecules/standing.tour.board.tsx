import React from 'react'
import StandingCard from '../atoms/standing.card'

const StandingTourBoard = ({ handleHiddenBoard }: { handleHiddenBoard: (index: number) => void }) => {
  const listStandingCard = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className='flex flex-row gap-5 overflow-x-auto scrollbar-thin scrollbar-webkit'>
      {listStandingCard.map((_, index) => (
        <div 
          key={index} 
          className='flex flex-row gap-5 p-5 cursor-pointer' 
          onClick={() => handleHiddenBoard(index)}
        >
          <StandingCard />
        </div>
      ))}
    </div>
  );
};

export default StandingTourBoard;