import React, { useEffect } from 'react'

import StandingMatchCard from '../../atoms/standing-match.card';
import StandingScoreCard from '../../atoms/standing-score.card';
import { getStandingBoardTourEventAPI } from '@/services/home-page';

const StandingScoreBoard = (
  {
    isVisible,
    tourEvents,
  }: {
    isVisible: boolean;
    tourEvents: any[];
  }) => {
  if (!isVisible) return null;

  const cateCard = [
    {
      id: 1,
      cate: "Male Standing",
      title: "The Shuttlecock Master Championship",
      podium: [
        {
          rank: 1,
          name: "H.D Trung Nguyn",
          address: "Dist. 12, Ho Chi Minh",
          age: 30,
          height: 150
        },
        {
          rank: 2,
          name: "P.Vinh Son",
          address: "Dist. 12, Ho Chi Minh",
          age: 30,
          height: 150
        },
        {
          rank: 3,
          name: "H.D Trung Nguyn",
          address: "Dist. 12, Ho Chi Minh",
          age: 30,
          height: 150
        },
        {
          rank: 4,
          name: "P.Vinh Son",
          address: "Dist. 12, Ho Chi Minh",
          age: 30,
          height: 150
        },
        {
          rank: 5,
          name: "P.Vinh Son",
          address: "Dist. 12, Ho Chi Minh",
          age: 30,
          height: 150
        },
      ]
    },
    {
      id: 2,
      cate: "Female Standing",
      title: "The Shuttlecock Master Championship",
      podium: [
        {
          rank: 1,
          name: "H.D Trung Nguyn",
          address: "Dist. 12, Ho Chi Minh",
          age: 30,
          height: 150
        },
        {
          rank: 2,
          name: "P.Vinh Son",
          address: "Dist. 12, Ho Chi Minh",
          age: 30,
          height: 150
        },
        {
          rank: 3,
          name: "H.D Trung Nguyn",
          address: "Dist. 12, Ho Chi Minh",
          age: 30,
          height: 150
        },
        {
          rank: 4,
          name: "P.Vinh Son",
          address: "Dist. 12, Ho Chi Minh",
          age: 30,
          height: 150
        },
        {
          rank: 5,
          name: "P.Vinh Son",
          address: "Dist. 12, Ho Chi Minh",
          age: 30,
          height: 150
        },
      ]
    },
    {
      id: 3,
      cate: "Team Standing",
      title: "The Shuttlecock Master Championship",
      podium: [
        {
          rank: 1,
          name1: "H.D Trung Nguyn",
          name2: "P.Vinh Son",
          teamName: "FPT University"
        },
        {
          rank: 2,
          name1: "H.D Trung Nguyn",
          name2: "H.L.Thuy Duong",
          teamName: "Friendzone forever"
        },
        {
          rank: 3,
          name1: "L.Thanh An",
          name2: "T.H.Khanh.Linh",
          teamName: "Gud Siblings"
        },
        {
          rank: 4,
          name1: "Baobibo",
          name2: "SocXinhXeo",
          teamName: "Soc's League"
        },
        {
          rank: 5,
          name1: "V.N.Trung Son",
          name2: "T.Anh Minh",
          teamName: "Little Luv"
        },
      ]
    },
    {
      id: 4,
      cate: "Team Standing",
      title: "The Shuttlecock Master Championship",
      podium: [
        {
          rank: 1,
          name1: "H.D Trung Nguyn",
          name2: "P.Vinh Son",
          teamName: "FPT University"
        },
        {
          rank: 2,
          name1: "H.D Trung Nguyn",
          name2: "H.L.Thuy Duong",
          teamName: "Friendzone forever"
        },
        {
          rank: 3,
          name1: "L.Thanh An",
          name2: "T.H.Khanh.Linh",
          teamName: "Gud Siblings"
        },
        {
          rank: 4,
          name1: "Baobibo",
          name2: "SocXinhXeo",
          teamName: "Soc's League"
        },
        {
          rank: 5,
          name1: "V.N.Trung Son",
          name2: "T.Anh Minh",
          teamName: "Little Luv"
        },
      ]
    },
    {
      id: 5,
      cate: "Team Standing",
      title: "The Shuttlecock Master Championship",
      podium: [
        {
          rank: 1,
          name1: "H.D Trung Nguyn",
          name2: "P.Vinh Son",
          teamName: "FPT University"
        },
        {
          rank: 2,
          name1: "H.D Trung Nguyn",
          name2: "H.L.Thuy Duong",
          teamName: "Friendzone forever"
        },
        {
          rank: 3,
          name1: "L.Thanh An",
          name2: "T.H.Khanh.Linh",
          teamName: "Gud Siblings"
        },
        {
          rank: 4,
          name1: "Baobibo",
          name2: "SocXinhXeo",
          teamName: "Soc's League"
        },
        {
          rank: 5,
          name1: "V.N.Trung Son",
          name2: "T.Anh Minh",
          teamName: "Little Luv"
        },
      ]
    },
    {
      id: 6,
      cate: "Team Standing",
      title: "The Shuttlecock Master Championship",
      podium: [
        {
          rank: 1,
          name1: "H.D Trung Nguyn",
          name2: "P.Vinh Son",
          teamName: "FPT University"
        },
        {
          rank: 2,
          name1: "H.D Trung Nguyn",
          name2: "H.L.Thuy Duong",
          teamName: "Friendzone forever"
        },
        {
          rank: 3,
          name1: "L.Thanh An",
          name2: "T.H.Khanh.Linh",
          teamName: "Gud Siblings"
        },
        {
          rank: 4,
          name1: "Baobibo",
          name2: "SocXinhXeo",
          teamName: "Soc's League"
        },
        {
          rank: 5,
          name1: "V.N.Trung Son",
          name2: "T.Anh Minh",
          teamName: "Little Luv"
        },
      ]
    },

  ]
  return (
    <div className='w-full h-max p-5 flex flex-row gap-5 overflow-x-auto scrollbar-webkit scrollbar-thin '>
      {/* <div>
        <StandingMatchCard />
      </div> */}

      {
        tourEvents?.map((card: any, index) => {
          return (
            <div key={index} className='flex mb-2'>
              <StandingScoreCard eventId={card.id} card={card} />
            </div>
          )
        })
      }
    </div>
  )
}

export default StandingScoreBoard