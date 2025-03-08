import { ComputedOptions, Options } from '../types/types';

export const defaultStyle: Options = {
  width: 350,
  boxHeight: 250,
  canvasPadding: 25,
  spaceBetweenColumns: 40,
  spaceBetweenRows: 30,
  connectorColor: 'rgb(47, 54, 72)',
  connectorColorHighlight: 'red',
  roundHeader: {
    isShown: true,
    height: 40,
    marginBottom: 25,
    fontSize: 20,
    fontColor: 'white',
    backgroundColor: 'rgb(47, 54, 72)',
    fontFamily: '"Roboto", "Arial", "Helvetica", "sans-serif"',
    roundTextGenerator: undefined,
  },
  roundSeparatorWidth: 24,
  lineInfo: {
    separation: -13,
    homeVisitorSpread: 0.5,
  },
  horizontalOffset: 13,
  wonBywalkOverText: 'WO',
  lostByNoShowText: 'NS',
};

export const getCalculatedStyles = (
  style: Options = defaultStyle,
): ComputedOptions => {
  const { boxHeight, width, spaceBetweenColumns, spaceBetweenRows } = style;
  const columnWidth = (width ?? 0) + (spaceBetweenColumns ?? 0);
  const rowHeight = (boxHeight ?? 0) + (spaceBetweenRows ?? 0);
  return { ...style, rowHeight, columnWidth };
};
