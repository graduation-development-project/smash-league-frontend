"use client"
import OnGoingTournament from '@/components/general/organisms/tournaments/on-going.tournament'
import { HomeContextProvider } from '@/library/home.context'
import { ConfigProvider, Input, Tabs, TabsProps } from 'antd'
import { SearchProps } from 'antd/es/input'
import Search from 'antd/es/input/Search'
import React from 'react'
import MyTournaments from './my-tour.tour'

const TournamentPage = () => {
    const onChange = (key: string) => {
        console.log(key);
    };
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);


    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Search",
            children: <OnGoingTournament />,
        },
        {
            key: "2",
            label: "My Tournaments",
              children: <MyTournaments />,
        },
        // {
        //     key: "3",
        //     label: <Search style={{ width: "100%" }} placeholder="Search here" onSearch={onSearch} enterButton />,
        //     children: "Content of Tab Pane 3",
        // },
    ];
    return (

        <HomeContextProvider>
            <div className='w-full h-max flex flex-col gap-5 justify-center items-center'>
                <div className='w-full'>
                    <ConfigProvider
                    
                        theme={{
                            components: {
                                Menu: {
                                    horizontalItemSelectedColor: "#FF8243",
                                    horizontalItemSelectedBg: "",
                                    
                                    itemSelectedColor: "#FF8243",
                                    itemSelectedBg: "#ff82431f",
                                    fontFamily: 'inherit'
                                },
                                Tabs: {
 
                                    /* here is your component tokens */
                                    fontFamily: "inherit",
                                    itemColor: "#000000",
                                    itemSelectedColor: "#FF8243",
                                    inkBarColor: "#FF8243",
                                    itemHoverColor: "#FF8243",
                                    itemActiveColor: "#FF8243",
                                    horizontalItemPaddingLG: "0px 0px 16px 0px",
                                },
                                Layout: {
                                    fontFamily: "inherit",
                                },
                                Pagination: {
                                    fontFamily: "inherit",
                                },
                                
                            },
                        }}
                    >
                        <Tabs
                            tabBarStyle={{
                                width: "100%",
                                fontWeight: 700,
                                fontSize: 25,
                                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                            }}
                            style={{ width: "100%", }}
                            size="large"
                            centered
                            tabBarGutter={60}
                            defaultActiveKey="1"
                            items={items}
                            onChange={onChange}
                        />
                    </ConfigProvider >
                    {/* <Input placeholder="Search" style={{ width: "80%", marginTop: "20px" }} /> */}
                </div>


            </div>
        </HomeContextProvider>

    )
}

export default TournamentPage