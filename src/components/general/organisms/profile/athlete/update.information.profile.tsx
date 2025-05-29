'use client';

import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import ModalChangePassword from '../../auth/modal.change.password';
import {
  getProfileAPI,
  getProfileAPI1,
  updateProfileAPI,
  uploadAvatarAPI,
} from '@/services/user';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import AddBankAccountModal from '@/components/general/atoms/profile/add-bank-account.modal';
import { LoadingOutlined } from '@ant-design/icons';

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
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarImage, setAvatarImage] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const getProfile = async () => {
    if (!user) return;
    try {
      const response = await getProfileAPI(user?.id);
      console.log('Check profile', response);
      setProfile(response);
      form.setFieldsValue({
        name: response?.name,
        email: response?.email,
        dateOfBirth: response?.dateOfBirth ? dayjs(response.dateOfBirth) : null,
        gender: response?.gender,
        hands: response?.hands === null ? '' : response?.hands,
        height: response?.height === null ? '' : response?.height,
        level: response?.level === null ? '' : response?.level,
        experience: response?.experience === null ? '' : response?.experience,
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
        description:
          response?.description === null ? '' : response?.description,
        avatarUrl: response?.avatarUrl === null ? '' : response?.avatarUrl,
      });
    } catch (error: any) {
      console.log(error);
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

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const uploadAvatar = async () => {
    if (!user) return;
    try {
      const response = await uploadAvatarAPI(file, user?.access_token);
      console.log('Check upload avatar', response);
      setAvatarImage(response?.data?.data);
      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode === 201
      ) {
        toast.success(`${response?.data?.message}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        toast.error(`${response?.data?.message}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

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

    // console.log('Check clean values', cleanedValues);
    try {
      setIsLoading(true);
      if (avatarImage !== null) cleanedValues.avatarURL = avatarImage;
      console.log('Check image', avatarImage);
      const response = await updateProfileAPI(
        {
          ...cleanedValues,
          dateOfBirth: formattedDOB,
        },
        user?.access_token,
      );
      // console.log('Check update', response?.data);
      if (response?.status === 200 || response?.status === 201) {
        setIsUpdated(false);
        form.resetFields();
        setFile(null);
        setAvatarImage('');
        setIsLoading(false);
        getProfile1();
        toast.success('Update profile successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        setIsLoading(false);
        toast.error(`Please try again`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
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
            // initialValue={profile?.dateOfBirth}
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

          {/* <Form.Item label="Level" name="level" initialValue={profile?.level}>
            <Select
              placeholder="Select your level"
              options={[
                { value: 'professional', label: 'Professional' },
                { value: 'amateur', label: 'Amateur' },
                // { value: 'beginner', label: 'Beginner' },
                // { value: 'intermediate', label: 'Intermediate' },
                // { value: 'advanced', label: 'Advanced' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Experience"
            name="experience"
            // initialValue={profile?.dateOfBirth}
          >
            <DatePicker
              format={'YYYY'}
              style={{ width: '100%' }}
              picker="year"
            />
          </Form.Item> */}

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

          <Form.Item
            label="Description (For Organizers)"
            name="description"
            initialValue={profile?.description}
          >
            <Input.TextArea
              placeholder="Write here"
              disabled={user?.userRoles.includes('Organizer') ? false : true}
            />
          </Form.Item>

          <Form.Item name="avatarUrl" label="Avatar">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </Form.Item>

          {(file || profile?.avatarUrl) && (
            <Image
              src={file ? URL.createObjectURL(file) : profile.avatarUrl}
              alt="Avatar"
              width={200}
              height={200}
            />
          )}
        </ConfigProvider>

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#74ba74',
            },
          }}
        >
          <Form.Item>
            <div className="flex justify-between items-center">
              <div className="cursor-pointer text-[14px] hover:underline hover:text-secondColor hover:font-semibold ">
                Change Password
              </div>
              <div className="flex justify-end gap-1">
                <Button
                  style={{ fontFamily: 'inherit', fontWeight: '500' }}
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Bank Account
                </Button>
                {file && !isUpdated ? (
                  <Button
                    style={{ fontFamily: 'inherit', fontWeight: '500' }}
                    // type="primary"
                    // htmlType="submit"
                    onClick={() => {
                      uploadAvatar();
                      setIsUpdated(true);
                    }}
                  >
                    Upload {isLoading && <LoadingOutlined />}
                  </Button>
                ) : (
                  <Button
                    style={{ fontFamily: 'inherit', fontWeight: '500' }}
                    type="primary"
                    htmlType="submit"
                  >
                    Update {isLoading && <LoadingOutlined />}
                  </Button>
                )}
              </div>
            </div>
          </Form.Item>
        </ConfigProvider>
      </Form>

      <ModalChangePassword
        isModalOpen={changePassword}
        setIsModalOpen={setChangePassword}
      />

      <AddBankAccountModal
        session={session}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        accessToken={user?.access_token}
      />
    </div>
  );
};

export default UpdateInformationProfile;
