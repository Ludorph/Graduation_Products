import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './jokbowritestyle.css';
import { CiLock } from "react-icons/ci";
import jokboService from './jokboService';

const JokboWrite = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isTagInputActive, setIsTagInputActive] = useState(false);
  const [price, setPrice] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const tagInputRef = useRef(null);
  const tagContainerRef = useRef(null);
  const navigate = useNavigate();


  // 폰트 크기 옵션(toolbar에 들어갈 거)
  const fontSizeArr = ['8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px'];

  const fontOptions = [
    'NeoBold',
    'NeoLight'
  ];

  // Quill 에디터 커스텀 모듈 정의
  const Size = ReactQuill.Quill.import('attributors/style/size');
  Size.whitelist = fontSizeArr;
  ReactQuill.Quill.register(Size, true);

  const Font = ReactQuill.Quill.import('formats/font');
  Font.whitelist = fontOptions;
  ReactQuill.Quill.register(Font, true);

  // 기본 폰트 크기 지정을 위한 
  const defaultStyle = {
    font: 'NeoBold',
    size: '16px'
  };


  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTagChange = (e) => {
    setCurrentTag(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && currentTag.trim() !== '' && tags.length < 10) {
      e.preventDefault();
      const newTag = currentTag.trim().startsWith('#') ? currentTag.trim() : `#${currentTag.trim()}`;
      setTags([...tags, newTag]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const activateTagInput = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTagInputActive(true);
    setCurrentTag('');  // '#'을 여기서 추가하지 않습니다.
  };

  const deactivateTagInput = () => {
    if (currentTag.trim() !== '') {
      const newTag = currentTag.trim().startsWith('#') ? currentTag.trim() : `#${currentTag.trim()}`;
      setTags([...tags, newTag]);
    }
    setCurrentTag('');
    setIsTagInputActive(false);
  };

  useEffect(() => {
    const quill = document.querySelector('.ql-editor');
    if (quill) {
      quill.style.fontSize = '16px';
    }
    const sizePicker = document.querySelector('.ql-size .ql-picker-label');
    if (sizePicker) {
      sizePicker.setAttribute('data-value', '16px');
    }
  }, []);

  useEffect(() => {
    if (isTagInputActive) {
      tagInputRef.current?.focus();
      // 커서를 '#' 다음으로 이동
      tagInputRef.current?.setSelectionRange(1, 1);
    }
  }, [isTagInputActive]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagContainerRef.current && !tagContainerRef.current.contains(event.target)) {
        deactivateTagInput();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': fontOptions }],
        [{ 'size': fontSizeArr }],  // 폰트 크기 옵션
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ],
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'color', 'background', 'align',
    'link', 'image'
  ];

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handlePrivateChange = (e) => {
    setIsPrivate(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jokboData = {
      user_id: '테스트 유저',
      examdata_title: title,
      examdata_content: content,
    };
    try {
      const result = await jokboService.createJokbo(jokboData);
      if (result.success) {
        alert('족보가 성공적으로 등록되었습니다!');
        navigate('/board/jokbo');
      } else {
        alert(`족보 등록 실패: ${result.error}`);
      }
    } catch (error) {
      console.error('족보 등록 중 오류 발생:', error);
      alert('족보 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="jokbo-write-container">
      <div className="jokbo-write-main">
        <div className="jokbo-write-header">
          <div onClick={() => navigate('/board/jokbo')} className="board-title">족보 게시판</div>
        </div>
        <div className="title-input-container">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력하세요"
            className="title-input"
          />
          <div className="title-border"></div>
        </div>
        <div className="content-editor-container">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            className="content-editor"
            defaultValue={`<p><span class="ql-size-16px">${defaultStyle.size}</span></p>`}
          />
          <div
            ref={tagContainerRef}
            className="tag-input-container"
            onClick={activateTagInput}
          >
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button onClick={(e) => { e.stopPropagation(); removeTag(tag); }} className="remove-tag">×</button>
              </span>
            ))}
            {isTagInputActive ? (
              <input
                ref={tagInputRef}
                type="text"
                value={currentTag}
                onChange={handleTagChange}
                onKeyDown={handleTagKeyDown}
                className="tag-input"
                placeholder="#"
              />
            ) : (
              <span className="tag-placeholder">
                {tags.length === 0 ? "#태그를 입력해주세요(최대 10개)" : "#"}
              </span>
            )}
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} className="jokbo-temporarily-submit-button">임시등록</button>
      <button onClick={handleSubmit} className="jokbo-submit-button">등록</button>
      <div className="jokbo-write-sidebar">
        <div className="sidebar-top-border"></div>
        <div className="additional-settings">
          <h3 className="settings-title">추가 설정</h3>
          <div className="setting-item">
            <label className="setting-label" htmlFor="price-input">ㄴ 가격 설정 : </label>
            <input
              id="price-input"
              type="number"
              value={price}
              onChange={handlePriceChange}
              placeholder="가격을 입력하세요"
              className="setting-input"
            />
          </div>
          <div className="setting-item">
            <label className="setting-checkbox-container">
              ㄴ&nbsp;
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={handlePrivateChange}
                className="setting-checkbox-input"
              />
              <span className="setting-checkbox-custom">
                <CiLock className="setting-checkbox-icon" />
              </span>
              <span className="setting-checkbox-label">비밀글로 설정</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokboWrite;