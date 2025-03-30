'use client';

import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { formatDateTime } from '@/utils/format';
import { getTournamentRegistrationByAthleteAPI } from '@/services/tour-registration';

interface DataType {
  key: string;
  tourName: string;
  event: string;
  time: string;
  location: string;
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
      console.log('Check list', response?.data.data);
      setTourRegistrationList(response?.data.data);
    } catch (error: any) {
      console.error(
        'Error get tournament registration by athlete:',
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    getTournamentRegistrationByAthlete();
  }, [user]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tournament Name',
      dataIndex: 'tourName',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (_, { time }) => <>{formatDateTime(time)}</>,
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
  ];

  const data: DataType[] = [
    {
      key: '1',
      tourName: 'Tournament 1',
      event: "Men's Singles",
      time: '2024-03-01T10:00:00.000Z',
      location: 'Location 1',
      status: 'Pending',
    },
    {
      key: '2',
      tourName: 'Tournament 2',
      event: "Women's Singles",
      time: '2024-03-01T10:00:00.000Z',
      location: 'Location 2',
      status: 'Approved',
    },
    {
      key: '3',
      tourName: 'Tournament 3',
      event: "Men's Doubles",
      time: '2024-03-01T10:00:00.000Z',
      location: 'Location 3',
      status: 'Rejected',
    },
  ];

  return (
    <div className="flex flex-col gap-3 p-3">
      <h2 className="font-bold text-[20px]">Registration Of Athlete</h2>
      <Table<DataType> columns={columns} dataSource={data} />
    </div>
  );
};

export default TourRegistrationOfAthleteTable;
