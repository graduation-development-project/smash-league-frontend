'use client';

import { useState, useEffect } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import { ImageUpload } from './degree-image-upload';
import {
  getUmpireQualificationTypeAPI,
  updateUmpireDegreeAPI,
} from '@/services/qualification';

const formSchema = z.object({
  id: z.string(),
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

export interface Degree {
  id: string;
  type: string;
  name: string;
  description: string;
  imageUrl: File;
}

interface EditDegreeModalProps {
  degree: Degree | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedDegree: Degree) => void;
  getAllUmpireQualifications: any;
}

export function UpdateDegreeModal({
  degree,
  open,
  onOpenChange,
  onSave,
  getAllUmpireQualifications,
}: EditDegreeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qualificationsTypes, setQualificationsTypes] = useState([]);
  const [user, setUser] = useState<any>({});

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
      id: '',
      type: '',
      name: '',
      description: '',
      imageUrl: new File([], ''),
    },
  });

  const getUmpireQualificationType = async () => {
    try {
      const response = await getUmpireQualificationTypeAPI();
      console.log('Check response umpire', response?.data?.data);
      setQualificationsTypes(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUmpireQualificationType();
  }, [user]);

  // Reset form when degree changes

  useEffect(() => {
    if (degree) {
      form.reset({
        id: degree.id,
        type: degree.type,
        name: degree.name,
        description: degree.description,
        imageUrl: degree.imageUrl,
      });
    }
  }, [degree, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    if (!degree) return;

    setIsSubmitting(true);
    // Simulate API call

    // console.log('Check values', values);
    try {
      const updatedDegree: Degree = {
        ...degree,
        ...values,
        imageUrl: values.imageUrl || degree.imageUrl,
      };

      const response = await updateUmpireDegreeAPI(
        values.id,
        values.type,
        values.description,
        values.name,
        values.imageUrl,
        user?.access_token,
      );
      // console.log('Check update response', response.data);

      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode == 201 ||
        response?.data?.statusCode == 204
      ) {
        onSave(updatedDegree);
        toast.success(`${response?.data?.message}`, {
          position: 'top-right',
          autoClose: 2000,
          theme: 'light',
        });
        setIsSubmitting(false);
        onOpenChange(false);
        getAllUmpireQualifications();
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
      console.log(error);
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Qualification</DialogTitle>
          <DialogDescription>
            Update the details of your qualification below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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
                            : item?.value === 'ForeignLanguageCertificate'
                            ? 'Foreign Language Certificate'
                            : 'Others'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The type of qualification</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="BWF Level 2 Umpire Certificate"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The official name of your degree or certificate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload an image of your certificate or degree
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the qualification, when it was obtained, and any other relevant details"
                      className="resize-none min-h-[100px]"
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

            <DialogFooter className="gap-2">
              <Button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="rounded-sm border border-primaryColor hover:bg-gray-100 hover:text-primaryColor"
                variant="default"
                shadow="shadowNone"
                colorBtn="whiteBtn"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-sm border bg-orange-500 hover:bg-orange-600 text-white"
                variant="default"
                shadow="shadowNone"
                colorBtn="whiteBtn"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
