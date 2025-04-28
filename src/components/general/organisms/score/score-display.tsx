import type { Player } from "./scoreboard-app"

interface ScoreDisplayProps {
  player1: Player
  player2: Player
  currentSet: number
  maxSets: number
}

const ScoreDisplay = ({ player1, player2, currentSet, maxSets }: ScoreDisplayProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 bg-white rounded-lg">
      {/* Player 1 */}
      <div
        className={`flex flex-col items-center justify-center p-4 rounded-lg ${
          player1.serving ? "bg-green-50 border-2 border-green-200" : ""
        }`}
      >
        <div className="text-lg font-medium mb-1">{player1.name}</div>
        <div className="text-5xl font-bold mb-2">{player1.score}</div>
        <div className="flex space-x-1">
          {Array.from({ length: maxSets }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < player1.sets ? "bg-green-500" : "bg-gray-200"}`} />
          ))}
        </div>
        {player1.serving && (
          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Serving
          </span>
        )}
      </div>

      {/* Center - Match Info */}
      <div className="flex flex-col items-center justify-center">
        <div className="text-sm text-gray-500 mb-1">Set</div>
        <div className="text-2xl font-bold">
          {currentSet} of {maxSets}
        </div>
        <div className="mt-2 text-xl">vs</div>
      </div>

      {/* Player 2 */}
      <div
        className={`flex flex-col items-center justify-center p-4 rounded-lg ${
          player2.serving ? "bg-green-50 border-2 border-green-200" : ""
        }`}
      >
        <div className="text-lg font-medium mb-1">{player2.name}</div>
        <div className="text-5xl font-bold mb-2">{player2.score}</div>
        <div className="flex space-x-1">
          {Array.from({ length: maxSets }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < player2.sets ? "bg-green-500" : "bg-gray-200"}`} />
          ))}
        </div>
        {player2.serving && (
          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Serving
          </span>
        )}
      </div>
    </div>
  )
}

export default ScoreDisplay
