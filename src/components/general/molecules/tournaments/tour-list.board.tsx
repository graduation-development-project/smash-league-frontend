import React from 'react'
import TournamentCard from '../../atoms/tournaments/tournament.card'
import { ConfigProvider, Pagination } from 'antd'

const TourListBoard = () => {
  return (
    <div className='w-full h-max flex flex-col p-10 gap-10 bg-white shadow-shadowComp rounded-xl'>
      <h1 className='text-[32px] text-start font-bold leading-normal text-black'><span className='text-primaryColor'>Tournaments</span> List</h1>
      <div className="grid grid-cols-3 gap-x-6 gap-y-6  w-full place-items-center justify-items-center px-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <TournamentCard />
          </div>
        ))}
      </div>
      <div className='w-full flex justify-center'>
        <div className="flex justify-center items-center bg-white w-max py-3 px-6 shadow-shadowBtn rounded-xl">
          <ConfigProvider
            theme={{
              token: {
                /* here is your global tokens */
                colorPrimary: "#FF8243",
                colorPrimaryBorder: "#FF8243",
                colorPrimaryHover: "#FF8243",
                fontWeightStrong: 700,
              },
            }}
          >
            <Pagination
              style={{ fontWeight: 600 }}
              size="default"
              total={12}
              showTotal={(total) => `Total ${total} items`}
              defaultPageSize={5}
              defaultCurrent={1}
            />
          </ConfigProvider>
        </div>
      </div>


    </div>
  )
}

export default TourListBoard