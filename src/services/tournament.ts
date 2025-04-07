'use client';
import axios from 'axios';
const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments`;

export const createTourAPI = async (accessToken: string, values: any) => {
  try {
    console.log('Check tour', values);
    console.log('Check token', accessToken);

    const response = await axios.post(
      `${URL}/create-tournament`,
      {
        id: values.id,
        name: values.name,
        shortName: values.shortName,
        introduction: values.introduction,
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
        createTournamentEvent: values.createTournamentEvent,
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

export const searchTourAPI = async (
  searchTerm: string,
  page: number,
  perPage: number,
) => {
  try {
    const response = await axios.get(`${URL}/search`, {
      params: {
        searchTerm,
        page,
        perPage,
      },
    });
    console.log('response tour', response);

    return response.data;
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to search tour');
  }
};

export const getTourDetailAPI = async (url: string) => {
  try {
    const response = await axios.get(`${URL}/get-tournament-detail/${url}`);
    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      return response.data;
    }
    throw new Error('Failed to get Detail tour');
  } catch (error: any) {
    console.error(
      'Error creating team:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Failed to get detail tour',
    );
  }
};

export const getAllTournamentsByUserAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/owned-tournaments`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get all tournaments by user:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
export const getTournamentEventParticipantsAPI = async (
  accessToken: string,
  tournamentEventId: string | null,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/get-participants-of-tournament-event/${tournamentEventId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error getTournamentEventparticipants:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getTournamentUmpiresParticipantsAPI = async (
  accessToken: string,
  tournamentId: string | string[] | null,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/get-tournament-umpires/${tournamentId}`,
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get Tournament Umpires participants:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getTournamentEventDetailAPI = async (tournamentId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/get-tournament-event/${tournamentId}`,
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get Tournament Event Detail:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const generateBracketsAPI = async (tournamentEventId: string | null) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/generate-brackets/${tournamentEventId}`,
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error generate brackets:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getMatchesOfTournamentEventAPI = async (
  tournamentEventId: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/get-matches-of-tournament-event/${tournamentEventId}`,
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get matches of Tournament Event Detail:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getTournamentsOfOrganizerAPI = async (
  accessToken: string,
  page: number,
  perPage: number,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/get-tournaments-by-organizer`,
      {
        params: {
          page: page,
          perPage: perPage,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get Tournament List of Organizer:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const assignUmpireToMatchAPI = async (
  accessToken: string,
  tournamentId: string | string[] | null,
  matchId: string,
  umpireId: string,
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/assign-umpire`,
      {
        tournamentId,
        umpireId,
        matchId,
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
      'Error assign umpire to match:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getParticipatedTournamentsAPI = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/umpires/participate-tournaments`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get participated tournaments:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getAssignedMatchesAPI = async (
  accessToken: string,
  tournamentId: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/umpires/assigned-matches/${tournamentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get assigned matches:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
