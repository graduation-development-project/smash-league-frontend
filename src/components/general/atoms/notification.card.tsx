'use client';
import React from 'react';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import {
  responseInvitationAPI,
  responseRequestJoinTeamAPI,
  responseRequestLeaveTeamAPI,
  responseRequestTransferTeamLeaderAPI,
} from '@/services/team';
import { useProfileContext } from '@/context/profile.context';
import { toast } from 'react-toastify';
import { Avatar } from 'antd';
import { getNotificationAPI } from '@/services/notification';
// import images from '@/assets/images';

const NotificationCard = ({
  notification,
  hiddenBtn = false,
  setNotifications,
}: {
  notification: NotificationProps;
  hiddenBtn?: boolean;
  setNotifications?: (notifications: any) => void;
}) => {
  const { user } = useProfileContext();

  const getNotifications = async () => {
    try {
      const response = await getNotificationAPI(user?.access_token);
      console.log(response?.data);
      setNotifications && setNotifications(response?.data);
    } catch (error: any) {
      console.error(error);
    }
  };
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

      if (response.status === 200 || response.status === 201) {
        getNotifications();
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

  const handleResponseRequestTeam = async (option: boolean) => {
    if (!user?.access_token) return;
    // console.log('user', user);

    try {
      let response;
      if (notification?.type?.typeOfNotification === 'Join Team') {
        response = await responseRequestJoinTeamAPI(
          '',
          notification?.teamRequest?.team?.id,
          notification?.teamRequestId,
          option,
          user?.access_token,
        );
      } else if (notification?.type?.typeOfNotification === 'Leave Team') {
        response = await responseRequestLeaveTeamAPI(
          notification?.teamRequest?.team?.id,
          notification?.teamRequestId,
          option,
          user?.access_token,
        );
      } else if (
        notification?.type?.typeOfNotification === 'Transfer Team Leader'
      ) {
        response = await responseRequestTransferTeamLeaderAPI(
          notification?.teamRequestId,
          option,
          user?.access_token,
        );
      }

      console.log(response);
      if (response.status === 200 || response.status === 201) {
        getNotifications && getNotifications();
        if (notification?.type?.typeOfNotification === 'Transfer Team Leader') {
          if (!user?.role.includes('Team Leader')) {
            const newUser = {
              ...user,
              role: [...user.role, 'Team Leader'],
            };
            localStorage.setItem('user', JSON.stringify(newUser));
          }
        }
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
      <div className="flex gap-3 items-center">
        <Avatar
          shape="square"
          size={60}
          style={{
            // backgroundColor: `${teamDetails?.logo ? '' : '#FF8243'}`,
            boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
          }}
          src={
            notification?.teamRequest?.team?.logo ??
            notification?.teamInvitation?.team?.logo ??
            'https://res.cloudinary.com/dqdggrw7o/image/upload/v1743059350/22683f5e-5d6b-4c4e-b145-3be3e02d0887_yaijpa.jpg'
          }
          alt="Team Logo"
        />
        <div className="flex flex-col gap-1 ">
          <h1 className="text-[16px] font-bold">{notification?.title}</h1>
          <p className="text-[14px] text-slate-500 text-justify">
            {notification?.message}
          </p>
          <p className="text-[12px]">{date}</p>
        </div>
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
        notification?.teamRequest?.status === 'PENDING' && (
          <div className="flex gap-2">
            <Button
              size={'sm'}
              shadow={'shadowNone'}
              colorBtn={'gradientGreenBtn'}
              onClick={() => handleResponseRequestTeam(true)}
            >
              Approve
            </Button>
            <Button
              size={'sm'}
              shadow={'shadowNone'}
              className="bg-transparent border border-primaryColor text-primaryColor hover:text-white hover:bg-orange-500"
              onClick={() => handleResponseRequestTeam(false)}
            >
              Reject
            </Button>
          </div>
        )}
    </div>
  );
};

export default NotificationCard;
