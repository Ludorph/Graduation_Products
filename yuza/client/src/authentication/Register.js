import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { GoX, GoReply, GoArrowRight } from "react-icons/go";
import { DiGithubBadge } from "react-icons/di";
import { GrGoogle } from "react-icons/gr";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // fortawesome에서 SVG 아이콘 import
import { faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import YujaIcon from '../img/yuja.png';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
`;

const SignUpContainer = styled.div`
  width: 600px;
  height: 1000px;
  //border: 0.5px solid #F0F0F0;
  border: 1.5px solid #eee;
  border-radius: 30px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  text-align: left;
  //box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  background-color: #ffffff;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #adb3b8;
`;

const IconTitle = styled.div`
font-size: 20px;
margin-top: 40px;
margin-bottom: 5px;
width: 100%;
//   color: #6E7955;
color: #454444;
font-family: 'NanumSquareNeoExtraBold';
text-align: center;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

const Title = styled.div`
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 5px;
  width: 100%;
//   color: #6E7955;
color: #454444;
  font-family: 'NanumSquareNeoLight';
  font-weight: bold;
  text-align: center;
`;

const SubTitle = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  width: 100%;
  color: #8f8f8f;
  font-weight: bold;
  font-family: 'NanumSquareNeoLight';
  text-align: center;
`;

// 이미 계정이 있으면 로그인 하러 가기 텍스트
const LoginTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 20px;
  width: 100%;
  font-family: 'NanumSquareNeoBold', sans-serif;
`;

const LoginText = styled.span`
  font-family: 'NanumSquareNeoBold', sans-serif;
  color: #6E7955;
  font-size: 14px;
`;

const LoginLink = styled(Link)`
  font-family: 'NanumSquareNeoBold', sans-serif;
  color: #EA9087;
  font-size: 14px;
  text-decoration: none;
  margin-left: 5px;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

const buttonAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputTitle = styled.div`
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 5px;
  width: 450px;
  color: #454444;
  font-family: 'TTLaundryGothicB';
  text-align: left;
  margin-left: 35px;
`;


const InputField = styled.input`
  width: 450px;
  height: 50px;
  background-color: #f5f7fb;
  border: ${props => props.error ? '2px solid #E4BCB1' : '1.3px solid #cfd0d1'};
  border-radius: 16px;
  padding: 0 20px;
  font-size: 15px;
  font-family: 'NanumSquareNeoBold', sans-serif !important;
  transition: border-color 0.3s ease;
  animation: ${props => props.shake ? shakeAnimation : 'none'} 0.5s;
  &::placeholder {
    color: #adb3b8;
    font-weight: bold;
  }
`;

const ErrorMessage = styled.span`
  color: #E4BCB1;
  font-size: 12px;
  margin-bottom: 5px;
  margin-left: 25px;
  width: 450px;
  text-align: left;
  font-family: 'NanumSquareNeoBold', sans-serif !important;
  height: ${props => props.visible ? '20px' : '0'};
  opacity: ${props => props.visible ? 1 : 0};
  transition: all 0.3s ease;
  overflow: hidden;
`;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 450px;
//   margin-top: 60px;
// `;

// const SignUpText = styled.span`
//   font-size: 26px;
//   color: #6E7955;
//   font-family: 'TTLaundryGothicB';
//   margin-left: 280px;
// `;

// const CheckButton = styled.button`
//   background-color: #6E7955;
//   border: none;
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;

const SubmitButton = styled.button`
  width: 440px;
  height: 55px;
  background: linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%);
  background-blend-mode: multiply;
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 18px;
  font-family: 'TTLaundryGothicB', sans-serif;
  cursor: pointer;
  margin-top: 40px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    animation: ${buttonAnimation} 0.8s ease;
  }
`;

// 구글, 깃허브 로그인 아이콘(구현 안 할 거면 삭제해도 됨) ~buttonAnimation 까지
const SocialLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const SocialLoginButton = styled.button`
  width: 65px;
  height: 45px;
  background-color: #f5f7fb;
  border: 1.3px solid #cfd0d1;
  border-radius: 16px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #454444;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e8eaed;
  }

  svg {
    margin-right: 1px;
  }
`;

/* 구분선 */
const Divider = styled.div`
  width: 80%;
  text-align: center;
  border-bottom: 1px solid #cfd0d1;
  line-height: 0.1em;
  margin: 20px 0 30px;

  span {
    background: #fff;
    padding: 0 10px;
    color: #6E7955;
    font-size: 14px;
  }
`;


const Register = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ id: false, password: false, confirmPassword: false });
    const [shake, setShake] = useState({ id: false, password: false, confirmPassword: false });
    const [triggerShake, setTriggerShake] = useState(false);

    const handleInputFocus = (field) => {
        setErrors(prev => ({ ...prev, [field]: false }));
    };

    const handleClose = () => {
        // '/auth/login'으로 이동
        navigate('/auth/login');
    };

    // 입력란 조건 검사
    const validateInputs = () => {
        let isValid = true;
        const newErrors = { id: false, password: false, confirmPassword: false };

        if (!/^[a-zA-Z0-9]+$/.test(id)) {
            newErrors.id = true;
            isValid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = true;
            isValid = false;
        }

        setErrors(newErrors);
        setTriggerShake(!triggerShake);  // 애니메이션 트리거

        return isValid;
    };

    useEffect(() => {
        if (triggerShake) {
            setShake({ ...errors });
            const timer = setTimeout(() => {
                setShake({ id: false, password: false, confirmPassword: false });
                setErrors({ id: false, password: false, confirmPassword: false });
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [triggerShake, errors]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            console.log('Sign up completed');
            // 여기에 실제 회원가입 로직을 구현
        }
    };

    return (
        <PageWrapper>
            <SignUpContainer>
                <CloseButton onClick={handleClose}>
                    <GoReply size={28} />
                </CloseButton>
                <IconTitle>
                    <Icon src={YujaIcon} alt="Apple Icon" />
                </IconTitle>
                <Title>Sign up account</Title>
                {/* <SubTitle>yuza certificate project</SubTitle> */}

                
                <LoginTextContainer>
                    <LoginText>이미 계정이 있으신가요?</LoginText>
                    <LoginLink to="/auth/login">로그인 하러 가기</LoginLink>
                </LoginTextContainer>

                

                <InputWrapper>
                    <InputTitle>아이디</InputTitle>
                    <ErrorMessage visible={errors.id}>영어 및 숫자만 입력할 수 있습니다</ErrorMessage>
                    <InputField
                        type="text"
                        placeholder="아이디"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        error={errors.id}
                        shake={shake.id}
                        onFocus={() => handleInputFocus('id')}
                    />
                </InputWrapper>

                <InputWrapper>
                    <InputTitle>비밀번호</InputTitle>
                    <ErrorMessage visible={errors.password}>비밀번호 오류 메시지</ErrorMessage>
                    <InputField
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => handleInputFocus('password')}
                    />
                </InputWrapper>

                <InputWrapper>
                    <InputTitle>비밀번호 확인</InputTitle>
                    <ErrorMessage visible={errors.confirmPassword}>비밀번호가 일치하지 않습니다</ErrorMessage>
                    <InputField
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={errors.confirmPassword}
                        shake={shake.confirmPassword}
                        onFocus={() => handleInputFocus('confirmPassword')}
                    />
                </InputWrapper>

                <InputWrapper>
                    <InputTitle>필요하면 추가</InputTitle>
                    <InputField
                        type="text"
                        placeholder="학과나 관심 자격증?"
                    />
                </InputWrapper>

                <SubmitButton onClick={handleSubmit}>가입 완료 <GoArrowRight size={24} /></SubmitButton>

                <Divider>
                    <span>or</span>
                </Divider>

                <SocialLoginContainer>
                    <SocialLoginButton>
                        <GrGoogle size={16} />    
                    </SocialLoginButton>
                    <SocialLoginButton>
                        <DiGithubBadge size={24} />
                    </SocialLoginButton>
                </SocialLoginContainer>

            </SignUpContainer>
        </PageWrapper>
    );
};

export default Register;