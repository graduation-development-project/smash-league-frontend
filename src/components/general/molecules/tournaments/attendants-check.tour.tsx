'use client';
import React from 'react';
import { Image, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { calculateAge } from '@/utils/calculateAge';

interface ParticipantInfo {
  avatarURL: string;
  dateOfBirth: Date;
  email: string;
  gender: string;
  hands: string;
  height: number;
  id: string;
  name: string;
  phoneNumber: string;
}
interface DataType {
  user: ParticipantInfo;
}

const AttendantsCheck = () => {
  // console.log("New Date", new Date("2003-11-17 10:30:00"));
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '',
      dataIndex: ['user'],
      key: 'image',
      fixed: 'left',
      width: 150,
      render: (_, { user }) => (
        <Image
          style={{
            borderRadius: '50%',
            border: '1px solid #FF8243',
            padding: '2px',
          }}
          src={user?.avatarURL}
          width={100}
          height={100}
          alt="Athlete Image"
        />
      ),
    },

    {
      title: 'Full Name',
      width: 250,
      dataIndex: ['user'],
      key: 'name',
      fixed: 'left',
      // ...getColumnSearchProps('name'),
      render: (_, { user }) => (
        <h1 className="font-semibold text-[16px]">{user?.name}</h1>
      ),
    },
    {
      title: 'Age',
      dataIndex: ['user'],
      align: 'center',
      key: 'age',
      width: 100,
      // ...getColumnSearchProps('age'),
      render: (_, { user }) => (
        <h1 className="font-semibold text-[16px]">
          {calculateAge(user?.dateOfBirth)}
        </h1>
      ),
    },
    {
      title: 'Email',
      dataIndex: ['user'],
      key: 'email',
      align: 'center',
      width: 100,
      // ...getColumnSearchProps('phoneNumber'),
      render: (_, { user }) => (
        <h1 className="font-semibold text-[16px]">{user?.email}</h1>
      ),
    },

    {
      title: 'Hand',
      dataIndex: ['user'],
      key: 'hand',
      align: 'center',
      width: 100,
      // ...getColumnSearchProps('phoneNumber'),
      render: (_, { user }) => (
        <h1 className="font-semibold text-[16px]">
          {user?.hands ? user?.hands : 'No Infomation'}
        </h1>
      ),
    },
    {
      title: 'Action',
      dataIndex: ['user'],
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <div className="w-full h-full flex justify-center items-center gap-5 cursor-pointer">
          <div className="text-[16px] text-secondColor hover:underline">
            Check
          </div>
          <Popconfirm title="Are you sure?">
            <div className="text-[16px] text-primaryColor hover:underline">
              Absent
            </div>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const data: DataType[] = [
    {
      user: {
        avatarURL: '',
        dateOfBirth: new Date('2003-11-17 10:30:00'),
        email: 'a@gmail.com',
        gender: 'Male',
        hands: '',
        height: 0,
        id: '1',
        name: 'John Doe',
        phoneNumber: '12345678',
      },
    },
    {
      user: {
        avatarURL: '',
        dateOfBirth: new Date('2003-11-17 10:30:00'),
        email: 'a@gmail.com',
        gender: 'Male',
        hands: '',
        height: 0,
        id: '1',
        name: 'John Doe',
        phoneNumber: '12345678',
      },
    },
    {
      user: {
        avatarURL: '',
        dateOfBirth: new Date('2003-11-17 10:30:00'),
        email: 'a@gmail.com',
        gender: 'Male',
        hands: '',
        height: 0,
        id: '1',
        name: 'John Doe',
        phoneNumber: '12345678',
      },
    },
  ];
  return (
    <div>
      <Table<DataType> columns={columns} dataSource={data} />
    </div>
  );
};

export default AttendantsCheck;
