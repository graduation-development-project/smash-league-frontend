'use client';
import React from 'react';
import { ConfigProvider, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import AllTeams from '@/components/general/organisms/teams/all-teams';
import MyTeams from '@/components/general/organisms/teams/my-teams';
import ParticipatedTournamentsOfTeams from '../../general/organisms/teams/participated-tournaments';

const TeamPage = (props: any) => {
  const { session } = props;
  const onChange = (key: string) => {
    console.log(key);
  };

  // if(isLoading){
  //   return <Loaders isLoading={isLoading}/>
  //  }

  // const items: TabsProps['items'] = [
  //   {
  //     key: '1',
  //     label: 'All Teams',
  //     children: <AllTeams session={session} />,
  //   },
  //   ...(session?.user
  //     ? [
  //         {
  //           key: '2',
  //           label: 'My Teams',
  //           children: <MyTeams />,
  //         },
  //         {
  //           key: '3',
  //           label: 'Participated Tournaments',
  //           children: <ParticipatedTournamentsOfTeams />,
  //         },
  //       ]
  //     : []),
  // ];
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            /* here is your component tokens */
            itemColor: '#000000',
            itemSelectedColor: '#FF8243',
            inkBarColor: '#FF8243',
            itemHoverColor: '#FF8243',
            itemActiveColor: '#FF8243',
            horizontalItemPaddingLG: '0px 0px 16px 0px',
          },
        },
      }}
    >
      {/* <Tabs
        tabBarStyle={{
          width: '100%',
          fontWeight: 600,
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          marginTop: 70,
          fontFamily: 'inherit',
        }}
        style={{ width: '100%', fontFamily: 'inherit' }}
        size="large"
        centered
        tabBarGutter={60}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      /> */}
      <div className="w-full mt-6">
        <AllTeams session={session} />
      </div>
    </ConfigProvider>
  );
};

export default TeamPage;
