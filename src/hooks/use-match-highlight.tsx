"use client";

import { useContext } from "react";
import { matchContext } from "../core/match-context";

interface Participant {
  id: string;
}

interface Match {
  participants?: Participant[];
}

interface BracketSnippet {
  previousTopMatch?: Match;
  previousBottomMatch?: Match;
  currentMatch?: Match;
}

interface UseMatchHighlightContextProps {
  bracketSnippet?: BracketSnippet | null;
}

const useMatchHighlightContext = ({ bracketSnippet = null }: UseMatchHighlightContextProps) => {
  const {
    state: { hoveredPartyId },
  } = useContext(matchContext);

  const previousTopMatch = bracketSnippet?.previousTopMatch;
  const previousBottomMatch = bracketSnippet?.previousBottomMatch;
  const currentMatch = bracketSnippet?.currentMatch;

  const isHighlighted = (match?: Match) =>
    match?.participants?.some((p) => p.id === hoveredPartyId);

  const topHighlighted = isHighlighted(currentMatch) && isHighlighted(previousTopMatch);
  const bottomHighlighted = isHighlighted(currentMatch) && isHighlighted(previousBottomMatch);

  return { topHighlighted, bottomHighlighted };
};

export default useMatchHighlightContext;
