'use client';
import React, { useContext } from 'react';
import { matchContext } from './match-context';
import { MATCH_STATES } from './match-states';
import { defaultStyle, getCalculatedStyles } from '@/utils/settings';
import { sortTeamsSeedOrder } from './match-functions';

function Match({
  isTeam = false,
  rowIndex = 0,
  columnIndex = 0,
  match = undefined,
  previousBottomMatch = null,
  teams = [],
  topText = null,
  bottomText = null,
  style = defaultStyle,
  matchComponent: MatchComponent = null,
  onMatchClick = null,
  onPartyClick = null,
  ...rest
}: any) {
  const {
    state: { hoveredPartyId },
    dispatch,
  }: any = useContext(matchContext);

  const computedStyles = getCalculatedStyles(style);
  const { width = 300, boxHeight = 70, connectorColor } = computedStyles;

  const sortedTeams = teams?.sort(sortTeamsSeedOrder(previousBottomMatch));

  let topParty = sortedTeams?.[0] ? sortedTeams[0] : {};
  let bottomParty = sortedTeams?.[1] ? sortedTeams[1] : {};

  // if (isTeam === true) {
  //   topParty = topParty[0];
  //   bottomParty = bottomParty[0];
  // }

  const topHovered =
    !Number.isNaN(hoveredPartyId) &&
    topParty?.id !== undefined &&
    hoveredPartyId === topParty.id;
  const bottomHovered =
    !Number.isNaN(hoveredPartyId) &&
    bottomParty?.id !== undefined &&
    hoveredPartyId === bottomParty?.id;

  const participantWalkedOver = (participant: any) =>
    match?.state === MATCH_STATES.WALK_OVER &&
    teams.filter((team: any) => !!team?.id).length < 2 &&
    participant.id;

  // Lower placement is better
  const topWon =
    topParty.status === MATCH_STATES.WALK_OVER ||
    participantWalkedOver(topParty) ||
    topParty.isWinner;
  const bottomWon =
    bottomParty.status === MATCH_STATES.WALK_OVER ||
    participantWalkedOver(bottomParty) ||
    bottomParty.isWinner;

  const matchState = MATCH_STATES[match.state as keyof typeof MATCH_STATES];
  const teamNameFallback =
    {
      [MATCH_STATES.WALK_OVER]: '',
      [MATCH_STATES.NO_SHOW]: '',
      [MATCH_STATES.DONE]: '',
      [MATCH_STATES.SCORE_DONE]: '',
      [MATCH_STATES.NO_PARTY]: '',
    }[matchState] ?? 'TBD';

  const resultFallback = (participant: any) => {
    if (participant.status) {
      return (
        {
          WALKOVER: computedStyles.wonBywalkOverText,
          [MATCH_STATES.WALK_OVER]: computedStyles.wonBywalkOverText,
          [MATCH_STATES.NO_SHOW]: computedStyles.lostByNoShowText,
          [MATCH_STATES.NO_PARTY]: '',
        }[participant.status] ?? ''
      );
    }

    if (participantWalkedOver(participant)) {
      return computedStyles.wonBywalkOverText;
    }
    return '';
  };

  const onMouseEnter = (partyId: any) => {
    dispatch({
      type: 'SET_HOVERED_PARTYID',
      payload: {
        partyId,
        matchId: match.id,
        rowIndex,
        columnIndex,
      },
    });
  };
  const onMouseLeave = () => {
    dispatch({ type: 'SET_HOVERED_PARTYID', payload: null });
  };

  bottomParty.name = bottomParty.name || teamNameFallback;
  bottomParty.resultText =
    bottomParty.resultText || resultFallback(bottomParty);
  topParty.name = topParty.name || teamNameFallback;
  topParty.resultText = topParty.resultText || resultFallback(topParty);
  return (
    <svg
      width={width}
      height={boxHeight}
      viewBox={`0 0 ${width} ${boxHeight}`}
      {...rest}
    >
      <foreignObject x={0} y={0} width={width} height={boxHeight}>
        {/* TODO: Add OnClick Match handler */}
        {MatchComponent && (
          <MatchComponent
            {...{
              match,
              onMatchClick,
              onPartyClick,
              onMouseEnter,
              onMouseLeave,
              topParty,
              bottomParty,
              topWon,
              bottomWon,
              topHovered,
              bottomHovered,
              topText,
              bottomText,
              connectorColor,
              computedStyles,
            }}
          />
        )}
      </foreignObject>
    </svg>
  );
}

export default Match;
