'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { toast } from 'react-toastify';
import { ImageUpload } from './degree-image-upload';
import {
  createUmpireQualificationAPI,
  getUmpireQualificationTypeAPI,
} from '@/services/qualification';

const formSchema = z.object({
  type: z.string({
    required_error: 'Please select a qualification type',
  }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  imageUrl: z
    .instanceof(File, { message: 'You must upload an image file' })
    .refine((file) => file.size < 10 * 1024 * 1024, {
      message: 'File size must be under 10MB',
    }),
});

export function UmpireDegreeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>({});
  const [qualificationsTypes, setQualificationsTypes] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      name: '',
      description: '',
      imageUrl: new File([], ''),
    },
  });

  const getUmpireQualificationType = async () => {
    try {
      const response = await getUmpireQualificationTypeAPI();
      // console.log('Check response umpire', response?.data?.data);
      setQualificationsTypes(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    try {
      setIsSubmitting(true);
      console.log('Check values', values);

      const response = await createUmpireQualificationAPI(
        values.type,
        values.imageUrl,
        values.description,
        values.name,
        user?.access_token,
      );
      console.log('Check update response', response.data);
      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode == 201
      ) {
        setTimeout(() => {
          console.log(values);
          toast.success('Qualification added successfully', {
            position: 'top-right',
            autoClose: 2000,
          });
          form.reset();
          setIsSubmitting(false);
        }, 1000);
      } else {
        setIsSubmitting(false);
        toast.error(`${response?.data?.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error: any) {
      console.log('Error', error);
    }

    // Simulate API call
  };

  useEffect(() => {
    getUmpireQualificationType();
  }, [user]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Type Field */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qualification Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select qualification type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {qualificationsTypes?.map((item: any) => (
                    <SelectItem key={item?.key} value={item?.value}>
                      {item?.value === 'UmpireDegree'
                        ? 'Umpire Degree'
                        : item?.value === 'HealthCertificate'
                        ? 'Health Certificate'
                        : 'Foreign Language Certificate'}
                    </SelectItem>
                  ))}
                  {/* <SelectItem value="national_degree">
                    National Degree
                  </SelectItem>
                  <SelectItem value="international_degree">
                    International Degree
                  </SelectItem>
                  <SelectItem value="certification">Certification</SelectItem>
                  <SelectItem value="workshop">Workshop Certificate</SelectItem>
                  <SelectItem value="other">Other</SelectItem> */}
                </SelectContent>
              </Select>
              <FormDescription>
                The type of qualification you are adding
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qualification Name</FormLabel>
              <FormControl>
                <Input placeholder="Umpire Certificate" {...field} />
              </FormControl>
              <FormDescription>
                The official name of your degree or certificate
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificate Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(file: File) => field.onChange(file)}
                />
              </FormControl>
              <FormDescription>
                Upload an image of your certificate
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the qualification, when it was obtained, and any other relevant details"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide details about this qualification
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-sm border border-primaryColor hover:bg-orange-500 hover:text-white"
          variant="default"
          shadow="shadowNone"
          colorBtn="whiteBtn"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Form>
  );
}
