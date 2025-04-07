'use client';
import React, { useEffect, useState } from 'react';
import { ConfigProvider, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { formatDateTime } from '@/utils/format';
import { getTransactionHistoryAPI } from '@/services/payment';
import { GrView } from 'react-icons/gr';

interface DataType {
  id: string;
  orderId: string;
  transactionType: string;
  transactionDetail: string;
  value: number;
  status: string;
  // date: string;
}

const TransactionHistoryPage = () => {
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

  const getTransactionHistory = async () => {
    if (!user) return;
    try {
      const response = await getTransactionHistoryAPI(user?.access_token);
      if (response.statusCode === 200 || response.statusCode === 201) {
        const formatedData = response.data.map((transaction: any) => ({
          id: transaction.id,
          orderId: transaction.orderId,
          transactionType: transaction.transactionType,
          transactionDetail: transaction.transactionDetail,
          value: transaction.value,
          status: transaction.status,
        }));
        setTransactionList(formatedData);
      } else {
        setTransactionList([]);
      }
    } catch (error: any) {
      console.log('Error', error);
    }
  };
  useEffect(() => {
    getTransactionHistory();
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

  // const data: DataType[] = [
  //   {
  //     id: '123',
  //     orderId: '1',
  //     transactionType: 'Deposit',
  //     transactionDetail: 'Deposit to wallet',
  //     value: 1000,
  //     status: 'PENDING',
  //     date: '2003-11-17 10:30:00Z',
  //   },
  //   {
  //     id: '1234',
  //     orderId: '2',
  //     transactionType: 'BUYING PACKAGE',
  //     transactionDetail: 'Payment for package Advanced',
  //     value: 3700,
  //     status: 'SUCCESSFUL',
  //     date: '2003-11-17 10:30:00Z',
  //   },
  //   {
  //     id: '12345',
  //     orderId: '3',
  //     transactionType: 'BUYING PACKAGE',
  //     transactionDetail: 'Payment for package Pro',
  //     value: 4800,
  //     status: 'FAILED',
  //     date: '2003-11-17 10:30:00Z',
  //   },
  // ];
  return (
    <div className="w-full h-full flex flex-col p-8 gap-3">
      <h1 className="text-[24px] font-bold">Transaction History</h1>
      <ConfigProvider
        theme={{ token: { colorPrimary: '#FF8243', fontFamily: 'inherit' } }}
      >
        {' '}
        <Table<DataType> columns={columns} dataSource={transactionList} />
      </ConfigProvider>
    </div>
  );
};

export default TransactionHistoryPage;
