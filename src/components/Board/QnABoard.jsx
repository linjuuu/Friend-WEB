// Q&A (이용자가 헤더에서 접근하는 경우)에 쓰이는 Board입니다.

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import privacyImage from "../../images/Privacy.png";

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1vw;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  font-size: 1vw;
  transform: translateY(-0.2vw); //추가
`;

const Title = styled.div`
  flex: 4;  
  text-align: center;
`;

const Author = styled.div`
  flex: 1;
`;

const Time = styled.div`
  flex: 1;
`;

const HR = styled.hr`
  height: 0.1vw;
  background: #000;
  margin-top: 0.5vw;
  margin-bottom:  0.5vw;
`;

const ThinHR = styled(HR)`
  height: 0.05vw;
  background: #B8B8B8;
`;

const BoardWrapper = styled.div`
  /* margin-top: 200vw; */
  /* margin: 0 auto; */
  width: 80vw;

  @media (max-width: 768px) {
    position: relative;
    top: 10vw;
  }
`;

const HeaderRow = styled.div`
  font-weight: bold;
  font-size: 1.2vw;
  display: flex;
  justify-content: space-around;
  padding: 0.8vw;
  text-decoration: none;
  color: inherit;
`;

const PrivacyImage = styled.img`
  width: 2vw;
  height: 2vw;
  margin-left: 0.5vw;
  margin-bottom: -0.5vw;
`;

const ModalWrapper = styled.div`
  background: white;
  padding: 1vw;
  border-radius: 1vw;
  width: 17vw;
  position: relative;
  z-index: 1;
  box-shadow: 0 1vw 1.5vw rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1vw;
  right: 1vw;
  background: none;
  border: none;
  font-size: 1vw;
  cursor: pointer;
  color: #666;
`;

const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 17vw;
  margin: 0 auto;
`;

const InputLabel = styled.label`
  margin-bottom: 0.5vw;
  font-size: 1vw;
  color: #333;
`;

const PasswordInput = styled.input`
  padding: 0.3vw;
  font-size: 1vw;
  margin-bottom: 0.5vw;
  border: 0.2vw solid #ccc;
  border-radius: 0.2vw;
  width: 17vw;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 0.5vw 1vw;
  background: #8be3ff;
  border: none;
  color: #fff;
  text-align: center;
  font-size: 1vw;
  font-weight: 700;
  margin-left: 1vw;
  cursor: pointer;
  box-shadow: -0.13vw 0.55vw 0.41vw 0 rgba(0, 0, 0, 0.25);
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QnABoard = ({ info }) => {
  const infoLength = info.length;
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const isCollectPage = window.location.pathname === "/QnA" || window.location.pathname === "/QnA/";
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const handleRowClick = (item) => {
    setSelectedItem(item);

       if(isCollectPage){
          if (item.privacy === 'PRIVATE') {
            setShowPasswordPrompt(true);
            return; 
            }
            else {
             
              
               navigate(`/QnA/${item.id}`, { state: { item: selectedItem } });

            } 
                  }
        else{
        
        }
  };

    const handlePasswordSubmit = (isPasswordCorrect, pwd = false) => {
    if(isPasswordCorrect) {
   
    console.log(selectedItem);
    navigate(`/QnA/${selectedItem.id}`, { state: { item: selectedItem, pwd  } }); 

    } else {
    alert('비밀번호가 일치하지 않습니다.');
    }
    };

  return (
    <BoardWrapper>
      <HR />
      <HeaderRow as="div">
        <Title>제목</Title>
        <Author>작성자</Author>
        <Time>작성 시간</Time>
      </HeaderRow>
      <ThinHR />
      {info && [...info].reverse().map((item, index) => {
  console.log('info:', info);
     const createdAtDate = new Date(item.updatedAt);
     createdAtDate.setHours(createdAtDate.getHours() + 9);
     
     const year = createdAtDate.getFullYear();
     const month = String(createdAtDate.getMonth() + 1).padStart(2, '0');
     const day = String(createdAtDate.getDate()).padStart(2, '0');
     
     const formattedDate = `${year}.${month}.${day}`;

     const maskedAuthor = item.author.charAt(0) + '**';
      return (
        <div key={item.id}>
          <Row onClick={() => handleRowClick(item)}>
            <Title>{item.title}
            {item.privacy === 'PRIVATE' && <PrivacyImage src={privacyImage} alt="privacy"/>}
            </Title>
            <Author>{maskedAuthor}</Author>
            <Time>{formattedDate}</Time>
          </Row>
          {index !== infoLength - 1 ? <ThinHR /> : <HR />}
        </div>
      );
      })}
        {showPasswordPrompt && (
         <PasswordPrompt
         id={selectedItem.id}
         onPasswordSubmit={handlePasswordSubmit}
         setShowPasswordPrompt={setShowPasswordPrompt}
         />
      )} 
    </BoardWrapper>
  );
};

 const PasswordPrompt = ({id, onPasswordSubmit, setShowPasswordPrompt }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => { 
    
    e.preventDefault();
   
   
    try {
      const response = await fetch(`https://umcfriend.kro.kr/api/v1/qa/${id}?password=${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      
      });
  
      if (response.ok) {
      
        const data = await response.json();
        console.log("성공");
        

        onPasswordSubmit(data.data,password); 
      } else {
        console.error('비밀번호 검증에 실패했습니다.');
        onPasswordSubmit(false);
      }
    } catch (error) {
      console.error('비밀번호 검증 중 오류 발생:', error);
      onPasswordSubmit(false);
    }
  };

  const handleClose = () => {
    setShowPasswordPrompt(false);
  };

  return (
    <Overlay>
      <ModalWrapper>
        <CloseButton onClick={handleClose}>X</CloseButton>
        <PasswordForm onSubmit={handleSubmit}>
          <InputLabel>비밀번호를 입력하세요.</InputLabel>
          <PasswordInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SubmitButton type="submit">확인</SubmitButton>
        </PasswordForm>
      </ModalWrapper>
    </Overlay>
  );
};
export default QnABoard;