'use client';
import {
  assignUmpireToMatchAPI,
  getTournamentUmpiresParticipantsAPI,
} from '@/services/tournament';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Modal,
  Row,
  Select,
  TimePicker,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, GetProps } from 'antd';

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

const UmpireAssignModal = ({
  isModalOpen,
  setIsModalOpen,
  tournamentId,
  matchId,
  playersOptions,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tournamentId: string | string[];
  matchId: string;
  playersOptions: any[];
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [umpiresList, setUmpiresList] = useState<Option[]>([]);
  const [form] = Form.useForm();
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

  // const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  // const onTimeChange: TimePickerProps['onChange'] = (time, timeString) => {
  //   console.log(time, timeString);
  // };

  type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

  const { RangePicker } = DatePicker;

  const onOk = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
  ) => {
    console.log('onOk: ', value);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (
        response?.data.statusCode === 200 ||
        response?.data?.statusCode === 201
      ) {
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
          title="Match Assignment"
          width={800}
          style={{
            fontFamily: 'inherit',
          }}
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
            layout="vertical"
            form={form}
            style={{
              fontFamily: 'inherit',
              paddingTop: 10,
            }}
          >
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    activeBorderColor: '#FF8243',
                    activeShadow: '0 0 0 2px #fffff',
                    hoverBorderColor: '#FF8243',
                  },
                },
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Right Competitor" name="rightCompetitorId">
                    <Select
                      showSearch
                      placeholder="Select player/couple"
                      filterOption={(input, option) =>
                        (option?.label ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={playersOptions}
                    />
                  </Form.Item>

                  <Form.Item label="Umpire" name="umpireId">
                    <Select
                      showSearch
                      placeholder="Select umpire"
                      filterOption={(input, option) =>
                        (option?.label ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={umpiresList}
                    />
                  </Form.Item>

                  {/* <Form.Item label="Start Date" name="startDate">
                    <DatePicker onChange={onChange} style={{ width: '100%' }} />
                  </Form.Item> */}
                </Col>

                <Col span={12}>
                  <Form.Item label="Left Competitor" name="leftCompetitorId">
                    <Select
                      showSearch
                      placeholder="Select player/couple"
                      filterOption={(input, option) =>
                        (option?.label ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={playersOptions}
                    />
                  </Form.Item>

                  <Form.Item label="Court" name="courtId">
                    <Select
                      showSearch
                      placeholder="Select Court"
                      filterOption={(input, option) =>
                        (option?.label ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={[
                        {
                          value: '1',
                          label: 'Court 1',
                        },
                        {
                          value: '2',
                          label: 'Court 2',
                        },
                        {
                          value: '3',
                          label: 'Court 3',
                          disabled: true,
                        },
                      ]}
                    />
                  </Form.Item>

                  {/* <Form.Item label="Start Time" name="startTime">
                    <TimePicker
                      format="HH:mm"
                      onChange={onTimeChange}
                      style={{ width: '100%' }}
                    />
                  </Form.Item> */}
                </Col>
              </Row>

              <Form.Item
                label="Start When"
                name="startWhen"
                style={{ width: '100%' }}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={(value, dateString) => {
                    console.log('Selected Time: ', value);
                    console.log('Formatted Selected Time: ', dateString);
                  }}
                  onOk={onOk}
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

export default UmpireAssignModal;
