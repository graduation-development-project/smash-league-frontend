'use client';
import {
  assignUmpireToMatchAPI,
  getTournamentUmpiresParticipantsAPI,
} from '@/services/tournament';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UmpireAssignModal = ({
  isModalOpen,
  setIsModalOpen,
  tournamentId,
  matchId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tournamentId: string | string[];
  matchId: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [umpiresList, setUmpiresList] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();

  const getTournamentUmpiresParticipants = async () => {
    const res = await getTournamentUmpiresParticipantsAPI(
      user?.access_token,
      tournamentId,
    );

    // console.log(res?.data.data, 'check umpires');
    if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
      // Transform data into correct format
      const formatData = res.data.data.map((umpire: any) => ({
        value: umpire.userId,
        label: umpire.user.name,
        disabled: umpire.isAvailable ? false : true,
      }));

      setUmpiresList(formatData);
    } else {
      setUmpiresList([]);
    }
  };

  useEffect(() => {
    getTournamentUmpiresParticipants();
  }, [isModalOpen]);

  const handleAssignUmpire = async (values: any) => {
    const { umpireId } = values;
    try {
      setIsLoading(true);
      const response = await assignUmpireToMatchAPI(
        user?.access_token,
        tournamentId,
        matchId,
        umpireId,
      );
      console.log('check res', response);
      if (response?.data.statusCode === 200 || response?.data?.statusCode === 201) {
        setIsModalOpen(false);
        setIsLoading(false);
        toast.success(`${response?.data?.message}`, {
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
        setIsModalOpen(false);
        setIsLoading(false);
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
    } catch (error: any) {
      console.log('Error', error);
    }
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
          title="Umpire Assign Form"
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
            onFinish={handleAssignUmpire}
            layout="horizontal"
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
              <Form.Item label="Umpire" name="umpireId">
                <Select
                  //   defaultValue="lucy"
                  style={{ width: '100%' }}
                  //   onChange={handleChange}
                  options={umpiresList}
                />
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
                      Register
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

export default UmpireAssignModal;
