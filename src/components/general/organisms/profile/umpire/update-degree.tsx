import { UmpireDegreeForm } from '@/components/general/molecules/profile/umpire/umpire-degree-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function UpdateUmpireDegrees({getAllUmpireQualifications}: {getAllUmpireQualifications: any}) {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Umpire Qualifications
        </h1>
        <p className="text-muted-foreground">
          Manage your badminton umpire degrees and certificates
        </p>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Qualification</CardTitle>
            <CardDescription>
              Add a new degree or certificate to your umpire profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UmpireDegreeForm getAllUmpireQualifications = {getAllUmpireQualifications} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
