'use client';

import React from 'react';
import { sortAlphanumerically } from '../utils/string';
import { calculateSVGDimensions } from '../core/calculate-svg-dimensions';
import { MatchContextProvider } from '../core/match-context';
import MatchWrapper from '../core/match-wrapper';
import { getPreviousMatches } from '../core/match-functions';
import { Match, SingleElimLeaderboardProps } from '@/types/types';
import { defaultStyle, getCalculatedStyles } from '@/utils/settings';
import { calculatePositionOfMatch } from './calculate-match-position';
import Connectors from './connectors';
import defaultTheme from '../themes/themes';
import RoundHeader from '../components/round-header';
import { ThemeProvider } from 'styled-components';

const SingleEliminationBracket: React.FC<SingleElimLeaderboardProps> = ({
  matches,
  matchComponent,
  currentRound,
  onMatchClick,
  onPartyClick,
  svgWrapper: SvgWrapper = ({ children }) => <div>{children}</div>,
  theme = defaultTheme,
  options: { style: inputStyle } = { style: defaultStyle },
}) => {
  // console.log(matches);

  const style = {
    ...defaultStyle,
    ...inputStyle,
    roundHeader: {
      ...defaultStyle.roundHeader,
      ...(inputStyle?.roundHeader ?? {}),
    },
    lineInfo: {
      ...defaultStyle.lineInfo,
      ...(inputStyle?.lineInfo ?? {}),
    },
  };

  const { roundHeader, columnWidth, canvasPadding, rowHeight, width } =
    getCalculatedStyles(style);

  const lastGame: Match | undefined = matches.find(
    (match) => !match.nextMatchId,
  );

  const generateColumn = (matchesColumn: Match[]): Match[][] => {
    const previousMatchesColumn = matchesColumn.reduce<Match[]>(
      (result, match) => [
        ...result,
        ...matches
          .filter((m) => m.nextMatchId === match.id)
          .sort((a, b) => sortAlphanumerically(a.name, b.name)),
      ],
      [],
    );

    return previousMatchesColumn.length > 0
      ? [...generateColumn(previousMatchesColumn), previousMatchesColumn]
      : [previousMatchesColumn];
  };

  const generate2DBracketArray = (final: Match | undefined): Match[][] =>
    final
      ? [...generateColumn([final]), [final]].filter((arr) => arr.length > 0)
      : [];

  const columns: Match[][] = generate2DBracketArray(lastGame);

  const { gameWidth, gameHeight, startPosition } = calculateSVGDimensions(
    columns[0]?.length || 0,
    columns.length,
    rowHeight,
    columnWidth,
    canvasPadding,
    roundHeader,
    currentRound,
  );

  return (
    <ThemeProvider theme={theme}>
      <SvgWrapper
        bracketWidth={gameWidth}
        bracketHeight={gameHeight}
        startAt={startPosition}
      >
        <svg
          height={gameHeight}
          width={gameWidth}
          viewBox={`0 0 ${gameWidth} ${gameHeight}`}
        >
          <MatchContextProvider>
            <g>
              {columns.map((matchesColumn, columnIndex) =>
                matchesColumn.map((match, rowIndex) => {
                  const { x, y } = calculatePositionOfMatch(
                    rowIndex,
                    columnIndex,
                    {
                      canvasPadding: 0,
                      columnWidth: 0,
                      rowHeight: 0,
                    },
                  );

                  const previousBottomPosition = (rowIndex + 1) * 2 - 1;
                  const { previousTopMatch, previousBottomMatch } =
                    getPreviousMatches(
                      columnIndex,
                      columns,
                      previousBottomPosition,
                    );

                  return (
                    <g key={`${x}-${y}`}>
                      {roundHeader?.isShown && (
                        <RoundHeader
                          x={x}
                          roundHeader={roundHeader}
                          canvasPadding={canvasPadding || 0}
                          width={width || 0}
                          numOfRounds={columns.length}
                          tournamentRoundText={match.tournamentRoundText || ''}
                          columnIndex={columnIndex}
                        />
                      )}
                      {columnIndex !== 0 && (
                        <Connectors
                          bracketSnippet={{
                            currentMatch: match,
                            previousTopMatch,
                            previousBottomMatch,
                          }}
                          rowIndex={rowIndex}
                          columnIndex={columnIndex}
                          gameHeight={gameHeight}
                          gameWidth={gameWidth}
                          style={style}
                        />
                      )}
                      <g>
                        <MatchWrapper
                          x={x}
                          y={
                            y +
                            (roundHeader?.isShown
                              ? (roundHeader?.height ?? 0) +
                                (roundHeader?.marginBottom ?? 0)
                              : 0)
                          }
                          rowIndex={rowIndex}
                          columnIndex={columnIndex}
                          match={match}
                          previousBottomMatch={previousBottomMatch}
                          topText={match.startTime}
                          bottomText={match.name}
                          teams={match.participants}
                          onMatchClick={onMatchClick}
                          onPartyClick={onPartyClick}
                          style={style}
                          matchComponent={matchComponent}
                        />
                      </g>
                    </g>
                  );
                }),
              )}
            </g>
          </MatchContextProvider>
        </svg>
      </SvgWrapper>
    </ThemeProvider>
  );
};

export default SingleEliminationBracket;
