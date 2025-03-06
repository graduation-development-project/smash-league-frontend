import TourListBoard from '@/components/general/molecules/tournaments/tour-list.board';
import { AppstoreOutlined, CalendarOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Divider, Layout, Menu, MenuProps, Tour } from 'antd'
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react'


type MenuItem = Required<MenuProps>['items'][number];

const MyTournaments = () => {

    const menu: MenuItem[] = [
        {
            key: 'sub1',
            label: 'All Tournaments',
            icon: <AppstoreOutlined />,
        },
        {
            key: 'sub2',
            label: 'My Events',
            icon: <CalendarOutlined />,
            children: [
                { key: '5', label: 'Happy Summer' },
                { key: '6', label: 'Ice Breaker ' },
                { key: '7', label: 'Happy Summer' },
                { key: '8', label: 'Ice Breaker ' },
                { key: '9', label: 'Happy Summer' },
                { key: '10', label: 'Ice Breaker ' },
            ],
        },

    ];


    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className='w-full h-max flex flex-col px-10 py-3 gap-5'>
            <Breadcrumb items={[{ title: 'Home', onClick: () => { } }, { title: 'Tournaments' }]} />
            <div className='flex flex-row gap-8'>
                <Layout style={{ display: "flex", gap: 10, backgroundColor: 'white', }}>
                    <Sider theme='light' style={{ boxShadow: "0px 2px 4px 0px rgb(0 0 0 / 0.25)", borderRadius: 8 }}>
                        <div className="demo-logo-vertical" />
                        <Menu
                            // theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            // style={{position: 'sticky'}}

                            items={[
                                {
                                    key: '1',
                                    icon: <UserOutlined />,
                                    label: 'All Tournaments',
                                },
                                {
                                    key: '2',
                                    icon: <CalendarOutlined />,
                                    label: 'Your Series',
                                    children: [
                                        {
                                            key: '5',
                                            label: 'Happy Summer',
                                        },
                                        {
                                            key: '6',
                                            label: 'Ice Breaker ',
                                        }

                                    ]
                                },
                                {
                                    key: '3',
                                    icon: <UploadOutlined />,
                                    label: 'nav 3',
                                },
                            ]}
                        />
                    </Sider>
                    <Layout>
                        <Content
                            key={"1"}
                            style={{
                                minHeight: 280,
                                background: "white",
                                borderRadius: 8,
                            }}
                        >
                            <TourListBoard />
                        </Content>
                    </Layout>
                </Layout>

            </div>
            <div>

            </div>

        </div>
    )
}

export default MyTournaments