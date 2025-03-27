'use client';
import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import {
  AppstoreOutlined,
  BankOutlined,
  MailOutlined,
  SettingOutlined,
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
  const collapseMenu = adminContext?.collapseMenu ?? false; // Tránh lỗi nếu AdminContext chưa có

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
          setUser(null);
        }
      }
      setIsLoading(false);
    }
  }, []);

  let children: MenuItem[] = [];

  if (!isLoading && user?.role?.includes('Staff')) {
    children = [
      {
        key: 'staffdashboard',
        label: 'Dashboard',
        icon: <AppstoreOutlined />,
      },
      {
        key: 'sub1',
        label: 'Verification',
        icon: <MailOutlined />,
        children: [
          { key: 'athletes', label: <Link href="/athletes">Athletes</Link> },
          {
            key: 'organizers',
            label: <Link href="/dashboard/verify/organizers">Organizers</Link>,
          },
          {
            key: 'umpires',
            label: <Link href="/dashboard/verify/umpires">Umpires</Link>,
          },
        ],
      },
      {
        key: 'sub2',
        label: 'Transactions',
        icon: <BankOutlined />,
      },
      {
        key: 'sub3',
        label: 'Tournaments',
        icon: <TbTournament />,
      },
    ];
  } else if (!isLoading) {
    children = [
      {
        key: 'dashboard',
        label: <Link href={'/dashboard'}>Dashboard</Link>,
        icon: <AppstoreOutlined />,
      },
      {
        key: 'users',
        label: (
          <Link style={{ color: 'inherit' }} href={'/dashboard/user'}>
            Manage Users
          </Link>
        ),
        icon: <TeamOutlined />,
        children: [
          { key: 'athletes', label: 'Athletes' },
          { key: 'organizers', label: 'Organizers' },
          { key: 'umpires', label: 'Umpires' },
        ],
      },
      {
        key: 'sub1',
        label: 'Navigation One',
        icon: <MailOutlined />,
        children: [
          {
            key: 'g1',
            label: 'Item 1',
            type: 'group',
            children: [
              { key: '1', label: 'Option 1' },
              { key: '2', label: 'Option 2' },
            ],
          },
          {
            key: 'g2',
            label: 'Item 2',
            type: 'group',
            children: [
              { key: '3', label: 'Option 3' },
              { key: '4', label: 'Option 4' },
            ],
          },
        ],
      },
      {
        key: 'sub2',
        label: 'Navigation Two',
        icon: <AppstoreOutlined />,
        children: [
          { key: '5', label: 'Option 5' },
          { key: '6', label: 'Option 6' },
          {
            key: 'sub3',
            label: 'Submenu',
            children: [
              { key: '7', label: 'Option 7' },
              { key: '8', label: 'Option 8' },
            ],
          },
        ],
      },
      {
        key: 'sub4',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
          { key: '9', label: 'Option 9' },
          { key: '10', label: 'Option 10' },
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ];
  }

  const items: MenuItem[] = [
    {
      key: 'grp',
      label: 'Smash League',
      type: 'group',
      children: children,
    },
  ];

  return (
    <Sider collapsed={collapseMenu}>
      <ConfigProvider
        theme={{
          token: {
            /* here is your global tokens */
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
          items={items}
          style={{ height: '100vh', fontSize: '14px', fontFamily: 'inherit' }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default AdminSideBar;