'use client';

import React, { useEffect, useState } from 'react';
import FeaturedTournamentMain from '../tournaments.main';
import TourListBoard from '../../molecules/tournaments/tour-list.board';
import { Search } from 'lucide-react';
import CreateBanner from '../../molecules/create.banner';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/navigation';
import SearchTourBar from '../../atoms/tournaments/search-tour-bar';
import { useDebounce } from '@/hooks/use-debounce';
import { useTourContext } from '@/context/tour.context';
import { searchTourAPI } from '@/services/tournament';
import Spinner from '../../atoms/loaders/spinner';

const OnGoingTournament = () => {
    const router = useRouter();
    const { tourList, setTourList, isLoading, setIsLoading, total, setTotal, setTotalPerPage, currentPage, setCurrentPage, totalPerPage, getTours }
        = useTourContext();
    const [searchTerms, setSearchTerms] = useState<string>('');
    const debounceValue = useDebounce(searchTerms, 1000);

    useEffect(() => {
        getTours(currentPage, totalPerPage, debounceValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue, currentPage, totalPerPage]);
    const handlePageChange = async (currentPage: number) => {
        try {
            const res = await searchTourAPI(searchTerms, currentPage, totalPerPage);
            setCurrentPage(currentPage);
            setTourList(res?.data?.data || []);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };

    if (isLoading && tourList.length === 0)
        return <Spinner isLoading={isLoading} />;

    return (
        <div className="w-full h-max flex flex-col gap-10 justify-center items-center ">
            <div className="w-full h-max">
                {/* <CreateBanner /> */}
            </div>
            <div className="w-full h-max px-20">
                <Breadcrumb style={{ cursor: 'pointer' }}>
                    <Breadcrumb.Item onClick={() => router.push('/')}>
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Tournaments</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="flex flex-col justify-center items-center h-max w-full">
                <FeaturedTournamentMain />
            </div>

            <div className="flex flex-col justify-center items-center h-max w-full">
                <SearchTourBar
                    searchTerms={searchTerms}
                    setSearchTerms={setSearchTerms}
                    isLoading={isLoading}
                />
            </div>
            {isLoading === false && tourList.length > 0 ? (
                <div className="w-full h-max px-24 flex flex-col justify-center items-center">
                    <TourListBoard currentPage={currentPage} setCurrentPage={setCurrentPage} setTotalPerPage={setTotalPerPage} totalPerPage={totalPerPage} total={total} tourList={tourList} handlePageChange={handlePageChange}/>
                </div>
            ) : (
                <div className="w-[90%] h-full flex justify-center items-center px-5 py-8 bg-white shadow-shadowBtn rounded-[15px] text-gray-400 ">
                    No Tournament is found
                </div>
            )
            }


        </div >
    );
};

export default OnGoingTournament;
