'use client';

import { useState, useEffect } from 'react';
import { X, AlertTriangle, Clock } from 'lucide-react';
import Image from 'next/image';
import type { Player } from '../../organisms/score/scoreboard-app';
import {
  createEventLogAPI,
  getAllLogMessageAPI,
  getAllLogTypeAPI,
} from '@/services/match';
import { toast } from 'react-toastify';

interface IncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  player1: Player;
  player2: Player;
  onLogIncident: (incident: IncidentLog) => void;
  gameId: string;
}

export interface IncidentLog {
  id: string;
  timestamp: Date;
  incidentType: string;
  playerId: string | null;
  description: string;
  matchTime: string;
}

const incidentTypes = [
  {
    id: 'warning',
    label: 'Warning',
    description: 'Issue a warning to a player',
  },
  { id: 'fault', label: 'Fault', description: 'Call a fault' },
  {
    id: 'challenge',
    label: 'Challenge',
    description: 'Player challenges a call',
  },
  {
    id: 'medical',
    label: 'Medical Timeout',
    description: 'Player requests medical attention',
  },
  {
    id: 'equipment',
    label: 'Equipment Issue',
    description: 'Problem with equipment',
  },
  {
    id: 'coaching',
    label: 'Coaching Violation',
    description: 'Illegal coaching from sidelines',
  },
  {
    id: 'score-dispute',
    label: 'Score Dispute',
    description: 'Disagreement about the score',
  },
  {
    id: 'conduct',
    label: 'Misconduct',
    description: 'Unsportsmanlike behavior',
  },
  {
    id: 'delay',
    label: 'Delay of Game',
    description: 'Player causing unnecessary delay',
  },
  {
    id: 'other',
    label: 'Other Incident',
    description: 'Any other match incident',
  },
];

export default function IncidentModal({
  isOpen,
  onClose,
  player1,
  player2,
  onLogIncident,
  gameId,
}: IncidentModalProps) {
  const [selectedIncidentType, setSelectedIncidentType] = useState<string>('');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [user, setUser] = useState<any>({});
  const [logTypeList, setLogTypeList] = useState<any>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  // Format current match time
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }
  }, [isOpen]);

  const getAllLogMessage = async () => {
    try {
      const response = await getAllLogMessageAPI();
    } catch (error: any) {
      console.log('Error get all log message:', error);
    }
  };

  const getAllLogType = async () => {
    try {
      const response = await getAllLogTypeAPI();
      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode === 201
      ) {
        const formatData = response.data.data.map((logType: any) => ({
          id: logType.key,
          label: logType.value,
          description: '',
        }));
        setLogTypeList(formatData);
      }
    } catch (error: any) {
      console.log('Error get all log message:', error);
    }
  };

  useEffect(() => {
    // getAllLogMessage();
    getAllLogType();
  }, []);

  const handleSubmit = async () => {
    if (!user) {
      return;
    }

    if (!selectedIncidentType) {
      alert('Please select an incident type');
      return;
    }
    const response = await createEventLogAPI(
      user.access_token,
      gameId,
      selectedIncidentType,
      description,
    );

    if (
      response?.data?.statusCode === 200 ||
      response?.data?.statusCode === 201
    ) {
      toast.success(`${response?.data.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast.error(`${response?.data.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    const newIncident: IncidentLog = {
      id: `incident-${Date.now()}`,
      timestamp: new Date(),
      incidentType: selectedIncidentType,
      playerId: selectedPlayerId,
      description,
      matchTime: currentTime,
    };

    onLogIncident(newIncident);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSelectedIncidentType('');
    setSelectedPlayerId(null);
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-green-700 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <h2 className="text-xl font-bold">Log Match Incident</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-green-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Current Time */}
          <div className="mb-6 flex items-center justify-between bg-gray-100 p-3 rounded-md">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Current Time:</span>
            </div>
            <span className="text-lg font-mono">{currentTime}</span>
          </div>

          {/* Incident Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Incident Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {logTypeList.map((incident: any) => (
                <div
                  key={incident.id}
                  className={`border rounded-md p-3 cursor-pointer transition-colors ${
                    selectedIncidentType === incident.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedIncidentType(incident.id)}
                >
                  <div className="font-medium">{incident.label}</div>
                  <div className="text-xs text-gray-500">
                    {incident.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Player Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Player Involved (Optional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`border rounded-md p-3 cursor-pointer transition-colors ${
                  selectedPlayerId === 'player1'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlayerId('player1')}
              >
                <div className="flex items-center">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200 mr-3">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt={player1.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-medium">{player1.name}</div>
                </div>
              </div>

              <div
                className={`border rounded-md p-3 cursor-pointer transition-colors ${
                  selectedPlayerId === 'player2'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlayerId('player2')}
              >
                <div className="flex items-center">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200 mr-3">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt={player2.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-medium">{player2.name}</div>
                </div>
              </div>

              <div
                className={`border rounded-md p-3 cursor-pointer transition-colors ${
                  selectedPlayerId === 'both'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlayerId('both')}
              >
                <div className="flex items-center justify-center h-full">
                  <div className="font-medium">Both Players</div>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedPlayerId(null)}
              >
                Clear Selection
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter additional details about the incident..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={!selectedIncidentType}
            >
              Log Incident
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
