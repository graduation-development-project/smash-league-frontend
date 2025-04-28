'use client';

import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Result } from 'antd';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import { acceptPaymentAPI } from '@/services/payment';

const SuccessPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const acceptPayment = async () => {
    if (!user) return;
    try {
      const response = await acceptPaymentAPI(transactionId, user.access_token);
      console.log(response, 'accept payment');
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    acceptPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#74ba74',
          },
        }}
      >
        <div className="animate-fadeInBottom p-20">
          <Result
            status="success"
            icon={
              <div className="flex justify-center animate-fadeInBottom">
                <FaRegCheckCircle size={100} className="text-green-500" />
              </div>
            }
            title="Successful Payment"
            subTitle="Please check your transaction history"
            style={{ fontFamily: 'inherit', fontWeight: '500' }}
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  router.push('/');
                }}
                style={{ fontFamily: 'inherit', fontWeight: '500' }}
              >
                Go Home
              </Button>,
              // <Button
              //   style={{ fontFamily: 'inherit', fontWeight: '500' }}
              //   key="buy"
              //   onClick={() => {
              //     router.push('/packages');
              //   }}
              // >
              //   Buy Again
              // </Button>,
            ]}
          />
        </div>
      </ConfigProvider>
    </>
  );
};

export default SuccessPage;
