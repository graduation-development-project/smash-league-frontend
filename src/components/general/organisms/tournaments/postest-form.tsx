'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DumbbellIcon as BadmintonBall, CheckCircle, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'react-toastify';
import { getParticipantListAPI } from '@/services/detail-tour';
import { reportPlayerAPI } from '@/services/report';

const formSchema = z.object({
  player: z.string({
    required_error: 'Please select a player to report.',
  }),
  reason: z.string({
    required_error: 'Please select a reason for the report.',
  }),
});

export default function PostestForm({
  eventId,
  tournamentId,
}: {
  eventId: string;
  tournamentId: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const eventUUID = eventId.slice(eventId.indexOf('-') + 1);

  const [playerList, setPlayerList] = useState<{ user: any; partner?: any }[]>(
    [],
  );

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const fetchParticipantList = async () => {
    try {
      const res = await getParticipantListAPI(eventUUID);
      if (res.statusCode === 200 || res.statusCode === 201) {
        setPlayerList(res?.data?.listParticipants);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchParticipantList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventUUID]);

  //   console.log('Check playerList', playerList);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    setIsSubmitting(true);

    // console.log(values);

    // Simulate API call
    const response = await reportPlayerAPI(
      tournamentId,
      eventUUID,
      values.player,
      values.reason,
      user?.access_token,
    );
    console.log('check response report ', response.data);

    if (
      response.data?.statusCode === 200 ||
      response.data?.statusCode === 201
    ) {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success(`${response?.data?.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    } else {
      setIsSubmitting(false);
      setIsSuccess(false);
      toast.error(`${response?.data?.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    // setTimeout(() => {
    //   console.log(values);
    //   setIsSubmitting(false);
    //   setIsSuccess(true);
    //   toast.success('Report submitted successfully', {
    //     position: 'top-right',
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'light',
    //   });
    // }, 1500);
  }

  if (isSuccess) {
    return (
      <div className="container max-w-full py-10">
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Report Submitted</AlertTitle>
          <AlertDescription className="text-green-700">
            Your report has been submitted successfully. Tournament officials
            will review it shortly.
          </AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
          <Button
            onClick={() => {
              setIsSuccess(false);
              form.reset();
            }}
          >
            Submit Another Report
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Card className="max-w-full mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <BadmintonBall className="h-6 w-6 text-green-600" />
            <CardTitle className="text-2xl">Player Report Form</CardTitle>
          </div>
          <CardDescription>
            Report a player for rule violations or misconduct during the
            tournament.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="player"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a player to report" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {playerList.map((player) => (
                          <div
                            key={
                              player?.user?.id +
                              '-' +
                              (player?.partner?.id ?? '')
                            }
                          >
                            {player?.user && (
                              <SelectItem value={player.user.id}>
                                {player.user.name}
                              </SelectItem>
                            )}
                            {player?.partner && (
                              <SelectItem value={player.partner.id}>
                                {player.partner.name}
                              </SelectItem>
                            )}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Reason for Report</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="unsportsmanlike" />
                          </FormControl>
                          <FormLabel className="font-normal">Unsportsmanlike conduct</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="rules-violation" />
                          </FormControl>
                          <FormLabel className="font-normal">Rules violation</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="verbal-abuse" />
                          </FormControl>
                          <FormLabel className="font-normal">Verbal abuse</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="time-wasting" />
                          </FormControl>
                          <FormLabel className="font-normal">Time wasting</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Reason</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide specific reasonabout the incident..."
                        className="resize-none min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include match number, time of incident, and any witnesses
                      if applicable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Alert variant="default" className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Important</AlertTitle>
                <AlertDescription className="text-blue-700">
                  All reports are confidential and will be reviewed by
                  tournament officials.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          For urgent matters, please contact the tournament director directly.
        </CardFooter>
      </Card>
    </div>
  );
}
