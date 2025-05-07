'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import {
  approveReportAPI,
  getAllReportsAPI,
  rejectReportAPI,
} from '@/services/report';
import { formatDateTime } from '../../../../utils/format';
import { toast } from 'react-toastify';

interface DataType {
  key: string;
  id: string;
  reason: string;
  status: string;
  tournamentName: string;
  contactEmail: string;
  createAt: string;
}
const ReportsTable = () => {
  const userRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState<DataType[]>([]);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getAllReports = async () => {
    setIsLoading(true);
    try {
      const response = await getAllReportsAPI(user?.access_token);
      console.log('response', response);
      if (response?.statusCode === 200 || response?.statusCode === 201) {
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
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    // const token = userRef.current?.access_token;
    // if (!token) return toast.error('No access token found');
    try {
      const response = await approveReportAPI(id, user?.access_token);
      console.log('response approve', response);
      if (
        response?.statusCode === 200 ||
        response?.statusCode === 201 ||
        response?.statusCode === 204
      ) {
        getAllReports();
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
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    const token = userRef.current?.access_token;
    if (!token) return toast.error('No access token found');
    try {
      const response = await rejectReportAPI(id, token);
      console.log('response reject', response);
      if (
        response?.statusCode === 200 ||
        response?.statusCode === 201 ||
        response?.statusCode === 204
      ) {
        getAllReports();
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
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Contact Email',
      dataIndex: 'contactEmail',
      key: 'contactEmail',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status === 'PENDING' ? (
            <Tag color="blue">{status}</Tag>
          ) : status === 'HANDLED' ? (
            <Tag color="green">{status}</Tag>
          ) : (
            <Tag color="red">{status}</Tag>
          )}
        </>
      ),
    },

    {
      title: 'Created At',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (_, { createAt }) => <p>{formatDateTime(createAt)}</p>,
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, { id, status }) => (
        <>
          <Space size="middle">
            <Button
              disabled={status !== 'PENDING'}
              type="primary"
              onClick={() => {
                console.log('id', id);
                handleApprove(id);
              }}
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
        </>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Reports List</h1>
      <Table<DataType>
        columns={columns}
        dataSource={reports}
        loading={isLoading}
      />
    </div>
  );
};

export default ReportsTable;
