import React, { JSX, ReactElement } from 'react';
// import { Props as SVGPanZoomProps } from 'react-svg-pan-zoom';

export type Participant = {
  id: string | number;

  isWinner: boolean;

  name?: string;

  status?: 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | string | null;

  resultText?: string | null;

  [key: string]: any;
};

export type TeamMember = {
  id: string | number;
  gender: 'M' | 'F';
  name?: string;
};

export type TeamParticipant = {
  id: string | number;

  isWinner: boolean;

  teamName?: string;

  status?: 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | string | null;

  resultText?: string | null;

  player1: TeamMember;
  player2?: TeamMember;

  [key: string]: any;
};

export type Match = {
  game: [];
  id: number | string;

  /** Link to this match. While onClick() can be used, providing an href
      better supports opening a new tab, or copying a link. * */
  href?: string;

  name?: string;

  nextMatchId: number | string | null;

  nextLooserMatchId?: number | string;

  tournamentRoundText?: string;

  startTime: string;

  state: 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | string;

  participants: Participant[] | TeamParticipant[];

  [key: string]: any;
};

export type Options = {
  width?: number;

  borderRadius?: number;

  boxHeight?: number;

  canvasPadding?: number;

  spaceBetweenColumns?: number;

  spaceBetweenRows?: number;

  connectorColor?: string;

  connectorColorHighlight?: string;

  roundHeader?: {
    isShown?: boolean;
    height?: number;
    marginBottom?: number;
    fontSize?: number;
    fontColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
    roundTextGenerator?: (
      currentRoundNumber: number,
      roundsTotalNumber: number,
    ) => string | undefined;
  };

  roundSeparatorWidth?: number;

  lineInfo?: {
    separation?: number;
    homeVisitorSpread?: number;
  };

  horizontalOffset?: number;

  wonBywalkOverText?: string;

  lostByNoShowText?: string;
};

export type ComputedOptions = Options & {
  rowHeight?: number;

  columnWidth?: number;
};

export type SvgViewerProps = {
  height: number;

  width: number;

  bracketWidth: number;

  bracketHeight: number;

  children: ReactElement;

  startAt: number[];

  scaleFactor: number;
};

export type MatchComponentProps = {
  match: Match;

  onMatchClick: (args: {
    match: Match;
    topWon: boolean;
    bottomWon: boolean;
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  }) => void;

  onPartyClick: (
    party: Participant | TeamParticipant,
    partyWon: boolean,
  ) => void;

  onMouseEnter: (partyId: string | number) => void;

  onMouseLeave: () => void;

  topParty: Participant | TeamParticipant;

  bottomParty: Participant | TeamParticipant;

  topWon: boolean;

  bottomWon: boolean;

  topHovered: boolean;

  bottomHovered: boolean;

  topText: string;

  bottomText: string;

  connectorColor?: string;

  computedStyles?: ComputedOptions;

  teamNameFallback: string;

  resultFallback: (participant: Participant | TeamParticipant) => string;
};

export type Theme = {
  fontFamily: string;
  transitionTimingFunction: string;
  disabledColor: string;

  roundHeaders: {
    background: string;
  };

  matchBackground: {
    wonColor: string;
    lostColor: string;
  };

  border: {
    color: string;
    highlightedColor: string;
  };

  textColor: {
    highlighted: string;
    main: string;
    dark: string;
    disabled: string;
  };

  score: {
    text: {
      highlightedWonColor: string;
      highlightedLostColor: string;
    };
    background: {
      wonColor: string;
      lostColor: string;
    };
  };

  canvasBackground: string;

  // cursor: string;

  // hover: {
  //   cursor: "pointer";
  // };
};

export type CommonTreeProps = {
  svgWrapper?: (props: {
    bracketWidth: number;
    bracketHeight: number;
    startAt: number[];
    children: ReactElement;
  }) => React.ReactElement;

  theme?: Theme;

  options?: { style: Options };
};

export type BracketLeaderboardProps = CommonTreeProps & {
  matchComponent: (props: MatchComponentProps) => JSX.Element;

  currentRound?: string;

  onMatchClick?: (args: {
    match: Match;
    topWon: boolean;
    bottomWon: boolean;
  }) => void;

  onPartyClick?: (party: Participant, partyWon: boolean) => void;
};

export type SingleElimLeaderboardProps = BracketLeaderboardProps & {
  matches: Match[];
};

export type DoubleElimLeaderboardProps = BracketLeaderboardProps & {
  matches: { upper: Match[]; lower: Match[] };
};

export type RegisterAthleteTournamentFormProps = {
  playerId: string;
  playerName: string;
  fromTeamId: string;
  tournamentId: string;
  tournamentEventId: string;
  registrationDocumentCreator: Record<string, File[]>;
};
export type RegisterAthleteTournamentBeforeSubmitFormProps = {
  playerId: string;
  playerName: string;
  fromTeamId: string;
  tournamentId: string;
  tournamentEventId: string;
  registrationDocumentCreator: Record<string, File[]>;
  partnerId?: string;
  partnerName?: string;
  registrationDocumentPartner?: Record<string, File[]>;
};
export type RegisterAthleteTournamentSubmitFormProps = {
  playerId: string;
  playerName: string;
  fromTeamId: string;
  tournamentId: string;
  tournamentEventId: string;
  registrationDocumentCreator: string[];
  partnerId?: string;
  partnerName?: string;
  registrationDocumentPartner?: string[];
};
