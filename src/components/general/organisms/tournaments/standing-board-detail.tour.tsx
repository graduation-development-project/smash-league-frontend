/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from 'react';

// import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Card, Input } from 'antd';
import { getStandingBoardTourEventAPI } from '@/services/home-page';
import { format } from 'path';
import { formatYearOfBirth } from '@/utils/format';
import { useRouter } from 'next/navigation';
import { useProfileContext } from '@/context/profile.context';
import { HiMiniTrophy } from 'react-icons/hi2';
import { LuMedal } from 'react-icons/lu';
import EmptyCard from '../../molecules/empty/empty.card';
import { calculateAge } from '@/utils/calculateAge';

// type RankingList1 = {
//   championship: RankingItem | null;
//   runnerUp?: RankingItem | null;
//   thirdPlace?: RankingItem[] | null;
// }
type WinnerInfo = {
  id: string;
  name: string;
  gender: string;
  avatarURL?: string | null;
  height?: number | null;
  dateOfBirth?: string | null;
}
type Winner = {
  user: WinnerInfo;
  partner: WinnerInfo | null;
}
type AwardListItem = {
  prizeName: string;
  winner: Winner | null;
}
// type OtherAwardItem = {
//   prizeName: string;
//   winner: Winner | null;
// }

const StandingBoardDetailTour = ({
  eventId,
  mainColor,
}: {
  eventId: string;
  mainColor: string;
}) => {
  const router = useRouter();
  const { setAthleteId } = useProfileContext();
  const textColor = 'text-white';
  const eventName = eventId.split('-')[0];
  const eventUUID = eventId.slice(eventId.indexOf('-') + 1);

  const [standingList, setStandingList] = useState<{ user: any; partner?: any }[]>(
    [],
  );
  const [rankingAwards, setRankingAwards] = useState<AwardListItem[]>([]);
  const [otherAwards, setOtherAwards] = useState<AwardListItem[]>([]);

  const fetchStandingBoardTourEvent = async () => {
    try {
      const res = await getStandingBoardTourEventAPI(eventUUID);
      console.log("sdfkdjhdjkhjksfhsd", res);

      if (res.statusCode === 200 || res.statusCode === 201) {
        setStandingList(res?.data);
        console.log('standingList', res?.data);

        let rankingAwardsData = res?.data?.prizes ? Object.entries(res?.data?.prizes).map(([prize, value]: any) => ({ prizeName: prize, winner: value })) : [];
        if (rankingAwardsData.length > 0) {
          console.log('rankingAwardsData123', rankingAwardsData);
          const data = rankingAwardsData.filter(({ prizeName, winner }: any) => Array.isArray(winner))
          rankingAwardsData.pop();
          rankingAwardsData = data && [...rankingAwardsData, ...data[0]?.winner?.map((item: Winner) => ({ prizeName: "thirdPlace", winner: item }))];
        }
        console.log('rankingAwardsDatahahaha', rankingAwardsData);


        setRankingAwards(rankingAwardsData);
        setOtherAwards(res?.data?.otherPrizes);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStandingBoardTourEvent();
  }, [eventId]);

  const userProfile = (userId: string) => {
    setAthleteId(userId);
    router.push(`/profile/athlete/${userId}`);
  };

  console.log('rankingAwards', rankingAwards);
  console.log('otherAwardsascassac', otherAwards);

  // const rankingArray = [
  //   { rank: 1, label: 'championship' },
  //   { rank: 2, label: 'runnerUp' },
  //   { rank: 3, label: 'thirdPlace' },
  // ]
  //   .map(({ rank, label }) => {
  //     const item = raw?.[label];
  //     if (!item || !item.user) return null;
  //     return {
  //       id: item.user.id,
  //       name: item.user.name,
  //       avatar: item.user.avatarURL || '',
  //       age: calculateAge(item.user.dateOfBirth),
  //       rank,
  //       partner: item.partner
  //         ? {
  //           id: item.partner.id,
  //           name: item.partner.name,
  //           avatar: item.partner.avatarURL || '',
  //           age: calculateAge(item.partner.dateOfBirth),
  //           rank,
  //         }
  //         : null,
  //     };
  //   })
  //   .filter(Boolean);

  const tableRowSingle = (awardList: AwardListItem[]) => {
    return (
      <table className="table-auto w-full rounded-lg shadow-md">
        <thead
          className={`font-bold text-xl rounded-lg ${textColor}`}
          style={{ background: mainColor }}
        >
          <tr className="rounded-lg py-2">
            <th className="rounded-tl-md py-2">Award</th>
            <th className="py-2">Avatar</th>
            <th className="py-2">Name</th>
            <th className="rounded-tr-md">Age</th>
            {/* <th>Height</th> */}
            {/* <th>Hand</th> */}
          </tr>
        </thead>
        <tbody>
          {awardList?.map((award: AwardListItem, index: number) => {
            return (
              <tr
                key={index + 1}
                className="h-max pt-10 text-lg font-medium text-center"
              >
                <td className="h-32 flex justify-center items-center gap-1 font-bold">
                  {awardList[0]?.prizeName === 'championship' ? (
                    <div className="flex items-center gap-1">
                      {index + 1} {
                        index + 1 === 1 ? (
                          <HiMiniTrophy className="text-yellow-500" />
                        ) : index + 1 === 2 ? (
                          <LuMedal className="text-[#bdc3c7] mt-1" />
                        ) : (
                          (
                            <LuMedal className="text-[#cd7f36] mt-1" />
                          )
                        )
                      }
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <HiMiniTrophy className="text-yellow-500" /> {award.prizeName}
                    </div>
                  )
                  }

                </td>
                <td className="w-32 h-32 pt-5 pb-3">
                  <img
                    className="w-30 h-30 object-contain rounded-md"
                    src={
                      award.winner?.user?.avatarURL
                        ? award.winner.user?.avatarURL
                        : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                    }
                    alt=""
                  />
                </td>
                <td
                  className="text-start pl-5 cursor-pointer hover:underline"
                  onClick={() => award.winner?.user?.id && userProfile(award.winner?.user?.id)}
                >
                  {award.winner?.user?.name || '-'}
                </td>
                <td>{formatYearOfBirth(award.winner?.user?.dateOfBirth) || '-'}</td>
                {/* <td>{formatHeight(player?.user?.height)}</td> */}
                {/* <td>{player?.user?.hands || 'N/A'}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  const tableRowDouble = (awardList: AwardListItem[]) => {
    return (
      <table className="table-auto w-full rounded-lg shadow-md">
        <thead
          className={`font-bold py-3 text-xl rounded-lg ${textColor}`}
          style={{ background: mainColor }}
        >
          <tr className="rounded-lg py-3">
            <th className="rounded-tl-md py-2 px-2">No.</th>
            <th className="py-2 px-2">Player 1</th>
            <th className="py-2 px-2">Name</th>
            <th className="py-2 px-2">Age</th>
            <th className="py-2 px-2">Player 2</th>
            <th className="py-2 px-2">Name</th>
            <th className="rounded-tr-md py-2 px-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {awardList?.map((award: AwardListItem, index: number) => {
            return (
              <>
                <tr
                  key={award.winner?.user?.id}
                  className="h-max pt-10 text-lg font-medium text-center"
                >
                  <td className="h-32 flex justify-center items-center gap-1 font-bold">
                    {awardList[0]?.prizeName === 'championship' ? (
                      <div className="flex items-center gap-1">
                        {index + 1} {
                          index + 1 === 1 ? (
                            <HiMiniTrophy className="text-yellow-500" />
                          ) : index + 1 === 2 ? (
                            <LuMedal className="text-[#bdc3c7] mt-1" />
                          ) : (
                            (
                              <LuMedal className="text-[#cd7f36] mt-1" />
                            )
                          )
                        }
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <HiMiniTrophy className="text-yellow-500" /> {award.prizeName}
                      </div>
                    )
                    }
                  </td>
                  <td className="w-32 h-32 pt-5 rounded-md">
                    <img
                      className="w-32 h-32 object-contain rounded-md"
                      src={
                        award.winner?.user?.avatarURL
                          ? award.winner.user?.avatarURL
                          : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                      }
                      alt=""
                    />
                  </td>
                  <td
                    className=" text-start pl-5 cursor-pointer hover:underline"
                    onClick={() => award.winner?.user?.id && userProfile(award.winner?.user?.id)}
                  >
                    {award.winner?.user?.name || '-'}
                  </td>
                  <td>{formatYearOfBirth(award.winner?.user?.dateOfBirth)}</td>
                  <td className="w-32 h-32 pt-5">
                    <img
                      className="w-32 h-32 object-contain rounded-md"
                      src={
                        award.winner?.partner?.avatarURL
                          ? award.winner?.partner?.avatarURL
                          : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                      }
                      alt=""
                    />
                  </td>
                  <td
                    className=" text-start pl-5 cursor-pointer hover:underline"
                    onClick={() => award.winner?.partner?.id && userProfile(award.winner?.partner?.id)}
                  >
                    {award.winner?.partner?.name || '-'}
                  </td>
                  <td>{formatYearOfBirth(award.winner?.partner?.dateOfBirth) || '-'}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className="w-full h-full flex flex-col gap-5">
        <h3 className="text-2xl font-bold ">
          Ranking Awards
          <div
            className={`w-24 h-1  rounded-full`}
            style={{ backgroundColor: `${mainColor}` }}
          />
        </h3>
        {rankingAwards?.length > 0 && rankingAwards ? (
          rankingAwards[0]?.winner?.partner ? (
            tableRowDouble(rankingAwards)
          ) : (
            tableRowSingle(rankingAwards)
          )
        ) : (
          <EmptyCard
            description="No winners yet"
            image="https://static-00.iconduck.com/assets.00/trophy-icon-2048x2048-qzkx1nrp.png"
          />
        )}
      </div>

      <div className="w-full h-full flex flex-col gap-5">
        <h3 className="text-2xl font-bold ">
          Other Awards
          <div
            className={`w-24 h-1  rounded-full`}
            style={{ backgroundColor: `${mainColor}` }}
          />
        </h3>
        {otherAwards?.length > 0 && otherAwards[0]?.winner ? (
          otherAwards[0]?.winner?.partner ? (
            tableRowDouble(otherAwards)
          ) : (
            tableRowSingle(otherAwards)
          )
        ) : (
          <EmptyCard
            description="No winners yet"
            image="https://static-00.iconduck.com/assets.00/trophy-icon-2048x2048-qzkx1nrp.png"
          />
        )}
      </div>
    </div>
  );
};

export default StandingBoardDetailTour;
