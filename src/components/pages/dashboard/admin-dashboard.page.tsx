'use client';
import AdminCard from '@/components/general/molecules/admin/admin.card';
import { BarChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TransactionChartMUI from '../transactions/transactions-chart';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart3,
  Bell,
  CheckCircle,
  CreditCard,
  FileText,
  Home,
  LogOut,
  Settings,
  Trophy,
  Users,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAllTransactionsAPI } from '@/services/payment';
import { useTourContext } from '@/context/tour.context';
import { getAllUsersAPI } from '@/services/user';
import { toast } from 'react-toastify';
import { getAllVerificationsAPI } from '@/services/verification';
import { searchTourAPI } from '@/services/tournament';
import { getAllReportsAPI } from '@/services/report';

// Navigation items
const navigationItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
    isActive: true,
  },
  {
    title: 'Users',
    url: '/users',
    icon: Users,
  },
  {
    title: 'Verifications',
    url: '/verifications',
    icon: UserCheck,
  },
  {
    title: 'Tournaments',
    url: '/tournaments',
    icon: Trophy,
  },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: CreditCard,
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: FileText,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

// Sample data for recent activities
const recentActivities = [
  {
    id: 1,
    type: 'tournament',
    title: 'New tournament created',
    description: 'Summer Championship 2024',
    time: '2 hours ago',
    status: 'active',
  },
  {
    id: 2,
    type: 'verification',
    title: 'Player verification pending',
    description: 'John Smith - ID verification',
    time: '4 hours ago',
    status: 'pending',
  },
  {
    id: 3,
    type: 'transaction',
    title: 'Payment received',
    description: '$150.00 tournament fee',
    time: '6 hours ago',
    status: 'completed',
  },
  {
    id: 4,
    type: 'report',
    title: 'New report submitted',
    description: 'Match dispute - Court 3',
    time: '1 day ago',
    status: 'review',
  },
];

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Material UI blue
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const AdminDashboard = () => {
  const router = useRouter();
  const { getTours, tourList } = useTourContext();
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [createdToursList, setCreatedToursList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [verificationsList, setVerificationsList] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(storedUser ? JSON.parse(storedUser) : {}); // Only parse if not null
      }
    }
  }, []);

  const getAllUsers = async () => {
    setIsLoading(true);
    const response = await getAllUsersAPI(user?.access_token);
    if (
      response?.data?.statusCode === 200 ||
      response?.data?.statusCode === 201
    ) {
      setUsersList(response?.data?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const getAllVerifications = async () => {
    if (!user?.access_token) return;
    setIsLoading(true);
    try {
      const response = await getAllVerificationsAPI(user?.access_token);

      // console.log('Chek response umpire', response.data.data);
      setVerificationsList(response?.data?.data);
      setPendingVerifications(
        response?.data?.data
          .filter((veri: any) => veri.status === 'PENDING')
          .map((veri: any) => ({
            ...veri,
            userName: veri.user?.name || 'N/A', // Thêm key userName để tránh lỗi undefined
          })),
      );
    } catch (error) {
      toast.error('Failed to fetch verifications.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCreatedTours = async (
    currentPage: number,
    totalPerPage: number,
    searchTerm: string,
  ) => {
    setIsLoading(true);

    try {
      const res = await searchTourAPI(
        searchTerm.trim(),
        currentPage,
        totalPerPage ? totalPerPage : 8,
      );
      // console.log('Check res created tours', res.data.data);
      setCreatedToursList(
        res?.data?.data.filter((tour: any) => tour.status === 'CREATED') || [],
      );
      // console.log('Check pagination', res?.data?.meta);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
    setIsLoading(false);
  };

  const getAllTransactions = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const response = await getAllTransactionsAPI(user?.access_token);
      console.log(response?.data, 'check');
      if (response?.statusCode === 200 || response.statusCode === 201) {
        setTransactionList(response?.data);
        setPendingTransactions(
          response?.data.filter(
            (transaction: any) => transaction.status === 'PENDING',
          ),
        );
        setIsLoading(false);
      } else {
        setTransactionList([]);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log('Error', error);
    }
  };

  const getAllReports = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      let response = await getAllReportsAPI(user?.access_token);
      if ([200, 201].includes(response?.statusCode)) {
        const formattedReports = response.data.map((report: any) => ({
          key: report.id,
          id: report.id,
          reason: report.reason,
          status: report.status,
          tournamentName: report.tournament.name,
          contactEmail: report.tournament.contactEmail,
          createAt: report.createdAt,
        }));
        setReportList(formattedReports);
        setIsLoading(false);
        setPendingReports(
          formattedReports.filter((report: any) => report.status === 'PENDING'),
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTours(1, 100, '');
    getAllUsers();
    getCreatedTours(1, 1000, '');
    getAllVerifications();
    getAllTransactions();
    getAllReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    // <div className="w-full h-full flex flex-col gap-7">
    //   <AdminCard />
    //   <div className="w-full h-full flex items-center justify-center">
    //     <ThemeProvider theme={theme}>
    //       <CssBaseline />
    //       <Box className="container mx-auto p-4 md:p-6 lg:p-8">
    //         {/* <Typography variant="h4" component="h1" className="font-bold mb-6">
    //           Dashboard
    //         </Typography> */}
    //         <Box className="grid grid-cols-1 gap-6">
    //           <TransactionChartMUI />
    //         </Box>
    //       </Box>
    //     </ThemeProvider>
    //   </div>
    // </div>

    <main className="flex-1 space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersList?.length}</div>
            {/* <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verification Forms
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {verificationsList?.length}
            </div>
            {pendingVerifications?.length > 0 ? (
              <p className="text-xs text-muted-foreground">
                <span className="text-yellow-600">
                  {pendingVerifications?.length} pending
                </span>{' '}
                review
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">No pending</span>
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Tournaments
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tourList?.length}</div>
            {createdToursList?.length > 0 ? (
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">
                  {createdToursList?.length} upcoming
                </span>{' '}
                tournaments
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">No upcoming</span>
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactionList?.length}</div>
            {pendingTransactions?.length > 0 ? (
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">
                  {pendingTransactions?.length} transactions
                </span>{' '}
                pending
              </p>
            ) : (
              <p className="text-xs text-green-500">No pending</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportList?.length}</div>
            {pendingReports?.length > 0 ? (
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">
                  {pendingReports?.length}urgent
                </span>{' '}
                need attention
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">No urgent</span>
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              shadow={'shadowNone'}
              colorBtn={'whiteBtn'}
              variant="outline"
              className="h-20 flex-col gap-2 rounded-sm hover:bg-primaryColor hover:text-white"
              onClick={() => router.push('/dashboard/tournaments')}
            >
              <Trophy className="h-6 w-6" />
              Tournaments List
            </Button>
            <Button
              shadow={'shadowNone'}
              colorBtn={'whiteBtn'}
              variant="outline"
              className="h-20 flex-col gap-2 rounded-sm hover:bg-primaryColor hover:text-white"
              onClick={() => router.push('/dashboard/verify/umpires')}
            >
              <UserCheck className="h-6 w-6" />
              Review Verifications
            </Button>
            <Button
              shadow={'shadowNone'}
              colorBtn={'whiteBtn'}
              variant="outline"
              className="h-20 flex-col gap-2 rounded-sm hover:bg-primaryColor hover:text-white"
              onClick={() => router.push('/staff/dashboard/payback')}
            >
              <BarChart3 className="h-6 w-6" />
              PayBack List
            </Button>
            <Button
              shadow={'shadowNone'}
              colorBtn={'whiteBtn'}
              variant="outline"
              className="h-20 flex-col gap-2 rounded-sm hover:bg-primaryColor hover:text-white"
              onClick={() => router.push('/dashboard/reports')}
            >
              <FileText className="h-6 w-6" />
              Report List
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* <div className="grid gap-6 lg:grid-cols-2">
        Recent Activities
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest system activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    {activity.type === 'tournament' && (
                      <Trophy className="h-4 w-4" />
                    )}
                    {activity.type === 'verification' && (
                      <UserCheck className="h-4 w-4" />
                    )}
                    {activity.type === 'transaction' && (
                      <CreditCard className="h-4 w-4" />
                    )}
                    {activity.type === 'report' && (
                      <FileText className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        activity.status === 'active' ||
                        activity.status === 'completed'
                          ? 'default'
                          : activity.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {activity.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        System Status
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current system health and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Database Connection</span>
                </div>
                <Badge variant="default">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Payment Gateway</span>
                </div>
                <Badge variant="default">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Email Service</span>
                </div>
                <Badge variant="secondary">Slow</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Tournament Engine</span>
                </div>
                <Badge variant="default">Running</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Recent Tournaments Table */}
      <Card>
        {/* <CardHeader>
          <CardTitle>Recent Tournaments</CardTitle>
          <CardDescription>
            Latest tournament registrations and updates
          </CardDescription>
        </CardHeader> */}
        <CardContent>
          {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tournament Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Summer Championship 2024
                </TableCell>
                <TableCell>Dec 15, 2024</TableCell>
                <TableCell>64/64</TableCell>
                <TableCell>
                  <Badge>Active</Badge>
                </TableCell>
                <TableCell>$9,600</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Junior League Finals
                </TableCell>
                <TableCell>Dec 20, 2024</TableCell>
                <TableCell>32/48</TableCell>
                <TableCell>
                  <Badge variant="secondary">Registration Open</Badge>
                </TableCell>
                <TableCell>$4,800</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Corporate Cup</TableCell>
                <TableCell>Dec 22, 2024</TableCell>
                <TableCell>16/32</TableCell>
                <TableCell>
                  <Badge variant="secondary">Registration Open</Badge>
                </TableCell>
                <TableCell>$2,400</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Winter Open</TableCell>
                <TableCell>Jan 5, 2025</TableCell>
                <TableCell>8/128</TableCell>
                <TableCell>
                  <Badge variant="outline">Upcoming</Badge>
                </TableCell>
                <TableCell>$1,200</TableCell>
              </TableRow>
            </TableBody>
          </Table> */}

          <TransactionChartMUI />
        </CardContent>
      </Card>
    </main>
  );
};

export default AdminDashboard;
