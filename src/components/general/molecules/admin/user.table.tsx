'use client';
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { getAllUsersAPI } from '@/services/user';
import { colors } from '@mui/material';

interface DataType {
  key: string;
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  isVerified: boolean;
  role: string;
  creditsRemain: number;
}

const UserTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getAllUsers = async () => {
    setIsLoading(true);
    const response = await getAllUsersAPI(user?.access_token);
    if (
      response?.data?.statusCode === 200 ||
      response?.data?.statusCode === 201
    ) {
      const formatData = response.data.data.map((user: any) => ({
        key: user.id,
        id: user.id,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified,
        role: user.userRoles[0].role.roleName,
        creditsRemain: user?.creditsRemain ? user.creditsRemain : 0,
      }));
      setUsersList(formatData);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, [user]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Status',
      key: 'isVerified',
      dataIndex: 'isVerified',
      render: (_, { isVerified }) => (
        <>
          <Tag color={isVerified ? 'green' : 'red'}>
            {isVerified ? 'Verified' : 'Not yet'}
          </Tag>
        </>
      ),
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          fontFamily: 'inherit',
        }}
      ></div>
      <Table<DataType>
        columns={columns}
        dataSource={usersList}
        loading={isLoading}
        bordered
        style={{ fontFamily: 'inherit' }}
      />
    </>
  );
};

export default UserTable;
