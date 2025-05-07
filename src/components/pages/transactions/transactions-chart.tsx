'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts';
import { getTotalTransactionsByDayAPI } from '@/services/payment';
import { formatMoney } from '@/utils/format';

// Sample data based on the provided format
const sampleData = [
  {
    date: '2025-05-01',
    total: 8500,
  },
  {
    date: '2025-05-02',
    total: 9200,
  },
  {
    date: '2025-05-03',
    total: 7800,
  },
  {
    date: '2025-05-04',
    total: 9500,
  },
  {
    date: '2025-05-05',
    total: 11200,
  },
  {
    date: '2025-05-06',
    total: 10800,
  },
];

interface TransactionData {
  date: string;
  total: number;
}

interface TransactionResponse {
  statusCode: number;
  message: string;
  data: TransactionData[];
}

// Custom tooltip component for the chart
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <Box className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <Typography variant="body2" className="font-medium">
          {formatDate(label)}
        </Typography>
        <Typography variant="body2" color="primary" className="font-bold">
          {formatMoney(payload[0].value as number)}
        </Typography>
      </Box>
    );
  }

  return null;
};

// Format date for display (e.g., "May 6")
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Format currency
// const formatCurrency = (value: number) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: '',
//     minimumFractionDigits: 0,
//   }).format(value);
// };

export default function TransactionChartMUI() {
  const theme = useTheme();
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const fetchTransactionData = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const response = await getTotalTransactionsByDayAPI(user?.access_token);
      console.log('Check response', response);
      if (response.statusCode === 200 || response.statusCode === 201) {
        setTransactionData(response.data);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log('Error', error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Card className="w-full shadow-md">
      <CardContent>
        <Typography variant="h6" component="div" className="font-bold mb-1">
          Transaction Value by Day
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-4">
          Daily total transaction values
        </Typography>

        {isLoading ? (
          <Box className="flex justify-center items-center h-80">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box className="flex justify-center items-center h-80">
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <Box className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transactionData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: theme.palette.divider }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  tickFormatter={(value) => `VND ${value }`}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="total"
                  fill={theme.palette.primary.main}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
