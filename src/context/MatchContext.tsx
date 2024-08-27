import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define types for your data
interface Player {
  id: string;
  name: string;
  team: string;
}

interface Team {
  id: string;
  name: string;
}

interface MatchData {
  id: string;
  teamA: Team;
  teamB: Team;
  // score: { [teamId: string]: number };
  // wickets: { [teamId: string]: number };
}

interface MatchContextProps {
  matchData: MatchData[] | null;
  teams: Team[];
  players: Player[];
  fetchMatchData: () => Promise<void>;
  fetchTeams: () => Promise<void>;
  fetchPlayers: () => Promise<void>;
  handleCurrentAction: (val: string | number | null) => void;
  currentAction: (string | number)[];
}

// Create a context
const MatchContext = createContext<MatchContextProps | undefined>(undefined);

// Create a provider component
export const MatchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [matchData, setMatchData] = useState<MatchData[] | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentAction, setCurrentAction] = useState<(string | number)[]>([]);

  // Define fetch functions
  const fetchMatchData = async () => {
    try {
      const response = await fetch("http://localhost:3002/matches"); // Replace with your API endpoint
      const data = await response.json();
      setMatchData(data);
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/teams"); // Replace with your API endpoint
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch("/api/players"); // Replace with your API endpoint
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleCurrentAction = (value: string | number | null) => {
    if(value) {
      setCurrentAction((prev) => [...prev, value]);
    } else{
      setCurrentAction([]);
    }
    
  };

  useEffect(() => {
    fetchMatchData();
    fetchTeams();
    fetchPlayers();
  }, []);

  return (
    <MatchContext.Provider
      value={{
        matchData,
        teams,
        players,
        currentAction,
        fetchMatchData,
        fetchTeams,
        fetchPlayers,
        handleCurrentAction,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

// Custom hook to use the context
export const useMatchContext = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatchContext must be used within a MatchProvider");
  }
  return context;
};
