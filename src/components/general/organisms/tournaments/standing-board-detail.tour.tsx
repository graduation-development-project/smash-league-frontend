import React, { useEffect, useMemo, useState } from "react"

// import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Card, Input } from "antd"
import { getStandingBoardTourEventAPI } from "@/services/home-page"

type RankingItem = {
  id: string
  avatar?: string
  fullName: string
  rank: number
  totalPoints: number
  totalWins: number
  totalLosses: number
  rankChange?: number
}

export default function TournamentRankingBoard({
  tournamentId,
}: {
  tournamentId: string
}) {
  const [rankingData, setRankingData] = useState<RankingItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await getStandingBoardTourEventAPI(tournamentId)
        setRankingData(response?.data)
      } catch (err) {
        console.error("Failed to fetch ranking data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tournamentId])

  const filteredData = useMemo(() => {
    return rankingData?.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, rankingData])

  return (
    <div className="space-y-4">
      <Input
        placeholder="Tìm kiếm vận động viên..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <div className="space-y-2">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <div className="flex gap-4 items-center p-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                  <Skeleton className="h-4 w-10" />
                </div>
              </Card>
            ))
          : filteredData.map((athlete, index) => (
              <Card key={athlete.id}>
                <div className="flex items-center justify-between p-4 hover:bg-muted rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold w-6 text-center">
                      {athlete.rank}
                    </span>
                    <img
                      src={athlete.avatar}
                      alt={athlete.fullName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{athlete.fullName}</div>
                      <div className="text-sm text-muted-foreground">
                        Thắng: {athlete.totalWins} · Thua: {athlete.totalLosses}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">
                        {athlete.totalPoints}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Điểm số
                      </div>
                    </div>

                    {athlete.rankChange !== undefined && (
                      <div
                        className={cn(
                          "flex items-center gap-1 text-sm",
                          athlete.rankChange > 0
                            ? "text-green-600"
                            : athlete.rankChange < 0
                            ? "text-red-600"
                            : "text-gray-400"
                        )}
                      >
                        {athlete.rankChange > 0 ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : athlete.rankChange < 0 ? (
                          <ArrowDown className="w-4 h-4" />
                        ) : null}
                        {Math.abs(athlete.rankChange)}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
      </div>
    </div>
  )
}
