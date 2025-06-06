'use client';
import React, { useState } from 'react';
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
} from 'antd';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';

const VerifyForm = (props: any) => {
  const { email } = props;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    const { email, otp } = values;
    setIsLoading(true);
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-otp`,
      method: 'PUT',
      body: {
        email,
        otp,
      },
    });

    if (res?.status === 200) {
      setIsLoading(false);
      message.success('Verify successfully.');
      router.push(`/auth/login`);
    } else {
      setIsLoading(false);
      notification.error({
        message: 'Verify error',
        description: res?.message,
      });
    }
  };

  return (
    <Row
      justify={'center'}
      style={{ marginTop: '30px', fontFamily: 'inherit' }}
    >
      <Col xs={24} md={16} lg={8} style={{ fontFamily: 'inherit' }}>
        <fieldset
          style={{
            padding: '15px',
            margin: '5px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <legend>Activate Account</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            style={{ fontFamily: 'inherit' }}
          >
            <Form.Item label="Email" name="email" initialValue={email} hidden>
              <Input disabled />
            </Form.Item>
            <div>
              OTP has been sent to your email. Please enter the OTP below.
            </div>
            <Divider />

            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    /* here is your component tokens */
                    hoverBorderColor: '#FF8243',
                    activeBorderColor: '#FF8243',
                  },
                },
              }}
            >
              <Form.Item
                label="OTP"
                name="otp"
                style={{ fontFamily: 'inherit' }}
                rules={[
                  {
                    required: true,
                    message: 'Please input your OTP!',
                  },
                ]}
              >
                <Input.OTP style={{ fontFamily: 'inherit' }} />
              </Form.Item>
            </ConfigProvider>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  background: '#74ba74',
                  fontFamily: 'inherit',
                  fontWeight: '500',
                }}
              >
                Submit {isLoading && <LoadingOutlined />}
              </Button>
            </Form.Item>

            <Link
              href={'/'}
              style={{ color: '#FF8243', fontFamily: 'inherit' }}
            >
              <ArrowLeftOutlined /> Back to Home
            </Link>
          </Form>

          <Divider />
          <div style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link href={'/auth/login'} style={{ color: '#74ba74' }}>
              Log In
            </Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default VerifyForm;
