'use client';

import { registrationCountsAPI } from '@/services/org-dashboard';
import { useEffect, useState } from 'react';

export default function RegistrationsChart({
  period,
  fromDate: fromDateProp,
  toDate: toDateProp,
}: {
  period: string;
  fromDate?: string;
  toDate?: string;
}) {
  const [registrationCounts, setRegistrationCounts] = useState<
    [string, number][]
  >([]);
  const [user, setUser] = useState<any>({});

  // Default date range: 01/2025 - 06/2025
  const defaultFromDate = '2025-01-01';
  const defaultToDate = '2025-06-30';

  const fromDate = fromDateProp || defaultFromDate;
  const toDate = toDateProp || defaultToDate;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const getRegistrationCounts = async (token: string) => {
    try {
      const response = await registrationCountsAPI(
        period,
        fromDate,
        toDate,
        token,
      );
      console.log('Check response', response.data.data);

      const data: Record<string, number> = response.data.data;

      // Calculate the months between fromDate and toDate
      const start = new Date(fromDate);
      start.setDate(1); // start at the first day of the month
      const end = new Date(toDate);
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

      setRegistrationCounts(months);
    } catch (error) {
      console.error('Error fetching registration counts:', error);
    }
  };

  useEffect(() => {
    if (user?.access_token) {
      getRegistrationCounts(user.access_token);
    }
  }, [user, period, fromDate, toDate]);

  return (
    <div className="w-full h-full flex items-end gap-2">
      {registrationCounts.map(([month, count]) => (
        <div
          key={month}
          className="flex-1 flex flex-col items-center group relative"
        >
          {/* Bar */}
          <div
            className="w-full max-w-[30px] bg-primaryColor rounded-t-sm transition-all duration-300"
            style={{ height: `${(count / 2) * 5}px` }}
          />

          {/* Tooltip on hover */}
          {count > 0 && (
            <div className="w-max absolute bottom-full mb-1 hidden group-hover:flex items-center justify-center bg-gray-700 text-white text-xs px-2 py-1 rounded">
              {count} {count === 1 ? 'registration' : 'registrations'}
            </div>
          )}

          {/* Month label */}
          <span className="text-xs mt-2">
            {month.split('-')[1]}/{month.split('-')[0].slice(-2)}
          </span>
        </div>
      ))}
    </div>
  );
}
