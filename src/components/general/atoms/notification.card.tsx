'use client';
import React from 'react';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import {
  responseInvitationAPI,
  responseRequestJoinTeamAPI,
} from '@/services/team';
import { useProfileContext } from '@/context/profile.context';
import { toast } from 'react-toastify';

const NotificationCard = ({
  notification,
  hiddenBtn = false,
  getNotifications,
}: {
  notification: NotificationProps;
  hiddenBtn?: boolean;
  getNotifications?: () => void;
}) => {
  const { user } = useProfileContext();
  // console.log('Check notification', notification);

  const handleResponseInvitation = async (option: boolean) => {
    if (!user?.access_token) return;
    // console.log('user', user);
    try {
      const response = await responseInvitationAPI(
        notification?.teamInvitationId,
        user?.access_token,
        option,
      );

      console.log(response);
      if (response.status === 200 || response.status === 201) {
        getNotifications && getNotifications();
        toast.success(`${response?.data}`, {
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
        console.log('Error', response);
        toast.error(`${response?.message}`, {
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
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleResponseRequestJoinTeam = async (option: boolean) => {
    if (!user?.access_token) return;
    // console.log('user', user);
    try {
      const response = await responseRequestJoinTeamAPI(
        '',
        notification?.teamRequest?.teamId,
        notification?.teamRequestId,
        option,
        user?.access_token,
      );

      console.log(response);
      if (response.status === 200 || response.status === 201) {
        getNotifications && getNotifications();
        toast.success(`${response?.data}`, {
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
        console.log('Error', response);
        toast.error(`${response?.message}`, {
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
    } catch (error: any) {
      console.log(error);
    }
  };

  const date = dayjs(notification?.createdAt).format('DD-MM-YYYY HH:mm:ss');
  return (
    <div className="w-full h-max p-4 rounded-[5px] border border-solid  text-[#2c2c2c] flex justify-between items-center">
      <div className="flex flex-col gap-1 ">
        <h1 className="text-[16px] font-bold">{notification?.title}</h1>
        <p className="text-[14px] text-slate-500 text-justify">
          {notification?.message}
        </p>
        <p className="text-[12px]">{date}</p>
      </div>
      {hiddenBtn === false &&
        notification?.teamInvitation?.status === 'PENDING' &&
        notification?.type?.typeOfNotification === 'Invitation' && (
          <div className="flex gap-2">
            <Button
              size={'sm'}
              shadow={'shadowNone'}
              colorBtn={'gradientGreenBtn'}
              onClick={() => handleResponseInvitation(true)}
            >
              Accept
            </Button>
            <Button
              size={'sm'}
              shadow={'shadowNone'}
              className="bg-transparent border border-primaryColor text-primaryColor hover:text-white hover:bg-orange-500"
              onClick={() => handleResponseInvitation(false)}
            >
              Reject
            </Button>
          </div>
        )}

      {hiddenBtn === false &&
        notification?.teamRequest?.status === 'PENDING' &&
        notification?.type?.typeOfNotification === 'Join Team' && (
          <div className="flex gap-2">
            <Button
              size={'sm'}
              shadow={'shadowNone'}
              colorBtn={'gradientGreenBtn'}
              onClick={() => handleResponseRequestJoinTeam(true)}
            >
              Accept
            </Button>
            <Button
              size={'sm'}
              shadow={'shadowNone'}
              className="bg-transparent border border-primaryColor text-primaryColor hover:text-white hover:bg-orange-500"
              onClick={() => handleResponseRequestJoinTeam(false)}
            >
              Reject
            </Button>
          </div>
        )}
    </div>
  );
};

export default NotificationCard;
