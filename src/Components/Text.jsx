import React from "react";

const Text = ({ q, textAnswer, onTextChange }) => {
  return (
    <div>
      <h1>{q.id}</h1>
      <h2>Question Type: {q.type}</h2>
      <div>

        <textarea
          value={textAnswer}
          onChange={onTextChange}
          className="mt-4 p-2 border rounded-lg resize-none w-full h-24"
          placeholder="Enter your response..."
        />
      </div>
    </div>
  );
};

export default Text;
