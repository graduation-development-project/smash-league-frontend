import useMatchHighlightContext from "../hooks/use-match-highlight";
import React from "react";
import { getCalculatedStyles } from "@/utils/settings";
import { ComputedOptions } from "@/types/types"; // Importing the provided types

interface MatchPosition {
  x: number;
  y: number;
}

interface ConnectorProps {
  bracketSnippet?: any;
  previousBottomMatchPosition?: MatchPosition | null;
  previousTopMatchPosition?: MatchPosition | null;
  currentMatchPosition: MatchPosition;
  style?: ComputedOptions;
}

const Connector: React.FC<ConnectorProps> = ({
  bracketSnippet,
  previousBottomMatchPosition = null,
  previousTopMatchPosition = null,
  currentMatchPosition,
  style,
}) => {
  const {
    boxHeight = 0,
    connectorColor,
    roundHeader,
    roundSeparatorWidth = 0,
    lineInfo = { separation: -13, homeVisitorSpread: 0.5 }, // Ensuring defaults
    horizontalOffset = 0,
    connectorColorHighlight,
    width = 0,
  } = getCalculatedStyles(style);

  const pathInfo = (multiplier: number): string[] => {
    const middlePointOfMatchComponent = boxHeight / 2;
    const previousMatch =
      multiplier > 0 ? previousBottomMatchPosition : previousTopMatchPosition;

    if (!previousMatch) return [];

    const startPointX =
      currentMatchPosition.x - horizontalOffset - (lineInfo?.separation ?? 0);
    const startPointY =
      currentMatchPosition.y +
      (lineInfo?.homeVisitorSpread ?? 0) * multiplier +
      middlePointOfMatchComponent +
      (roundHeader?.isShown
        ? (roundHeader.height ?? 0) + (roundHeader.marginBottom ?? 0)
        : 0);

    const startPoint = `${startPointX} ${startPointY}`;

    const horizontalWidthLeft =
      currentMatchPosition.x - roundSeparatorWidth / 2 - horizontalOffset;

    const isPreviousMatchOnSameYLevel =
      Math.abs(currentMatchPosition.y - previousMatch.y) < 1;

    const verticalHeight =
      previousMatch.y +
      middlePointOfMatchComponent +
      (roundHeader?.isShown
        ? (roundHeader.height ?? 0) + (roundHeader.marginBottom ?? 0)
        : 0);

    const horizontalWidthRight = previousMatch.x + width;

    return isPreviousMatchOnSameYLevel
      ? [`M${startPoint}`, `H${horizontalWidthRight}`]
      : [
          `M${startPoint}`,
          `H${horizontalWidthLeft}`,
          `V${verticalHeight}`,
          `H${horizontalWidthRight}`,
        ];
  };

  const { topHighlighted, bottomHighlighted } = useMatchHighlightContext({
    bracketSnippet: bracketSnippet || undefined, // Ensuring correct type
  });

  const { x, y } = currentMatchPosition;

  return (
    <>
      {previousTopMatchPosition && (
        <path
          d={pathInfo(-1).join(" ")}
          id={`connector-${x}-${y}-${-1}`}
          fill="transparent"
          stroke={topHighlighted ? connectorColorHighlight : connectorColor}
        />
      )}
      {previousBottomMatchPosition && (
        <path
          d={pathInfo(1).join(" ")}
          id={`connector-${x}-${y}-${1}`}
          fill="transparent"
          stroke={bottomHighlighted ? connectorColorHighlight : connectorColor}
        />
      )}

      {topHighlighted && <use xlinkHref={`#connector-${x}-${y}-${-1}`} />}
      {bottomHighlighted && <use xlinkHref={`#connector-${x}-${y}-${1}`} />}
    </>
  );
};

export default Connector;
