'use client';
import { registerNewRoleAPI } from '@/services/user';
import { LoadingOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Image, Button, ConfigProvider } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const BecomeOrganizerForm = () => {
  const [identificationCardFiles, setIdentificationCardFiles] = useState<
    File[]
  >([]);
  const [file, setFile] = useState<File>();
  const [form] = Form.useForm();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
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
  // console.log('Check user', user);

  const onFinish = async (values: any) => {
    if (!user) return;
    const { role } = values;
    const imageList = [...identificationCardFiles, file ?? new File([], '')];
    // console.log('Check image', imageList);
    setIsLoading(true);
    try {
      const response = await registerNewRoleAPI(
        role,
        [...identificationCardFiles, file ?? new File([], '')],
        user?.access_token,
      );

      if (response?.status === 200 || response?.status === 201) {
        setIsLoading(false);
        form.resetFields();
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
        setIsLoading(false);
        form.resetFields();
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
      setIsLoading(false);
      console.log(error);
    }
  };
  // console.log('Check idcard', identificationCardFiles);
  // console.log('Check Files', file);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Row style={{ width: '100%' }} justify={'center'}>
        <Col xs={24} md={16} lg={14}>
          <fieldset
            style={{
              padding: '15px',
              margin: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              fontFamily: 'inherit',
            }}
          >
            <legend className="font-semibold text-[22px] border-none outline-none">
              <span className="text-secondColor font-bold">Organizer</span>{' '}
              Verification
            </legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              style={{ fontFamily: 'inherit' }}
              form={form}
              // layout="vertical"
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#74ba74',
                  },
                }}
              >
                <Form.Item
                  label="Role"
                  name="role"
                  hidden
                  initialValue={'Organizer'}
                >
                  <Input placeholder="Role Name" disabled />
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
                <Form.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                    {isLoading && (
                      <LoadingOutlined
                        style={{ marginLeft: '5px', fontSize: '20px' }}
                      />
                    )}
                  </Button>
                </Form.Item>
              </ConfigProvider>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </div>
  );
};

export default BecomeOrganizerForm;
