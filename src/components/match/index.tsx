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
  console.log('Check topParty', topParty);

  // console.log('Check match', match);
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
            <div
              className={`flex flex-col p-2 text-[20px] font-quicksand ${
                topWon ? 'text-green-400' : ''
              }`}
            >
              <div>{topParty?.player1?.name || 'No Info'}</div>
              {/* <div>{topParty?.player2?.name || "N/A"}</div> */}
            </div>
          </Team>
          <Score $won={topWon}>
            {topWon && (
              <div className="rounded-full w-3 h-3 bg-green-400 mr-2"></div>
            )}
            <p
              className={
                match?.games[0]?.leftCompetitorPoint >
                (match?.games[0]?.rightCompetitorPoint || 0)
                  ? 'text-green-400'
                  : 'text-primaryColor'
              }
            >
              {match?.games[0]?.leftCompetitorPoint ?? ''}
            </p>
            <p
              className={
                match?.games[1]?.leftCompetitorPoint >
                (match?.games[1]?.rightCompetitorPoint || 0)
                  ? 'text-green-400'
                  : 'text-primaryColor'
              }
            >
              {match?.games[1]?.leftCompetitorPoint ?? ''}
            </p>
            <p
              className={
                match?.games[2]?.leftCompetitorPoint >
                (match?.games[2]?.rightCompetitorPoint || 0)
                  ? 'text-green-400'
                  : 'text-primaryColor'
              }
            >
              {match?.games[2]?.leftCompetitorPoint ?? ''}
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
            <div
              className={`flex flex-col p-2 text-[20px] font-quicksand ${
                bottomWon ? 'text-green-400' : ''
              }`}
            >
              <div>{bottomParty?.player1?.name || 'No Info'}</div>
              {/* <div>{bottomParty?.player2?.name || "N/A"}</div> */}
            </div>
          </Team>
          <Score $won={bottomWon}>
            {bottomWon && (
              <div className="rounded-full w-3 h-3 bg-green-400 mr-2"></div>
            )}
            <p
              className={
                match?.games[0]?.leftCompetitorPoint <
                (match?.games[0]?.rightCompetitorPoint || 0)
                  ? 'text-green-400'
                  : 'text-primaryColor'
              }
            >
              {match?.games[0]?.rightCompetitorPoint ?? ''}
            </p>
            <p
              className={
                match?.games[1]?.leftCompetitorPoint <
                (match?.games[1]?.rightCompetitorPoint || 0)
                  ? 'text-green-400'
                  : 'text-primaryColor'
              }
            >
              {match?.games[1]?.rightCompetitorPoint ?? ''}
            </p>
            <p
              className={
                match?.games[2]?.leftCompetitorPoint <
                (match?.games[2]?.rightCompetitorPoint || 0)
                  ? 'text-green-400'
                  : 'text-primaryColor'
              }
            >
              {match?.games[2]?.rightCompetitorPoint ?? ''}
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
