"use client";

import React, { createContext, useReducer, ReactNode, Dispatch } from "react";

interface MatchState {
  hoveredMatchId: string | null;
  hoveredPartyId: string | null;
  hoveredColumnIndex: number | null;
  hoveredRowIndex: number | null;
}

const initialState: MatchState = {
  hoveredMatchId: null,
  hoveredPartyId: null,
  hoveredColumnIndex: null,
  hoveredRowIndex: null,
};

type Action =
  | {
      type: "SET_HOVERED_PARTYID";
      payload?: {
        partyId?: string | null;
        columnIndex?: number | null;
        rowIndex?: number | null;
        matchId?: string | null;
      };
    };

const store = createContext<{ state: MatchState; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => {},
});

const { Provider } = store;

const matchReducer = (previousState: MatchState, action: Action): MatchState => {
  switch (action.type) {
    case "SET_HOVERED_PARTYID": {
      const { partyId = null, columnIndex = null, rowIndex = null, matchId = null } =
        action.payload ?? {};
      return {
        ...previousState,
        hoveredPartyId: partyId,
        hoveredColumnIndex: columnIndex,
        hoveredRowIndex: rowIndex,
        hoveredMatchId: matchId,
      };
    }
    default:
      throw new Error("Unhandled action type in MatchContextProvider");
  }
};

const MatchContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(matchReducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store as matchContext, MatchContextProvider };
