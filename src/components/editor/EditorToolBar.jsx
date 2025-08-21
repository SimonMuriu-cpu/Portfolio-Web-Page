import React, { useState, useRef } from 'react';

const EditorToolBar = ({
  formatText,
  insertHeading,
  changeTextColor,
  insertImage,
  insertVideo,
  insertLink,
  createList,
  alignText,
  insertTable,
  undoCommand,
  redoCommand,
  selectedText
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHeadingOptions, setShowHeadingOptions] = useState(false);
  const [showListOptions, setShowListOptions] = useState(false);
  const colorPickerRef = useRef(null);
  const headingOptionsRef = useRef(null);
  const listOptionsRef = useRef(null);
  const fileInputRef = useRef(null);

  const colors = [
    '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
    '#FF0000', '#FF6600', '#FFCC00', '#00FF00', '#0099CC', '#6633FF',
    '#FF00FF', '#FF3366', '#00CCFF', '#33FF00', '#FFFF00', '#FF9900'
  ];

  const headingOptions = [
    { label: 'Normal', tag: 'div' },
    { label: 'Heading 1', tag: 'h1' },
    { label: 'Heading 2', tag: 'h2' },
    { label: 'Heading 3', tag: 'h3' },
    { label: 'Heading 4', tag: 'h4' },
    { label: 'Heading 5', tag: 'h5' },
    { label: 'Heading 6', tag: 'h6' }
  ];

  const listOptions = [
    { label: 'Bullet List', type: 'ul', style: 'disc', icon: '•' },
    { label: 'Numbered List', type: 'ol', style: 'decimal', icon: '1.' },
    { label: 'Arrow List', type: 'ul', style: 'none', icon: '→', customStyle: 'arrow' },
    { label: 'Roman Numerals', type: 'ol', style: 'upper-roman', icon: 'I.' },
    { label: 'Lower Roman', type: 'ol', style: 'lower-roman', icon: 'i.' },
    { label: 'Letters (A-Z)', type: 'ol', style: 'upper-alpha', icon: 'A.' },
    { label: 'Letters (a-z)', type: 'ol', style: 'lower-alpha', icon: 'a.' },
    { label: 'Square Bullets', type: 'ul', style: 'square', icon: '■' },
    { label: 'Circle Bullets', type: 'ul', style: 'circle', icon: '○' }
  ];

  const handleColorSelect = (color) => {
    changeTextColor(color);
    setShowColorPicker(false);
  };

  const handleHeadingSelect = (tag) => {
    insertHeading(tag);
    setShowHeadingOptions(false);
  };

  const handleListSelect = (listType, listStyle, customStyle) => {
    createList(listType, listStyle, customStyle);
    setShowListOptions(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        insertImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      insertImage(url);
    }
  };

  const handleVideoEmbed = () => {
    const url = prompt('Enter video URL (YouTube, Vimeo, etc.):');
    if (url) {
      insertVideo(url);
    }
  };

  const handleInsertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      const text = selectedText || prompt('Enter link text:') || url;
      insertLink(url, text);
    }
  };

  const handleInsertTable = () => {
    const rows = prompt('Number of rows:', '3');
    const cols = prompt('Number of columns:', '3');
    if (rows && cols) {
      insertTable(parseInt(rows), parseInt(cols));
    }
  };

  return (
    <div className="editor-toolbar">
      {/* Text Formatting Group */}
      <div className="toolbar-group">
        <button
          className="toolbar-btn"
          onClick={() => formatText('bold')}
          title="Bold (Ctrl+B)"
          type="button"
        >
          <strong>B</strong>
        </button>
        <button
          className="toolbar-btn"
          onClick={() => formatText('italic')}
          title="Italic (Ctrl+I)"
          type="button"
        >
          <em>I</em>
        </button>
        <button
          className="toolbar-btn"
          onClick={() => formatText('underline')}
          title="Underline (Ctrl+U)"
          type="button"
        >
          <u>U</u>
        </button>
        <button
          className="toolbar-btn"
          onClick={() => formatText('strikethrough')}
          title="Strikethrough"
          type="button"
        >
          <s>S</s>
        </button>
      </div>

      <div className="toolbar-separator"></div>

      {/* Headings Group */}
      <div className="toolbar-group">
        <div className="dropdown-container">
          <button
            className="toolbar-btn dropdown-btn"
            onClick={() => setShowHeadingOptions(!showHeadingOptions)}
            title="Headings"
            type="button"
          >
            H ▼
          </button>
          {showHeadingOptions && (
            <div className="dropdown-menu" ref={headingOptionsRef}>
              {headingOptions.map(({ label, tag }) => (
                <button
                  key={tag}
                  className="dropdown-item"
                  onClick={() => handleHeadingSelect(tag)}
                  
                >
                  {label}
                  
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="toolbar-separator"></div>

      {/* Color Group */}
      <div className="toolbar-group">
        <div className="dropdown-container">
          <button
            className="toolbar-btn color-btn"
            onClick={() => setShowColorPicker(!showColorPicker)}
            title="Text Color"
            type="button"
          >
            A
          </button>
          {showColorPicker && (
            <div className="color-picker" ref={colorPickerRef}>
              <div className="color-grid">
                {colors.map((color) => (
                  <button
                    key={color}
                    className="color-option"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="toolbar-separator"></div>

      {/* Alignment Group */}
      <div className="toolbar-group">
        <button
          className="toolbar-btn"
          onClick={() => alignText('left')}
          title="Align Left"
          type="button"
        >
          ≡
        </button>
        <button
          className="toolbar-btn"
          onClick={() => alignText('center')}
          title="Align Center"
          type="button"
        >
          ☰
        </button>
        <button
          className="toolbar-btn"
          onClick={() => alignText('right')}
          title="Align Right"
          type="button"
        >
          ≣
        </button>
        <button
          className="toolbar-btn"
          onClick={() => alignText('justify')}
          title="Justify"
          type="button"
        >
          ▦
        </button>
      </div>

      <div className="toolbar-separator"></div>

      {/* Lists Group */}
      <div className="toolbar-group">
        <div className="dropdown-container">
          <button
            className="toolbar-btn dropdown-btn"
            onClick={() => setShowListOptions(!showListOptions)}
            title="Lists"
            type="button"
          >
            ≡ ▼
          </button>
          {showListOptions && (
            <div className="dropdown-menu list-dropdown" ref={listOptionsRef}>
              {listOptions.map(({ label, type, style, icon, customStyle }) => (
                <button
                  key={`${type}-${style}-${customStyle || ''}`}
                  className="dropdown-item list-item"
                  onClick={() => handleListSelect(type, style, customStyle)}
                >
                  <span className="list-icon">{icon}</span>
                  <span className="list-label">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="toolbar-separator"></div>

      {/* Media Group */}
      <div className="toolbar-group">
        <button
          className="toolbar-btn"
          onClick={handleImageUrl}
          title="Insert Image from URL"
          type="button"
        >
          🖼️
        </button>
        <button
          className="toolbar-btn"
          onClick={() => fileInputRef.current?.click()}
          title="Upload Image"
          type="button"
        >
          📁
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageUpload}
          
        />
        <button
          className="toolbar-btn"
          onClick={handleVideoEmbed}
          title="Embed Video"
        >
          🎬
        </button>
        <button
          className="toolbar-btn"
          onClick={handleInsertLink}
          title="Insert Link"
        >
          🔗
        </button>
      </div>

      <div className="toolbar-separator"></div>

      {/* Table Group */}
      <div className="toolbar-group">
        <button
          className="toolbar-btn"
          onClick={handleInsertTable}
          title="Insert Table"
        >
          ⊞
        </button>
      </div>

      <div className="toolbar-separator"></div>

      {/* Undo/Redo Group */}
      <div className="toolbar-group">
        <button
          className="toolbar-btn"
          onClick={undoCommand}
          title="Undo (Ctrl+Z)"
          type="button"
        >
          ↶
        </button>
        <button
          className="toolbar-btn"
          onClick={redoCommand}
          title="Redo (Ctrl+Shift+Z)"
          type="button"
        >
          ↷
        </button>
      </div>
    </div>
  );
};

export default EditorToolBar;