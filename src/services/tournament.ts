'use client';
import axios from 'axios';

export const createTourAPI = async (
    accessToken : string,
    id: string,
    name: string,
    shortName: string,
    backgroundTournament: File | null,
    mainColor: string,
    prizePool: 12312332,
    merchandise: string, 
    hasMerchandise: true,
    numberOfMerchandise: number,
    location: string,
    tournamentSerieId: null,
    createTournamentSerie: {
        tournamentSerieName: "Serie"
    },
    registrationOpeningDate: string,
    registrationClosingDate: string,
    drawDate: string,
    startDate: string,
    endDate: string,
    registrationFeePerPerson: number,
    registrationFeePerPair: number,
    maxEventPerPerson: number,
    umpirePerMatch: number,
    linemanPerMatch: number,
    createTournamentEvent: [
        {
            fromAge: number, 
            toAge: number,
            formatType: string,
            winningPoint: number,
            lastPoint: number,
            numberOfGames: number,
            minimumParticipantToStart: number,
            participantType: string
        }
    ],
    protestFeePerTime: number,
    checkInBeforeStart: string,
    requiredAttachment: ["PORTRAIT_PHOTO", "IDENTIFICATION_CARD"]
) => {
  try {
    const formData = new FormData();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/create-tournament`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response; 
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to create team');
  }
};

