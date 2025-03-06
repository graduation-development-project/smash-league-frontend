'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Loaders from '../../atoms/loaders/loaders';

const RoleDirectionRouter = (props: any) => {
  const { session } = props;
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      router.push('/dashboard');
    } else if (session?.user?.role === 'Athlete') {
      router.push('/home');
    } else {
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
