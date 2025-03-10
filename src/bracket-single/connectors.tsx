"use client"

import React from 'react';
import Connector from '../components/connector';
import { getCalculatedStyles } from '@/utils/settings';
import { calculatePositionOfMatch } from './calculate-match-position';

const Connectors = ({
  bracketSnippet = '',
  rowIndex = 0,
  columnIndex = 0 ,
  style = undefined,
  offsetY = 0,
}: any) => {
  const {
    columnWidth,

    rowHeight,
    canvasPadding,
  } = getCalculatedStyles(style);

  const currentMatchPosition = calculatePositionOfMatch(rowIndex, columnIndex, {
    canvasPadding:25,
    rowHeight:280,
    columnWidth:390,
    offsetY,
  });
  const previousBottomPosition = (rowIndex + 1) * 2 - 1;
  const previousTopMatchPosition = calculatePositionOfMatch(
    previousBottomPosition - 1,
    columnIndex - 1,
    {
      canvasPadding:25,
      rowHeight:280,
      columnWidth:390,
      offsetY,
    },
  );
  const previousBottomMatchPosition = calculatePositionOfMatch(
    previousBottomPosition,
    columnIndex - 1,
    {
      canvasPadding:25,
      rowHeight:280,
      columnWidth:390,
      offsetY,
    },
  );

  return (
    <Connector
      bracketSnippet={bracketSnippet}
      previousBottomMatchPosition={previousBottomMatchPosition}
      previousTopMatchPosition={previousTopMatchPosition}
      currentMatchPosition={currentMatchPosition}
      style={style}
    />
  );
};

export default Connectors;
