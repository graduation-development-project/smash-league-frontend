'use client';
import { Button, ConfigProvider, Form, Image, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import TeamDetails from '../../../../app/(guest)/teams/details/[name]/page';
import { useTeamsContext } from '@/library/teams.context';
import { updateTeamDetailsAPI } from '@/services/team';
import { toast } from 'react-toastify';
import { TbLoader2 } from 'react-icons/tb';

const UpdateTeamsForm = (props: any) => {
  const { user } = props;
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>('');
  const { teamDetails, fetchTeamDetails } = useTeamsContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // api truyen file => URL 3 anh sau khi up len cloud

  console.log('Check', teamDetails);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleUpdateTeam = async (values: any) => {
    const { teamId, teamName, teamDescription } = values;
    const accessToken = user?.access_token;
    // console.log("Check", accessToken)
    // console.log("Check", values)
    setIsLoading(true);
    const response = await updateTeamDetailsAPI(
      file,
      teamName,
      teamDescription,
      teamId,
      accessToken,
    );

    // console.log('Check', response);
    setIsLoading(false);
    if (response?.status === 200 || response?.status === 201) {
      await fetchTeamDetails(teamId);
      toast.success('Update team successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      toast.error(`${response?.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    // TO DO: implement the logic to update the team
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <h1 className="text-[20px] font-bold">Updates Teams Infomation</h1>
      <Form
        autoComplete="off"
        onFinish={handleUpdateTeam}
        layout="vertical"
        style={{ width: '50%' }}
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
            label="Team Id"
            name="teamId"
            hidden
            initialValue={teamDetails?.id}
          >
            <Input placeholder="Team Id" disabled />
          </Form.Item>

          <Form.Item
            label="Team Name"
            name="teamName"
            rules={[
              { required: true, message: 'Please input your team name!' },
            ]}
            initialValue={teamDetails?.teamName}
          >
            <Input
              placeholder="Team Name"
              // defaultValue={teamDetails?.teamName}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="teamDescription"
            rules={[
              {
                required: true,
                message: 'Please input your team description!',
              },
            ]}
            initialValue={teamDetails?.description}
          >
            <TextArea
              rows={4}
              placeholder="Team Description"
              // defaultValue={teamDetails?.description}
            />
          </Form.Item>

          <Form.Item name="teamImage" label="Team Image">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </Form.Item>

          <Form.Item>
            {file && (
              <Image
                src={URL.createObjectURL(file)}
                alt="Uploaded"
                width={200}
                height={200}
              />
            )}
          </Form.Item>

          <Form.Item>
            <div className="w-full flex justify-end gap-2">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#74ba74',
                  },
                }}
              >
                <Button
                  style={{ fontWeight: '500' }}
                  type="primary"
                  htmlType="submit"
                >
                  Update Team{' '}
                  {isLoading && <TbLoader2 className="animate-spin" />}
                </Button>
              </ConfigProvider>
            </div>
          </Form.Item>
        </ConfigProvider>
      </Form>
    </div>
  );
};

export default UpdateTeamsForm;
