import React from 'react';
const ReactMarkdown = require('react-markdown');

export default function Debug() {
  const input = '```console.log("eee")```';

  return (
    <div>
      <ReactMarkdown source={input} />
    </div>
  );
}
