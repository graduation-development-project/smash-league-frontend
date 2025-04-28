'use client';

import { useState, useEffect } from 'react';
import ScoreDisplay from './score-display';
import ScoreControls from './score-controls';
import MatchSettings from '../matches/match-settings';
import MatchHistory from '../matches/match-history';
import { Clock, RotateCcw, Settings, List } from 'lucide-react';
import { getMatchByIdAPI, updatePointAPI } from '@/services/match';
import { toast } from 'react-toastify';

export type Player = {
  id: string;
  name: string;
  score: number;
  sets: number;
  serving: boolean;
};

export type HistoryEntry = {
  timestamp: Date;
  action: string;
  player1Score: number;
  player2Score: number;
  player1Sets: number;
  player2Sets: number;
  servingPlayer: number;
};

export type GameSettings = {
  pointsPerSet: number;
  numberOfSets: number;
  sportType: 'badminton' | 'pickleball';
};

const ScoreboardApp = () => {
  const [player1, setPlayer1] = useState<Player>({
    id: '',
    name: 'Player 1',
    score: 0,
    sets: 0,
    serving: true,
  });

  const [player2, setPlayer2] = useState<Player>({
    id: '',
    name: 'Player 2',
    score: 0,
    sets: 0,
    serving: false,
  });

  const [matchTime, setMatchTime] = useState<number>(0);
  const [isMatchActive, setIsMatchActive] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('controls');
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    pointsPerSet: 21,
    numberOfSets: 3,
    sportType: 'badminton',
  });
  const [game, setGame] = useState<any>(null);
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
        console.log('Check response', response.data.data);
        setPlayer1((prev) => ({
          ...prev,
          id: response.data.data?.leftCompetitor.id,
          name:
            response.data.data?.leftCompetitor.partner !== null
              ? response.data.data?.leftCompetitor.user.name +
                '/' +
                response.data.data?.leftCompetitor.partner.name
              : response.data.data?.leftCompetitor.user.name,
          serving:
            response.data.data?.leftCompetitor.id === game.currentServerId,
        }));
        setPlayer2((prev) => ({
          ...prev,
          id: response.data.data?.rightCompetitor.id,
          name:
            response.data.data?.rightCompetitor.partner !== null
              ? response.data.data?.rightCompetitor.user.name +
                '/' +
                response.data.data?.rightCompetitor.partner.name
              : response.data.data?.rightCompetitor.user.name,
          serving:
            response.data.data?.rightCompetitor.id === game.currentServerId,
        }));
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

  // Timer for match duration
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isMatchActive) {
      interval = setInterval(() => {
        setMatchTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isMatchActive]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const addPoint = async (playerNum: 1 | 2, winningId: string) => {
    if (!game) return;

    if (!isMatchActive) {
      setIsMatchActive(true);
    }

    try {
      const response = await updatePointAPI(game.id, winningId);
      console.log('check res', response.data.data);

      if (
        response.data.statusCode === 200 ||
        response.data.statusCode === 201
      ) {
        const data = response.data.data;
        const currentPoint = data.currentPoint;

        // Update per-set scores (e.g., point1 = set 1, point2 = set 2...)
        // setLeftPoint({
        //   point1: currentPoint[0]?.left ?? 0,
        //   point2: currentPoint[1]?.left ?? 0,
        //   point3: currentPoint[2]?.left ?? 0,
        // });

        // setRightPoint({
        //   point1: currentPoint[0]?.right ?? 0,
        //   point2: currentPoint[1]?.right ?? 0,
        //   point3: currentPoint[2]?.right ?? 0,
        // });

        // Update server
        setCurrent(data.currentServerId);
        setCurrentSet(data.currentGameNumber);

        // Update local player states
        setPlayer1((prev) => ({
          ...prev,
          score: currentPoint[data.currentGameNumber - 1]?.left ?? prev.score,
          sets: data.currentGameNumber,
          serving: data.currentServerId === player1.id,
        }));

        setPlayer2((prev) => ({
          ...prev,
          score: currentPoint[data.currentGameNumber - 1]?.right ?? prev.score,
          sets: data.currentGameNumber,
          serving: data.currentServerId === player2.id,
        }));

        // Add history
        const historyEntry: HistoryEntry = {
          timestamp: new Date(),
          action: `Point to ${playerNum === 1 ? player1.name : player2.name}`,
          player1Score:
            currentPoint[data.currentGameNumber - 1]?.left ?? player1.score,
          player2Score:
            currentPoint[data.currentGameNumber - 1]?.right ?? player2.score,
          player1Sets: data.currentGameNumber,
          player2Sets: data.currentGameNumber,
          servingPlayer: data.currentServerId === player1.id ? 1 : 2,
        };
        setHistory((prev) => [historyEntry, ...prev]);

        // Match end check
        if (data.isEnd === true) {
          if (data.newGame === null) {
            // setWinningTeam(data.winningCompetitor);
            // setIsModalOpen(true);
            setCurrentSet(3);

            toast(`${data.message}`, {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            setPlayer1((prev) => ({
              ...prev,
              score: currentPoint[2]?.left ?? prev.score,
            //   sets: 3,
            //   serving: data.currentServerId === player1.id,
            }));

            setPlayer2((prev) => ({
              ...prev,
              score: currentPoint[2]?.right ?? prev.score,
            //   sets: 3,
            //   serving: data.currentServerId === player2.id,
            }));

            setIsMatchActive(false);
          }

          // Start new game
          setGame(data.newGame);
          setCurrent(data.newGame.currentServerId);
          toast.success(`${data.message}`, {
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

  const undoLastAction = () => {
    if (history.length > 0) {
      const lastEntry = history[0];

      setPlayer1({
        ...player1,
        score: lastEntry.player1Score,
        sets: lastEntry.player1Sets,
        serving: lastEntry.servingPlayer === 1,
      });

      setPlayer2({
        ...player2,
        score: lastEntry.player2Score,
        sets: lastEntry.player2Sets,
        serving: lastEntry.servingPlayer === 2,
      });

      setHistory((prev) => prev.slice(1));
    }
  };

  const resetMatch = () => {
    if (window.confirm('Are you sure you want to reset the match?')) {
      setPlayer1({
        ...player1,
        score: 0,
        sets: 0,
        serving: true,
      });

      setPlayer2({
        ...player2,
        score: 0,
        sets: 0,
        serving: false,
      });

      setMatchTime(0);
      setIsMatchActive(false);
      setHistory([]);
      setCurrentSet(1);
    }
  };

  const updatePlayerName = (playerNum: 1 | 2, name: string) => {
    if (playerNum === 1) {
      setPlayer1({ ...player1, name });
    } else {
      setPlayer2({ ...player2, name });
    }
  };

  const toggleServe = () => {
    setPlayer1({ ...player1, serving: !player1.serving });
    setPlayer2({ ...player2, serving: !player2.serving });

    setHistory((prev) => [
      {
        timestamp: new Date(),
        action: `Service changed to ${
          !player1.serving ? player1.name : player2.name
        }`,
        player1Score: player1.score,
        player2Score: player2.score,
        player1Sets: player1.sets,
        player2Sets: player2.sets,
        servingPlayer: !player1.serving ? 1 : 2,
      },
      ...prev,
    ]);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {gameSettings.sportType === 'badminton'
              ? 'Badminton'
              : 'Pickleball'}{' '}
            Scoreboard
          </h2>
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 px-3 py-1 rounded-md flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-600" />
              <span className="font-medium">{formatTime(matchTime)}</span>
            </div>
            <button
              onClick={resetMatch}
              className="flex items-center px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-1 text-gray-600" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <ScoreDisplay
          player1={player1}
          player2={player2}
          currentSet={currentSet}
          maxSets={gameSettings.numberOfSets}
        />

        {/* Custom Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('controls')}
              className={`py-3 px-4 font-medium text-sm border-b-2 ${
                activeTab === 'controls'
                  ? 'border-primaryColor text-primaryColor'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Controls
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-3 px-4 font-medium text-sm border-b-2 flex items-center ${
                activeTab === 'settings'
                  ? 'border-primaryColor text-primaryColor'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-3 px-4 font-medium text-sm border-b-2 flex items-center ${
                activeTab === 'history'
                  ? 'border-primaryColor text-primaryColor'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <List className="w-4 h-4 mr-1" />
              History
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="pt-2">
          {activeTab === 'controls' && (
            <ScoreControls
              player1={player1}
              player2={player2}
              addPoint={addPoint}
              toggleServe={toggleServe}
              undoLastAction={undoLastAction}
              updatePlayerName={updatePlayerName}
            />
          )}

          {activeTab === 'settings' && (
            <MatchSettings
              settings={gameSettings}
              setSettings={setGameSettings}
            />
          )}

          {activeTab === 'history' && <MatchHistory history={history} />}
        </div>
      </div>
    </div>
  );
};

export default ScoreboardApp;
