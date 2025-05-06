'use client';
import {
  assignUmpireToMatchAPI,
  getTournamentUmpiresParticipantsAPI,
  updateMatchInfoAPI,
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
import dayjs from 'dayjs';
import { getCourtsAvailableAPI } from '@/services/match';

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
  tour,
  getMatchesOfTournamentEvent,
  match,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tournamentId: string | string[];
  matchId: string;
  playersOptions: any[];
  tour: any;
  getMatchesOfTournamentEvent: any;
  match: any;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [umpiresList, setUmpiresList] = useState<Option[]>([]);
  const [courtList, setCourtList] = useState<Option[]>([]);
  const [form] = Form.useForm();
  const [user, setUser] = useState<any>(null);

  // console.log('match', match);

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
    // console.log('onOk: ', value);
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

  const getCourtsAvailable = async () => {
    const res = await getCourtsAvailableAPI(user?.access_token, tournamentId);
    if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201) {
      const formatData = res.data.data.map((court: any) => ({
        value: court?.id,
        label: court?.courtCode,
        disabled: court?.courtAvailable ? false : true,
      }));
      setCourtList(formatData);
    } else {
      setCourtList([]);
    }
  };

  useEffect(() => {
    getTournamentUmpiresParticipants();
    getCourtsAvailable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  // console.log('umpiresList', umpiresList);

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
      // console.log('check res', response);
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

  const handleUpdateMatchInfomation = async (values: any) => {
    if (!user) return;
    const {
      umpireId,
      startedWhen,
      leftCompetitorId,
      rightCompetitorId,
      courtId,
    } = values;
    // console.log('check values', values);
    try {
      setIsLoading(true);
      const response = await updateMatchInfoAPI(
        matchId,
        umpireId,
        startedWhen,
        leftCompetitorId,
        rightCompetitorId,
        courtId,
        user?.access_token,
      );
      // console.log('check res', response.data);
      if (
        response?.data.statusCode === 200 ||
        response?.data?.statusCode === 201
      ) {
        setIsModalOpen(false);
        setIsLoading(false);
        getMatchesOfTournamentEvent();
        getTournamentUmpiresParticipants();
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
            onFinish={handleUpdateMatchInfomation}
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
                  <Form.Item label="Left Competitor" name="leftCompetitorId">
                    <Select
                      disabled={
                        match?.participants.length > 0 &&
                        match?.participants[0]?.player1
                          ? true
                          : false
                      }
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
                  <Form.Item label="Right Competitor" name="rightCompetitorId">
                    <Select
                      disabled={
                        match?.participants.length > 0 &&
                        match?.participants[1]?.player1
                          ? true
                          : false
                      }
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
                      options={courtList}
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
                name="startedWhen"
                style={{ width: '100%' }}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  minDate={dayjs(tour?.startDate, 'YYYY-MM-DD')}
                  maxDate={dayjs(tour?.endDate, 'YYYY-MM-DD')}
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
