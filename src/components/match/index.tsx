import React from 'react';
import { MatchComponentProps } from '@/types/types';
import {
  Score,
  Side,
  StyledMatch,
  Team,
  TopText,
  BottomText,
  Wrapper,
  Line,
  Anchor,
} from './styles';

function Match({
  bottomHovered,
  bottomParty,
  bottomText,
  bottomWon,
  match,
  onMatchClick,
  onMouseEnter,
  onMouseLeave,
  onPartyClick,
  topHovered,
  topParty,
  topText,
  topWon,
}: MatchComponentProps) {
  console.log('Topwon', topWon);

  return (
    <Wrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TopText>{topText}</TopText>
        {(match.href || typeof onMatchClick === 'function') && (
          <Anchor
            href={match.href}
            onClick={(event) =>
              onMatchClick?.({ match, topWon, bottomWon, event })
            }
          >
            <TopText>Match Details</TopText>
          </Anchor>
        )}
      </div>
      <StyledMatch>
        <Side
          onMouseEnter={() => topParty?.id && onMouseEnter(topParty.id)}
          onMouseLeave={onMouseLeave}
          $won={topWon}
          $hovered={topHovered}
          onClick={() => onPartyClick?.(topParty, topWon)}
        >
          <Team>{topParty?.name}</Team>
          <Score $won={topWon}>
            {topWon && (
              <div className="rounded-full w-3 h-3 bg-green-400 mr-2"></div>
            )}
            <p
              className={
                topParty?.set1 > bottomParty?.set1 ? 'text-green-400' : ''
              }
            >
              {topParty?.set1}
            </p>
            <p
              className={
                topParty?.set2 > bottomParty?.set2 ? 'text-green-400' : ''
              }
            >
              {topParty?.set2}
            </p>
            <p
              className={
                (topParty?.set3 || 0) > (bottomParty?.set3 || 0)
                  ? 'text-green-400'
                  : ''
              }
            >
              {topParty?.set3 || ''}
            </p>
          </Score>
        </Side>
        <Side
          onMouseEnter={() => bottomParty?.id && onMouseEnter(bottomParty.id)}
          onMouseLeave={onMouseLeave}
          $won={bottomWon}
          $hovered={bottomHovered}
          onClick={() => onPartyClick?.(bottomParty, bottomWon)}
        >
          <Team>{bottomParty?.name}</Team>
          <Score $won={bottomWon}>
            {bottomWon && (
              <div className="rounded-full w-3 h-3 bg-green-400 mr-2"></div>
            )}
            <p
              className={
                topParty?.set1 < bottomParty?.set1 ? 'text-green-400' : ''
              }
            >
              {bottomParty?.set1}
            </p>
            <p
              className={
                topParty?.set2 < bottomParty?.set2 ? 'text-green-400' : ''
              }
            >
              {bottomParty?.set2}
            </p>
            <p
              className={
                (topParty?.set3 || 0) < (bottomParty?.set3 || 0)
                  ? 'text-green-400'
                  : ''
              }
            >
              {bottomParty?.set3 || ''}
            </p>
          </Score>
        </Side>
      </StyledMatch>
      <BottomText>{bottomText ?? ' '}</BottomText>
    </Wrapper>
  );
}

export default Match;
