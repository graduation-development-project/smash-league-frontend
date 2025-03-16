import { auth } from '@/auth';
import MainLayout from '@/components/layout/mainlayout/layout'
import CreateTourPage from '@/components/pages/tournaments/create.tour.page'
import React from 'react'

const CreateTour1 = async () => {
  const session = await auth();
  return (
    <MainLayout session={session} noHero={true}>
      <div className=''>
        <CreateTourPage session = {session}/>
      </div>
    </MainLayout>
  )
}

export default CreateTour1