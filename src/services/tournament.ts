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
        description: values.description,
        contactPhone: values.contactPhone,
        contactEmail: values.contactEmail,
        backgroundTournament: values.backgroundTournament,
        mainColor: values.mainColor,
        prizePool: values.prizePool,
        // merchandise: values.merchandise,
        hasMerchandise: values.hasMerchandise,
        numberOfMerchandise: values.numberOfMerchandise,
        merchandiseImages: values.merchandiseImages,
        location: values.location,
        tournamentSerieId: values.tournamentSerieId,
        registrationOpeningDate: values.registrationOpeningDate,
        registrationClosingDate: values.registrationClosingDate,
        drawDate: values.drawStartDate,
        startDate: values.startDate,
        endDate: values.endDate,
        registrationFeePerPerson: values.registrationFeePerPerson,
        registrationFeePerPair: values.registrationFeePerPair,
        maxEventPerPerson: values.maxEventPerPerson,
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
        requiredAttachment: values.requiredAttachment,
        isRecruit: values.isRecruit,
        isPrivate: values.isPrivate,
        isRegister: values.isRegister,
        isLiveDraw: values.isLiveDraw,
        hasLiveStream: values.hasLiveStream,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
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
