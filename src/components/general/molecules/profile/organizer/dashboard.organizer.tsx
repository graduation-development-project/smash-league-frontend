'use client';

import React, { useState } from 'react';
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

dayjs.extend(utc);

const DashboardOrganizer = ({ credit }: { credit: number | null }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [registrationPeriod, setRegistrationPeriod] =
    useState<string>('monthly');
  const [revenuePeriod, setRevenuePeriod] = useState<string>('monthly');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [revenueFromDate, setRevenueFromDate] = useState<string>('');

  const onFromDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) {
      const formatted = dayjs(date).utc().format('YYYY-MM-DDT00:00:00.000[Z]');
      console.log(formatted);
      setFromDate(formatted);
    }
  };

  const onToDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) {
      const formatted = dayjs(date).utc().format('YYYY-MM-DDT00:00:00.000[Z]');
      console.log(formatted);
      setToDate(formatted);
    }
  };

    const onRevenueFromDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) {
      const formatted = dayjs(date).utc().format('YYYY-MM-DDT00:00:00.000[Z]');
      console.log(formatted);
      setRevenueFromDate(formatted);
    }
  };
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
                    Total Athletes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">1,248</div>
                    <User className="h-8 w-8 text-emerald-500" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span className="text-emerald-500 font-medium">↑ 12%</span>{' '}
                    from last month
                  </p>
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
                    <div className="text-3xl font-bold">24</div>
                    <Trophy className="h-8 w-8 text-emerald-500" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span className="text-emerald-500 font-medium">↑ 4</span>{' '}
                    new this month
                  </p>
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
                    <div className="text-3xl font-bold">$24,389</div>
                    <DollarSign className="h-8 w-8 text-emerald-500" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span className="text-emerald-500 font-medium">↑ 18%</span>{' '}
                    from last month
                  </p>
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
                    <div className="text-3xl font-bold">842</div>
                    <Medal className="h-8 w-8 text-emerald-500" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span className="text-emerald-500 font-medium">↑ 86</span>{' '}
                    this week
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <div className="mt-2 flex items-center justify-between px-4 pt-2">
                  <DatePicker
                    onChange={onFromDateChange}
                    format={'YYYY-MM-DD'}
                    placeholder="From Date"
                  />

                  <DatePicker
                    onChange={onToDateChange}
                    format={'YYYY-MM-DD'}
                    placeholder="To Date"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Athlete Registrations</CardTitle>
                    <DropdownMenu>
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
                    </DropdownMenu>
                  </div>
                  <CardDescription>
                    Athlete registrations{' '}
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
                    onChange={onRevenueFromDateChange}
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
                    <DropdownMenu>
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
                    </DropdownMenu>
                  </div>
                  <CardDescription>
                    Total money collected for{' '}
                    {revenuePeriod ? 'for ' + revenuePeriod : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full">
                    <RevenueChart period={revenuePeriod} fromDate={revenueFromDate} />
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span>On Going</span>
                      </div>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span>Created</span>
                      </div>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Registration Open</span>
                      </div>
                      <span className="font-medium">6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-700"></div>
                        <span>Registration Close</span>
                      </div>
                      <span className="font-medium">6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span>Drawing</span>
                      </div>
                      <span className="font-medium">6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                        <span>Finished</span>
                      </div>
                      <span className="font-medium">42</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Cancelled</span>
                      </div>
                      <span className="font-medium">2</span>
                    </div>
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span>Completed</span>
                      </div>
                      <span className="font-medium">624</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span>Scheduled</span>
                      </div>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>In Progress</span>
                      </div>
                      <span className="font-medium">32</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Cancelled</span>
                      </div>
                      <span className="font-medium">30</span>
                    </div>
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">John Doe</p>
                          <p className="text-xs text-gray-500">Senior Umpire</p>
                        </div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Jane Smith</p>
                          <p className="text-xs text-gray-500">Senior Umpire</p>
                        </div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>RJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Robert Johnson</p>
                          <p className="text-xs text-gray-500">Junior Umpire</p>
                        </div>
                      </div>
                      <Badge variant="outline">Standby</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>ML</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Maria Lee</p>
                          <p className="text-xs text-gray-500">Junior Umpire</p>
                        </div>
                      </div>
                      <Badge variant="outline">Standby</Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    colorBtn={'whiteBtn'}
                    shadow={'shadowNone'}
                    className="w-full mt-4 text-sm hover:text-orange-500 hover:bg-transparent hover:underline"
                  >
                    View All Umpires
                  </Button>
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
