import { useCallback } from 'react';

const useEditorCommands = (editorRef) => {
  const executeCommand = useCallback((command, value = null) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    document.execCommand(command, false, value);
    editorRef.current.focus();
  }, [editorRef]);

  const formatText = useCallback((command) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, null);
    editorRef.current.focus();
  }, [executeCommand]);

  const insertHeading = useCallback((tag) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    const selection = window.getSelection();
    if (selection.rangeCount === 0) {
      // If no selection, create a new heading at the end
      const newElement = document.createElement(tag === 'div' ? 'div' : tag);
      newElement.innerHTML = 'Heading text';
      editorRef.current.appendChild(newElement);
      
      // Place cursor at the end of the new element
      const range = document.createRange();
      range.selectNodeContents(newElement);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    }
    
    const range = selection.getRangeAt(0);
    
    if (tag === 'div') {
      document.execCommand('formatBlock', false, 'div');
    } else {
      document.execCommand('formatBlock', false, `<${tag}>`);
    }
    
    editorRef.current.focus();
  }, [executeCommand]);

  const changeTextColor = useCallback((color) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand('foreColor', false, color);
    editorRef.current.focus();
  }, [executeCommand]);

  const insertImage = useCallback((src) => {
    if (!src || !editorRef.current) return;
    
    editorRef.current.focus();

    // Tailwind-styled, toggleable image
    const imgHTML = `
    <img
     src="${src}"
     class="editor-image max-w-full h-auto my-2 rounded cursor-pointer transition-all duration-300"
     style="max-width: 50%; height: auto; resize: both; overflow: auto;"
     alt="Inserted Image"
    />
    `;
    document.execCommand('insertHTML', false, imgHTML);
  }, [editorRef]);

// Inserting images from computer raies the 413 error (Payload Too Large) in the server. 
// I'll come back to handle this so that it uses a url instead, which means the image is uploaded to a server 
// or cloud storage and then the URL is inserted into the editor.


  const insertVideo = useCallback((url) => {
    if (!url) return;
    
    let embedCode = '';
    
    // YouTube URL handling
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen style="max-width: 100%; margin: 10px 0;"></iframe>`;
    }
    // Vimeo URL handling
    else if (url.includes('vimeo.com')) {
      const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
      if (vimeoMatch) {
        const videoId = vimeoMatch[1];
        embedCode = `<iframe src="https://player.vimeo.com/video/${videoId}" width="560" height="315" frameborder="0" allowfullscreen style="max-width: 100%; margin: 10px 0;"></iframe>`;
      }
    }
    // Generic video URL
    else if (url.match(/\.(mp4|webm|ogg)$/i)) {
      embedCode = `<video controls style="max-width: 100%; margin: 10px 0;"><source src="${url}" type="video/mp4">Your browser does not support the video tag.</video>`;
    }
    
    if (embedCode) {
      executeCommand('insertHTML', embedCode);
    } else {
      alert('Please enter a valid video URL (YouTube, Vimeo, or direct video file)');
    }
  }, [executeCommand]);

  const insertLink = useCallback((url, text) => {
    if (!url) return;
    
    const selection = window.getSelection();
    if (selection.toString() && !text) {
      executeCommand('createLink', url);
    } else {
      const linkHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer">${text || url}</a>`;
      executeCommand('insertHTML', linkHTML);
    }
  }, [executeCommand]);

  const createList = useCallback((type, style = 'disc', customStyle = null) => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;
    
    // Use document.execCommand for basic lists
    if ((type === 'ul' && style === 'disc') || (type === 'ol' && style === 'decimal')) {
      const command = type === 'ul' ? 'insertUnorderedList' : 'insertOrderedList';
      executeCommand(command);
      return;
    }
    
    // Create custom styled lists
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    let listHTML = '';
    let listStyleCSS = '';
    
    if (customStyle === 'arrow') {
      listStyleCSS = 'list-style: none; padding-left: 20px;';
      const listItemStyle = 'position: relative;';
      const beforeStyle = 'content: "→"; position: absolute; left: -20px; color: #666;';
      
      if (selectedText) {
        const lines = selectedText.split('\n').filter(line => line.trim());
        const items = lines.map(line => 
          `<li style="${listItemStyle}"><span style="position: relative;">${line.trim()}</span></li>`
        ).join('');
        listHTML = `<ul style="${listStyleCSS}">${items}</ul>`;
      } else {
        listHTML = `<ul style="${listStyleCSS}"><li style="${listItemStyle}"><span style="position: relative;">List item</span></li></ul>`;
      }
      
      // Add CSS for arrow pseudo-element
      const styleElement = document.getElementById('arrow-list-style') || document.createElement('style');
      styleElement.id = 'arrow-list-style';
      styleElement.textContent = `
        .editor-content ul[style*="list-style: none"] li span:before {
          content: "→";
          position: absolute;
          left: -20px;
          color: #666;
        }
      `;
      if (!document.getElementById('arrow-list-style')) {
        document.head.appendChild(styleElement);
      }
    } else {
      listStyleCSS = `list-style-type: ${style};`;
      
      if (selectedText) {
        const lines = selectedText.split('\n').filter(line => line.trim());
        const items = lines.map(line => `<li>${line.trim()}</li>`).join('');
        listHTML = `<${type} style="${listStyleCSS}">${items}</${type}>`;
      } else {
        listHTML = `<${type} style="${listStyleCSS}"><li>List item</li></${type}>`;
      }
    }
    
    range.deleteContents();
    range.insertNode(document.createRange().createContextualFragment(listHTML));
    
    // Move cursor to end of inserted content
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }, [executeCommand, editorRef]);

  const alignText = useCallback((alignment) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    const alignmentMap = {
      left: 'justifyLeft',
      center: 'justifyCenter',
      right: 'justifyRight',
      justify: 'justifyFull'
    };
    
    const command = alignmentMap[alignment];
    if (command) {
      document.execCommand(command, false, null);
      
      // Also apply CSS style to ensure persistence
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let element = range.commonAncestorContainer;
        
        // Find the block element to apply alignment
        while (element && element.nodeType !== Node.ELEMENT_NODE) {
          element = element.parentNode;
        }
        
        if (element && element !== editorRef.current) {
          // Apply alignment to the current block element
          const blockElement = element.closest('div, p, h1, h2, h3, h4, h5, h6, li') || element;
          if (blockElement && editorRef.current.contains(blockElement)) {
            blockElement.style.textAlign = alignment;
          }
        } else {
          // If no specific block element, apply to the editor content
          editorRef.current.style.textAlign = alignment;
        }
      }
      
      editorRef.current.focus();
    }
  }, [executeCommand]);

  const insertTable = useCallback((rows, cols) => {
    if (!rows || !cols || rows < 1 || cols < 1) return;
    
    let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">';
    
    for (let i = 0; i < rows; i++) {
      tableHTML += '<tr>';
      for (let j = 0; j < cols; j++) {
        tableHTML += '<td style="padding: 8px; border: 1px solid #ccc;">&nbsp;</td>';
      }
      tableHTML += '</tr>';
    }
    
    tableHTML += '</table>';
    executeCommand('insertHTML', tableHTML);
  }, [executeCommand]);

  const undoCommand = useCallback(() => {
    executeCommand('undo');
  }, [executeCommand]);

  const redoCommand = useCallback(() => {
    executeCommand('redo');
  }, [executeCommand]);

  return {
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
  };
};

export default useEditorCommands;