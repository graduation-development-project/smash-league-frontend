import axios from 'axios';
import { Tour } from 'antd';

export const registerTournamentByAthleteAPI = async (
  accessToken: string,
  tournanmentId: string,
  registrationRole: string,
  images: any,
  tournamentEventId?: string,
  partnerEmail?: string,
  partnerImages?: any,
  submittedAnswerForTournament?: any,
  submittedAnswerForEvent?: any,
) => {
  try {
    const formData = new FormData();

    const submittedAnswerForEvent1 = [
      {
        name: 'Nguyen',
      },
    ];

    formData.append('tournamentId', tournanmentId);
    if (tournamentEventId) {
      formData.append('tournamentEventId', tournamentEventId);
    }

    formData.append('idCardFront', images[0]);
    formData.append('idCardBack', images[1]);
    formData.append('cardPhoto', images[2]);
    formData.append('registrationRole', registrationRole);
    console.log('submittedAnswerForTournament', submittedAnswerForTournament);

    submittedAnswerForTournament &&
      formData.append(
        'submittedAnswerForTournament',
        JSON.stringify(submittedAnswerForTournament),
      );
    partnerEmail && formData.append('partnerEmail', partnerEmail);
    submittedAnswerForEvent1 &&
      formData.append(
        'submittedAnswerForEvent',
        JSON.stringify(submittedAnswerForEvent1),
      );
    if (partnerImages?.length > 0) {
      formData.append('partnerIdCardFront', partnerImages[0]);
      formData.append('partnerIdCardBack', partnerImages[1]);
      formData.append('partnerCardPhoto', partnerImages[2]);
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/athletes/register-tournament`,
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
      'Error register tournament by athlete:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const registerTournamentByUmpireAPI = async (
  registrationRole: string,
  images: File[],
  accessToken: string,
) => {
  try {
    const formData = new FormData();
    formData.append('idCardFront', images[0]);
    formData.append('idCardBack', images[1]);
    formData.append('cardPhoto', images[2]);
    formData.append('registrationRole', registrationRole);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/athletes/register-tournament`,
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
      'Error register tournament by umpire:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getTournamentRegistrationAPI = async (
  accessToken: string,
  tournamentEventId: string | null,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/tournament-registration/${tournamentEventId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get tournament registration:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getUmpireRegistrationAPI = async (
  accessToken: string,
  tournamentEventId: string | null,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/umpire-registration/${tournamentEventId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get umpire tournament registration:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const responseTournamentRegistrationAPI = async (
  accessToken: string,
  tournamentRegistrationId: string,
  option: boolean,
  rejectReason?: string,
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/organizers/response-tournament-registration`,
      {
        tournamentRegistrationId,
        option,
        rejectReason,
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
      'Error response tournament registration:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getTournamentRegistrationByAthleteAPI = async (
  accessToken: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/athletes/tournament-registration`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get tournament registration by athlete:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const payRegistrationFeeAPI = async (
  accessToken: string,
  tournamentRegistrationId: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/pay-registration-fee/${tournamentRegistrationId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error pay registration by athlete:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const removeTournamentRegistrationAPI = async (
  accessToken: string,
  tournamentRegistrationIds: string[],
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/athletes/remove-register-tournament-list`,

      {
        tournamentRegistrationIds,
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
      'Error remove registration :',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getRequirementsOfTournamentAPI = async (tournamentId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/get-requirements-of-tournament/${tournamentId}`,
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get requirements of tournament:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const getRequirementsOfTournamentEventAPI = async (
  tournamentEventId: string,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tournaments/get-requirements-of-tournament-event/${tournamentEventId}`,
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error get requirements of tournament event:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
