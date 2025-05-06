import React from 'react'
import StandingCard from '../../atoms/standing.card'

const StandingTourBoard = (
  {
    tourList,
    handleHiddenBoard
  }: {
    tourList: any[];
    handleHiddenBoard: (index: number) => void;
  }
) => {


  return (
    <div className='flex flex-row gap-5 overflow-x-auto scrollbar-thin scrollbar-webkit'>
      {tourList?.map((tour: any, index: number) => (
        <div
          key={index}
          className='flex flex-row gap-5 p-5 cursor-pointer'
          onClick={() => handleHiddenBoard(index)}
        >
          <StandingCard tour={tour} />
        </div>
      ))}
    </div>
  );
};

export default StandingTourBoard;