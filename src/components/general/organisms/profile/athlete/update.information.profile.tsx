'use client';

import { Button, ConfigProvider, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import ModalChangePassword from '../../auth/modal.change.password';
import { useProfileContext } from '@/context/profile.context';

const UpdateInformationProfile = (props: any) => {
  const { session } = props;
  const [changePassword, setChangePassword] = useState(false);

   const [user, setUser] = useState<any>(null);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
        }
      }
    }, []);
  const handleUpdateInformation = (values: any) => {
    console.log('Check', values);
  };
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <h1 className="text-[20px] font-bold">Updates Infomation</h1>
      <Form
        autoComplete="off"
        onFinish={handleUpdateInformation}
        layout="vertical"
        style={{ width: '50%', fontFamily: 'inherit', fontWeight: '400' }}
      >
        <ConfigProvider
          theme={{
            components: {
              Input: {
                /* here is your component tokens */
                activeBorderColor: '#FF8243',
                activeShadow: '0 0 0 2px #fffff',
                hoverBorderColor: '#FF8243',
              },
            },
          }}
        >
          <Form.Item
            label="Full Name"
            name="name"
            initialValue={user?.name}
            style={{ fontFamily: 'inherit' }}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item label="Age" name="age" initialValue={24}>
            <Input placeholder="Enter your age" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            initialValue={'Dist. 12, Ho Chi Minh'}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>
        </ConfigProvider>

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#74ba74',
            },
          }}
        >
          <Form.Item>
            <div className="flex justify-end gap-1">
              <Button
                style={{ fontFamily: 'inherit', fontWeight: '500' }}
                onClick={() => setChangePassword(true)}
              >
                Change Password
              </Button>
              <Button
                style={{ fontFamily: 'inherit', fontWeight: '500' }}
                type="primary"
                htmlType="submit"
              >
                Update
              </Button>
            </div>
          </Form.Item>
        </ConfigProvider>
      </Form>

      <ModalChangePassword
        isModalOpen={changePassword}
        setIsModalOpen={setChangePassword}
      />
    </div>
  );
};

export default UpdateInformationProfile;
