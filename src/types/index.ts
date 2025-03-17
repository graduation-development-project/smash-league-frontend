interface TextGradientBtnProps {
  textColor: string; // Ensure this matches your styling framework
  size?: string;
  children: React.ReactNode;
}

interface TeamProps {
  team: { id: number; name: string };
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
  rank: number;
  name: string;
  address: string;
  age: number;
  height: number;
}
interface PodiumTeamScoreCardProps {
  rank: number;
  player1: PodiumSingleScoreCardProps;
  player2: PodiumSingleScoreCardProps;
  teamName: string;
}

interface CreateTeamsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  session?: any;
}

interface TeamLeadersProps {}

interface TeamDetailsProps {
  description: string;
  id: string; 
  logo: string;
  status: string;
  teamLeader: any;
  teamLeaderId: string;
  teamName: string;
}

interface PackageCardProps {
  title: string;
  newPrice: number;
  oldPrice: number;
  description: string;
  advantages: string[];
  credit: number;
  recommended?: boolean;
}

interface PaginationProps {
  total: number;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  totalPerPage?: number;
  setTotalPerPage?: (perPage: number) => void;
  onChange: (page: number) => void;
}
interface UserProps {
  avatarURL: string;
  email: string;
  name: string;
  id: string;
  isVerified: boolean;
  phoneNumber: string;
}

interface NotificationProps {
  createdAt: string;
  id: string;
  title: string;
  message: string;
  typeId: string;
  teamInvitationId: string;
  teamRequestId: string;
  tournamentRegistrationId: string;
}

interface TourDetailsProps {
  description: string;
  id: string; 
  logo: string;
  status: string;
  teamLeader: any;
  teamLeaderId: string;
  teamName: string;
}
