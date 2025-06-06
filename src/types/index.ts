interface TextGradientBtnProps {
  textColor: string; // Ensure this matches your styling framework
  size?: string;
  children: React.ReactNode;
  onClick?: () => void;
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
  id: string;
  advantages: string[];
  credit: number;
  currentDiscountByAmount: number;
  isAvailable: boolean;
  isRecommended: boolean;
  packageDetail: string;
  packageName: string;
  price: number;
}

interface PaginationProps {
  total: number;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  totalPerPage?: number;
  setTotalPerPage?: (perPage: number) => void;
  onChange: (page: number) => void;
  itemText?: string;
}
interface UserProps {
  avatarURL: string;
  creditsRemain: number;
  currentRefreshToken: string;
  dateOfBirth: string;
  email: string;
  hands: string;
  height: number;
  id: string;
  isVerified: boolean;
  name: string;
  otp: string | null;
  otpExpiresTime: string | null;
  phoneNumber: string;
  teamId: string | null;
  teamRole: string | '';
}

interface NotificationsTypeProps {
  id: string;
  typeOfNotification: string;
}

interface TeamInvitationProps {
  team: {
    id: string;
    logo: string;
  };
  status: string;
}

interface TeamRequestProps {
  team: {
    id: string;
    logo: string;
  };
  status: string;
}

interface NotificationProps {
  createdAt: string;
  id: string;
  title: string;
  message: string;
  teamRequest: TeamRequestProps;
  teamInvitation: TeamInvitationProps;
  type: NotificationsTypeProps;
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
