import type { HistoryEntry } from "../score/scoreboard-app"

interface MatchHistoryProps {
  history: HistoryEntry[]
}

const MatchHistory = ({ history }: MatchHistoryProps) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-3 border-b border-gray-200">
        <h3 className="font-medium">Match History</h3>
      </div>

      <div className="overflow-auto max-h-[300px]">
        {history.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No match history yet</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {history.map((entry, index) => (
              <li key={index} className="p-3 hover:bg-gray-50">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{entry.action}</span>
                  <span className="text-xs text-gray-500">{formatTime(entry.timestamp)}</span>
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  Score: {entry.player1Score}-{entry.player2Score} | Sets: {entry.player1Sets}-{entry.player2Sets}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default MatchHistory
