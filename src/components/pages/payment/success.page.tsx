'use client';

import React from 'react';
import { Button, ConfigProvider, Result } from 'antd';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const SuccessPage = () => {
  const router = useRouter();
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#74ba74',
          },
        }}
      >
        <div className="animate-fadeInBottom">
          <Result
            status="success"
            icon={
              <div className="flex justify-center animate-fadeInBottom">
                <FaRegCheckCircle size={100} className="text-green-500" />
              </div>
            }
            title="Successfully Purchased Packages"
            subTitle="Please check your credit in the profile page"
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
              <Button
                style={{ fontFamily: 'inherit', fontWeight: '500' }}
                key="buy"
                onClick={() => {
                  router.push('/packages');
                }}
              >
                Buy Again
              </Button>
            ]}
          />
        </div>
      </ConfigProvider>
    </>
  );
};

export default SuccessPage;
