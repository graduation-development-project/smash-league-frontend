import React, { useEffect, useState } from 'react'
import StandingTourBoard from '../molecules/standing-board/standing.tour.board'
import StandingScoreBoard from '../molecules/standing-board/standing-score.board'
import { getStandingBoardTourAPI, getStandingBoardTourEventAPI } from '@/services/home-page';

const StandingBoardMain = () => {
  const [hiddenBoard, setHiddenBoard] = useState(true);
  const [curIndex, setCurIndex] = useState<number>(0);
  const [tourList, setTourList] = useState<any>([]);

  const handleToggleBoard = (index: number) => {
    console.log(index, hiddenBoard);

    if (curIndex === index) {
      setHiddenBoard(prev => !prev);
    } else {
      setHiddenBoard(false);
      setCurIndex(index);
    }
  };

  const fetchStandingBoard = async () => {
    const response = await getStandingBoardTourAPI();
    const tours = [...response?.data, ...response?.data, ...response?.data];
    console.log('tours', tours);
    setTourList(tours);
  }

  useEffect(() => {
    fetchStandingBoard();
  }, [])


  return (
    <div className='w-full h-max flex flex-col gap-2 bg-white shadow-shadowComp py-6 px-28'>
      <div className='flex flex-col'>
        <h1 className='text-[32px] font-bold text-textColor'>
          <span className='text-thirdColor'>Standings</span> Board
        </h1>
        <span className='text-textColor2'>
          See the latest player rankings from every tournament
        </span>
      </div>
      <div>
        <StandingTourBoard
          tourList={tourList}
          handleHiddenBoard={handleToggleBoard}
        />
      </div>
      <div>
        <StandingScoreBoard
          tourEvents={tourList[curIndex]?.tournamentEvents}
          // eventName={tourList[curIndex]?.name}
          isVisible={!hiddenBoard}
        />
      </div>
    </div>
  );
};

export default StandingBoardMain;
