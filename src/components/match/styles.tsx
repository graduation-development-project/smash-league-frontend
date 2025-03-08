import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  font-family: ${({ theme }) => theme.fontFamily};
`;

export const TopText = styled.p`
  color: ${({ theme }) => theme.textColor.dark};
  margin-bottom: 0.2rem;
  min-height: 1.25rem;
`;

export const BottomText = styled.p`
  color: ${({ theme }) => theme.textColor.dark};
  flex: 0 0 none;
  text-align: center;
  margin-top: 0.2rem;
  min-height: 1.25rem;
`;

export const StyledMatch = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
  border-radius: 10px;
  overflow: hidden;
`;

export const Team = styled.div`
  font-size: 20px;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

interface ScoreProps {
  $won?: boolean;
}

export const Score = styled.div<ScoreProps>`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 18px;
`;

interface SideProps {
  $won?: boolean;
  $hovered?: boolean;
}

export const Side = styled.div<SideProps>`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background: ${({ theme, $won }) => ($won ? '#ffffff' : '#ffffff')};

  transition: border-color 0.5s ${({ theme }) => theme.transitionTimingFunction};

  ${Team} {
    font-weight: ${({ theme, $won }) => ($won ? 'bold' : 500)};
  }

  ${({ $hovered, theme, $won }) =>
    $hovered &&
    css`
      border-color: ${theme.border.highlightedColor};

      ${Team} {
        color: ${theme.textColor.highlighted};
      }

      ${Score} {
        color: ${$won ? theme.score.text.highlightedWonColor : theme.score.text.highlightedLostColor};
      }
    `}
`;

interface LineProps {
  highlighted?: boolean;
}

export const Line = styled.div<LineProps>`
  height: 1px;
  transition: border-color 0.5s ${({ theme }) => theme.smooth};

  border-width: 1px;
  border-style: solid;
  border-color: ${({ highlighted, theme }) =>
    highlighted ? theme.border.highlightedColor : theme.border.color};
`;

interface AnchorProps {
  font?: string;
  bold?: boolean;
  size?: string;
}

export const Anchor = styled.a<AnchorProps>`
  font-family: ${({ font, theme }) => font || theme.fontFamily};
  font-weight: ${({ bold }) => (bold ? '700' : '400')};
  color: ${({ theme }) => theme.textColor.main};
  font-size: ${({ size }) => size || '1rem'};
  line-height: 1.375rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
