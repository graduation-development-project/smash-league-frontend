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
  Anchor,
} from '../match/styles';

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
  return (
    <Wrapper>
      {/* Top Section */}
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

      {/* Match Display */}
      <StyledMatch>
        {/* Top Team */}
        <Side
          onMouseEnter={() => topParty?.id && onMouseEnter(topParty.id)}
          onMouseLeave={onMouseLeave}
          $won={topWon}
          $hovered={topHovered}
          onClick={() => onPartyClick?.(topParty, topWon)}
        >
          <Team>
            <div className="flex flex-col gap-4 p-2">
              <div>{topParty?.player1?.name || 'N/A'}</div>
              {/* <div>{topParty?.player2?.name || "N/A"}</div> */}
            </div>
          </Team>
          <Score $won={topWon}>
            {topWon && (
              <div className="rounded-full w-3 h-3 bg-green-400 mr-2"></div>
            )}
            <p
              className={
                topParty?.set1 > (bottomParty?.set1 || 0)
                  ? 'text-green-400'
                  : 'text-red-600'
              }
            >
              {topParty?.set1 ?? ''}
            </p>
            <p
              className={
                topParty?.set2 > (bottomParty?.set2 || 0)
                  ? 'text-green-400'
                  : 'text-red-600'
              }
            >
              {topParty?.set2 ?? ''}
            </p>
            <p
              className={
                topParty?.set3 > (bottomParty?.set3 || 0)
                  ? 'text-green-400'
                  : 'text-red-600'
              }
            >
              {topParty?.set3 ?? ''}
            </p>
          </Score>
        </Side>

        {/* Bottom Team */}
        <Side
          onMouseEnter={() => bottomParty?.id && onMouseEnter(bottomParty.id)}
          onMouseLeave={onMouseLeave}
          $won={bottomWon}
          $hovered={bottomHovered}
          onClick={() => onPartyClick?.(bottomParty, bottomWon)}
        >
          <Team>
            <div className="flex flex-col gap-3 p-2">
              <div>{bottomParty?.player1?.name || 'N/A'}</div>
              {/* <div>{bottomParty?.player2?.name || "N/A"}</div> */}
            </div>
          </Team>
          <Score $won={bottomWon}>
            {bottomWon && (
              <div className="rounded-full w-3 h-3 bg-green-400 mr-2"></div>
            )}
            <p
              className={
                topParty?.set1 < (bottomParty?.set1 || 0)
                  ? 'text-green-400'
                  : 'text-red-600'
              }
            >
              {bottomParty?.set1 ?? ''}
            </p>
            <p
              className={
                topParty?.set2 < (bottomParty?.set2 || 0)
                  ? 'text-green-400'
                  : 'text-red-600'
              }
            >
              {bottomParty?.set2 ?? ''}
            </p>
            <p
              className={
                topParty?.set3 < (bottomParty?.set3 || 0)
                  ? 'text-green-400'
                  : 'text-red-600'
              }
            >
              {bottomParty?.set3 ?? ''}
            </p>
          </Score>
        </Side>
      </StyledMatch>

      {/* Bottom Text Section */}
      <BottomText>{bottomText ?? ' '}</BottomText>
    </Wrapper>
  );
}

export default Match;
