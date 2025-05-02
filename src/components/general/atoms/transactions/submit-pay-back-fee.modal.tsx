'use client';
import { payBackTournamentFeeAPI } from '@/services/payment';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Image, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SubmitPayBackFeeModal = ({
  isModalOpen,
  setIsModalOpen,
  accessToken,
  paybackFeeId,
  getPayBackFeeList,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string;
  paybackFeeId: string;
  getPayBackFeeList: any;
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState<File | null>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePayBackTournamentFee = async (values: any) => {
    try {
      setIsLoading(true);
      if (!file) {
        console.error('No file selected');
        return;
      }
      const response = await payBackTournamentFeeAPI(
        values.transactionDetail,
        paybackFeeId,
        file,
        accessToken,
      );
      console.log('Check paybacksubmit', response);
      if (response.statusCode === 200 || response.statusCode === 201) {
        form.resetFields();
        setFile(null);
        setIsLoading(false);
        getPayBackFeeList();
        setIsModalOpen(false);

        toast.success(`${response?.message}`, {
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
        form.resetFields();
        setFile(null);
        setIsLoading(false);
        setIsModalOpen(false);
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

      // setPayBackFeeList(response);
    } catch (error) {
      console.error(error);
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
          title="Pay Back Fee Submission"
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
            onFinish={handlePayBackTournamentFee}
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
                name="paybackFeeId"
                label="Pay Back Fee ID"
                initialValue={paybackFeeId}
                hidden
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="paybackImage"
                label="Pay Back Image"
                // style={{ fontFamily: 'inherit', fontWeight: '500' }}
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
                <div className="flex flex-wrap gap-4">
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
                name="transactionDetail"
                label="Transaction Detail"
                initialValue={'Pay Back Fee Transaction'}
              >
                <TextArea defaultValue={'Pay Back Fee Transaction'} />
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
                      Submit
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

export default SubmitPayBackFeeModal;
