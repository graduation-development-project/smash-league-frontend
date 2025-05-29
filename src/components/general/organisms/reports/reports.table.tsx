'use client';

import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import {
  approveReportAPI,
  getAllReportsAPI,
  getAllReportsByOrganizerAPI,
  getAllReportsByUserIdAPI,
  payFeeForReportAPI,
  rejectReportAPI,
} from '@/services/report';
import { formatDateTime } from '../../../../utils/format';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { GrView } from 'react-icons/gr';
import { FaRegTrashCan } from 'react-icons/fa6';

interface DataType {
  key: string;
  id: string;
  reason: string;
  status: string;
  tournamentName: string;
  contactEmail?: string;
  reportUser?: string;
  createAt: string;
}

const ReportsTable = ({ profileRole }: { profileRole?: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<DataType[]>([]);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const getAllReports = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      let response;

      if (profileRole === 'UMPIRE' || profileRole === 'ATHLETE') {
        response = await getAllReportsByUserIdAPI(user?.access_token);
        if ([200, 201].includes(response?.data?.statusCode)) {
          const formattedReports = response.data.data.map((report: any) => ({
            key: report.id,
            id: report.id,
            reason: report.reason,
            status: report.status,
            tournamentName: report.tournament.name,
            reportUser: report.reportUser.name,
            createAt: report.createdAt,
          }));
          setReports(formattedReports);
        }
      } else if (profileRole === 'ORGANIZER') {
        response = await getAllReportsByOrganizerAPI(user?.access_token);
        console.log('response organizer', response.data.data);
        if ([200, 201].includes(response?.data?.statusCode)) {
          const formattedReports = response?.data.data.map((report: any) => ({
            key: report.id,
            id: report.id,
            reason: report.reason,
            status: report.status,
            tournamentName: report.tournament.name,
            reportUser: report.reportUser.name,
            createAt: report.createdAt,
          }));
          setReports(formattedReports);
        }
      } else {
        response = await getAllReportsAPI(user?.access_token);
        if ([200, 201].includes(response?.statusCode)) {
          const formattedReports = response.data.map((report: any) => ({
            key: report.id,
            id: report.id,
            reason: report.reason,
            status: report.status,
            tournamentName: report.tournament.name,
            contactEmail: report.tournament.contactEmail,
            createAt: report.createdAt,
          }));
          setReports(formattedReports);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await approveReportAPI(id, user?.access_token);
      if ([200, 201, 204].includes(response?.statusCode)) {
        getAllReports();
        toast.success(response?.message || 'Approved successfully');
      } else {
        toast.error(response?.message || 'Failed to approve');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    if (!user?.access_token) return toast.error('No access token found');
    try {
      const response = await rejectReportAPI(id, user?.access_token);
      if ([200, 201, 204].includes(response?.statusCode)) {
        getAllReports();
        toast.success(response?.message || 'Rejected successfully');
      } else {
        toast.error(response?.message || 'Failed to reject');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayReportFee = async (id: string) => {
    if (!user?.access_token) return;
    try {
      const response = await payFeeForReportAPI(id, user?.access_token);

      console.log('Check response pay fee', response?.data);
      if ([200, 201, 204].includes(response?.statusCode)) {
        // getAllReports();
        toast.success(response?.message || 'Rejecetd successfully');
        window.location.href =
          response?.data?.checkoutDataResponse?.checkoutUrl;
      } else {
        toast.error(response?.message || 'Failed to reject');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Tournament Name',
      dataIndex: 'tournamentName',
      key: 'tournamentName',
      render: (_, { tournamentName, id }) => (
        <p
        // className="cursor-pointer hover:underline"
        // onClick={() => router.push(`/tournaments/details/${id}`)}
        >
          {tournamentName}
        </p>
      ),
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    ...(profileRole === 'UMPIRE' ||
    profileRole === 'ATHLETE' ||
    profileRole === 'ORGANIZER'
      ? [
          {
            title: 'Report User',
            dataIndex: 'reportUser',
            key: 'reportUser',
          },
        ]
      : [
          {
            title: 'Contact Email',
            dataIndex: 'contactEmail',
            key: 'contactEmail',
          },
        ]),
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => {
        const color =
          status === 'PENDING'
            ? 'blue'
            : status === 'HANDLED'
            ? 'green'
            : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (_, { createAt }) => <p>{formatDateTime(createAt)}</p>,
    },
    ...(profileRole === 'UMPIRE' || profileRole === 'ATHLETE'
      ? [
          {
            title: 'Actions',
            key: 'action',
            render: (_: any, { id, status }: any) => {
              if (status === 'WAITING_PAYING_FEE') {
                return (
                  <Space size="middle">
                    <Button onClick={() => handlePayReportFee(id)}>
                      Pay Fee
                    </Button>
                  </Space>
                );
              } else {
                return (
                  <div className="flex items-center gap-8 px-3">
                    <p className="cursor-pointer text-[14px] transition-all duration-200 hover:text-secondColor">
                      <GrView size={18} />
                    </p>
                    <p className="cursor-pointer text-[14px] transition-all duration-200 hover:text-red-500">
                      <FaRegTrashCan size={18} />
                    </p>
                  </div>
                );
              }
            },
          },
        ]
      : profileRole === 'ORGANIZER'
      ? [
          {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, { id, status }: any) => (
              <div className="flex items-center gap-8 px-3">
                <p className="cursor-pointer text-[14px] transition-all duration-200 hover:text-secondColor">
                  <GrView size={18} />
                </p>
                <p className="cursor-pointer text-[14px] transition-all duration-200 hover:text-red-500">
                  <FaRegTrashCan size={18} />
                </p>
              </div>
            ),
          },
        ]
      : [
          {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, { id, status }: any) => (
              <Space size="middle">
                <Button
                  disabled={status !== 'PENDING'}
                  type="primary"
                  onClick={() => handleApprove(id)}
                >
                  Approve
                </Button>
                <Button
                  disabled={status !== 'PENDING'}
                  onClick={() => handleReject(id)}
                >
                  Reject
                </Button>
              </Space>
            ),
          },
        ]),
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Reports List</h1>
      <ConfigProvider theme={{ token: { colorPrimary: '#FF8243' } }}>
        <Table<DataType>
          columns={columns}
          dataSource={reports}
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default ReportsTable;
