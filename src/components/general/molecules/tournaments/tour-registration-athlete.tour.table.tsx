'use client';

import React, { useEffect, useState } from 'react';
import { ConfigProvider, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { formatDateTime } from '@/utils/format';
import { getTournamentRegistrationByAthleteAPI } from '@/services/tour-registration';

interface DataType {
  key: string;
  tourName: string;
  event: string;
  startDate: string;
  endDate: string;
  location: string;
  isPayForTheRegistrationFee: boolean;
  status: string;
}

const TourRegistrationOfAthleteTable = () => {
  const [tourRegistrationList, setTourRegistrationList] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getTournamentRegistrationByAthlete = async () => {
    if (!user) return;
    try {
      const response = await getTournamentRegistrationByAthleteAPI(
        user?.access_token,
      );
      // console.log('Check list', response?.data.data);
      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode === 201
      ) {
        const formatData = response.data.data.map((regis: any) => ({
          key: regis.id,
          tourName: regis.tournament.name,
          event: regis.tournamentEvent.tournamentEvent,
          startDate: regis.tournament.startDate,
          endDate: regis.tournament.endDate,
          location: regis.tournament.location,
          isPayForTheRegistrationFee: regis.isPayForTheRegistrationFee,
          status: regis.status,
        }));
        setTourRegistrationList(formatData);
      }
    } catch (error: any) {
      console.error(
        'Error get tournament registration by athlete:',
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    getTournamentRegistrationByAthlete();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log('Check list', tourRegistrationList);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tournament Name',
      dataIndex: 'tourName',
      key: 'name',
      render: (text) => <p className="font-semibold">{text}</p>,
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (_, { startDate }) => <>{formatDateTime(startDate)}</>,
    },

    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (_, { endDate }) => <>{formatDateTime(endDate)}</>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          <Tag
            color={
              status === 'Pending'
                ? 'magenta'
                : status === 'Approved'
                ? 'green'
                : 'red'
            }
            key={status}
          >
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },

    {
      title: 'Payment Status',
      key: 'isPayForTheRegistrationFee',
      align: 'center',
      dataIndex: 'isPayForTheRegistrationFee',
      render: (_, { isPayForTheRegistrationFee }) => (
        <>
          <Tag
            color={isPayForTheRegistrationFee === true ? 'green' : 'red'}
            key={_}
          >
            {isPayForTheRegistrationFee ? 'Paid' : 'Unpaid'}
          </Tag>
        </>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, { status }) => (
        <Space size="middle">
          <p className="text-secondColor hover:underline  cursor-pointer text-[14px] transition-all duration-200">
            View
          </p>
          <Popconfirm title="Are you sure to delete this tournament?">
            <p className="text-primaryColor hover:underline cursor-pointer text-[14px] transition-all duration-200">
              Delete
            </p>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // const data: DataType[] = [
  //   {
  //     key: '1',
  //     tourName: 'Tournament 1',
  //     event: "Men's Singles",
  //     startDate: '2024-03-01T10:00:00.000Z',
  //     endDate: '2024-03-01T10:00:00.000Z',

  //     location: 'Location 1',
  //     isPayForTheRegistrationFee: true,
  //     status: 'Pending',
  //   },
  //   {
  //     key: '2',
  //     tourName: 'Tournament 2',
  //     event: "Women's Singles",
  //     startDate: '2024-03-01T10:00:00.000Z',
  //     endDate: '2024-03-01T10:00:00.000Z',
  //     location: 'Location 2',
  //     isPayForTheRegistrationFee: false,
  //     status: 'Approved',
  //   },
  //   {
  //     key: '3',
  //     tourName: 'Tournament 3',
  //     event: "Men's Doubles",
  //     startDate: '2024-03-01T10:00:00.000Z',
  //     endDate: '2024-03-01T10:00:00.000Z',
  //     location: 'Location 3',
  //     isPayForTheRegistrationFee: true,
  //     status: 'Rejected',
  //   },
  // ];

  return (
    <div className="flex flex-col gap-3 p-3">
      <h2 className="font-bold text-[20px]">Tournament Registration</h2>
      <ConfigProvider theme={{ token: { colorPrimary: '#FF8243' } }}>
        <Table<DataType> columns={columns} dataSource={tourRegistrationList} />
      </ConfigProvider>
    </div>
  );
};

export default TourRegistrationOfAthleteTable;
