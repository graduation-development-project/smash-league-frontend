import React, { useEffect, useState } from 'react'
import { ConfigProvider, Tabs, TabsProps } from 'antd';
import UpdateBasicInfoDetailsTour from '../../molecules/tournaments/update-tour-info-details.tour';
import UpdateOrganizerMerchandiseDetailsTour from '../../molecules/tournaments/update-organizer-merchandise-details.tour';
import UpdateGameRuleDetailsTour from '../../molecules/tournaments/update-game-rule-details.tour';
import UpdateRegistrationFeeDetailsTour from '../../molecules/tournaments/update-registration-fee-details.tour';
import { getTourDetailAPI } from '@/services/tournament';
import UpdateScheduleMatchesDetailsTour from '../../molecules/tournaments/update-schedule-matches-details.tour';
import UpdateInvitationsAdditionalOptionsDetailsTour from '../../molecules/tournaments/update-invitations-additional-options-details.tour';
import UpdateSponsorsDetailsTour from '../../molecules/tournaments/update-sponsors-details.tour';
const UpdateDetailsTour = ({
    detail,
    setDetail,
    handleGetTourDetail
}: {
    detail: any;
    setDetail: any
    handleGetTourDetail: any
}
) => {
    const [fileBgTour, setFileBgTour] = useState<File|null>(null);
    const [fileImgMerchandiseList, setFileImgMerchandiseList] = useState<File[]>([]);

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
            }
        }
    }, []);

    const [tabs, setTabs] = useState<TabsProps['items']>([
        {
            label: 'Tournament Info',
            key: 'tournament-info',
            children: <UpdateBasicInfoDetailsTour
                accessToken={user?.access_token}
                tournamentId={detail?.id}
                fileBgTour={fileBgTour}
                setFileBgTour={setFileBgTour}
                handleGetTourDetail = {handleGetTourDetail}
                // detail={detail}
                // setDetail={setDetail}
            />,
        },
        {
            label: 'Game Rule',
            key: 'game-rule',
            children: <UpdateGameRuleDetailsTour
                detail={detail}
                setDetail={setDetail}
                accessToken={user?.access_token}
            />,
        },
        {
            label: 'Registration & Fee',
            key: 'registration-fee',
            children: <UpdateRegistrationFeeDetailsTour
                tourId={detail?.id}
                // detail={detail}
                // setDetail={setDetail}
                accessToken={user?.access_token}
            />,
        },
        {
            label: 'Schedule & Matches',
            key: 'schedule-matches',
            children: <UpdateScheduleMatchesDetailsTour
                detail={detail}
                setDetail={setDetail}
                accessToken={user?.access_token}
            />,
        },
        {
            label: 'Invitations & Additional Options',
            key: 'invitations-additional-options',
            children: <UpdateInvitationsAdditionalOptionsDetailsTour
                detail={detail}
                setDetail={setDetail}
                accessToken={user?.access_token}
            />,
        },
        {
            label: 'Organizers & Merchandise',
            key: 'organizer',
            children: <UpdateOrganizerMerchandiseDetailsTour
                fileImgMerchandiseList={fileImgMerchandiseList}
                setFileImgMerchandiseList={setFileImgMerchandiseList}
                tourId={detail?.id}
                // detail={detail}
                // setDetail={setDetail}
                accessToken={user?.access_token}
            />,
        },
        {
            label: 'Sponsors',
            key: 'sponsors',
            children: <UpdateSponsorsDetailsTour
                // fileImgMerchandiseList={fileImgMerchandiseList}
                // setFileImgMerchandiseList={setFileImgMerchandiseList}
                detail={detail}
                setDetail={setDetail}
                // accessToken={user?.access_token}
            />,
        },

    ]);

    return (
        <div className='w-full h-full'>
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
                />
            </ConfigProvider>
        </div>
    )
}

export default UpdateDetailsTour