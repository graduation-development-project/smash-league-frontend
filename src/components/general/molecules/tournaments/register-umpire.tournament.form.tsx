'use client';

import { registerTournamentByAthleteAPI } from '@/services/tour-registration';
import { calculateAge } from '@/utils/calculateAge';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Form,
  Image,
  Input,
  Modal,
  Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const RegisterUmpireTournamentForm = ({
  isRegisterModalOpen,
  setIsRegisterModalOpen,
  detail,
}: {
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  detail: any;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [identificationCardFiles, setIdentificationCardFiles] = useState<
    File[]
  >([]);
  const [file, setFile] = useState<File>();

  const [user, setUser] = useState<any>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {});
      }
    }
  }, []);

  const handleidentificationFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setIdentificationCardFiles([
        ...identificationCardFiles,
        ...Array.from(e.target.files),
      ]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    setIsRegisterModalOpen(false);
    setIdentificationCardFiles([]);
    setFile(undefined);
    form.resetFields();
  };

  const handleChange = (value: string, option: any) => {
    if (option.label.toUpperCase().includes('DOUBLE')) {
      // setIsHasPartner(true);
    } else {
      // setIsHasPartner(false);
    }
  };
  const handleRegisterTournament = async (values: any) => {
    if (!user) return;
    const { tournamentId, registrationRole } = values;
    const imageList = [...identificationCardFiles, file];
    // console.log(values, 'values');
    try {
      setIsLoading(true);
      const response = await registerTournamentByAthleteAPI(
        user?.access_token,
        tournamentId,
        registrationRole,
        imageList,
        '',
        '',
        '',
        [
          {
            name: 'Nguyen',
          },
        ],
        [
          {
            name: 'Nguyen',
          },
        ],
      );
      if (response?.status === 200 || response?.status === 201) {
        setIsRegisterModalOpen(false);
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
        setIsRegisterModalOpen(false);
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
          title="Registration Form"
          width={500}
          open={isRegisterModalOpen}
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
            onFinish={handleRegisterTournament}
            layout="vertical"
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
                label="Tournament ID"
                name="tournamentId"
                hidden
                initialValue={detail?.id}
              >
                <Input placeholder="Tournament ID" disabled />
              </Form.Item>

              <Form.Item
                label="Registration Role"
                name="registrationRole"
                hidden
                initialValue={'UMPIRE'}
              >
                <Input placeholder="Registration Role" disabled />
              </Form.Item>

              <h1 className="text-[20px] font-bold mb-2">
                Umpire Infomations:
              </h1>

              <div>
                <h1 className="font-semibold text-[14px] mb-2">
                  ID Card Images
                </h1>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleidentificationFileChange}
                  className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-secondColor hover:file:bg-green-100"
                />
                {/* </Form.Item> */}

                {/* <Form.Item> */}
                <div className="flex flex-wrap gap-4">
                  {identificationCardFiles.map((file, index) => (
                    <Image
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt="Uploaded"
                      width={200}
                      height={200}
                      className="max-w-full h-auto rounded-lg shadow"
                    />
                  ))}
                </div>
              </div>

              <div>
                <h1 className="font-semibold text-[14px] mb-2">Card Photo</h1>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-secondColor hover:file:bg-green-100"
                />
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
              </div>

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

export default RegisterUmpireTournamentForm;
