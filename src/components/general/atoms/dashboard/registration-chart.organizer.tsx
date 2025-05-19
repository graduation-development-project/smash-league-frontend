'use client';

import { registrationCountsAPI } from '@/services/org-dashboard';
import { useEffect, useState } from 'react';

export default function RegistrationsChart({
  period,
  fromDate,
  toDate,
}: {
  period: string;
  fromDate: string;
  toDate: string;
}) {
  const [registrationCounts, setRegistrationCounts] = useState<
  [string, number][]
  >([]);
  const [user, setUser] = useState<any>({});

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

      // Ensure we have all 12 months in order
      const months = Array.from({ length: 12 }, (_, i) => {
        const month = `${i + 1}`.padStart(2, '0');
        const key = `2025-${month}`;
        return [key, data[key] || 0] as [string, number];
      });

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
      {registrationCounts.map(([month, count], i) => (
        <div key={month} className="flex-1 flex flex-col items-center">
          <div
            className="w-full max-w-[30px] bg-primaryColor rounded-t-sm"
            style={{ height: `${count * 2}px` }}
          />
          <span className="text-xs mt-2">{month.split('-')[1]}</span>
        </div>
      ))}
    </div>
  );
}
