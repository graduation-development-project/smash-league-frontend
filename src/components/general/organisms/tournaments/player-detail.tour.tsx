/* eslint-disable @next/next/no-img-element */
import { useProfileContext } from '@/context/profile.context';
import { getParticipantListAPI } from '@/services/detail-tour';
import { formatHeight, formatYearOfBirth } from '@/utils/format';
import { Divider } from 'antd';
import { Divide } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'path';
import React, { use, useEffect, useState } from 'react';

const PlayerDetailTour = ({
  mainColor,
  eventId,
}: {
  mainColor: string;
  eventId: string;
}) => {
  const router = useRouter();
  const { setAthleteId } = useProfileContext();

  const textColor = 'text-white';
  const eventName = eventId.split('-')[0];
  const eventUUID = eventId.slice(eventId.indexOf('-') + 1);

  const [playerList, setPlayerList] = useState<{ user: any; partner?: any }[]>(
    [],
  );

  const fetchParticipantList = async () => {
    try {
      const res = await getParticipantListAPI(eventUUID);
      if (res.statusCode === 200 || res.statusCode === 201) {
        setPlayerList(res?.data?.listParticipants);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchParticipantList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventUUID]);

  const userProfile = (userId: string) => {
    setAthleteId(userId);
    router.push(`/profile/athlete/${userId}`);
  };

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
          {playerList?.map((player: any, index: number) => {
            return (
              <tr
                key={index}
                className="h-max pt-10 text-lg font-medium text-center"
              >
                <td>{index + 1}</td>
                <td className="w-32 h-32 pt-5">
                  <img
                    className="w-32 h-32 object-contain rounded-md"
                    src={
                      player?.user?.avatarUrl
                        ? player?.user?.avatarUrl
                        : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                    }
                    alt=""
                  />
                </td>
                <td
                  className="text-start pl-5 cursor-pointer hover:underline"
                  onClick={() => userProfile(playerList[index]?.user?.id)}
                >
                  {player?.user?.name}
                </td>
                <td>{formatYearOfBirth(player?.user?.dateOfBirth)}</td>
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
                  <td>{index + 1}</td>
                  <td className="w-32 h-32 pt-5 rounded-md">
                  <img
                    className="w-32 h-32 object-contain rounded-md"
                    src={
                      player?.user?.avatarUrl
                        ? player?.user?.avatarUrl
                        : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                    }
                    alt=""
                  />
                  </td>
                  <td
                    className=" text-start pl-5 cursor-pointer hover:underline"
                    onClick={() => userProfile(playerList[0]?.user?.id)}
                  >
                    {player?.user?.name}
                  </td>
                  <td>{formatYearOfBirth(player?.user?.dateOfBirth)}</td>
                  <td className="w-32 h-32 pt-5">
                  <img
                    className="w-32 h-32 object-contain rounded-md"
                    src={
                      player?.user?.avatarUrl
                        ? player?.user?.avatarUrl
                        : 'https://i.pinimg.com/736x/09/80/62/098062ede8791dc791c3110250d2a413.jpg'
                    }
                    alt=""
                  />
                  </td>
                  <td
                    className=" text-start pl-5 cursor-pointer hover:underline"
                    onClick={() => userProfile(playerList[0]?.user?.id)}
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
      <div>{playerList[0]?.partner ? tableRowDouble() : tableRowSingle()}</div>
    </div>
  );
};

export default PlayerDetailTour;
