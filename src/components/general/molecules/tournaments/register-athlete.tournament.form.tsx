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
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

const RegisterAthleteTournamentForm = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const tournamentId = 1;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [identificationCardFiles, setIdentificationCardFiles] = useState<
    File[]
  >([]);
  const [file, setFile] = useState<File>();

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
    setIsModalOpen(false);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleRegisterTournament = () => {};
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
            onFinish={handleRegisterTournament}
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
                label="Tournament ID"
                name="tournamentId"
                hidden
                initialValue={tournamentId}
              >
                <Input placeholder="Tournament ID" disabled />
              </Form.Item>

              <Form.Item
                label="Registration Role"
                name="registrationRole"
                hidden
                initialValue={'ATHLETE'}
              >
                <Input placeholder="Registration Role" disabled />
              </Form.Item>

              <Form.Item
                name="tournamentEventId"
                label="Tournament Events"
                style={{ fontFamily: 'inherit', fontWeight: '500' }}
              >
                <Select
                  defaultValue="lucy"
                  style={{ width: '100%' }}
                  onChange={handleChange}
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled', disabled: true },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="identificationCardImages"
                label="ID Card Images"
                style={{ fontFamily: 'inherit', fontWeight: '500' }}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleidentificationFileChange}
                  className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-secondColor hover:file:bg-green-100"
                />
              </Form.Item>

              <Form.Item>
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
              </Form.Item>

              <Form.Item
                name="idPhoto"
                label="ID Photo"
                style={{ fontFamily: 'inherit', fontWeight: '500' }}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-secondColor hover:file:bg-green-100"
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

export default RegisterAthleteTournamentForm;
