import React from 'react';
import styled from 'styled-components';
import { Options } from '@/types/types';

export interface RoundHeaderProps {
  x: number;
  y?: number;
  width: number;
  roundHeader: Options['roundHeader'];
  canvasPadding: number;
  numOfRounds: number;
  tournamentRoundText: string;
  columnIndex: number;
}

const Text = styled.text`
  font-family: '"Poppins", "Arial", "Helvetica", "sans-serif"';
  color: '#E9EAEC';
  cursor: default;
  &:hover {
    cursor: pointer;
  }
`;
const Rect = styled.rect.attrs(({ theme }) => ({
  fill:'#2F3648',
}))``;

export default function RoundHeader({
  x,
  y = 0,
  width = 0,
  roundHeader,
  canvasPadding,
  numOfRounds,
  tournamentRoundText,
  columnIndex,
}: RoundHeaderProps) {
  // console.log('Check', tournamentRoundText);
  return (
    <g>
      <Rect
        x={x}
        y={y + canvasPadding}
        width={width}
        height={roundHeader?.height}
        fill={roundHeader?.backgroundColor}
        rx="3"
        ry="3"
      />
      <Text
        x={x + width / 2}
        y={
          y +
          canvasPadding +
          (roundHeader?.height ? roundHeader?.height : 0) / 2
        }
        style={{
          fontFamily: roundHeader?.fontFamily,
          fontSize: `${roundHeader?.fontSize}px`,
          color: roundHeader?.fontColor,
        }}
        fill="currentColor"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {!roundHeader?.roundTextGenerator &&
          columnIndex + 1 === numOfRounds &&
          'Final'}
        {!roundHeader?.roundTextGenerator &&
          columnIndex + 1 === numOfRounds - 1 &&
          'Semi Final'}
        {!roundHeader?.roundTextGenerator &&
          columnIndex + 1 === numOfRounds - 2 &&
          'Quarter Final'}
        {!roundHeader?.roundTextGenerator &&
          columnIndex + 1 < numOfRounds - 2 &&
          `${tournamentRoundText}`}
        {roundHeader?.roundTextGenerator &&
          roundHeader?.roundTextGenerator(columnIndex + 1, numOfRounds)}
      </Text>
    </g>
  );
}
