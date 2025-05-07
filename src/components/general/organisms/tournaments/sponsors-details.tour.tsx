import { Separator } from '@/components/ui/separator'
import { getSponsorTourDetailsAPI } from '@/services/update-tour'
import { TIER_SPONSOR_ENUM } from '@/utils/enum'
import { CardContent } from '@mui/material'
import { Card, Image } from 'antd'
import { get } from 'http'
import React, { useEffect, useState } from 'react'


interface Sponsor {
  id: string
  name: string
  logo: string
  website?: string
}

// Group sponsors by tier
interface SponsorGroups {
  diamond: Sponsor[]
  gold: Sponsor[]
  silver: Sponsor[]
  bronze: Sponsor[]
}
interface SponsorCardProps {
  sponsor: Sponsor
  className?: string
  compact?: boolean
}

const SponsorsDetailsTour = (
  {
    tourId,
  }: {
    tourId: string;
  }

) => {

  const [sponsorList, setSponsorList] = useState<any>([]);

  const fetchGetSponsorsDetailTour = async () => {
    const response = await getSponsorTourDetailsAPI(tourId);
    setSponsorList(response.data);
    // return response.data;
  };

  const tierColor = (tier: string) => {
    switch (tier) {
      case "DIAMOND":
        return "from-purple-600 to-blue-500";
      case "PLATINUM":
        return "from-gray-800 to-gray-600";
      case "GOLD":
        return "from-yellow-500 to-yellow-400";
      case "SILVER":
        return "from-gray-500 to-gray-400";
      case "BRONZE":
        return "from-amber-700 to-amber-600";
      default:
        return "from-gray-500 to-gray-400";
    }
  }

    useEffect(() => {
      fetchGetSponsorsDetailTour();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Sponsors</h2>
        {
          sponsorList?.map((sponsors: any, index: number) => {
            return (
              <div key={sponsors?.tier || index} className="mb-16">
                <div className="flex items-center justify-center mb-8">
                  <Separator className="flex-grow" />
                  <div className="px-4">
                    <span
                      className={`inline-block w-60 text-center py-2 px-4 text-lg bg-gradient-to-r
                      ${tierColor(sponsors?.tier)} text-white font-bold rounded-lg`}

                    >
                      {TIER_SPONSOR_ENUM[sponsors?.tier as keyof typeof TIER_SPONSOR_ENUM]} Sponsors
                    </span>
                  </div>
                  <Separator className="flex-grow" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                  {sponsors?.sponsors?.map((sponsor: any, index: number) => (
                    <SponsorCard
                      key={index}
                      sponsor={sponsor}
                      className="w-full max-w-md border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow"
                    />
                  ))}
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}



function SponsorCard({ sponsor, className, compact = false }: SponsorCardProps) {
  return (
    <Card className={className}>
      <CardContent className={`flex flex-col items-center justify-center ${compact ? "p-3" : "p-6"} gap-2`}>
        <div className={`relative ${compact ? "h-12 w-full" : "h-20 w-full"} mb-3 flex items-center justify-center`}>
          <Image
            src={sponsor?.logo || "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"}
            alt={`${sponsor?.name} logo`}
            width={100}
            height={100}
            className="object-contain rounded-lg"
          />
        </div>
        <h3 className={`font-medium text-center ${compact ? "text-sm" : "text-base"}`}>{sponsor?.name}</h3>
      </CardContent>
    </Card>
  )
}

export default SponsorsDetailsTour