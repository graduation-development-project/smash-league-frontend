import { Separator } from '@/components/ui/separator'
import { getSponsorTourDetailsAPI } from '@/services/update-tour'
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

const sponsors: SponsorGroups = {
  diamond: [
    { id: "d1", name: "Diamond Sponsor 1", logo: "https://brandlogos.net/wp-content/uploads/2013/04/nestle-company-vector-logo-400x400.png" },
    { id: "d2", name: "Diamond Sponsor 2", logo: "https://cdn.tgdd.vn/2020/04/GameApp/unnamed-200x200-18.png" },
  ],
  gold: [
    { id: "g1", name: "Gold Sponsor 1", logo: "https://cdn.tgdd.vn/2020/04/GameApp/unnamed-200x200-18.png" },
    { id: "g2", name: "Gold Sponsor 2", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYH-dH2tpfDJGQGclP1jjqIyWE63RnOUVWSw&s" },
    { id: "g3", name: "Gold Sponsor 3", logo: "https://cdn.tgdd.vn/2020/04/GameApp/unnamed-200x200-18.png" },
  ],
  silver: [
    { id: "s1", name: "Silver Sponsor 1", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/1200px-AirAsia_New_Logo.svg.png" },
    { id: "s2", name: "Silver Sponsor 2", logo: "https://img.favpng.com/24/25/15/logo-yonex-brand-tennis-badminton-png-favpng-KsAffpWz6w3cimxCfiFj11379.jpg" },
    { id: "s3", name: "Silver Sponsor 3", logo: "https://cdn.tgdd.vn/2020/04/GameApp/unnamed-200x200-18.png" },
    { id: "s4", name: "Silver Sponsor 4", logo: "https://cdn.tgdd.vn/2020/04/GameApp/unnamed-200x200-18.png" },
  ],
  bronze: [
    { id: "b1", name: "Bronze Sponsor 1", logo: "https://static.wixstatic.com/media/edcddb_cd77c1c1115849fb90a2381ef5add618~mv2.jpg/v1/fit/w_2500,h_1330,al_c/edcddb_cd77c1c1115849fb90a2381ef5add618~mv2.jpg " },
    { id: "b2", name: "Bronze Sponsor 2", logo: "https://bwfworldchampionships.bwfbadminton.com/wp-content/uploads/2014/07/BWF_logo_holding_device1-980x450.jpg" },
    { id: "b3", name: "Bronze Sponsor 3", logo: "https://logowik.com/content/uploads/images/hsbc-bank8440.jpg" },
    { id: "b4", name: "Bronze Sponsor 4", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtkiqDrBunNZ1gnoPrpdq_EeqPVxx2GuHANMM-0oTDCifk9YmEFotd5A3TQ6cZ1o3FnPw&usqp=CAU" },
    { id: "b5", name: "Bronze Sponsor 5", logo: "https://cdn.tgdd.vn/2020/04/GameApp/unnamed-200x200-18.png" },
    { id: "b6", name: "Bronze Sponsor 6", logo: "https://cdn.tgdd.vn/2020/04/GameApp/unnamed-200x200-18.png" },
  ],
}
const SponsorsDetailsTour = (
  {
    tourId,
  }: {
    tourId: string;
  }

) => {

  const [sponsorList, setSponsorList] = useState<SponsorGroups>(sponsors);

  const fetchGetSponsorsDetailTour = async () => {
    const response = await getSponsorTourDetailsAPI(tourId);
    setSponsorList(response.data);
    // return response.data;
  };

  

  useEffect(() => {
    fetchGetSponsorsDetailTour();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Sponsors</h2>

        {/* Diamond Sponsors */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Separator className="flex-grow" />
            <div className="px-4">
              <span className="inline-block w-60 text-center py-2 px-4 text-lg bg-gradient-to-r from-purple-600 to-blue-500  text-white font-bold rounded-lg">
                Diamond Sponsors
              </span>
            </div>
            <Separator className="flex-grow" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {sponsors.diamond.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                className="w-full max-w-md border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow"
              />
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-16 ">
          <div className="flex items-center justify-center mb-8">
            <Separator className="flex-grow" />
            <div className="px-4">
              <span className="inline-block w-60 py-2 px-4 bg-gradient-to-r text-center text-lg from-yellow-500 to-yellow-400 text-white font-bold rounded-lg">
                Gold Sponsors
              </span>
            </div>
            <Separator className="flex-grow" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {sponsors.gold.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                className="w-full max-w-sm border-2 border-yellow-100 shadow-md hover:shadow-lg transition-shadow"
              />
            ))}
          </div>
        </div>

        {/* Silver Sponsors */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Separator className="flex-grow" />
            <div className="px-4">
              <span className="inline-block w-60 py-2 px-4 text-center text-lg bg-gradient-to-r from-gray-400 to-gray-300 text-white font-semibold rounded-lg">
                Silver Sponsors
              </span>
            </div>
            <Separator className="flex-grow" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            {sponsors.silver.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                className="w-full max-w-xs border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              />
            ))}
          </div>
        </div>

        {/* Bronze Sponsors */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <Separator className="flex-grow" />
            <div className="px-4">
              <span className="inline-block w-60 py-2 px-4 text-center text-lg bg-gradient-to-r from-amber-700 to-amber-600 text-white font-bold rounded-lg">
                Bronze Sponsors
              </span>
            </div>
            <Separator className="flex-grow" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
            {sponsors.bronze.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                className="w-full max-w-xs border border-amber-100 shadow-sm hover:shadow-md transition-shadow"
                compact
              />
            ))}
          </div>
        </div>
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
            src={sponsor.logo || "/placeholder.svg"}
            alt={`${sponsor.name} logo`}
            width={100}
            height={100}
            // fill
            className="object-contain rounded-lg"
          />
        </div>
        <h3 className={`font-medium text-center ${compact ? "text-sm" : "text-base"}`}>{sponsor.name}</h3>
        {sponsor.website && !compact && (
          <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-sm text-primary hover:underline"
          >
            Visit Website
          </a>
        )}
      </CardContent>
    </Card>
  )
}

export default SponsorsDetailsTour