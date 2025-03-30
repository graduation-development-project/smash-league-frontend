'use client';
import httpRequest from '@/utils/httpRequest';
import axios from 'axios';

export const createTeamAPI = async (
  logo: File | null,
  teamName: string,
  teamDescription: string,
  accessToken: string,
) => {
  try {
    const formData = new FormData();
    formData.append('logo', logo ?? '');
    formData.append('teamName', teamName);
    formData.append('description', teamDescription);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team-leaders/create-team`,
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
    return error.response?.data;
  }
};

export const searchTeamsAPI = async (
  page: number,
  perPage: number,
  searchTerm?: string,
) => {
  try {
    const response = await httpRequest.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/search`,
      {
        params: {
          page: page,
          perPage: perPage,
          searchTerm: searchTerm,
        },
      },
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error searching team list:',
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || 'Failed to get team');
  }
};

export const getTeamDetailsAPI = async (teamId: string) => {
  try {
    const response = await httpRequest.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/${teamId}`,
    );
    return response;
  } catch (error: any) {
    console.error(
      'Error get team details:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Failed to get team details',
    );
  }
};

export const getTeamMembersAPI = async (
  teamId: string,
  searchTerm: string,
  page: number,
  perPage: number,
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/members/${teamId}`,
      {
        params: {
          page: page,
          perPage: perPage,
          searchTerm: searchTerm,
        },
      },
    );
    return response;
  } catch (error: any) {
    console.error(
      'Error get members team:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const updateTeamDetailsAPI = async (
  logo: File | null,
  teamName: string,
  teamDescription: string,
  teamId: string,
  accessToken: string,
) => {
  try {
    const formData = new FormData();

    // console.log('Check access token', accessToken);
    formData.append('teamId', teamId);
    formData.append('description', teamDescription);
    formData.append('teamName', teamName);
    formData.append('logo', logo ?? '');

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team-leaders/edit-team`,
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
      'Error updating team:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const inviteMemberAPI = async (
  invitedUserEmail: string | undefined,
  teamId: string,
  accessToken: string,
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team-leaders/send-invitation`,
      {
        invitedUserEmail: invitedUserEmail,
        teamId: teamId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res;
  } catch (error: any) {
    console.error(
      'Error inviting member:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const responseInvitationAPI = async (
  invitationId: string,
  accessToken: string,
  option: boolean,
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/athletes/response-team-invitation`,
      {
        invitationId: invitationId,
        option: option,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res;
  } catch (error: any) {
    console.error(
      'Error response invitation:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const requestJoinTeamAPI = async (
  teamId: string,
  accessToken: string,
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/athletes/request-join-team`,
      {
        teamId: teamId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res;
  } catch (error: any) {
    console.error(
      'Error response invitation:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const responseRequestJoinTeamAPI = async (
  rejectReason: string,
  teamId: string,
  requestId: string,
  option: boolean,
  accessToken: string,
) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team-leaders/response-join-team-request`,
      {
        rejectReason,
        teamId,
        requestId,
        option,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res;
  } catch (error: any) {
    console.error(
      'Error response join team:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const removeMemberAPI = async (
  teamId: string,
  reason: string,
  teamMemberIds: string[] | undefined,
  accessToken: string,
) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team-leaders/remove-team-members`,
      {
        teamId,
        reason,
        teamMemberIds,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res;
  } catch (error: any) {
    console.error(
      'Error response join team:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const leaveTeamAPI = async (
  teamId: string,
  accessToken: string,
  reason: string,
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/athletes/leave-team`,
      {
        teamId,
        reason,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res;
  } catch (error: any) {
    console.error('Error leave team:', error.response?.data || error.message);
    return error.response?.data;
  }
};

export const responseRequestLeaveTeamAPI = async (
  teamId: string,
  requestId: string,
  option: boolean,
  accessToken: string,
) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team-leaders/response-leave-team-request`,
      {
        // rejectReason,
        teamId,
        requestId,
        option,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res;
  } catch (error: any) {
    console.error(
      'Error response leave team:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const transferTeamLeaderAPI = async (
  newTeamLeaderId: string,
  teamId: string,
  accessToken: string,
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/team-leaders/transfer-team-leader`,
      {
        newTeamLeaderId,
        teamId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res;
  } catch (error: any) {
    console.error(
      'Error response transfer team:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const responseRequestTransferTeamLeaderAPI = async (
  requestId: string,
  option: boolean,
  accessToken: string,
) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/athletes/response-transfer-team-leader`,
      {
        requestId,
        option,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res;
  } catch (error: any) {
    console.error(
      'Error response transfer team leader:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};
