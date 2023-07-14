import { AiOutlineRight } from 'react-icons/ai';
import styled from '@emotion/styled';
import { Typography, Divider } from '@mui/material';
import { useState } from 'react';
import CommentCard from './CommentCard';
import classes from './Loading.module.css'

interface BottomContainerProps {
  reviewData?: Array<any>;
  reviewIsLoading: boolean;
}

export default function BottomContainer({ reviewData, reviewIsLoading }: BottomContainerProps) {

  return (
    <>
      {reviewData && <MainTitle>후기</MainTitle>}
      <CommentCardContainer>
        {reviewData && reviewData.map((review, index) => {
          return (
            <CommentCard
              key={index}
              image={review.imageUrl}
              name={review.name}
              contents={review.contents}
              date={review.reviewModifiedDate}
              rating={review.reviewRating}
            />
          );
        })}
        {reviewIsLoading ?
          <div className={classes.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          : null}
      </CommentCardContainer>
    </>
  );
}

const MainTitle = styled(Typography)`
padding: 48px 0 24px 0;
  font-size: 22px;
  font-weight: 600;
  font-family: Noto Sans KR;
`;

const CommentCardContainer = styled.div`
  display: flex;
  // flex-wrap: wrap;
  padding-top: 20px;
  flex-direction:column;
`;


const Comment = styled.div<{ lineLimit: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ lineLimit }) => (lineLimit)};
  overflow: hidden;
  font-family: Noto Sans KR;
`;


const UserName = styled(Typography)`
font-family: Noto Sans KR;
font-weight: 500;
`;

const CommentDate = styled(Typography)`
font-family: Noto Sans KR;
font-weight: 300;
font-size: 12px;
color:#c5c5c5;
`;

const UserImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  object-fit: cover;
`;

const SeeMore = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 12px;
  padding-bottom: 30px;
  cursor: pointer;
`;
