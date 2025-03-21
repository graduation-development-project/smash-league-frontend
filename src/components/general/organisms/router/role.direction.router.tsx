'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Loaders from '../../atoms/loaders/loaders';

const RoleDirectionRouter = (props: any) => {
  const { session } = props;
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push('/home');
      return;
    }

    // Store user data only if session.user exists
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(session.user));
    }

    if (session?.user?.role.includes('Admin')) {
      router.push('/dashboard');
    } else if (session?.user?.role.includes('Athlete')) {
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
