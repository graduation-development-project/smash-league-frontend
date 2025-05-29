'use client';
import { checkAttendanceAPI, getMatchByIdAPI } from '@/services/match';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Checkbox, ConfigProvider, Form, GetProp, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CheckAttendanceModal = ({
  isModalOpen,
  setIsModalOpen,
  matchId,
  setIsCheckAttendance,
  getAssignedMatches,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  matchId: string;
  setIsCheckAttendance: React.Dispatch<React.SetStateAction<boolean>>;
  getAssignedMatches: any;
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //   console.log('Check id', matchId);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [attendance, setAttendance] = useState<
    { label: string; value: string }[]
  >([]);

  const getMatchById = async () => {
    try {
      //   setIsLoading(true);
      const response = await getMatchByIdAPI(matchId);
      console.log('Check ', response.data.data);
      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode === 201
      ) {
        const formatData = [
          {
            label:
              response.data.data.leftCompetitor.partner !== null
                ? response.data.data.leftCompetitor.user.name +
                  ' / ' +
                  response.data.data.leftCompetitor.partner.name
                : response.data.data.leftCompetitor.user.name,
            value: 'left',
          },
          {
            label:
              response.data.data.rightCompetitor.partner !== null
                ? response.data.data.rightCompetitor.user.name +
                  ' / ' +
                  response.data.data.rightCompetitor.partner.name
                : response.data.data.rightCompetitor.user.name,
            value: 'right',
          },
        ];
        setAttendance(formatData);
      }
    } catch (error: any) {
      console.log('check error', error);
    }
  };

  // console.log("Check attendance", attendance);

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues,
  ) => {
    console.log('checked = ', checkedValues);
  };

  const handleSubmit = async (values: any) => {
    const { attendance } = values;
    const left = attendance?.includes('left');
    const right = attendance?.includes('right');
    setIsLoading(true);
    try {
      const response = await checkAttendanceAPI(matchId, left, right);
      // console.log('check response', response.data);
      if (
        response?.data?.statusCode === 204 ||
        response?.data?.statusCode === 200
      ) {
        await getAssignedMatches();
        setIsLoading(false);
        setIsModalOpen(false);
        setIsCheckAttendance(true);
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
      console.log('check error', error);
    }
  };

  //   console.log('Check attendance', attendance);

  useEffect(() => {
    getMatchById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId]);
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
          title="Check Attendance"
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
            onFinish={handleSubmit}
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
              <Form.Item name={'attendance'} label="Attendance">
                <Checkbox.Group options={attendance} onChange={onChange} />
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

export default CheckAttendanceModal;
