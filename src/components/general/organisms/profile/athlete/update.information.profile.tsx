'use client';

import { Button, ConfigProvider, DatePicker, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import ModalChangePassword from '../../auth/modal.change.password';
import { useProfileContext } from '@/context/profile.context';
import { getProfileAPI, updateProfileAPI } from '@/services/user';
import dayjs from 'dayjs';

const UpdateInformationProfile = ({
  session,
  profile,
  setProfile,
}: {
  session: any;
  profile: any;
  setProfile: React.Dispatch<any>;
}) => {
  const [changePassword, setChangePassword] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getProfile = async () => {
    if (!user) return;
    try {
      const response = await getProfileAPI(user?.id);
      // console.log('Check profile', response);
      setProfile(response);
      form.setFieldsValue({
        name: response?.name,
        email: response?.email,
        dateOfBirth: response?.dateOfBirth ? dayjs(response.dateOfBirth) : null,
        gender: response?.gender,
        hands: response?.hands === null ? '' : response?.hands,
        height: response?.height === null ? '' : response?.height,
        location: response?.location === null ? '' : response?.location,
        phoneNumber:
          response?.phoneNumber === null ? '' : response?.phoneNumber,
        placeOfBirth:
          response?.placeOfBirth === null ? '' : response?.placeOfBirth,
        sportAmbitions:
          response?.sportAmbitions === null ? '' : response?.sportAmbitions,
        startPlayingCompetitively:
          response?.startPlayingCompetitively === null
            ? ''
            : response?.startPlayingCompetitively,
        startPlayingSport:
          response?.startPlayingSport === null
            ? ''
            : response?.startPlayingSport,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handleUpdateInformation = async (values: any) => {
    // console.log('values', values);
    if (!user) return;

    const cleanedValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== ''),
    );

    // Format dateOfBirth if it exists
    const formattedDOB = cleanedValues.dateOfBirth
      ? dayjs(values.dateOfBirth).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
      : null;

    // console.log('Check formatted DOB', formattedDOB);
    try {
      const response = await updateProfileAPI(
        {
          ...cleanedValues,
          dateOfBirth: formattedDOB,
        },
        user?.access_token,
      );
      console.log('Check update', response);
      getProfile();
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <h1 className="text-[20px] font-bold">Updates Infomation</h1>
      <Form
        autoComplete="off"
        onFinish={handleUpdateInformation}
        layout="vertical"
        style={{ width: '50%', fontFamily: 'inherit', fontWeight: '400' }}
        form={form}
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
            initialValue={profile?.name}
            style={{ fontFamily: 'inherit' }}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            initialValue={profile?.email}
            style={{ fontFamily: 'inherit' }}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            initialValue={profile?.gender}
          >
            <Select
              options={[
                { value: 'MALE', label: 'Male' },
                { value: 'FEMALE', label: 'Female' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            initialValue={profile?.phoneNumber}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label="Date Of Birth"
            name="dateOfBirth"
            initialValue={profile?.dateOfBirth}
          >
            <DatePicker format={'YYYY-MM-DD'} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Hands" name="hands" initialValue={profile?.hands}>
            <Select
              placeholder="Select your hands"
              title="Select your hands"
              options={[
                { value: 'right', label: 'Right' },
                { value: 'left', label: 'Left' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Height"
            name="height"
            initialValue={profile?.height}
          >
            <Input placeholder="Enter your height" />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            initialValue={profile?.location}
          >
            <Input placeholder="Enter your location" />
          </Form.Item>

          <Form.Item
            label="Place Of Birth"
            name="placeOfBirth"
            initialValue={profile?.placeOfBirth}
          >
            <Input placeholder="Enter your place of birth" />
          </Form.Item>

          <Form.Item
            label="Sport Ambitions"
            name="sportAmbitions"
            initialValue={profile?.sportAmbitions}
          >
            <Input.TextArea placeholder="Write about your sport ambitions" />
          </Form.Item>

          <Form.Item
            label="When did you start playing competitively?"
            name="startPlayingCompetitively"
            initialValue={profile?.startPlayingCompetitively}
          >
            <Input.TextArea placeholder="Write here" />
          </Form.Item>

          <Form.Item
            label="When did you start playing sport?"
            name="startPlayingSport"
            initialValue={profile?.startPlayingSport}
          >
            <Input.TextArea placeholder="Write here" />
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
