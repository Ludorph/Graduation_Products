import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Autocomplete, TextField, ClickAwayListener, Popper } from '@mui/material';

const SelectorContainer = styled.div`
  --gap: 1.2px;
  background-color: #d9d9d9;
  border-radius: 25px;
  padding: var(--gap);
  display: inline-flex;
  position: relative;
  overflow: visible;
  margin-bottom: 20px;
  align-self: flex-start;
`;

const Option = styled.div`
  font-family: 'NanumSquareNeoBold', sans-serif !important;
  height: 38px;
  padding: 0 19px;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
  color: ${props => props.isSelected ? '#333333' : '#767676'};
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.isFirst ? 'bold' : 'normal'};
  
  ${props => props.isOtherCert && `
    &:after {
      content: ': ${props.otherCertName}';
      color: red;
      margin-left: 5px;
    }
  `}
`;

const Slider = styled.div`
  position: absolute;
  top: var(--gap);
  left: var(--gap);
  height: calc(100% - calc(var(--gap) * 2));
  border-radius: 24px;
  transition: 0.3s ease;
  background-color: #ffffff;
  z-index: 1;
`;


const SearchContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 10px;
  z-index: 3;
  border-radius: 25px;
  border: 2px solid #d9d9d9;
`;

const CustomPopper = styled(Popper)`
  & .MuiAutocomplete-paper {
    margin-top: 8px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  }
`;

// 전체 자격증 목록
const allCertifications = [
  '정보처리기사', '리눅스마스터', '네트워크관리사', '정보보안기사', '빅데이터분석기사',
  'SQLD', 'CCNA', 'AWS Solutions Architect', 'CISA', '전자계산기조직응용기사',
  '전기기사', '건축기사', '토목기사', '조경기사', '화학분석기사',
  // ... 더 많은 자격증 추가
];

// propSelectedOtherCert => 사용자가 "기타 자격증" 카테고리에서 특정 자격증을 선택하면, 이 prop의 값이 업데이트
// 이 정보를 사용하여 UI를 업데이트
const CertificationSelector = ({ options, selectedOption, onSelect, selectedOtherCert: propSelectedOtherCert }) => {
  const [sliderStyle, setSliderStyle] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [internalSelectedOtherCert, setInternalSelectedOtherCert] = useState(propSelectedOtherCert);
  const [selectedOtherCert, setSelectedOtherCert] = useState(null);
  const containerRef = useRef(null);
  const optionRefs = useRef([]);


  const updateSliderStyle = () => {
    let selectedIndex = options.findIndex(option => option === selectedOption);
    if (selectedOption === '기타 자격증' && internalSelectedOtherCert) {
      const existingIndex = options.findIndex(option => option === internalSelectedOtherCert);
      selectedIndex = existingIndex !== -1 ? existingIndex : options.length;
    }
    if (optionRefs.current[selectedIndex]) {
      const option = optionRefs.current[selectedIndex];
      setSliderStyle({
        width: `${option.offsetWidth - 2}px`,
        transform: `translateX(${option.offsetLeft}px)`
      });
    }
  };


  useEffect(() => {
    setInternalSelectedOtherCert(propSelectedOtherCert);
  }, [propSelectedOtherCert]);

  useEffect(() => {
    updateSliderStyle();
    window.addEventListener('resize', updateSliderStyle);
    return () => window.removeEventListener('resize', updateSliderStyle);
  }, [selectedOption, options, internalSelectedOtherCert]);

  const handleOptionClick = (option) => {
    if (option === '기타 자격증') {
      setShowSearch(true);
    } else {
      onSelect(option);
      setShowSearch(false);
      setSelectedOtherCert(null);
    }
  };

  const handleSearchSelect = (event, newValue) => {
    if (newValue) {
      const existingIndex = options.findIndex(option => option === newValue);
      if (existingIndex !== -1) {
        onSelect(newValue);
        setSelectedOtherCert(null);
      } else {
        setSelectedOtherCert(newValue);
        onSelect('기타 자격증', newValue);
      }
      setShowSearch(false);
    }
  };

  const handleClickAway = () => {
    setShowSearch(false);
    if (selectedOption === '기타 자격증' && !internalSelectedOtherCert) {
      onSelect(options[0]);
    }
  };

  const isOptionSelected = (option) =>
    option === selectedOption ||
    (selectedOption === '기타 자격증' && option === internalSelectedOtherCert);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <SelectorContainer ref={containerRef}>
        <Slider style={sliderStyle} />
        {options.map((option, index) => (
          <Option
            key={option}
            isSelected={isOptionSelected(option)}
            isFirst={index === 0}
            onClick={() => handleOptionClick(option)}
            ref={el => optionRefs.current[index] = el}
          >
            {option}
          </Option>
        ))}
        <Option
          isSelected={selectedOption === '기타 자격증' && internalSelectedOtherCert && !options.includes(internalSelectedOtherCert)}
          onClick={() => handleOptionClick('기타 자격증')}
          ref={el => optionRefs.current[options.length] = el}
          isOtherCert={selectedOption === '기타 자격증' && internalSelectedOtherCert && !options.includes(internalSelectedOtherCert)}
          otherCertName={internalSelectedOtherCert && !options.includes(internalSelectedOtherCert) ? internalSelectedOtherCert : ''}
        >
          기타 자격증
        </Option>
        {showSearch && (
          <SearchContainer>
            <Autocomplete
              options={allCertifications}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="자격증 검색"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                  fullWidth
                />
              )}
              onChange={handleSearchSelect}
              onInputChange={(event, newInputValue) => {
                setSearchValue(newInputValue);
              }}
              style={{ width: '100%' }}
              PopperComponent={CustomPopper}
              disablePortal={false}
            />
          </SearchContainer>
        )}
      </SelectorContainer>
    </ClickAwayListener>
  );
};

export default CertificationSelector;