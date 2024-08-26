// src/types.ts

// Batsman scorecard interface
export interface BatsmanScorecard {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
}

// Bowler scorecard interface
export interface BowlerScorecard {
  name: string;
  overs: number;
  maidens: number;
  runs: number;
  wides: number;
  noballs: number;
  economy: number;
  wickets: number;
}

// Updated Scorecard props
export interface ScorecardProps {
  batsmen: BatsmanScorecard[];
  bowlers: BowlerScorecard[];
}
