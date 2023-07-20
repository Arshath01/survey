import React from "react";

const Rating = ({ q, ratingAnswer, onRatingChange }) => {
  return (
    <div>
      <h1>{q.id}</h1>
      <h2>Question Type: {q.type}</h2>
      <div>
        {/* Add your rating input components here */}
        {/* For example, assuming you have 5 stars for rating */}
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="rating"
              value={value}
              checked={ratingAnswer === value}
              onChange={() => onRatingChange(value)}
              className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2">{value}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Rating;
