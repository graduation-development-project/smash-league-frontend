'use client';

import { revenueCountsAPI } from '@/services/org-dashboard';
import { formatMoney } from '@/utils/format';
import { useEffect, useState } from 'react';

export default function RevenueChart({
  period,
  fromDate: fromDateProp,
}: {
  period: string;
  fromDate?: string;
}) {
  const [revenueCounts, setRevenueCounts] = useState<[string, number][]>([]);
  const [user, setUser] = useState<any>({});

  const defaultFromDate = '2025-01-01';
  const defaultToDate = '2025-06-30';

  const fromDate = fromDateProp || defaultFromDate;
  const toDate = defaultToDate;

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
      console.log('Check response revenue chart', response.data.data);

      const data: Record<string, number> = response.data.data;

      // Calculate the months between fromDate and the current month
      const start = new Date(fromDate);
      start.setDate(1); // start at the first day of the month
      const end = new Date(toDate); // current month
      end.setDate(1);

      const months: [string, number][] = [];

      let current = new Date(start);
      while (
        current.getFullYear() < end.getFullYear() ||
        (current.getFullYear() === end.getFullYear() &&
          current.getMonth() <= end.getMonth())
      ) {
        const year = current.getFullYear();
        const month = `${current.getMonth() + 1}`.padStart(2, '0');
        const key = `${year}-${month}`;
        months.push([key, data[key] || 0]);

        // Move to the next month
        current.setMonth(current.getMonth() + 1);
      }

      setRevenueCounts(months);
    } catch (error) {
      console.error('Error fetching revenue counts:', error);
    }
  };

  useEffect(() => {
    if (user?.access_token) {
      getRevenueCounts(user.access_token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            style={{ height: `${count / 40000}px` }}
          ></div>
          {/* Tooltip on hover */}
          {count > 0 && (
            <span className="absolute -top-6 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {formatMoney(count)}
            </span>
          )}
          <span className="text-xs mt-2">
            {month.split('-')[1]}/{month.split('-')[0].slice(-2)}
          </span>
        </div>
      ))}
    </div>
  );
}
