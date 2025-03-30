'use client';
import React from 'react';

import { ConfigProvider, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { formatDateTime } from '@/utils/format';

interface DataType {
  orderId: string;
  transactionType: string;
  transactionDetail: string;
  value: number;
  status: string;
  date: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Invoice ID',
    dataIndex: 'orderId',
    key: 'orderId',
    render: (text) => <p className="font-bold text-textColor">{text}</p>,
  },

  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (_, { date }) => <p>{formatDateTime(date)}</p>,
  },
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
          View
        </p>
        <Popconfirm title="Are you sure to delete this transaction?">
          <p className="text-primaryColor hover:underline cursor-pointer text-[14px] transition-all duration-200">
            Delete
          </p>
        </Popconfirm>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    orderId: '1',
    transactionType: 'Deposit',
    transactionDetail: 'Deposit to wallet',
    value: 1000,
    status: 'PENDING',
    date: '2003-11-17 10:30:00Z',
  },
  {
    orderId: '2',
    transactionType: 'BUYING PACKAGE',
    transactionDetail: 'Payment for package Advanced',
    value: 3700,
    status: 'SUCCESSFUL',
    date: '2003-11-17 10:30:00Z',
  },
  {
    orderId: '3',
    transactionType: 'BUYING PACKAGE',
    transactionDetail: 'Payment for package Pro',
    value: 4800,
    status: 'FAILED',
    date: '2003-11-17 10:30:00Z',
  },
];

const TransactionHistoryPage = () => {
  return (
    <div className="w-full h-full flex flex-col p-8 gap-3">
      <h1 className="text-[24px] font-bold">Transaction History</h1>
      <ConfigProvider theme={{ token: { colorPrimary: '#FF8243' } }}>
        {' '}
        <Table<DataType> columns={columns} dataSource={data} />
      </ConfigProvider>
    </div>
  );
};

export default TransactionHistoryPage;
