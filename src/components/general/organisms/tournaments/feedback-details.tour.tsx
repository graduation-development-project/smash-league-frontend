import { Button } from '@/components/ui/button';
import { formatCreatedDateTime } from '@/utils/format';
import { UserOutlined } from '@ant-design/icons';
import { Rating } from '@mui/material';
import { Avatar, Flex, Image, Rate, Space, Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react'
import PaginationCard from '../../atoms/pagination/pagination-card';
import { FaPlus } from "react-icons/fa";
import FeedbackModal from '../../molecules/tournaments/feedback-detail.tournament.form';
import { getFeedbackTournamentAPI } from '@/services/feedback-tour';





const FeedbackDetailsTour = ({
    detail,
    isOrganizer,
    user,
}: {
    detail: any;
    isOrganizer: boolean;
    user: any;
}) => {
    const tourId = detail?.id

    const [star, setStar] = useState<number>(0);
    const rating = ["All", "1 star", "2 stars", "3 stars", "4 stars", "5 stars"];
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [total, setTotal] = useState<number>(10)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [filteredFeedback, setFilteredFeedback] = useState<any[]>([]);

    const fetchGetTournamentFeedback = async () => {
        const response = await getFeedbackTournamentAPI(tourId, page, perPage);
        return response.data.data;
    }


    useEffect(() => {
        const filtered = async () => {
            const feedback = await fetchGetTournamentFeedback();
            const filtered = star > 0 ? feedback?.filter((fb: any) => fb.rating === star) : feedback;
            setFilteredFeedback(filtered);
        }
        filtered();
    }, [star, fetchGetTournamentFeedback])



    const handlePagination = () => {

    }


    return (
        <div className='w-full h-max px-3 text-textColor'>
            <div className='border rounded-md'>
                <h3
                    className='w-full text-[#FFF] text-xl font-bold px-5 py-2 rounded-t-md border'
                    style={{ backgroundColor: `${detail?.mainColor}` }}
                >
                    Feedback
                </h3>
                <div className='w-full h-max pt-5 pb-3 px-5 flex justify-between'>
                    <div className='w-max flex gap-3'>
                        {rating.map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    className='w-max h-max text-base font-semibold border px-4 py-1 rounded-md hover:bg-[#ffebde]'
                                    style={{
                                        backgroundColor: star === index ? `#FF8243` : "",
                                        color: star === index ? `#FFF` : ""
                                    }}
                                    onClick={() => setStar(index)}
                                >
                                    {item}
                                </button>
                            )
                        })}
                    </div>
                    {
                        !isOrganizer && user && (
                            <Button size={'sm'} onClick={() => setIsOpenModal(true)}>
                                <FaPlus /> Add Feedback
                            </Button>
                        )

                    }

                    <FeedbackModal
                        isModalOpen={isOpenModal}
                        setIsModalOpen={setIsOpenModal}
                        onClose={() => setIsOpenModal(false)}
                        tourId={detail?.id}
                    />

                </div>
                <div className='w-full min-h-[500px] px-5 py-3 flex flex-col gap-3'>
                    {
                        filteredFeedback?.length > 0 ? (
                            <div className=' flex flex-col gap-3 '>
                                <div className='w-full min-h-96 flex flex-col gap-3'>
                                    {
                                        filteredFeedback?.map((fb: any, index: number) => {
                                            return (
                                                <div key={index} className='w-full flex flex-col border rounded-md py-3  gap-2'>
                                                    <div className='w-full h-max flex justify-between  items-center px-5'>
                                                        <div className='flex flex-row font-semibold items-center gap-2'>

                                                            <Avatar src={fb?.account?.avatar} size={40} icon={<UserOutlined />} />
                                                            <div className='flex flex-col'>
                                                                <span className='px-1 font-bold text-base'>{fb?.account?.name}</span>
                                                                <Rate defaultValue={fb?.rating} allowHalf disabled />
                                                            </div>
                                                        </div>
                                                        <span className='text-textColor2 font-semibold'>
                                                            {formatCreatedDateTime(fb?.createdAt)}
                                                        </span>
                                                    </div>
                                                    <div className='pl-20 pb-2'>{fb?.comment}</div>
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                                <div className='w-full h-max flex justify-center items-center '>
                                    <PaginationCard
                                        total={total}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        totalPerPage={perPage}
                                        setTotalPerPage={setPerPage}
                                        onChange={handlePagination}
                                    />
                                </div>
                            </div>

                        ) : (
                            <div className="flex flex-col gap-8 font-bold text-xl items-center py-10 text-textColor2 ">
                                <Image
                                    preview={false}
                                    src={"https://cdn0.iconfinder.com/data/icons/empty-state-vol-1-semi-solid/64/16_empty_box_state_package_no_data_nothing-512.png"}
                                    width={300}
                                    height={300}
                                    alt='No feedback'
                                />
                                No founded feedbacks
                            </div>
                        )
                    }


                </div>
            </div>

        </div>
    )
}

export default FeedbackDetailsTour
