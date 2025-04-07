'use client';

import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { formatDateTime } from '@/utils/format';
import { getTournamentRegistrationByAthleteAPI } from '@/services/tour-registration';
import { GrView } from 'react-icons/gr';
import { MdOutlineDeleteOutline } from 'react-icons/md';

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
  const [tourRegistrationList, setTourRegistrationList] = useState<DataType[]>(
    [],
  );
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
  }, [user]);

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
        <Tag
          style={{
            fontFamily: 'inherit',
            padding: '6px',
            fontSize: '14px',
            fontWeight: '500',
          }}
          color={
            status === 'PENDING'
              ? 'magenta'
              : status === 'APPROVED'
              ? 'green'
              : status === 'ON_WAITING_REGISTRATION_FEE'
              ? 'cyan'
              : 'red'
          }
          key={status}
        >
          {status === 'PENDING'
            ? 'Pending'
            : status === 'APPROVED'
            ? 'Approved'
            : status === 'ON_WAITING_REGISTRATION_FEE'
            ? 'Waiting Registration Fee'
            : 'Rejected'}
        </Tag>
      ),
    },
    {
      title: 'Payment Status',
      key: 'isPayForTheRegistrationFee',
      align: 'center',
      dataIndex: 'isPayForTheRegistrationFee',
      render: (_, { isPayForTheRegistrationFee }) => (
        <Tag
          style={{
            fontFamily: 'inherit',
            padding: '6px',
            fontSize: '14px',
            fontWeight: '500',
          }}
          color={isPayForTheRegistrationFee ? 'green' : 'red'}
        >
          {isPayForTheRegistrationFee ? 'Paid' : 'Unpaid'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      align: 'center',
      key: 'action',
      render: (_, { status }) => {
        return status === 'PENDING' ? (
          <div className="flex justify-center items-center gap-4">
            <p className=" hover:underline cursor-pointer text-[14px] transition-all duration-200">
              <GrView size={16} />
            </p>
            <Popconfirm title="Are you sure to delete this tournament?">
              <p className="hover:underline cursor-pointer text-[14px] transition-all duration-200">
                <MdOutlineDeleteOutline size={16} />
              </p>
            </Popconfirm>
          </div>
        ) : status === 'ON_WAITING_REGISTRATION_FEE' ? (
          <Button variant="outlined">Pay fee</Button>
        ) : (
          <></>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-3 p-3">
      <h2 className="font-bold text-[20px]">Tournament Registration</h2>
      <ConfigProvider
        theme={{ token: { colorPrimary: '#FF8243', fontFamily: 'inherit' } }}
      >
        <Table
          style={{ width: '100%', fontFamily: 'inherit' }}
          columns={columns}
          dataSource={tourRegistrationList}
        />
      </ConfigProvider>
    </div>
  );
};

export default TourRegistrationOfAthleteTable;
