// Q&A 모아보기 (관리자 페이지 거임!!)

import ManagerQnABoard from '../../components/Board/ManagerQnABoard';
import React from 'react';
import Title from '../../components/title';
import styled from 'styled-components';
import Footer from '../../components/footer';

export default function QnA() {

  const question = [
    { id: 1, title: '제목 1', author: '작성자 1', time: '2024-01-18' },
    { id: 2, title: '제목 2', author: '작성자 2', time: '2024-01-18' },
    { id: 3, title: '제목 3', author: '작성자 3', time: '2024-01-18' },
    { id: 4, title: '제목 4', author: '작성자 4', time: '2024-01-18' }
  ];

  return (
    <>
    <Title title = "관리자 페이지"/>
    <TitleHR/>
    <ReviewWrapper>
      <ManagerQnABoard info={question} />
    </ReviewWrapper>
    <FooterContainer>
      <Footer/>
    </FooterContainer>
    </>
  )
}

const ReviewWrapper = styled.div`
  /* position: relative; */
  /* height: 10vw; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const TitleHR = styled.hr`
  margin-top: 5vw;
  width: 80vw;
  margin-bottom: 5vw;

  @media (max-width: 768px) {
    position: relative;
    top: 10vw;
  }
`;

const FooterContainer = styled.div`
    position: relative;
    bottom: -2vw;
    width: 100%;

    @media (max-width: 768px) {
    top: 25vw;
  }
`;