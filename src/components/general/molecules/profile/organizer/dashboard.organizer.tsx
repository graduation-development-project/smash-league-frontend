'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Activity,
  Calendar,
  ChevronDown,
  Clock,
  DollarSign,
  Flag,
  Medal,
  Menu,
  Search,
  Settings,
  ShieldAlert,
  Trophy,
  User,
  Users,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import RegisterAthleteTournamentForm from '../../tournaments/register-athlete.tournament.form';
import RegistrationsChart from '@/components/general/atoms/dashboard/registration-chart.organizer';
import RevenueChart from '@/components/general/atoms/dashboard/revenue-chart.organizer';
import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { formatMoney } from '../../../../../utils/format';
import {
  countMatchesStatusAPI,
  countTournamentStatusAPI,
  getCountMatchInCurrentWeekAPI,
  getCountRegistrationInCurrentMonthAPI,
  getCountTourInCurrentMonthAPI,
  getCurrentMonthRevenueAPI,
  getUmpiresInOwnedTourAPI,
} from '@/services/org-dashboard';
import { FaMoneyBillTransfer } from 'react-icons/fa6';

dayjs.extend(utc);

interface Revenue {
  currentRevenue: number;
  previousRevenue: number;
  changeRate: number;
}

interface TournamentAndMatch {
  currentCount: number;
  previousCount: number;
  changeRate: number;
}

const DashboardOrganizer = ({ credit }: { credit: number | null }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [registrationPeriod, setRegistrationPeriod] =
    useState<string>('monthly');
  const [revenuePeriod, setRevenuePeriod] = useState<string>('monthly');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [revenueFromDate, setRevenueFromDate] = useState<string>('');
  const [tournamentStatusList, setTournamentStatusList] = useState([]);
  const [matchStatusList, setMatchStatusList] = useState([]);
  const [umpireList, setUmpireList] = useState([]);
  const [currentMonthRevenue, setCurrentMonthRevenue] = useState<Revenue>({
    currentRevenue: 0,
    previousRevenue: 0,
    changeRate: 0,
  });
  const [currentMonthTour, setCurrentMonthTour] = useState<TournamentAndMatch>({
    currentCount: 0,
    previousCount: 0,
    changeRate: 0,
  });
  const [currentWeekMatch, setCurrentWeekMatch] = useState<TournamentAndMatch>({
    currentCount: 0,
    previousCount: 0,
    changeRate: 0,
  });
  const [currentMonthRegistration, setCurrentMonthRegistration] =
    useState<TournamentAndMatch>({
      currentCount: 0,
      previousCount: 0,
      changeRate: 0,
    });
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);
  const onFromDateChange = (date: any) => {
    if (date) {
      const formatted = dayjs(date).utc().format('YYYY-MM-DDT00:00:00.000[Z]');
      console.log(formatted);
      setFromDate(formatted);
    }
  };

  const onToDateChange = (date: any) => {
    if (date) {
      const formatted = dayjs(date).utc().format('YYYY-MM-DDT00:00:00.000[Z]');
      console.log(formatted);
      setToDate(formatted);
    }
  };

  const onRevenueFromDateChange = (date: any) => {
    if (date) {
      const formatted = dayjs(date).utc().format('YYYY-MM-DDT00:00:00.000[Z]');
      console.log(formatted);
      setRevenueFromDate(formatted);
    }
  };

  const getTournamentStatus = async () => {
    try {
      const response = await countTournamentStatusAPI(user.access_token);
      // console.log('response count tournament', response.data.data);
      setTournamentStatusList(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getMatchStatus = async () => {
    try {
      const response = await countMatchesStatusAPI(user.access_token);
      // console.log('response count matches', response.data.data);
      setMatchStatusList(response.data.data);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const getUmpireList = async () => {
    try {
      const response = await getUmpiresInOwnedTourAPI(user.access_token);
      // console.log('response umpire list', response.data);
      setUmpireList(response.data.data.slice(0, 5));
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const getCurrentMonthRevenue = async () => {
    try {
      const response = await getCurrentMonthRevenueAPI(user?.access_token);
      // console.log('response current month revenue', response.data.data);
      setCurrentMonthRevenue(response.data.data);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const getCurrentMonthTour = async () => {
    try {
      const response = await getCountTourInCurrentMonthAPI(user.access_token);
      // console.log('response current month tour', response.data.data);
      setCurrentMonthTour(response.data.data);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const getCurrentWeekMatch = async () => {
    try {
      const response = await getCountMatchInCurrentWeekAPI(user.access_token);
      // console.log('response current week match', response.data.data);
      setCurrentWeekMatch(response.data.data);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const getCurrentMonthRegistration = async () => {
    try {
      const response = await getCountRegistrationInCurrentMonthAPI(
        user.access_token,
      );
      // console.log('response current month registration', response.data.data);
      setCurrentMonthRegistration(response.data.data);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getTournamentStatus();
    getMatchStatus();
    getUmpireList();
    getCurrentMonthRevenue();
    getCurrentMonthTour();
    getCurrentWeekMatch();
    getCurrentMonthRegistration();
  }, [user]);

  const totalTournament = Object.entries(tournamentStatusList).find(
    ([status, count]) => status === 'TOTAL',
  );

  const totalMatch = Object.entries(matchStatusList).find(
    ([status, count]) => status === 'TOTAL',
  );

  console.log('check currentMonthRegistration', currentMonthRegistration);
  // console.log('Check total tournament', totalTournament?.[1]);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-[32px] font-bold">Dashboard</h1>
      <div className="w-full flex flex-col gap-2 font-semibold shadow-shadowBtn p-6 rounded-sm">
        <h1>
          Number of Credit: {credit === null || credit === 0 ? 0 : credit}{' '}
        </h1>
        {credit === null || credit === 0 ? (
          <h1 className="text-[14px] font-normal italic">
            You don&apos;t have any credit.{' '}
            <span
              className="text-primaryColor not-italic hover:underline cursor-pointer"
              onClick={() => {
                router.push('/package');
              }}
            >
              View the tournaments packages
            </span>
          </h1>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 rounded-sm">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={isSidebarOpen ? 'hidden' : ''}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-bold">Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input placeholder="Search..." className="pl-8" />
                </div>
              </div>
            </div> */}
          </header>

          {/* Dashboard Content */}
          <main className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Tournament Statistics</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Overview of your badminton tournaments and registrations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Registrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">
                      {currentMonthRegistration.currentCount}
                    </div>
                    <User className="h-8 w-8 text-emerald-500" />
                  </div>
                  {currentMonthRegistration?.changeRate > 0 ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span className="text-emerald-500 font-medium">
                        ↑ {currentMonthRegistration?.changeRate}%
                      </span>{' '}
                      new this month
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      No Change from last month
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Tournaments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">
                      {currentMonthTour?.currentCount}
                    </div>
                    <Trophy className="h-8 w-8 text-emerald-500" />
                  </div>
                  {currentMonthTour?.changeRate > 0 ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span className="text-emerald-500 font-medium">
                        ↑ {currentMonthTour?.changeRate}%
                      </span>{' '}
                      new this month
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      No Change from last month
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">
                      {formatMoney(currentMonthRevenue?.currentRevenue)}
                    </div>
                    <FaMoneyBillTransfer className="h-8 w-8 text-emerald-500" />
                  </div>
                  {currentMonthRevenue?.changeRate > 0 ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span className="text-emerald-500 font-medium">
                        ↑ {currentMonthRevenue?.changeRate}%
                      </span>
                      from last month
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      No Change from last month
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Matches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">
                      {currentWeekMatch?.currentCount}
                    </div>
                    <Medal className="h-8 w-8 text-emerald-500" />
                  </div>
                  {currentWeekMatch?.changeRate > 0 ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span className="text-emerald-500 font-medium">
                        ↑ {currentWeekMatch?.changeRate}%
                      </span>
                      from last week
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      No Change from last week
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <div className="mt-2 flex items-center justify-between px-4 pt-2">
                  <DatePicker
                    onChange={(value) => {
                      if (value === null || value === undefined) {
                        onFromDateChange(null);
                      } else {
                        onFromDateChange(value);
                      }
                    }}
                    format={'YYYY-MM-DD'}
                    placeholder="From Date"
                  />

                  <DatePicker
                    onChange={(value) => {
                      if (value === null || value === undefined) {
                        onToDateChange(null);
                      } else {
                        onToDateChange(value);
                      }
                    }}
                    format={'YYYY-MM-DD'}
                    placeholder="To Date"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Tournament Registrations</CardTitle>

                    {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          colorBtn={'whiteBtn'}
                          shadow={'shadowNone'}
                          size="sm"
                          className="gap-1 text-black font-quicksand"
                          onClick={() => {}}
                        >
                          {registrationPeriod.charAt(0).toUpperCase() +
                            registrationPeriod.slice(1)}{' '}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() => setRegistrationPeriod('today')}
                        >
                          Today
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setRegistrationPeriod('weekly')}
                        >
                          Weekly
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setRegistrationPeriod('monthly')}
                        >
                          Monthly
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setRegistrationPeriod('yearly')}
                        >
                          Yearly
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </div>
                  <CardDescription>
                    Tournament registrations{' '}
                    {registrationPeriod ? 'for ' + registrationPeriod : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full">
                    <RegistrationsChart
                      period={registrationPeriod}
                      fromDate={fromDate}
                      toDate={toDate}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <div className="mt-2 flex items-center justify-between px-4 pt-2">
                  <DatePicker
                    onChange={(value) => {
                      if (value === null || value === undefined) {
                        onRevenueFromDateChange(null);
                      } else {
                        onRevenueFromDateChange(value);
                      }
                    }}
                    format={'YYYY-MM-DD'}
                    placeholder="From Date"
                  />

                  {/* <DatePicker
                    onChange={onToDateChange}
                    format={'YYYY-MM-DD'}
                    placeholder="To Date"
                  /> */}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Revenue</CardTitle>
                    {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          colorBtn={'whiteBtn'}
                          shadow={'shadowNone'}
                          size="sm"
                          className="gap-1 text-black font-quicksand"
                          onClick={() => {}}
                        >
                          {revenuePeriod.charAt(0).toUpperCase() +
                            revenuePeriod.slice(1)}{' '}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() => setRevenuePeriod('today')}
                        >
                          Today
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setRevenuePeriod('weekly')}
                        >
                          Weekly
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setRevenuePeriod('monthly')}
                        >
                          Monthly
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => setRevenuePeriod('yearly')}
                        >
                          Yearly
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </div>
                  <CardDescription>
                    Total money collected for{' '}
                    {revenuePeriod ? 'for ' + revenuePeriod : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full">
                    <RevenueChart
                      period={revenuePeriod}
                      fromDate={revenueFromDate}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Tournament Status</CardTitle>
                  <CardDescription>Status of all tournaments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(tournamentStatusList).map(
                      ([status, count]) => (
                        <div
                          key={status}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                status === 'ON_GOING'
                                  ? 'bg-emerald-500'
                                  : status === 'CREATED'
                                  ? 'bg-amber-500'
                                  : status === 'OPENING'
                                  ? 'bg-yellow-300'
                                  : status === 'OPENING_FOR_REGISTRATION'
                                  ? 'bg-blue-500'
                                  : status === 'CLOSING_FOR_REGISTRATION'
                                  ? 'bg-orange-700'
                                  : status === 'DRAWING'
                                  ? 'bg-purple-500'
                                  : status === 'FINISHED'
                                  ? 'bg-gray-500'
                                  : status === 'CANCELED'
                                  ? 'bg-red-500'
                                  : ''
                              }`}
                            ></div>
                            <span>{status}</span>
                          </div>
                          <span className="font-medium">{count}</span>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Match Status</CardTitle>
                  <CardDescription>Status of all matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(matchStatusList).map(([status, count]) => (
                      <div
                        key={status}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              status === 'NOT_STARTED'
                                ? 'bg-amber-500'
                                : status === 'ON_GOING'
                                ? 'bg-emerald-500'
                                : status === 'INTERVAL'
                                ? 'bg-gray-500'
                                : status === 'ENDED'
                                ? 'bg-red-500'
                                : ''
                            }`}
                          ></div>
                          <span>{status}</span>
                        </div>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Umpires</CardTitle>
                  <CardDescription>Umpires in tournaments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {umpireList.map((umpire: any) => (
                      <div
                        key={umpire.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {umpire.user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {umpire.user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {umpire.tournamentId}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={`${
                            umpire.isAvailable ? 'default' : 'outline'
                          }`}
                        >
                          {umpire.isAvailable ? 'Available' : 'Unavailable'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  {/* <Button
                    variant="ghost"
                    colorBtn={'whiteBtn'}
                    shadow={'shadowNone'}
                    className="w-full mt-4 text-sm hover:text-orange-500 hover:bg-transparent hover:underline"
                  >
                    View All Umpires
                  </Button> */}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrganizer;
