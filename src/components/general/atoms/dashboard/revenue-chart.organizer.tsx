'use client';

import { revenueCountsAPI } from '@/services/org-dashboard';
import { useEffect, useState } from 'react';

export default function RevenueChart({
  period,
  fromDate,
}: {
  period: string;
  fromDate: string;
}) {
  const [revenueCounts, setRevenueCounts] = useState<[string, number][]>([]);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const getRevenueCounts = async (token: string) => {
    try {
      const response = await revenueCountsAPI(period, fromDate, token);
      console.log('Check response', response.data.data);

      const data: Record<string, number> = response.data.data;

      // Ensure we have all 12 months in order
      const months = Array.from({ length: 12 }, (_, i) => {
        const month = `${i + 1}`.padStart(2, '0');
        const key = `2025-${month}`;
        return [key, data[key] || 0] as [string, number];
      });

      setRevenueCounts(months);
    } catch (error) {
      console.error('Error fetching revenue counts:', error);
    }
  };

  useEffect(() => {
    if (user?.access_token) {
      getRevenueCounts(user.access_token);
    }
  }, [user, period, fromDate]);

  return (
    <div className="w-full h-full flex items-end gap-2">
      {revenueCounts.map(([month, count]) => (
        <div
          key={month}
          className="flex-1 flex flex-col items-center relative group"
        >
          <div
            className="w-full max-w-[30px] bg-secondColor rounded-t-sm transition-all duration-300"
            style={{ height: `${count * 10}px` }}
          ></div>
          {/* Tooltip on hover */}
          <span className="absolute -top-6 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {count}
          </span>
          <span className="text-xs mt-2">{month.split('-')[1]}</span>
        </div>
      ))}
    </div>
  );
}
