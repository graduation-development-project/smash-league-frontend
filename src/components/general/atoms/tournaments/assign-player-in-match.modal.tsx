'use client';
import { assignPlayerInMatchAPI } from '@/services/match';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AssignPlayerInMatchModal = ({
  isModalOpen,
  setIsModalOpen,
  matchId,
  playersOptions,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  matchId: string;
  playersOptions: any[];
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleAssignPlayer = async (values: any) => {
    const { rightCompetitorId, leftCompetitorId } = values;
    // console.log('Check right', rightCompetitorId);
    // console.log('Check left', leftCompetitorId);

    try {
      const response = await assignPlayerInMatchAPI(
        matchId,
        leftCompetitorId,
        rightCompetitorId,
      );
      if (
        response?.data?.statusCode === 201 ||
        response?.data?.statusCode === 200
      ) {
        setIsLoading(false);
        setIsModalOpen(false);
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
      console.log('Check error', error);
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
          title="Athlete Assign Form"
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
            onFinish={handleAssignPlayer}
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
              <Form.Item label="Right Competitor" name="rightCompetitorId">
                <Select
                  showSearch
                  placeholder="Select player/couple"
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  style={{ width: '100%' }}
                  //   onChange={handleChange}
                  options={playersOptions}
                />
              </Form.Item>

              <Form.Item label="Left Competitor" name="leftCompetitorId">
                <Select
                  showSearch
                  placeholder="Select player/couple"
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  style={{ width: '100%' }}
                  //   onChange={handleChange}
                  options={playersOptions}
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
                      Assign
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

export default AssignPlayerInMatchModal;
