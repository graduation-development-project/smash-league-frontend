'use client';

import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import {
  AppstoreOutlined,
  BankOutlined,
  MailOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '@/context/admin.context';
import { ConfigProvider, type MenuProps } from 'antd';
import Link from 'next/link';
import { TbTournament } from 'react-icons/tb';

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
        label: 'Verification',
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
        key: 'transactions',
        label: <Link href="/dashboard/transactions">Transactions</Link>,
        icon: <BankOutlined />,
      },
      {
        key: 'tournaments',
        label: <Link href="/dashboard/tournaments">Tournaments</Link>,
        icon: <TbTournament />,
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
        label: 'Manage Users',
        icon: <TeamOutlined />,
        children: [
          {
            key: 'athletes',
            label: <Link href="/dashboard/user/athletes">Athletes</Link>,
          },
          {
            key: 'organizers',
            label: <Link href="/dashboard/user/organizers">Organizers</Link>,
          },
          {
            key: 'umpires',
            label: <Link href="/dashboard/user/umpires">Umpires</Link>,
          },
        ],
      },
      {
        key: 'manage-tournaments',
        label: 'Manage Tournaments',
        icon: <MailOutlined />,
        children: [
          {
            key: 'group1',
            type: 'group',
            label: 'Item 1',
            children: [
              { key: 'option1', label: 'Option 1' },
              { key: 'option2', label: 'Option 2' },
            ],
          },
          {
            key: 'group2',
            type: 'group',
            label: 'Item 2',
            children: [
              { key: 'option3', label: 'Option 3' },
              { key: 'option4', label: 'Option 4' },
            ],
          },
        ],
      },
      {
        key: 'manage-transactions',
        label: 'Manage Transactions',
        icon: <AppstoreOutlined />,
        children: [
          { key: 'option5', label: 'Option 5' },
          { key: 'option6', label: 'Option 6' },
          {
            key: 'subsubmenu',
            label: 'Submenu',
            children: [
              { key: 'option7', label: 'Option 7' },
              { key: 'option8', label: 'Option 8' },
            ],
          },
        ],
      },
    ];
  }

  return (
    <Sider collapsed={collapseMenu}>
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
