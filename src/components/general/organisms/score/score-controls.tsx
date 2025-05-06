'use client';

import { Popconfirm } from 'antd';
import type { Player } from './scoreboard-app';
import { Undo, RotateCw } from 'lucide-react';

interface ScoreControlsProps {
  player1: Player;
  player2: Player;
  addPoint: (playerNum: 1 | 2, winningId: string) => void;
  toggleServe: () => void;
  undoLastAction: () => void;
  updatePlayerName: (playerNum: 1 | 2, name: string) => void;
  isGamePoint: boolean;
  setIsGamePoint: any;
  continueGame: () => void;
}

const ScoreControls = ({
  player1,
  player2,
  addPoint,
  toggleServe,
  undoLastAction,
  updatePlayerName,
  isGamePoint,
  setIsGamePoint,
  continueGame,
}: ScoreControlsProps) => {
  const renderScoreButton = (playerNum: 1 | 2, player: Player) => {
    const onConfirm = () => addPoint(playerNum, player.id);

    // console.log('isGamePoint', isGamePoint);

    return isGamePoint ? (
      <Popconfirm
        title="Are you sure to end the game?"
        onConfirm={() => {
          setIsGamePoint(false);
          onConfirm();
        }}
        okText="Yes"
        cancelText="No"
      >
        <button className="w-full h-24 text-xl bg-secondColor hover:bg-green-500 text-white font-medium py-2 px-4 rounded-md transition-colors">
          +1 Point for {player.name}
        </button>
      </Popconfirm>
    ) : (
      <button
        onClick={() => {
          setIsGamePoint(false);
          onConfirm();
        }}
        className="w-full h-24 text-xl bg-secondColor hover:bg-green-500 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        +1 Point for {player.name}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Player 1 */}
      <div className="space-y-4">
        <input
          type="text"
          value={player1.name}
          onChange={(e) => updatePlayerName(1, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
        />
        {renderScoreButton(1, player1)}
      </div>

      {/* Player 2 */}
      <div className="space-y-4">
        <input
          type="text"
          value={player2.name}
          onChange={(e) => updatePlayerName(2, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
        />
        {renderScoreButton(2, player2)}
      </div>

      {/* Server and Undo */}
      <div className="md:col-span-2 grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={continueGame}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <RotateCw className="w-4 h-4 mr-2" />
          Continue Game
        </button>

        <button
          onClick={undoLastAction}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Undo className="w-4 h-4 mr-2" />
          Undo Last Action
        </button>
      </div>
    </div>
  );
};

export default ScoreControls;
