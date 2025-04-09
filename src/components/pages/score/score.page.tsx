'use client';

import React, { useEffect, useState } from 'react';
import styles from './score.module.scss';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { getMatchByIdAPI, updatePointAPI } from '@/services/match';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import WinningShowModal from '@/components/general/atoms/score/winning-show.modal';
const ScorePage = () => {
  const [game, setGame] = useState<any>(null);
  const [matchDetails, setMatchDetails] = useState<any>(null);
  const [winningTeam, setWinningTeam] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leftPoint, setLeftPoint] = useState({
    point1: 0,
    point2: 0,
    point3: 0,
  });
  const [rightPoint, setRightPoint] = useState({
    point1: 0,
    point2: 0,
    point3: 0,
  });
  const [current, setCurrent] = useState<string>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedGame = localStorage.getItem('game');
      if (storedGame) {
        setGame(storedGame ? JSON.parse(storedGame) : {}); // Only parse if not null
      }
    }
  }, []);

  // console.log('check game', game);
  const getMatchById = async () => {
    if (!game) return;
    try {
      // console.log('Check matchId', game.matchId);
      const response = await getMatchByIdAPI(game.matchId);
      // console.log('Check ', response.data);
      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode === 201
      ) {
        setMatchDetails(response.data.data);
      }
    } catch (error: any) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    if (game) {
      getMatchById();
      setCurrent(game.currentServerId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  const handleUpdatePoint = async (winningId: string) => {
    if (!game) return;
    try {
      const response = await updatePointAPI(game.id, winningId);
      console.log('check res', response.data.data);
      if (
        response.data.statusCode === 200 ||
        response.data.statusCode === 201
      ) {
        const currentPoint = response.data.data.currentPoint;

        setLeftPoint({
          point1: currentPoint[0]?.left ?? 0,
          point2: currentPoint[1]?.left ?? 0,
          point3: currentPoint[2]?.left ?? 0,
        });

        setRightPoint({
          point1: currentPoint[0]?.right ?? 0,
          point2: currentPoint[1]?.right ?? 0,
          point3: currentPoint[2]?.right ?? 0,
        });
        setCurrent(response.data.data.currentServerId);
        toast.success(`${response?.data?.message}`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        if (response.data.data.isEnd === true) {
          if (response.data.data.newGame === null) {
            // console.log('Check if new game is null');
            setWinningTeam(response.data.data.winningCompetitor);
            setIsModalOpen(true);
            toast(`${response?.data?.data.message}`, {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });

            return;
          }

          setGame(response.data.data.newGame);
          setCurrent(response.data.data.newGame.currentServerId);
          toast.success(`${response?.data?.data.message}`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } else {
        toast.error(`${response?.message}`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error: any) {
      console.log('error ', error);
    }
  };
  // console.log('Check left point ', leftPoint);

  return (
    <div className="bg-black w-full h-full ">
      <div className="w-full h-full flex justify-between items-center text-white px-6 pt-3">
        <div className="text-[28px] text-primaryColor font-bold">
          {game ? `Game ${game.gameNumber}` : ''}
        </div>
        <div className="flex flex-col justify-center items-center gap-1 text-[20px] font-semibold">
          <div>
            {matchDetails?.leftCompetitor.partner !== null
              ? matchDetails?.leftCompetitor.user.name +
                '/' +
                matchDetails?.leftCompetitor.partner.name
              : matchDetails?.leftCompetitor.user.name}
          </div>
          <div>
            {matchDetails?.rightCompetitor.partner !== null
              ? matchDetails?.rightCompetitor.user.name +
                '/' +
                matchDetails?.rightCompetitor.partner.name
              : matchDetails?.rightCompetitor.user.name}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 text-[20px] font-semibold">
          <div className="flex gap-4">
            <p
              className={`${
                leftPoint.point1 > rightPoint.point1 ? 'text-secondColor' : ''
              }`}
            >
              {leftPoint.point1}
            </p>
            <p
              className={`${
                leftPoint.point2 > rightPoint.point2 ? 'text-secondColor' : ''
              }`}
            >
              {leftPoint.point2}
            </p>
            <p
              className={`${
                leftPoint.point3 > rightPoint.point3 ? 'text-secondColor' : ''
              }`}
            >
              {leftPoint.point3}
            </p>
          </div>
          <div className="flex gap-4">
            <p
              className={`${
                rightPoint.point1 > leftPoint.point1 ? 'text-secondColor' : ''
              }`}
            >
              {rightPoint.point1}
            </p>

            <p
              className={`${
                rightPoint.point2 > leftPoint.point2 ? 'text-secondColor' : ''
              }`}
            >
              {rightPoint.point2}
            </p>

            <p
              className={`${
                rightPoint.point3 > leftPoint.point3 ? 'text-secondColor' : ''
              }`}
            >
              {rightPoint.point3}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full h-screen justify-between items-center p-5">
        <div className="flex flex-col h-full justify-center items-center gap-3">
          <button
            className="h-[60%] border w-max border-white text-white flex justify-center items-center p-10 hover:bg-secondColor hover:font-bold"
            onClick={() => handleUpdatePoint(matchDetails.leftCompetitor.id)}
          >
            +1
          </button>
          <button className="text-[20px] w-max flex justify-center items-center p-2"></button>
        </div>
        <div className="relative w-full min-h-screen flex items-center justify-center p-6 text-white mb-4">
          <div className={styles.court}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div
              className={`${
                matchDetails && matchDetails.leftCompetitor.id === current
                  ? 'font-bold bg-primaryColor'
                  : ''
              }`}
            >
              {matchDetails?.leftCompetitor.user.name}
            </div>{' '}
            {/**Player */}
            <div></div>
            <div></div>
            <div
              className={`${
                matchDetails && matchDetails.rightCompetitor.id === current
                  ? 'font-bold bg-primaryColor'
                  : ''
              }`}
            >
              {matchDetails?.rightCompetitor.user.name}
            </div>
            {/**Player */}
            <div></div>
            <div></div>
            <div
              className={`${
                matchDetails && matchDetails.leftCompetitor.id === current
                  ? 'font-bold bg-primaryColor'
                  : ''
              }`}
            >
              {matchDetails?.leftCompetitor.partner
                ? matchDetails?.leftCompetitor.partner.name
                : ''}
            </div>
            {/**Player */}
            <div
              className={`${
                matchDetails && matchDetails.rightCompetitor.id === current
                  ? 'font-bold bg-primaryColor'
                  : ''
              }`}
            >
              {matchDetails?.rightCompetitor.partner
                ? matchDetails?.rightCompetitor.partner.name
                : ''}
            </div>{' '}
            {/**Player */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="flex flex-col h-full justify-center items-center gap-4">
          <button
            className="h-[60%] border w-max border-white text-white flex justify-center items-center p-10 hover:bg-secondColor hover:font-bold"
            onClick={() => handleUpdatePoint(matchDetails.rightCompetitor.id)}
          >
            +1
          </button>
          <button className="text-white text-[20px] w-max flex justify-center items-center gap-1 border border-white p-2 hover:font-bold hover:bg-gray-400 ">
            <RiArrowGoBackFill
              size={20}
              className="text-white hover:font-bold"
            />
            Undo
          </button>
        </div>
      </div>
      <WinningShowModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        winningCompetitor={winningTeam}
      />
    </div>
  );
};

export default ScorePage;
