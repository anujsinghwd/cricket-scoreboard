import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import { MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

const CommentaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const MatchCommentary: React.FC = () => {
    const [striker, setStriker] = useState('');
    const [nonStriker, setNonStriker] = useState('');
    const [bowler, setBowler] = useState('');

    const handleStrikerChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        setStriker(event.target.value as string);
    };

    const handleNonStrikerChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        setNonStriker(event.target.value as string);
    };

    const handleBowlerChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        setBowler(event.target.value as string);
    };

    return (
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

            <ButtonGrid>
                <Button label="Ball Start" variant="outlined" color="secondary" onClick={() => { }} />
                <Button label="0" variant="outlined" color="secondary" onClick={() => { }} />
                <Button label="1" variant="outlined" color="secondary" onClick={() => { }} />
                {/* Add more buttons as needed */}
            </ButtonGrid>
        </CommentaryContainer>
    );
};

export default MatchCommentary;
