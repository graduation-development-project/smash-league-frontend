'use client';

import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Result, Typography } from 'antd';
import { useRouter } from 'next/navigation';
const { Paragraph, Text } = Typography;
const FailPage = () => {
  const router = useRouter();
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FF8243',
          },
        }}
      >
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
        >
          {/* <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              The content you submitted has the following error:
            </Text>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" /> Your
            account has been frozen. <a>Thaw immediately &gt;</a>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" /> Your
            account is not yet eligible to apply. <a>Apply Unlock &gt;</a>
          </Paragraph>
        </div> */}
        </Result>
      </ConfigProvider>
    </>
  );
};

export default FailPage;
