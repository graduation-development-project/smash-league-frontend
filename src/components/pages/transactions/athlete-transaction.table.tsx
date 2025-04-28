'use client';

import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getPayBackFeeListAPI,
  payBackTournamentFeeAPI,
} from '../../../services/payment';
import SubmitPayBackFeeModal from '@/components/general/atoms/transactions/submit-pay-back-fee.modal';

const AthleteTransactionTable = () => {
  interface BankInfo {
    code: string;
    id: string;
    logo: string;
    name: string;
    shortName: string;
  }

  interface BankType {
    accountNumber: string;
    bank: BankInfo;
    bankId: string;
    id: string;
    userId: string;
  }
  interface DataType {
    key: string;
    id: string;
    tournamentName: string;
    tournamentEvent: string;
    name: string;
    email: string;
    dateOfBirth: number;
    isPaid: boolean;
    UserBankAccount: BankType[];
  }
  const [payBackFeeList, setPayBackFeeList] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payBackFeeId, setPayBackFeeId] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getPayBackFeeList = async () => {
    if (!user) return;
    try {
      const response = await getPayBackFeeListAPI(user.access_token);
      // console.log('Check paybackfeelist', response.data);
      // setPayBackFeeList(response);
      const formatData = response.data.map((item: any) => ({
        key: item.id,
        id: item.id,
        tournamentName: item.tournament.name,
        tournamentEvent: item.tournamentEvent.tournamentEvent,
        name: item.user.name,
        email: item.user.email,
        dateOfBirth: item.user.dateOfBirth,
        isPaid: item.isPaid,
        UserBankAccount: item.user.UserBankAccount,
      }));

      setPayBackFeeList(formatData.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPayBackFeeList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // console.log('Check payBackFeeList', payBackFeeList);

  // const handlePayBackTournamentFee = async (
  //   transactionDetail: string,
  //   paybackFeeId: string,
  //   paybackImage: File,
  // ) => {
  //   if (!user) return;
  //   try {
  //     const response = await payBackTournamentFeeAPI(
  //       transactionDetail,
  //       paybackFeeId,
  //       paybackImage,
  //       user.access_token,
  //     );
  //     console.log('Check paybackfeelist', response.data);
  //     // setPayBackFeeList(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (_, { name }) => <div>{name}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_, { email }) => <div>{email}</div>,
    },
    {
      title: 'Tournament Name',
      dataIndex: 'tournamentName',
      key: 'tournamentName',
      render: (_, { tournamentName }) => <div>{tournamentName}</div>,
    },
    {
      title: 'Event',
      dataIndex: 'tournamentEvent',
      key: 'tournamentEvent',
      render: (_, { tournamentEvent }) => <div>{tournamentEvent}</div>,
    },
    {
      title: 'Bank',
      dataIndex: 'UserBankAccount',
      key: 'bank',
      render: (_, { UserBankAccount }) => (
        <div>
          {UserBankAccount.length > 0 ? UserBankAccount[0].bank.name : ''}
        </div>
      ),
    },
    {
      title: 'Account Number',
      dataIndex: 'UserBankAccount',
      key: 'accountNumber',
      align: 'center',
      render: (_, { UserBankAccount }) => (
        <div>
          {UserBankAccount.length > 0 ? UserBankAccount[0].accountNumber : ''}
        </div>
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: 'isPaid',
      key: 'isPaid',
      align: 'center',
      render: (_, { isPaid }) => (
        <div>
          <Tag color={isPaid ? 'green' : 'red'}>
            {isPaid ? 'Paid' : 'Unpaid'}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, { id, isPaid, UserBankAccount }) => (
        <Space size="middle">
          <Button
            disabled={isPaid || UserBankAccount.length === 0}
            onClick={() => {
              showModal();
              setPayBackFeeId(id);
            }}
          >
            Submit
          </Button>
        </Space>
      ),
    },
  ];

  // const data: DataType[] = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //     tags: ['loser'],
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];

  return (
    <div>
      <Table<DataType>
        columns={columns}
        dataSource={payBackFeeList}
        className="[&_.ant-table-thead>tr>th]:text-center"
        style={{ width: '100%', fontFamily: 'inherit' }}
      />

      <SubmitPayBackFeeModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        accessToken={user?.access_token}
        paybackFeeId={payBackFeeId}
        getPayBackFeeList={getPayBackFeeList}
      />
    </div>
  );
};

export default AthleteTransactionTable;
