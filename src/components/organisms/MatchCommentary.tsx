import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const CommentaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 5; /* Takes up 60% of the container width */
  padding: 10px;
`;

const DropdownContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const StatusBar = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
`;

interface MatchCommentaryProps {
  striker: string;
  nonStriker: string;
  bowler: string;
  handleStrikerChange: (event: SelectChangeEvent<string>) => void;
  handleNonStrikerChange: (event: SelectChangeEvent<string>) => void;
  handleBowlerChange: (event: SelectChangeEvent<string>) => void;
  onButtonClick: (buttonValue: string | number) => void;
  onDone: () => void;
  isOperationActive: boolean;
  onStart: () => void;
  selectedButtons?: boolean;
}

const MatchCommentary: React.FC<MatchCommentaryProps> = ({
  striker,
  nonStriker,
  bowler,
  handleStrikerChange,
  handleNonStrikerChange,
  handleBowlerChange,
  onButtonClick,
  onDone,
  isOperationActive,
  onStart,
  selectedButtons = false,
}) => {
  const handleButtonClick = (value: string | number) => {
    if (!isOperationActive) {
      alert("Start the operation first!");
      return;
    }

    onButtonClick(value);
  };

  return (
    <Container>
      <CommentaryContainer>
        <DropdownContainer>
          <FormControl fullWidth>
            <InputLabel id="striker-label">Striker</InputLabel>
            <Select
              labelId="striker-label"
              value={striker}
              onChange={handleStrikerChange}
              label="Striker"
            >
              <MenuItem value="Player 1">Player 1</MenuItem>
              <MenuItem value="Player 2">Player 2</MenuItem>
              {/* Add more players as needed */}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="non-striker-label">Non-Striker</InputLabel>
            <Select
              labelId="non-striker-label"
              value={nonStriker}
              onChange={handleNonStrikerChange}
              label="Non-Striker"
            >
              <MenuItem value="Player 3">Player 3</MenuItem>
              <MenuItem value="Player 4">Player 4</MenuItem>
              {/* Add more players as needed */}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="bowler-label">Bowler</InputLabel>
            <Select
              labelId="bowler-label"
              value={bowler}
              onChange={handleBowlerChange}
              label="Bowler"
            >
              <MenuItem value="Player 5">Player 5</MenuItem>
              <MenuItem value="Player 6">Player 6</MenuItem>
              {/* Add more players as needed */}
            </Select>
          </FormControl>
        </DropdownContainer>

        <Button
          value="start"
          label="Ball Start"
          color="secondary"
          onClick={onStart}
        />
        <ButtonGrid>
          {[0, 1, 2, 3, 4, 6].map((value) => (
            <Button
              key={value}
              value={value}
              label={String(value)}
              color="secondary"
              onClick={() => handleButtonClick(value)}
              isSelected={selectedButtons}
            />
          ))}
          {["wide", "noball", "bye", "legbye"].map((value) => (
            <Button
              key={value}
              value={value}
              label={value.charAt(0).toUpperCase() + value.slice(1)}
              color="secondary"
              onClick={() => handleButtonClick(value)}
              isSelected={selectedButtons}
            />
          ))}
        </ButtonGrid>
        <Button
          value="done"
          label="Done"
          color="secondary"
          variant="outlined"
          onClick={onDone}
        />
        <StatusBar>
          {isOperationActive ? "Operation in progress" : "No operation active"}
        </StatusBar>
      </CommentaryContainer>
    </Container>
  );
};

export default MatchCommentary;
