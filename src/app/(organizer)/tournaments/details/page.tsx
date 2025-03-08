import MainLayout from '@/components/layout/mainlayout/layout'
import DetailsTourPage from '@/components/pages/tournaments/details.tour.page'
import React from 'react'

const DetailsTour = () => {
    return (
        <MainLayout noHero={true}>
            <div className=''>
                <DetailsTourPage />
            </div>
        </MainLayout>
    )
}

export default DetailsTour