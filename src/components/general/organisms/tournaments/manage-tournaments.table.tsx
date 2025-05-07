'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Table, Button, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useTourContext } from '@/context/tour.context';
import { formatDateTime } from '@/utils/format';
import { createStyles } from 'antd-style';
import { cancelTournamentByStaffAPI } from '@/services/tournament';
import { toast } from 'react-toastify';

const useStyle = createStyles(() => ({
  customTableWrapper: `
    overflow-x: auto;
    width: 100%;
  `,
  customTable: `
    .ant-table-container {
      .ant-table-body,
      .ant-table-content {
        scrollbar-width: thin;
        scrollbar-color: #eaeaea transparent;
        scrollbar-gutter: stable;

        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #c1c1c1;
          border-radius: 4px;
        }

        &::-webkit-scrollbar-track {
          background: transparent;
        }
      }
    }
  `,
}));

interface DataType {
  key: string;
  id: string;
  name: string;
  shortName: string;
  organizerName: string;
  organizerEmail: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
  prizePool: number;
  registrationFeePerPerson: number;
  registrationFeePerPair: number;
}

const ManageTournamentsTable = () => {
  const { getTours, tourList } = useTourContext();
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  useEffect(() => {
    getTours(1, 100, '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCancelTournamentByStaff = async (id: string) => {
    try {
      const response = await cancelTournamentByStaffAPI(id, user?.access_token);
      console.log('response', response);
      if (
        response?.statusCode === 200 ||
        response?.statusCode === 201 ||
        response?.statusCode === 204
      ) {
        getTours(1, 100, '');
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
      console.log('error', error);
    }
  };

  const tournaments: DataType[] = useMemo(
    () =>
      tourList?.map((tour: any) => ({
        key: tour.id,
        id: tour.id,
        name: tour.name,
        shortName: tour.shortName,
        organizerName: tour.organizer?.name || 'N/A',
        organizerEmail: tour.organizer?.email || 'N/A',
        location: tour.location,
        startDate: tour.startDate,
        endDate: tour.endDate,
        status: tour.status,
        prizePool: tour.prizePool,
        registrationFeePerPerson: tour.registrationFeePerPerson,
        registrationFeePerPair: tour.registrationFeePerPair,
      })) ?? [],
    [tourList],
  );

  const columns: TableProps<DataType>['columns'] = [
    // {
    //   title: 'Tournament ID',
    //   dataIndex: 'id',
    //   key: 'id',
    //   fixed: 'left',
    //   width: 150,
    // },
    { title: 'Tournament Name', dataIndex: 'name', key: 'name', width: 150 },
    {
      title: 'Short Name',
      dataIndex: 'shortName',
      key: 'shortName',
      width: 100,
    },
    {
      title: 'Organizer Name',
      dataIndex: 'organizerName',
      key: 'organizerName',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'organizerEmail',
      key: 'organizerEmail',
      width: 230,
    },
    { title: 'Location', dataIndex: 'location', key: 'location', width: 200 },
    // {
    //   title: 'Start Date',
    //   dataIndex: 'startDate',
    //   key: 'startDate',
    //   width: 150,

    //   render: (text) => formatDateTime(text),
    // },
    // {
    //   title: 'End Date',
    //   dataIndex: 'endDate',
    //   key: 'endDate',
    //   width: 150,

    //   render: (text) => formatDateTime(text),
    // },
    // {
    //   title: 'Prize Pool',
    //   dataIndex: 'prizePool',
    //   key: 'prizePool',
    //   align: 'right',
    //   width: 100,
    // },
    // {
    //   title: 'Personal Fee',
    //   dataIndex: 'registrationFeePerPerson',
    //   key: 'registrationFeePerPerson',
    //   align: 'right',
    //   width: 100,

    // },
    // {
    //   title: 'Pair Fee',
    //   dataIndex: 'registrationFeePerPair',
    //   key: 'registrationFeePerPair',
    //   align: 'right',
    //   width: 100,
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 220,
      render: (_, { status }) => (
        <Tag
          style={{ padding: '5px 5px', fontSize: '12px' }}
          color={
            status === 'ON_GOING'
              ? 'green'
              : status === 'OPENING_FOR_REGISTRATION'
              ? 'orange'
              : status === 'DRAWING'
              ? 'magenta'
              : status === 'FINISHED'
              ? 'geekblue'
              : 'volcano'
          }
          key={status}
        >
          {status === 'ON_GOING'
            ? 'On-Going'
            : status === 'OPENING_FOR_REGISTRATION'
            ? 'Opening For Registration'
            : status === 'DRAWING'
            ? 'Drawing'
            : status === 'FINISHED'
            ? 'Finished'
            : 'Cancelled'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      //   fixed: 'right',
      align: 'center',
      width: 80,
      render: (_, { id, status }) => (
        <>
          {/* <Button type="link">Invite</Button> */}
          <Button
            danger
            disabled={status !== 'CANCELED' ? false : true}
            onClick={() => handleCancelTournamentByStaff(id)}
          >
            Cancel
          </Button>
        </>
      ),
    },
  ];

  const { styles } = useStyle();

  return (
    <div className="h-full w-full font-quicksand">
      <div className="overflow-auto px-2 w-full h-full">
        <Table<DataType>
          // className={styles.customTable}
          style={{
            width: '100%',
            height: '100%',
            fontFamily: 'inherit',
            overflowX: 'scroll',
          }}
          columns={columns}
          dataSource={tournaments}
          // scroll={{ x: 500 }}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default ManageTournamentsTable;
