import React from 'react';

// Simple mock of react-markdown that just displays the content
const ReactMarkdown = ({ children, ...props }: { children: string, [key: string]: any }) => {
  return <div data-testid="react-markdown-content" {...props}>{children}</div>;
};

export default ReactMarkdown;