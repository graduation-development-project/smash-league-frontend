'use client';

import { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import {
  deleteUmpireDegreeAPI,
  getAllUmpireQualificationsAPI,
} from '@/services/qualification';
import { Image } from 'antd';
import { useProfileContext } from '@/context/profile.context';
import EmptyCard from '../../empty/empty.card';
import { UpdateDegreeModal, type Degree } from './update-degree-modal';

// Sample data - in a real app this would come from your database
const sampleDegrees = [
  {
    id: '1',
    type: 'international_degree',
    name: 'BWF Accredited Umpire',
    description:
      'International certification for badminton umpires. Qualified to officiate at BWF sanctioned international tournaments.',
    imageUrl: '/placeholder.svg?height=400&width=300',
    issueDate: '2022-05-15',
  },
  {
    id: '2',
    type: 'national_degree',
    name: 'National Umpire Level 3',
    description:
      'Highest national level certification for badminton umpires. Qualified to officiate at all national tournaments.',
    imageUrl: '/placeholder.svg?height=400&width=300',
    issueDate: '2020-03-10',
  },
  {
    id: '3',
    type: 'certification',
    name: 'Para-Badminton Officiating Certificate',
    description:
      'Specialized certification for officiating para-badminton events. Includes training on classification and modified rules.',
    imageUrl: '/placeholder.svg?height=400&width=300',
    issueDate: '2021-11-22',
  },
];

const typeLabels: Record<
  string,
  {
    label: string;
    variant: 'default' | 'secondary' | 'outline' | 'destructive';
  }
> = {
  UmpireDegree: { label: 'Umpire Degree', variant: 'default' },
  HealthCertificate: { label: 'Health Certificate', variant: 'secondary' },
  ForeignLanguageCertificate: {
    label: 'Foreign Language Certificate',
    variant: 'outline',
  },
  other: { label: 'Other', variant: 'outline' },
};

export function UmpireDegreeList({
  qualifications,
  getAllUmpireQualifications,
}: {
  qualifications: any;
  getAllUmpireQualifications: any;
}) {
  const [degrees, setDegrees] = useState<any>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDegreeId, setSelectedDegreeId] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const { setActiveKey, activeKey } = useProfileContext();
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [activeKey]);

  const handleDelete = (id: string) => {
    setSelectedDegreeId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedDegreeId) {
      const response = await deleteUmpireDegreeAPI(
        selectedDegreeId,
        user?.access_token,
      );
      if (
        response?.data?.statusCode === 200 ||
        response?.data?.statusCode == 201
      ) {
        setTimeout(() => {
          getAllUmpireQualifications();
          toast('Qualification deleted', {
            type: 'success',
            position: 'top-right',
            autoClose: 3000,
          });
          setDeleteDialogOpen(false);
        }, 1000);
      } else {
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
    }
  };

  const handleEdit = (degree: Degree) => {
    setSelectedDegree(degree);
    setEditDialogOpen(true);
  };

  const handleSave = (updatedDegree: Degree) => {
    setDegrees(
      qualifications.map((qualification: any) =>
        qualification.id === updatedDegree.id ? updatedDegree : qualification,
      ),
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    getAllUmpireQualifications();
  }, [user, activeKey]);

  if (qualifications.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-10">
          {/* <p className="text-muted-foreground text-center mb-4">
            You haven&apos;t added any qualifications yet.
          </p>
          <Button
            variant="outline"
            onClick={() => setActiveKey('umpire-update-qualifications')}
          >
            Add Your First Qualification
          </Button> */}
          <EmptyCard
            description="You haven't added any qualifications yet."
            image="https://cdn-icons-png.freepik.com/512/8386/8386437.png"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {qualifications.map((degree: any) => (
        <Card key={degree.id} className="overflow-hidden">
          <div className="aspect-[3/2] relative">
            <Image
              src={degree.imageUrl || '/placeholder.svg'}
              alt={degree.name}
              className="object-cover"
            />
            <Badge
              className="absolute top-2 right-2"
              variant={typeLabels[degree.type]?.variant || 'outline'}
            >
              {typeLabels[degree.type]?.label || 'Other'}
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="line-clamp-1">{degree.name}</CardTitle>
            {/* <CardDescription>
              Issued: {formatDate(degree.issueDate)}
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {degree?.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="default"
              shadow={'shadowNone'}
              colorBtn={'whiteBtn'}
              className="rounded-sm text-secondColor hover:bg-transparent hover:underline"
              size="sm"
              onClick={() => handleEdit(degree)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="default"
              shadow={'shadowNone'}
              colorBtn={'whiteBtn'}
              size="sm"
              className="text-destructive hover:text-destructive rounded-sm hover:bg-transparent hover:underline"
              onClick={() => handleDelete(degree.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Qualification</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this qualification? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              shadow={'shadowNone'}
              colorBtn={'whiteBtn'}
              size="sm"
              className="border-none rounded-sm hover:bg-transparent hover:underline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              shadow={'shadowNone'}
              colorBtn={'whiteBtn'}
              size="sm"
              className="text-destructive hover:text-destructive rounded-sm hover:bg-transparent hover:underline"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpdateDegreeModal
        degree={selectedDegree}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSave}
        getAllUmpireQualifications={getAllUmpireQualifications}
      />
    </div>
  );
}
