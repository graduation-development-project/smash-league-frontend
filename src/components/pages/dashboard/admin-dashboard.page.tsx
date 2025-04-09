'use client';
import AdminCard from '@/components/general/molecules/admin/admin.card';
import { BarChart } from '@mui/x-charts';
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="w-full h-full flex flex-col gap-7">
      <AdminCard />
      <div className="w-full h-full flex items-center justify-between">
        <BarChart
          series={[
            {
              data: [4, 2, 5, 4, 1],
              stack: 'A',
              label: 'Series A1',
            },
            {
              data: [2, 8, 1, 3, 1],
              stack: 'A',
              label: 'Series A2',
            },
            {
              data: [14, 6, 5, 8, 9],
              label: 'Series B1',
            },
          ]}
          colors={['#FF8243', '#74ba74', '#2B927F']} // orange, green, black
          barLabel={(item, context) => {
            if ((item.value ?? 0) > 10) {
              return 'High';
            }
            return context.bar.height < 60 ? null : item.value?.toString();
          }}
          width={750}
          height={400}
        />
        <div className="h-[400px] w-[450px] gap-3 flex flex-col border border-gray-500 rounded-md overflow-auto px-3 pb-3 relative bg-white">
          <div className="w-full h-max flex justify-center text-[22px] text-primaryColor font-semibold underline sticky top-0 bg-gray-100 z-10 py-2">
            Notifications
          </div>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-max flex flex-col gap-1 rounded-md shadow-shadowBtn p-2"
            >
              <h1>Title of Notification</h1>
              <p>Notification description</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
