'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Loaders from '../../atoms/loaders/loaders';
import { getProfileAPI, getProfileAPI1 } from '@/services/user';
import { data } from 'react-router-dom';

const RoleDirectionRouter = (props: any) => {
  const { session } = props;
  const router = useRouter();

  // console.log('session', session);

  useEffect(() => {
    if (!session?.user) {
      router.push('/home');
      return;
    }

    const getProfile = async () => {
      try {
        const res = await getProfileAPI(session.user?.id);
        console.log('Check res profile', res);
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...res,
              access_token: session.user?.access_token,
            }),
          );
        }
      } catch (error: any) {
        console.log('error', error);
      }
    };

    const getProfile1 = async () => {
      try {
        const res = await getProfileAPI1(session.user?.access_token);
        console.log('Check res profile', res);
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...res.data,
              access_token: session.user?.access_token,
            }),
          );
        }
      } catch (error: any) {
        console.log('error', error);
      }
    };

    // getProfile();
    getProfile1();
    // Store user data only if session.user exists

    if (session?.user?.userRoles.includes('Admin')) {
      router.push('/dashboard');
    } else if (session?.user?.userRoles.includes('Staff')) {
      router.push('/dashboard');
    } else if (session?.user?.userRoles.includes('Athlete')) {
      router.push('/home');
    } else if (!session) {
      router.push('/home');
    }
  }, [session, router]);

  return (
    <div>
      <Loaders isLoading={true} />
    </div>
  );
};
export default RoleDirectionRouter;
