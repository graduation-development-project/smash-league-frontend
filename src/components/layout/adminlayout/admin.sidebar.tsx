'use client';

import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import {
  AppstoreOutlined,
  BankOutlined,
  MailOutlined,
  TeamOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '@/context/admin.context';
import { ConfigProvider, type MenuProps } from 'antd';
import Link from 'next/link';
import { TbTournament } from 'react-icons/tb';
import { TbReport } from "react-icons/tb";
import { TbPackages } from "react-icons/tb";

type MenuItem = Required<MenuProps>['items'][number];

const AdminSideBar = () => {
  const { Sider } = Layout;
  const adminContext = useContext(AdminContext);
  const collapseMenu = adminContext?.collapseMenu ?? false;

  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoading(true);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      setIsLoading(false);
    }
  }, []);

  let children: MenuItem[] = [];

  if (!isLoading && user?.userRoles?.includes('Staff')) {
    children = [
      {
        key: 'staffdashboard',
        label: <Link href="/staff/dashboard">Dashboard</Link>,
        icon: <AppstoreOutlined />,
      },
      {
        key: 'verification',
        label: 'Verifications',
        icon: <MailOutlined />,
        children: [
          {
            key: 'verify-organizers',
            label: <Link href="/dashboard/verify/organizers">Organizers</Link>,
          },
          {
            key: 'verify-umpires',
            label: <Link href="/dashboard/verify/umpires">Umpires</Link>,
          },
        ],
      },
      {
        key: 'payback-list',
        label: <Link href="/staff/dashboard/payback">PayBack List</Link>,
        icon: <TransactionOutlined />,
      },

      {
        key: 'tournaments',
        label: <Link href="/dashboard/tournaments">Tournaments</Link>,
        icon: <TbTournament />,
      },
      {
        key: 'transactions',
        label: <Link href="/dashboard/transactions">Transactions</Link>,
        icon: <BankOutlined />,
      },
      {
        key: 'reports',
        label: <Link href="/dashboard/reports">Reports</Link>,
        icon: <TbReport  />,
      },
    ];
  } else if (!isLoading) {
    children = [
      {
        key: 'dashboard',
        label: <Link href="/dashboard">Dashboard</Link>,
        icon: <AppstoreOutlined />,
      },
      {
        key: 'users',
        label: <Link href="/dashboard/user">Manage Users</Link>,
        icon: <TeamOutlined />,
        // children: [
        //   {
        //     key: 'athletes',
        //     label: <Link href="/dashboard/user/athletes">Athletes</Link>,
        //   },
        //   {
        //     key: 'organizers',
        //     label: <Link href="/dashboard/user/organizers">Organizers</Link>,
        //   },
        //   {
        //     key: 'umpires',
        //     label: <Link href="/dashboard/user/umpires">Umpires</Link>,
        //   },
        // ],
      },
      {
        key: 'manage-tournaments',
        label: <Link href="/dashboard/tournaments">Manage Tournaments</Link>,
        icon: <TbTournament />,
      },

      {
        key: 'manage-packages',
        label: <Link href="/dashboard/package">Manage Packages</Link>,
        icon: <TbPackages />,
      },

      {
        key: 'manage-transactions',
        label: <Link href="/dashboard/transactions">Manage Transactions</Link>,
        icon: <BankOutlined />,
      },

      {
        key: 'manage-reports',
        label: <Link href="/dashboard/reports">Manage Reports</Link>,
        icon: <TbReport/>,
      },
    ];
  }

  return (
    <Sider collapsed={collapseMenu} style={{ fontFamily: 'inherit' }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FF8243',
          },
          components: {
            Menu: {
              colorPrimary: '#FF8243',
              itemSelectedColor: '#FF8243',
              itemHoverColor: '#FF8243',
              itemBg: '#ffffff',
              itemSelectedBg: '#f7f7f7',
              subMenuItemBg: '#ffffff',
              itemColor: '#000000',
              darkItemSelectedBg: '#FF8243',
              horizontalItemSelectedColor: '#FF8243',
            },
          },
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          defaultOpenKeys={[
            'users',
            'verification',
            'manage-tournaments',
            'manage-transactions',
          ]}
          items={children}
          style={{
            height: '100vh',
            fontSize: '14px',
            fontFamily: 'inherit',
          }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default AdminSideBar;
