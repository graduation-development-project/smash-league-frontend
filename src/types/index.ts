interface TextGradientBtnProps {
  textColor: string; // Ensure this matches your styling framework
  size?: string;
  children: React.ReactNode;
}

interface IconTextProps {
  icon: any;
  title: string;
}
interface StandingScoreCardProps {
  id: number;
  cate: string;
  title: string;
  podium: PodiumSingleScoreCardProps[] | PodiumTeamScoreCardProps[];
}
interface PodiumSingleScoreCardProps {
  rank: number,
  name: string;
  address: string;
  age: number;
  height: number;
}
interface PodiumTeamScoreCardProps {
  rank: number,
  player1: PodiumSingleScoreCardProps,
  player2: PodiumSingleScoreCardProps;
  teamName: string;
}
