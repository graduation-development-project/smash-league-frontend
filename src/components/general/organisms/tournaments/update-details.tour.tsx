import React, { useState } from 'react'
import { ConfigProvider, Tabs, TabsProps } from 'antd';
import UpdateBasicInfoDetailsTour from '../../molecules/tournaments/update-tour-info-details.tour';
import UpdateOrganizerMerchandiseDetailsTour from '../../molecules/tournaments/update-organizer-merchandise-details.tour';
import UpdateGameRuleDetailsTour from '../../molecules/tournaments/update-game-rule-details.tour';
import UpdateRegistrationFeeDetailsTour from '../../molecules/tournaments/update-registration-fee-details.tour';
import { getTourDetailAPI } from '@/services/tournament';
import UpdateScheduleMatchesDetailsTour from '../../molecules/tournaments/update-schedule-matches-details.tour';
import UpdateInvitationsAdditionalOptionsDetailsTour from '../../molecules/tournaments/update-invitations-additional-options-details.tour';
const UpdateDetailsTour = ({
    detail
}: {
    detail: any
}
) => {
    const [fileImgMerchandiseList, setFileImgMerchandiseList] = useState<File[]>([]);


    const [tabs, setTabs] = useState<TabsProps['items']>([
        {
            label: 'Tournament Info',
            key: 'tournament-info',
            children: <UpdateBasicInfoDetailsTour />,
        },
        {
            label: 'Game Rule',
            key: 'game-rule',
            children: <UpdateGameRuleDetailsTour />,
        },
        {
            label: 'Registration & Fee',
            key: 'registration-fee',
            children: <UpdateRegistrationFeeDetailsTour />,
        },
        {
            label: 'Schedule & Matches',
            key: 'schedule-matches',
            children: <UpdateScheduleMatchesDetailsTour />,
        },
        {
            label: 'Invitations & Additional Options',
            key: 'invitations-additional-options',
            children: <UpdateInvitationsAdditionalOptionsDetailsTour />,
        },
        {
            label: 'Organizers & Merchandise',
            key: 'organizer',
            children: <UpdateOrganizerMerchandiseDetailsTour
                fileImgMerchandiseList={fileImgMerchandiseList}
                setFileImgMerchandiseList={setFileImgMerchandiseList}
            />,
        },

    ]);

    return (
        <div className=' w-full h-full'>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            fontFamily: 'inherit',
                            colorText: '#2c2c2c',
                            itemActiveColor: '#FF8243',
                            inkBarColor: '#FF8243',
                            itemSelectedColor: '#FF8243',
                            itemHoverColor: '#FF8243',
                            // itemHeight: 48,
                        },
                        Menu: {
                            fontFamily: 'inherit',
                            colorPrimary: '#FF8243',
                            itemSelectedBg: "#fcf7f4",
                            itemActiveBg: "#ffebde",
                            fontWeightStrong: 600,
                            itemHeight: 35,
                            colorBgLayout: '#FF8243',
                        },
                        Button: {
                            fontFamily: 'inherit',
                            colorPrimary: '#FF8243',
                            colorPrimaryHover: '#ffa97e',
                            colorPrimaryActive: '#e7753c',
                            colorPrimaryBgHover: '#ffebde',
                            colorBgTextActive: "#ffebde",
                        },
                        Input: {
                            hoverBorderColor: '#FF8243',
                            activeBorderColor: '#FF8243',
                            fontFamily: 'inherit',
                        },
                        ColorPicker: {
                            fontFamily: 'inherit',
                            // colorBorder: '#FF8243',
                            colorPrimaryBorderHover: '#FF8243',
                            colorPrimaryActive: '#FF8243',
                            // hoverBorderColor: '#FF8243',
                            // activeBorderColor: '#FF8243',
                        },
                        Checkbox: {
                            fontFamily: 'inherit',
                            colorPrimary: '#FF8243',
                            colorPrimaryHover: '#ffa97e',
                        },
                        Select: {
                            fontFamily: 'inherit',
                        },
                        Radio: {
                            fontFamily: 'inherit',
                        }

                    },
                }}
            >
                <Tabs
                    defaultActiveKey="1"
                    style={{ fontFamily: 'inherit' }}
                    // type="card"
                    size={'middle'}
                    items={tabs}
                >

                </Tabs>
            </ConfigProvider>
        </div>
    )
}

export default UpdateDetailsTour