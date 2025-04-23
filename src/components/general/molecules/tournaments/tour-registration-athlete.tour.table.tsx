'use client';

import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { formatDateTime } from '@/utils/format';
import {
  getTournamentRegistrationByAthleteAPI,
  payRegistrationFeeAPI,
  removeTournamentRegistrationAPI,
} from '@/services/tour-registration';
import { GrView } from 'react-icons/gr';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/es/table/interface';

interface DataType {
  key: string;
  tourName: string;
  event: string;
  startDate: string;
  endDate: string;
  location: string;
  isPayForTheRegistrationFee: boolean;
  status: string;
  createdAt: string;
}

const TourRegistrationOfAthleteTable = ({
  profileRole,
}: {
  profileRole: string;
}) => {
  const [tourRegistrationList, setTourRegistrationList] = useState<DataType[]>(
    [],
  );
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        getTournamentRegistrationByAthlete(parsedUser); // pass to function directly
      }
    }
  }, []);

  // console.log('Check user', user);
  const getTournamentRegistrationByAthlete = async (user: any) => {
    if (!user) return;
    try {
      const response = await getTournamentRegistrationByAthleteAPI(
        user?.access_token,
      );
      console.log('Check tour', response.data.data);
      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode === 201
      ) {
        if (profileRole === 'UMPIRE') {
          const formatData = response.data.data
            .filter((regis: any) => regis?.registrationRole === 'UMPIRE')
            .map((regis: any) => ({
              key: regis?.id,
              tourName: regis?.tournament?.name,
              event: '', // Placeholder
              startDate: regis?.tournament?.startDate,
              endDate: regis?.tournament?.endDate,
              location: '', // Placeholder
              isPayForTheRegistrationFee: false, // Placeholder
              status: regis?.status,
              createdAt: regis?.createdAt,
            }));
          // console.log("Check formData", formatData);
          setTourRegistrationList(formatData);
        } else {
          const formatData = response.data.data
            .filter((regis: any) => regis?.registrationRole === 'ATHLETE')
            .map((regis: any) => ({
              key: regis?.id,
              tourName: regis?.tournament?.name,
              event: `${regis?.tournamentEvent?.tournamentEvent} (${regis?.tournamentEvent?.fromAge} to ${regis?.tournamentEvent?.toAge})`,
              startDate: regis?.tournament?.startDate,
              endDate: regis?.tournament?.endDate,
              location: regis?.tournament?.location,
              isPayForTheRegistrationFee: regis?.isPayForTheRegistrationFee,
              status: regis?.status,
              createdAt: regis?.createdAt,
            }));
          setTourRegistrationList(formatData);
        }
      }
    } catch (error: any) {
      console.error(
        'Error get tournament registration by athlete:',
        error.response?.data || error.message,
      );
    }
  };

  const handlePayFee = async (tourRegistrationId: string) => {
    try {
      const response = await payRegistrationFeeAPI(
        user?.access_token,
        tourRegistrationId,
      );
      console.log('Check response:', response.data);
      if (
        response?.data?.statusCode === 201 ||
        response?.data?.statusCode === 200
      ) {
        toast.success(`${response?.data?.message}`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        window.location.href =
          response.data.data.checkoutDataResponse.checkoutUrl;
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(`${response?.message}`, {
          position: 'top-right',
          autoClose: 2000,
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

  // console.log('Check tourRegistrationList', tourRegistrationList);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleRemoveRegistration = async (tourIds: string[]) => {
    try {
      const response = await removeTournamentRegistrationAPI(
        user.access_token,
        tourIds,
      );
      console.log('Check remove', response.data);
      if (
        response.data.statusCode === 200 ||
        response.data.statusCode === 201 ||
        response.data.statusCode === 204
      ) {
        toast.success(`${response?.data?.message}`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        getTournamentRegistrationByAthlete(user);
      } else {
        toast.error(`${response?.data?.message}`, {
          position: 'top-right',
          autoClose: 2000,
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

  const columns: TableProps<DataType>['columns'] =
    profileRole === 'UMPIRE'
      ? [
          {
            title: 'Tournament Name',
            dataIndex: 'tourName',
            key: 'name',
            render: (text) => <p className="font-semibold">{text}</p>,
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
            title: 'Registration Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, { createdAt }) => <>{formatDateTime(createdAt)}</>,
          },

          {
            title: 'Actions',
            align: 'center',
            key: 'action',
            render: (_, { status, key }) => {
              return status === 'PENDING' ? (
                <div className="flex justify-center items-center gap-4">
                  <p className=" hover:underline cursor-pointer text-[14px] transition-all duration-200">
                    <GrView size={16} className="hover:text-secondColor" />
                  </p>
                  <Popconfirm
                    title="Are you sure to delete this tournament?"
                    onConfirm={() => handleRemoveRegistration([key])}
                  >
                    <p className="hover:underline cursor-pointer text-[14px] transition-all duration-200">
                      <MdOutlineDeleteOutline
                        size={16}
                        className="hover:text-primaryColor"
                      />
                    </p>
                  </Popconfirm>
                </div>
              ) : (
                <></>
              );
            },
          },
        ]
      : [
          {
            title: 'Tournament Name',
            dataIndex: 'tourName',
            key: 'name',
            render: (text) => <p className="font-semibold">{text}</p>,
          },
          {
            title: 'Event',
            width: 150,
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
            title: 'Registration Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, { createdAt }) => <>{formatDateTime(createdAt)}</>,
          },
          {
            title: 'Actions',
            align: 'center',
            key: 'action',
            render: (_, { status, key }) => {
              return status === 'PENDING' ? (
                <div className="flex justify-center items-center gap-4">
                  <p className=" hover:underline cursor-pointer text-[14px] transition-all duration-200">
                    <GrView size={16} className="hover:text-secondColor" />
                  </p>
                  <Popconfirm
                    title="Are you sure to delete this tournament?"
                    onConfirm={() => handleRemoveRegistration([key])}
                  >
                    <p className="hover:underline cursor-pointer text-[14px] transition-all duration-200">
                      <MdOutlineDeleteOutline
                        size={16}
                        className="hover:text-primaryColor"
                      />
                    </p>
                  </Popconfirm>
                </div>
              ) : status === 'ON_WAITING_REGISTRATION_FEE' ? (
                <Button onClick={() => handlePayFee(key)}>
                  Pay fee {isLoading && <LoadingOutlined />}
                </Button>
              ) : (
                <></>
              );
            },
          },
        ];

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="w-full flex justify-between items-center p-2">
        <h2 className="font-bold text-[20px]">Tournament Registration</h2>
        <Popconfirm
          title="Are you sure delete all tournament registration?"
          onConfirm={() =>
            handleRemoveRegistration(selectedRowKeys.map(String))
          }
          disabled={selectedRowKeys.length == 0}
        >
          <button
            className={`text-white bg-primaryColor p-2 rounded text-[16px] font-semibold hover:bg-opacity-80 ${
              tourRegistrationList.length === 0 &&
              'opacity-50 bg-gray-500 cursor-not-allowed '
            }`}
          >
            Delete All
          </button>
        </Popconfirm>
      </div>

      <ConfigProvider
        theme={{ token: { colorPrimary: '#FF8243', fontFamily: 'inherit' } }}
      >
        <Table
          style={{ width: '100%', fontFamily: 'inherit' }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tourRegistrationList}
        />
      </ConfigProvider>
    </div>
  );
};

export default TourRegistrationOfAthleteTable;
