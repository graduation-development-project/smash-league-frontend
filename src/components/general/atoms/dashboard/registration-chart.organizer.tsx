'use client';

import { registrationCountsAPI } from '@/services/org-dashboard';
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default function RegistrationsChart({
  period,
  fromDate: fromDateProp,
  toDate: toDateProp,
}: {
  period: string;
  fromDate?: string | null;
  toDate?: string | null;
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

  const isSameYear = (date1: string, date2: string) =>
    new Date(date1).getFullYear() === new Date(date2).getFullYear();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const getRegistrationCounts = async (token: string, from: string, to: string) => {
    try {
      const response = await registrationCountsAPI(period, from, to, token);
      const data: Record<string, number> = response.data.data;

      const start = new Date(from);
      start.setDate(1);
      const end = new Date(to);
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
        current.setMonth(current.getMonth() + 1);
      }

      setRegistrationCounts(months);
    } catch (error) {
      console.error('Error fetching registration counts:', error);
    }
  };

  useEffect(() => {
    if (!user?.access_token) return;

    if (!isSameYear(fromDate, toDate)) {
      message.warning('From Date and To Date must be in the same year!');
      setRegistrationCounts([]); // clear chart data if invalid
      return;
    }

    getRegistrationCounts(user.access_token, fromDate, toDate);
  }, [user, period, fromDate, toDate]);

  return (
    <div className="w-full h-full flex items-end gap-2">
      {registrationCounts.map(([month, count]) => (
        <div
          key={month}
          className="flex-1 flex flex-col items-center group relative"
        >
          <div
            className="w-full max-w-[30px] bg-primaryColor rounded-t-sm transition-all duration-300"
            style={{ height: `${(count / 2) * 5}px` }}
          />
          {count > 0 && (
            <div className="w-max absolute bottom-full mb-1 hidden group-hover:flex items-center justify-center bg-gray-700 text-white text-xs px-2 py-1 rounded">
              {count} {count === 1 ? 'registration' : 'registrations'}
            </div>
          )}
          <span className="text-xs mt-2">
            {month.split('-')[1]}/{month.split('-')[0].slice(-2)}
          </span>
        </div>
      ))}
    </div>
  );
}
