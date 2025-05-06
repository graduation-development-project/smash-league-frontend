import type { EventHistory, HistoryEntry } from '../score/scoreboard-app';

interface MatchEventHistoryProps {
  event: EventHistory[];
}

const MatchEventLogHistory = ({ event }: MatchEventHistoryProps) => {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-3 border-b border-gray-200">
        <h3 className="font-medium">Event History</h3>
      </div>

      <div className="overflow-auto max-h-[300px]">
        {event.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No match event history yet
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {event.map((entry, index) => (
              <li key={index} className="p-3 hover:bg-gray-50">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{entry?.logType}</span>
                  {/* <span className="text-xs text-gray-500">{entry?.log}</span> */}
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  Description: {entry?.log}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MatchEventLogHistory;
