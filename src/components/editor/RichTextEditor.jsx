import React, { useRef, useEffect, useState } from 'react';
import EditorToolBar from './EditorToolBar';
import useEditorCommands from '../../hooks/useEditorCommands';
import './editor.css';

const RichTextEditor = ({ initialContent = '', onChange }) => {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState(initialContent);
  const [selectedText, setSelectedText] = useState('');
  
  const {
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
    redoCommand
  } = useEditorCommands(editorRef);

  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent;
      // Ensure proper text direction and alignment
      editorRef.current.style.textAlign = 'left';
      editorRef.current.style.direction = 'ltr';
    }
  }, [initialContent]);

  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setEditorContent(content);
      if (onChange) {
        onChange(content);
      }
    }
  };

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSelectedText(selection.toString());
    }
  };

  const handleKeyDown = (e) => {
    // Handle common keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          formatText('bold');
          break;
        case 'i':
          e.preventDefault();
          formatText('italic');
          break;
        case 'u':
          e.preventDefault();
          formatText('underline');
          break;
        case 'z':
          if (e.shiftKey) {
            e.preventDefault();
            redoCommand();
          } else {
            e.preventDefault();
            undoCommand();
          }
          break;
        default:
          break;
      }
    }
  };

  const toolbarProps = {
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
  };

  return (
    <div className="rich-text-editor">
      <EditorToolBar {...toolbarProps} />
      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        suppressContentEditableWarning={true}
        onInput={handleContentChange}
        onMouseUp={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        onKeyDown={handleKeyDown}
        data-placeholder="Start writing your blog post..."
      />
    </div>
  );
};

export default RichTextEditor;