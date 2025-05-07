import React, { useEffect, useMemo, useState } from "react"

// import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Card, Input } from "antd"
import { getStandingBoardTourEventAPI } from "@/services/home-page"
import { format } from "path"
import { formatYearOfBirth } from "@/utils/format"
import { useRouter } from "next/navigation"
import { useProfileContext } from "@/context/profile.context"
import { HiMiniTrophy } from "react-icons/hi2";
import { LuMedal } from "react-icons/lu";
import EmptyCard from "../../molecules/empty/empty.card"


type RankingItem = {
  id: string
  avatar?: string
  name: string,
  dateOfBirth?: string
  rank: number
  // totalPoints: number
  // totalWins: number
  // totalLosses: number
  // rankChange?: number
}

const StandingBoardDetailTour = ({
  eventId,
  mainColor,
}: {
  eventId: string;
  mainColor: string;
}) => {
  const router = useRouter();
  const { setAthleteId } = useProfileContext();
  const [raw, setRaw] = useState<any>(null);
  const textColor = 'text-white';
  const eventName = eventId.split('-')[0];
  const eventUUID = eventId.slice(eventId.indexOf('-') + 1);

  const [playerList, setPlayerList] = useState<{ user: any; partner?: any }[]>(
    [],
  );

  const fetchParticipantList = async () => {
    try {
      const res = await getStandingBoardTourEventAPI(eventUUID);
      if (res.statusCode === 200 || res.statusCode === 201) {
        setRaw(res?.data);
        setPlayerList(res?.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchParticipantList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const userProfile = (userId: string) => {
    setAthleteId(userId);
    router.push(`/profile/athlete/${userId}`);
  };

  const rankingArray = [
    { rank: 1, label: "championship" },
    { rank: 2, label: "runnerUp" },
    { rank: 3, label: "thirdPlace" },
  ]
    .map(({ rank, label }) => {
      const item = raw?.[label];
      if (!item || !item.user) return null;
      return {
        id: item.user.id,
        name: item.user.name,
        avatar: item.user.avatarURL || "",
        age: formatYearOfBirth(item.user.dateOfBirth),
        rank,
        partner: item.partner
          ? {
            id: item.partner.id,
            name: item.partner.name,
            avatar: item.partner.avatarURL || "",
            age: formatYearOfBirth(item.partner.dateOfBirth),
            rank,
          }
          : null,
      };
    }).filter(Boolean)

  console.log("rankingArray", rankingArray);


  const tableRowSingle = () => {
    return (
      <table className="table-auto w-full rounded-lg shadow-md">
        <thead
          className={`font-bold text-xl rounded-lg ${textColor}`}
          style={{ background: mainColor }}
        >
          <tr className="rounded-lg py-2">
            <th className='rounded-tl-md py-2'>No.</th>
            <th className='py-2'>Avatar</th>
            <th className='py-2'>Name</th>
            <th className='rounded-tr-md'>Age</th>
            {/* <th>Height</th> */}
            {/* <th>Hand</th> */}
          </tr>
        </thead>
        <tbody>
          {rankingArray?.map((player: any, index: number) => {
            return (
              <tr
                key={index + 1}
                className="h-max pt-10 text-lg font-medium text-center"
              >
                <td className="h-32 flex justify-center items-center gap-1 font-bold">
                  {
                    index + 1 === 1 ?
                      <div className="flex items-center gap-1">
                        1 <HiMiniTrophy className="text-yellow-500" />
                      </div>
                      : (index + 1) === 2 ?
                        <div className="flex items-center gap-1">
                          2 <LuMedal className="text-[#bdc3c7] mt-1" />
                        </div> :
                        <div className="flex items-center gap-1">
                          3 <LuMedal className="text-[#cd7f36] mt-1" />
                        </div>
                  }
                  {/* {index + 1} <HiMiniTrophy className="text-yellow-500" /> */}
                </td>
                <td className="w-32 h-32 pt-5 pb-3">
                  <img
                    className="w-30 h-30 object-contain rounded-md"
                    src={
                      player?.avatar
                        ? player?.user?.avatarUrl
                        : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                    }
                    alt=""
                  />
                </td>
                <td
                  className="text-start pl-5 cursor-pointer hover:underline"
                  onClick={() => userProfile(player?.id)}
                >
                  {player?.name}
                </td>
                <td>{player?.age || "-"}</td>
                {/* <td>{formatHeight(player?.user?.height)}</td> */}
                {/* <td>{player?.user?.hands || 'N/A'}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  const tableRowDouble = () => {
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
          {playerList?.map((player: any, index: number) => {
            return (
              <>
                <tr
                  key={player?.user?.id}
                  className="h-max pt-10 text-lg font-medium text-center"
                >
                  <td className="h-32 flex justify-center items-center gap-1 font-bold">
                    {
                      index + 1 === 1 ?
                        <div className="flex items-center gap-1">
                          1 <HiMiniTrophy className="text-yellow-500" />
                        </div>
                        : (index + 1) === 2 ?
                          <div className="flex items-center gap-1">
                            2 <LuMedal className="text-[#bdc3c7] mt-1" />
                          </div> :
                          <div className="flex items-center gap-1">
                            3 <LuMedal className="text-[#cd7f36] mt-1" />
                          </div>
                    }
                    {/* {index + 1} <HiMiniTrophy className="text-yellow-500" /> */}
                  </td>
                  <td className="w-32 h-32 pt-5 rounded-md">
                    <img
                      className="w-32 h-32 object-contain rounded-md"
                      src={
                        player?.avatar
                          ? player?.avatar
                          : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                      }
                      alt=""
                    />
                  </td>
                  <td
                    className=" text-start pl-5 cursor-pointer hover:underline"
                    onClick={() => userProfile(player?.id)}
                  >
                    {player?.user?.name}
                  </td>
                  <td>{formatYearOfBirth(player?.dateOfBirth)}</td>
                  <td className="w-32 h-32 pt-5">
                    <img
                      className="w-32 h-32 object-contain rounded-md"
                      src={
                        player?.partner?.avatar
                          ? player?.partner?.avatar
                          : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                      }
                      alt=""
                    />
                  </td>
                  <td
                    className=" text-start pl-5 cursor-pointer hover:underline"
                    onClick={() => userProfile(player?.partner?.id)}
                  >
                    {player?.partner?.name}
                  </td>
                  <td>{formatYearOfBirth(player?.partner?.dateOfBirth)}</td>
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
      <div className="w-full h-full">
        {rankingArray?.length > 0
          ? rankingArray[0]?.partner
            ? tableRowDouble()
            : tableRowSingle()
          : (
            <EmptyCard
              description="No players yet"
              image="https://static-00.iconduck.com/assets.00/trophy-icon-2048x2048-qzkx1nrp.png"
            />
          )}
      </div>
    </div>
  );
};

export default StandingBoardDetailTour;