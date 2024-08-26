// src/Scorecard.tsx

import React from 'react';
import styled from 'styled-components';
import { ScorecardProps } from '../../types';

const ScorecardContainer = styled.div`
  flex: 4; /* Takes up 40% of the container width */
  padding: 10px;
  border-left: 1px solid #ddd; /* Optional: Adds a border between the sections */
`;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const TeamInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const TeamLogo = styled.img`
//   height: 50px; /* Adjust the height as needed */
// `;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 8px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Scorecard: React.FC<ScorecardProps> = ({ batsmen, bowlers }) => {
  return (
    <ScorecardContainer>
      {/* <Header>
        <TeamInfo>
          <TeamLogo src={team1.logoUrl} alt={`${team1.name} logo`} />
          <div>
            <h3>{team1.name}</h3>
            <p>Score: {team1.score} / {team1.wickets}</p>
          </div>
        </TeamInfo>
        <div>
          <h2>VS</h2>
        </div>
        <TeamInfo>
          <TeamLogo src={team2.logoUrl} alt={`${team2.name} logo`} />
          <div>
            <h3>{team2.name}</h3>
            <p>Score: {team2.score} / {team2.wickets}</p>
          </div>
        </TeamInfo>
      </Header> */}
      <Section>
        <h2>Batsman Scorecard</h2>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Runs</Th>
              <Th>Balls</Th>
              <Th>4s</Th>
              <Th>6s</Th>
              <Th>Strike Rate</Th>
            </tr>
          </thead>
          <tbody>
            {batsmen.map((batsman, index) => (
              <tr key={index}>
                <Td>{batsman.name}</Td>
                <Td>{batsman.runs}</Td>
                <Td>{batsman.balls}</Td>
                <Td>{batsman.fours}</Td>
                <Td>{batsman.sixes}</Td>
                <Td>{batsman.strikeRate.toFixed(2)}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
      <Section>
        <h2>Bowler Scorecard</h2>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Overs</Th>
              <Th>Maiden</Th>
              <Th>Runs</Th>
              <Th>Wides</Th>
              <Th>No Balls</Th>
              <Th>Economy</Th>
              <Th>Wickets</Th>
            </tr>
          </thead>
          <tbody>
            {bowlers.map((bowler, index) => (
              <tr key={index}>
                <Td>{bowler.name}</Td>
                <Td>{bowler.overs}</Td>
                <Td>{bowler.maidens}</Td>
                <Td>{bowler.runs}</Td>
                <Td>{bowler.wides}</Td>
                <Td>{bowler.noballs}</Td>
                <Td>{bowler.economy.toFixed(2)}</Td>
                <Td>{bowler.wickets}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
    </ScorecardContainer>
  );
};

export default Scorecard;
