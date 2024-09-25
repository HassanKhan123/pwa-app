// import React from 'react';
// import { marked } from "marked"; // Add this import statement

// const MarkdownRenderer = ({ text }: { text: string }) => {
//   const getMarkdownText = (): any => {
//     var rawMarkup = marked.parse(text);
//     return { __html: rawMarkup };
//   }

//   return <div style={{ 
//     paddingLeft: '20px',
//     paddingTop: '16px',
//     lineHeight: '24px', 
//     fontFamily: 'Inter' }} dangerouslySetInnerHTML={getMarkdownText()} />;
// };
 
// export default MarkdownRenderer;

import React from 'react';
import { marked } from 'marked';

const MarkdownRenderer = ({ text }: { text: string }) => {
  // Create a custom renderer
  const renderer = new marked.Renderer();
  
  // Override the link renderer
  renderer.link = (href, title, text) => {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  };

  // const preprocessText = (text: string): string => {
  //   // Escape periods after numbers to prevent list interpretation
  //   const escapedText = text.replace(/(\d+)\./g, '$1\\.');
  //   // Replace double newlines with <br><br>
  //   return escapedText.replace(/\n\n/g, '<br><br>');
  // };

  const preprocessText = (text: string): string => {
    // Escape periods after numbers to prevent list interpretation
    const escapedText = text.replace(/(\d+)\./g, '$1\\.');
    // Replace double newlines with <br><br>
    const doubleNewlineProcessedText = escapedText.replace(/\n\n/g, '<br><br>');

    const doubleBackSlashProcessedText = doubleNewlineProcessedText.replace(/\\/g, '');
    // Replace single newlines with <br>
    return doubleBackSlashProcessedText.replace(/\n/g, '<br>');
    // return doubleBackSlashProcessedText;
  };

  const getMarkdownText = (): any => {
    const processedText = preprocessText(text);
    var rawMarkup = marked(processedText, { renderer });
    return { __html: rawMarkup };
  };

  // const getMarkdownText = (): any => {
  //   const processedText = text.replace(/\n\n/g, '<br><br>');
  //   var rawMarkup = marked(processedText, { renderer });
  //   return { __html: rawMarkup };
  // };

  return (
    <div
      style={{
        paddingLeft: '20px',
        paddingTop: '16px',
        lineHeight: '24px',
        fontFamily: 'Inter',
      }}
      dangerouslySetInnerHTML={getMarkdownText()}
    />
  );
};

export default MarkdownRenderer;
