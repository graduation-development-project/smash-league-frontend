'use client';
import React, { useEffect, useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Result, Typography } from 'antd';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { rejectPaymentAPI } from '@/services/payment';
// const { Paragraph, Text } = Typography;
const FailPage = () => {
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

  const rejectPayment = async () => {
    if (!user) return;
    try {
      const response = await rejectPaymentAPI(transactionId, user.access_token);
      // console.log(response, 'reject payment');
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    rejectPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FF8243',
          },
        }}
      >
        <div className="animate-fadeInBottom">
          <Result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
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
              </Button>,
            ]}
          ></Result>
        </div>
      </ConfigProvider>
    </>
  );
};

export default FailPage;
