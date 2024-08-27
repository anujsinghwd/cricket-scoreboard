import React, { useState } from "react";
import styled from "styled-components";
import MatchCommentary from "../organisms/MatchCommentary";
import ScoreCard from "../molecules/ScoreCard";
import CommentarySection from "../organisms/CommentarySection";
import { BatsmanScorecard, BowlerScorecard } from "../../types";
import { SelectChangeEvent, MenuItem, Select } from "@mui/material";
import { useMatchContext } from '../../context/MatchContext';

const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const MatchSelectionContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
`;

const CommentaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 6; /* Takes up 60% of the container width */
  padding: 10px;
`;

const ScoreCardContainer = styled.div`
  flex: 4; /* Takes up 40% of the container width */
  padding: 10px;
`;

const Dashboard: React.FC = () => {
  const { currentAction, handleCurrentAction, matchData } = useMatchContext();
  const [selectedButton, setSelectedButton] = useState<string | number>("");
  const [striker, setStriker] = useState<string>("");
  const [nonStriker, setNonStriker] = useState<string>("");
  const [bowler, setBowler] = useState<string>("");
  const [lastNumber, setLastNumber] = useState<number | null>(null);
  const [isOperationActive, setIsOperationActive] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<string>("");

  const buildMatchData = () => {
    if (matchData) {
      return matchData.map((data: any) => ({ value: data.id, label: `${data.teamA?.name} - ${data.teamB?.name}` }));
    }
    return [];
  }

  const handleMatchChange = (event: SelectChangeEvent<string>) => {
    setSelectedMatch(event.target.value as string);
    // Logic to fetch and display data for the selected match can be added here
  };

  const handleStrikerChange = (event: SelectChangeEvent<string>) => {
    setStriker(event.target.value as string);
  };

  const handleNonStrikerChange = (event: SelectChangeEvent<string>) => {
    setNonStriker(event.target.value as string);
  };

  const handleBowlerChange = (event: SelectChangeEvent<string>) => {
    setBowler(event.target.value as string);
  };

  const handleButtonClick = (buttonValue: string | number) => {
    if (!isOperationActive) {
      alert("Start the operation first!");
      return;
    }

    setSelectedButton(buttonValue);

    if (typeof buttonValue === "number") {
      // If the value is a number, update only if it's the latest clicked number
      setLastNumber(buttonValue);
    } else {
      // Always push string values
      handleCurrentAction(buttonValue);
    }

    console.log(`Button clicked: ${buttonValue}`);
  };

  const handleStart = () => {
    if (isOperationActive) {
      alert("Operation already started!");
      return;
    }

    setLastNumber(null);
    setSelectedButton("");
    setIsOperationActive(true);
    handleCurrentAction(null); // Clear previous actions
    console.log("Operation started");
  };

  const handleDone = () => {
    if (!isOperationActive) {
      alert("No operation is currently active!");
      return;
    }

    setIsOperationActive(false);
    if (lastNumber !== null) {
      // Push the last number clicked to actions
      handleCurrentAction(lastNumber);
      setLastNumber(null); // Clear lastNumber after pushing
    }

    // Reset all states after operation ends
    setSelectedButton("");
  };

  // Update the commentary section
  const [commentary, setCommentary] = useState<string[]>([]);
  const addToCommentary = (action: string | number) => {
    if (typeof action === "number") {
      setCommentary((prev) => [
        ...prev,
        `${striker} to ${nonStriker}, ${action} run`,
      ]);
    } else {
      setCommentary((prev) => [
        ...prev,
        `${striker} to ${nonStriker}, ${action}`,
      ]);
    }
  };

  // Update actions on Done
  const handleDoneWithCommentary = () => {
    if (!isOperationActive) {
      alert("No operation is currently active!");
      return;
    }

    setIsOperationActive(false);
    if (lastNumber !== null) {
      // Push the last number clicked to actions
      handleCurrentAction(lastNumber);
      setLastNumber(null); // Clear lastNumber after pushing
    }

    const actionCpy: any = JSON.parse(JSON.stringify(currentAction));
    actionCpy.push(lastNumber);
    actionCpy.forEach((action: string | number) => addToCommentary(action));
    handleCurrentAction(null); // Clear actions after adding to commentary
  };

  // Example data
  const batsmen: BatsmanScorecard[] = [
    {
      name: "Player 1",
      runs: 45,
      balls: 30,
      fours: 6,
      sixes: 2,
      strikeRate: 150.0,
    },
    {
      name: "Player 2",
      runs: 30,
      balls: 20,
      fours: 4,
      sixes: 1,
      strikeRate: 150.0,
    },
  ];

  const bowlers: BowlerScorecard[] = [
    {
      name: "Player 3",
      overs: 10,
      maidens: 2,
      runs: 50,
      wides: 3,
      noballs: 1,
      economy: 5.0,
      wickets: 2,
    },
    {
      name: "Player 4",
      overs: 8,
      maidens: 1,
      runs: 40,
      wides: 2,
      noballs: 0,
      economy: 5.0,
      wickets: 1,
    },
  ];

  return (
    <>
      <MatchSelectionContainer>
        <Select
          value={selectedMatch}
          onChange={handleMatchChange}
          displayEmpty
          inputProps={{ "aria-label": "Select Match" }}
        >
          <MenuItem value="">
            <em>Select Match</em>
          </MenuItem>
          {buildMatchData()?.length && (
            buildMatchData().map((data: any) => (<MenuItem value={data.value}>{data.label}</MenuItem>))
          )}
          {/* <MenuItem value="match1">Match 1</MenuItem>
          <MenuItem value="match2">Match 2</MenuItem>
          <MenuItem value="match3">Match 3</MenuItem> */}
        </Select>
      </MatchSelectionContainer>
      <DashboardContainer>
        <ScoreCardContainer>
          <ScoreCard batsmen={batsmen} bowlers={bowlers} />
        </ScoreCardContainer>
        <CommentaryContainer>
          <MatchCommentary
            striker={striker}
            nonStriker={nonStriker}
            bowler={bowler}
            handleStrikerChange={handleStrikerChange}
            handleNonStrikerChange={handleNonStrikerChange}
            handleBowlerChange={handleBowlerChange}
            onButtonClick={handleButtonClick}
            onDone={handleDoneWithCommentary}
            isOperationActive={isOperationActive}
            onStart={handleStart}
            selectedButtons={false}
          />
          <CommentarySection commentary={commentary} />
        </CommentaryContainer>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
