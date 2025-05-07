'use client';

import {
    // getTourDetailsAPI,
    searchTourAPI
} from '@/services/tournament';
   
import React, { createContext, useContext, useEffect, useState } from 'react';

interface TourDetailsKeyProps {
    activeKey: string;
    setActiveKey: (key: string) => void;
    tourList: any[];
    setTourList: (tour: (prevTours: any[]) => any[]) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    tourId: string;
    setTourId: (tourId: string) => void;
    getTours: (
        currentPage: number,
        totalPerPage: number,
        searchTerm: string,
    ) => Promise<void>;
    // tourDetails: TourDetailsProps;
    // setTourDetails: (tourDetails: TourDetailsProps) => void;
    // fetchTourDetails: (tourId: string) => Promise<void>;
    total: number;
    setTotal: (total: number) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPerPage: number;
    setTotalPerPage: (perPage: number) => void;
}

const TourContext = createContext<TourDetailsKeyProps | null>(null);

export const TourContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [activeKey, setActiveKey] = useState<string>('1');
    const [tourList, setTourList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tourId, setTourIdState] = useState<string>(''); // Initially empty
    const [tourDetails, setTourDetails] = useState<TourDetailsProps>(
        {} as TourDetailsProps,
    );
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPerPage, setTotalPerPage] = useState<number>(8);

    // Load tourId from localStorage on mount (client-side only)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTourId = localStorage.getItem('tourId');
            if (storedTourId) {
                setTourIdState(storedTourId);
            }
        }
    }, []); 

    // Function to update tourId and store it in localStorage
    const setTourId = (id: string) => {
        setTourIdState(id);
        if (typeof window !== 'undefined') {
            localStorage.setItem('tourId', id);
        }
    };

    const getTours = async (
        currentPage: number,
        totalPerPage: number,
        searchTerm: string,
    ) => {
        setIsLoading(true);

        try {
            const res = await searchTourAPI(
                searchTerm.trim(),
                currentPage,
                totalPerPage,
            );
            setTourList(res?.data?.data || []);
            setTotal(res?.data?.meta?.total);
            setCurrentPage(res?.data?.meta?.currentPage);
            setTotalPerPage(res?.data?.meta?.totalPerPage);
            // console.log('Check pagination', res?.data?.meta);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
        setIsLoading(false);
    };

    // useEffect(() => {
    //   getTours(1, 6);
    // });

    // Fetch tour details when tourId changes

    // const fetchTourDetails = async (tourId: string) => {
    //     if (tourId) {
    //         setIsLoading(true);
    //         try {
    //             const res = await getTourDetailsAPI(tourId);
    //             setTourDetails(res?.data);
    //         } catch (error) {
    //             console.error('Failed to fetch tour details', error);
    //         }
    //         setIsLoading(false);
    //     }
    // };

    //   useEffect(() => {
    //     fetchTourDetails(tourId);
    //   }, [tourId]);

    return (
        <TourContext.Provider
            value={{
                activeKey,
                setActiveKey,
                tourList,
                setTourList,
                isLoading,
                setIsLoading,
                tourId,
                setTourId,
                getTours,
                // tourDetails,
                // setTourDetails,
                // fetchTourDetails,
                total,
                setTotal,
                currentPage,
                setCurrentPage,
                totalPerPage,
                setTotalPerPage,
            }}
        >
            {children}
        </TourContext.Provider>
    );
};

export const useTourContext = () => {
    const context = useContext(TourContext);

    if (!context) {
        throw new Error(
            'useTourContext must be used within a TourContextProvider',
        );
    }

    return context;
};
