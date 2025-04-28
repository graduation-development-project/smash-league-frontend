"use client"

import type { GameSettings } from "../score/scoreboard-app" 

interface MatchSettingsProps {
  settings: GameSettings
  setSettings: (settings: GameSettings) => void
}

const MatchSettings = ({ settings, setSettings }: MatchSettingsProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Sport Type</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                id="badminton"
                name="sportType"
                type="radio"
                checked={settings.sportType === "badminton"}
                onChange={() => setSettings({ ...settings, sportType: "badminton" })}
                className="h-4 w-4 text-primaryColor focus:ring-primaryColor border-gray-300"
              />
              <label htmlFor="badminton" className="ml-2 block text-sm text-gray-700">
                Badminton
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="pickleball"
                name="sportType"
                type="radio"
                checked={settings.sportType === "pickleball"}
                onChange={() => setSettings({ ...settings, sportType: "pickleball" })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="pickleball" className="ml-2 block text-sm text-gray-700">
                Pickleball
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="pointsPerSet" className="block text-sm font-medium text-gray-700">
            Points Per Set
          </label>
          <select
            id="pointsPerSet"
            value={settings.pointsPerSet.toString()}
            onChange={(e) => setSettings({ ...settings, pointsPerSet: Number.parseInt(e.target.value) })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="11">11 points</option>
            <option value="15">15 points</option>
            <option value="21">21 points</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="numberOfSets" className="block text-sm font-medium text-gray-700">
            Number of Sets
          </label>
          <select
            id="numberOfSets"
            value={settings.numberOfSets.toString()}
            onChange={(e) => setSettings({ ...settings, numberOfSets: Number.parseInt(e.target.value) })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="1">1 set</option>
            <option value="3">3 sets (best of 3)</option>
            <option value="5">5 sets (best of 5)</option>
          </select>
        </div>

        <div className="pt-2 text-sm text-gray-500">
          <p>Note: Changing settings will not reset the current match scores.</p>
        </div>
      </div>
    </div>
  )
}

export default MatchSettings
