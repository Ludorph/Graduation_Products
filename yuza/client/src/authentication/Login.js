import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { GoX, GoReply, GoArrowRight } from "react-icons/go";
import { DiGithubBadge } from "react-icons/di";
import { GrGoogle } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';
import YujaIcon from '../img/yuja.png';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
`;

const LoginContainer = styled.div`
  width: 600px;
  height: 800px;
  border: 1.5px solid #eee;
  border-radius: 30px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  text-align: left;
  position: relative;
  background-color: #ffffff;
`;

const IconTitle = styled.div`
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 5px;
  width: 100%;
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
  color: #454444;
  font-family: 'NanumSquareNeoLight';
  font-weight: bold;
  text-align: center;
`;

const SignUpTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 20px;
  width: 100%;
  font-family: 'NanumSquareNeoBold', sans-serif;
`;

const SignUpText = styled.span`
  font-family: 'NanumSquareNeoBold', sans-serif;
  color: #6E7955;
  font-size: 14px;
`;

const SignUpLink = styled(Link)`
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
//   background-color: #fff;
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
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    animation: ${buttonAnimation} 0.8s ease;
  }
`;

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
    margin: 0;
  }
`;

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

const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ id: false, password: false });
    const [shake, setShake] = useState({ id: false, password: false });
    const [triggerShake, setTriggerShake] = useState(false);

    const handleInputFocus = (field) => {
        setErrors(prev => ({ ...prev, [field]: false }));
    };

    const validateInputs = () => {
        let isValid = true;
        const newErrors = { id: false, password: false };

        if (id.trim() === '') {
            newErrors.id = true;
            isValid = false;
        }

        if (password.trim() === '') {
            newErrors.password = true;
            isValid = false;
        }

        setErrors(newErrors);
        setTriggerShake(!triggerShake);

        return isValid;
    };

    useEffect(() => {
        if (triggerShake) {
            setShake({ ...errors });
            const timer = setTimeout(() => {
                setShake({ id: false, password: false });
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [triggerShake, errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            console.log('Login attempted');
            // 여기에 실제 로그인 로직을 구현
        }
    };

    return (
        <PageWrapper>
            <LoginContainer>
                <IconTitle>
                    <Icon src={YujaIcon} alt="Yuza Icon" />
                </IconTitle>
                <Title>Login Yuza</Title>

                <SignUpTextContainer>
                    <SignUpText>계정이 없으신가요?</SignUpText>
                    <SignUpLink to="/auth/register">회원가입 하기</SignUpLink>
                </SignUpTextContainer>

                <InputWrapper>
                    <InputTitle>아이디</InputTitle>
                    <ErrorMessage visible={errors.id}>아이디를 입력해주세요</ErrorMessage>
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
                    <ErrorMessage visible={errors.password}>비밀번호를 입력해주세요</ErrorMessage>
                    <InputField
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        shake={shake.password}
                        onFocus={() => handleInputFocus('password')}
                    />
                </InputWrapper>

                <SubmitButton onClick={handleSubmit}>
                    로그인 <GoArrowRight size={24} style={{ marginLeft: '10px' }} />
                </SubmitButton>

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

            </LoginContainer>
        </PageWrapper>
    );
};

export default Login;