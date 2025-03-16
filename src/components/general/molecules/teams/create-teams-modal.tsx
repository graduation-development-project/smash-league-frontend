'use client';
import { useTeamsContext } from '@/context/teams.context';
import { createTeamAPI, searchTeamsAPI } from '@/services/team';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input, Modal, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CreateTeamsModal = ({
  isModalOpen,
  setIsModalOpen,
  session,
}: CreateTeamsModalProps) => {
  const [teamLeaderId, setTeamLeaderId] = React.useState<string>('1');
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getTeams } = useTeamsContext();

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') as string) || {};
    setUser(storedUser);
  }, []);

  // console.log('check', session?.user?.access_token);
  // api truyen file => URL 3 anh sau khi up len cloud

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleCreateTeam = async (values: any) => {
    const { teamLeaderId, teamName, teamDescription } = values;
    const accessToken = session?.user?.access_token;
    setIsLoading(true);
    const response = await createTeamAPI(
      file,
      teamName.trim(),
      teamDescription,
      accessToken,
    );

    // console.log('Check', response);
    setIsLoading(false);
    if (response?.status === 200 || response?.status === 201) {
      await getTeams(1, 6, '');
      setIsModalOpen(false);
      if (!user?.role.includes('Team Leader')) {
        const newUser = {
          ...user,
          role: [...user.role, 'Team Leader'],
        };
        localStorage.setItem('user', JSON.stringify(newUser));
      }
      toast.success('Create team successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      // window.location.reload();
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
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              /* here is your component tokens */
              defaultHoverBorderColor: '#FF8243',
              defaultHoverColor: '#FF8243',
              defaultActiveColor: '#FF8243',
              defaultActiveBorderColor: '#FF8243',
            },
          },
        }}
      >
        <Modal
          title="Create Team Form"
          width={500}
          open={isModalOpen}
          //   onOk={handleOk}
          okButtonProps={{
            style: {
              display: 'none',
            },
          }}
          onCancel={handleCancel}
          cancelButtonProps={{
            style: { fontWeight: '600', display: 'none' },
          }}
        >
          <Form
            autoComplete="off"
            onFinish={handleCreateTeam}
            layout="vertical"
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
                label="Team Leader Id"
                name="teamLeaderId"
                hidden
                initialValue={teamLeaderId}
              >
                <Input placeholder="Team" disabled />
              </Form.Item>

              <Form.Item
                label="Team Name"
                name="teamName"
                rules={[
                  { required: true, message: 'Please input your team name!' },
                ]}
              >
                <Input placeholder="Team Name" />
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
              >
                <TextArea rows={4} placeholder="Team Description" />
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
                <div>
                  {file && (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Uploaded"
                      width={200}
                      height={200}
                      className="max-w-full h-auto rounded-lg shadow"
                    />
                  )}
                </div>
              </Form.Item>

              <Form.Item>
                <div className="w-full flex justify-end gap-2">
                  <Button
                    type="default"
                    htmlType="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>

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
                      Create Team
                      {isLoading && (
                        <LoadingOutlined
                          style={{ marginLeft: '5px', fontSize: '20px' }}
                        />
                      )}
                    </Button>
                  </ConfigProvider>
                </div>
              </Form.Item>
            </ConfigProvider>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default CreateTeamsModal;
