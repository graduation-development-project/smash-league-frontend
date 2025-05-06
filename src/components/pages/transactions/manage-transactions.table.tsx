'use client';
import React, { useEffect, useState } from 'react';
import { ConfigProvider, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { formatDateTime } from '@/utils/format';
import {
  getAllTransactionsAPI,
} from '@/services/payment';
import { GrView } from 'react-icons/gr';

interface DataType {
  id: string;
  orderId: string;
  transactionType: string;
  transactionDetail: string;
  value: number;
  status: string;
  createdAt: string;
}
const ManageTransactionsTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getAllTransactions = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const response = await getAllTransactionsAPI(user?.access_token);
      console.log(response?.data, 'check');
      if (response?.statusCode === 200 || response.statusCode === 201) {
        const formatedData = response.data.map((transaction: any) => ({
          id: transaction.id,
          orderId: transaction.orderId,
          transactionType: transaction.transactionType,
          transactionDetail: transaction.transactionDetail,
          value: transaction.value,
          status: transaction.status,
          createdAt: transaction.createdAt,
        }));
        setTransactionList(formatedData.reverse());
        setIsLoading(false);
      } else {
        setTransactionList([]);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log('Error', error);
    }
  };
  useEffect(() => {
    getAllTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Invoice ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text) => <p className="font-semibold text-textColor">{text}</p>,
    },

    // {
    //   title: 'Date',
    //   dataIndex: 'date',
    //   key: 'date',
    //   render: (_, { date }) => <p>{formatDateTime(date)}</p>,
    // },
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
    },
    {
      title: 'Transaction Detail',
      dataIndex: 'transactionDetail',
      key: 'transactionDetail',
      render: (_, { transactionDetail }) => <p>{transactionDetail}</p>,
    },

    {
      title: 'Value',
      dataIndex: 'value',
      align: 'center',
      key: 'value',
    },
    {
      title: 'Status',
      key: 'status',
      align: 'center',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          <Tag
            color={
              status === 'PENDING'
                ? 'geekblue'
                : status === 'SUCCESSFUL'
                ? 'green'
                : 'volcano'
            }
            key={status}
          >
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },

    {
      title: 'Created At',
      dataIndex: 'createdAt',
      align: 'center',
      key: 'createdAt',
      render: (_, { createdAt }) => <p>{formatDateTime(createdAt)}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <p className="text-secondColor hover:underline  cursor-pointer text-[14px] transition-all duration-200">
            <GrView size={20} />
          </p>
        </Space>
      ),
    },
  ];
  return (
    <div className="w-full h-full flex flex-col">
      <ConfigProvider
        theme={{ token: { colorPrimary: '#FF8243', fontFamily: 'inherit' } }}
      >
        <Table<DataType>
          columns={columns}
          dataSource={transactionList.reverse()}
          loading={isLoading}
        />
      </ConfigProvider>
    </div>
  );
};

export default ManageTransactionsTable;
