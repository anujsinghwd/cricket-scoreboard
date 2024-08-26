import React from "react";
import styled from "styled-components";

const CommentaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  flex: 6; /* Takes up 60% of the container width */
`;

const CommentaryList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
`;

const CommentaryItem = styled.div`
  margin-bottom: 5px;
`;

interface CommentarySectionProps {
  commentary: string[];
}

const CommentarySection: React.FC<CommentarySectionProps> = ({
  commentary,
}) => {
  return (
    <CommentaryContainer>
      <h2>Ball-by-Ball Commentary</h2>
      <CommentaryList>
        {commentary.map((item, index) => (
          <CommentaryItem key={index}>{item}</CommentaryItem>
        ))}
      </CommentaryList>
    </CommentaryContainer>
  );
};

export default CommentarySection;
