import { useState } from "react";
import { SurveyQuestion } from "./SurveyQuestion";
import { questions } from "./Questions";

export const WelcomeScreen = () => {
   
  const [surveyForm, setSurveyForm] = useState(false);

  
  const surveyQuestionsArray = Object.values(questions);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {surveyForm ? (
        <SurveyQuestion questions={surveyQuestionsArray} />
      ) : (
        <div className="flex flex-col p-8 border rounded-lg text-white bg-opacity-90 backdrop-blur-lg">
          <h1 className="text-4xl font-bold mb-4">Welcome To The Survey</h1>
          <h3 className="text-lg">Click the Start button to take the survey</h3>
          <button
            onClick={() => setSurveyForm(true)}
            className="hover:bg-blue-600 hover:text-white mt-6 px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg shadow-md hover:shadow-lg"
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
};
