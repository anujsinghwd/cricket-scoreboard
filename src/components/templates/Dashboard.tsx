import React from 'react';
import styled from 'styled-components';
import MatchCommentary from '../organisms/MatchCommentary';
import ScoreCard from '../molecules/ScoreCard';

const DashboardContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Dashboard: React.FC = () => {
    return (
        <DashboardContainer>
            <MatchCommentary />
            <ScoreCard />
        </DashboardContainer>
    );
};

export default Dashboard;