'use client';
import axios from 'axios';

export const createTourAPI = async (accessToken: string, values: any) => {
  try {
    console.log('Check tour', values);
    console.log('Check token', accessToken);


    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/create-tournament`,
      {
        id: values.id,
        name: values.name,
        shortName: values.shortName,
        backgroundTournament: 'values.backgroundTournament',
        mainColor: values.mainColor,
        prizePool: values.prizePool,
        merchandise: values.merchandise,
        hasMerchandise: values.isMerchandise,
        numberOfMerchandise: values.numberOfMerchandise,
        location: values.location,
        tournamentSerieId: null,
        createTournamentSerie: {
          tournamentSerieName: 'Serie',
        },
        registrationOpeningDate: values.registrationOpeningDate,
        registrationClosingDate: values.registrationClosingDate,
        drawDate: values.drawStartDate,
        startDate: values.startDate,
        endDate: values.endDate,
        registrationFeePerPerson: values.registrationFee,
        registrationFeePerPair: values.registrationFeePair,
        maxEventPerPerson: 2,
        umpirePerMatch: values.umpirePerMatch,
        linemanPerMatch: values.linemanPerMatch,
        createTournamentEvent: [
          {
            fromAge: 12,
            toAge: 23,
            typeOfFormat: 'SINGLE_ELIMINATION',
            winningPoint: 11,
            lastPoint: 50,
            numberOfGames: 3,
            ruleOfEventExtension: '',
            maximumAthlete: 100,
            minimumAthlete: 3,
            tournamentEvent: 'MENS_SINGLE',
            championshipPrize: ['Gold Medalist', 'T-shirt', 'Yonex Racket'],
            runnerUpPrize: ['Silver Medalist', 'T-shirt'],
            thirdPlacePrize: [],
            jointThirdPlacePrize: [],
          },
        ],
        protestFeePerTime: values.protestFeePerTime,
        checkInBeforeStart: values.checkInBeforeStart,
        requiredAttachment: values.attachments,
      },
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

export const searchTourAPI = async (searchTerm: string, page: number, perPage: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/search`,
      {
        params: {
          searchTerm,
          page,
          perPage,
        },
      },
    );
    console.log('response tour', response);
    
    return response.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to create team');
  }
};
