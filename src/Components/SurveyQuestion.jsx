import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";


export const SurveyQuestion = ({ questions }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  const [ratingAnswer, setRatingAnswer] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [userSessionId, setUserSessionId] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const localStorageKey = "surveyUserAnswers";

  useEffect(() => {
    const generateUserSessionId = () => {
      const sessionId = Math.random().toString(36).substring(2);
      setUserSessionId(sessionId);
    };

    generateUserSessionId();
    // Load user answers from local storage if available
    const storedAnswers = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedAnswers) {
      setUserAnswers(storedAnswers);
    }
  }, []);

  useEffect(() => {
    // Save user answers to local storage whenever userAnswers changes
    localStorage.setItem(localStorageKey, JSON.stringify(userAnswers));
  }, [userAnswers,ratingAnswer]);

  // Restoring the user's answers for the current question when navigating back
  useEffect(() => {
    const userAnswerForCurrentQuestion = userAnswers[currentQuestion.id];
    if (currentQuestion.type === "rating") {
      setRatingAnswer(userAnswerForCurrentQuestion);
    } else {
      setTextAnswer(userAnswerForCurrentQuestion);
    }
  }, [currentQuestion, userAnswers]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRatingChange = (value) => {
    setRatingAnswer(value);
  };

  const handleTextChange = (event) => {
    setTextAnswer(event.target.value);
  };

  const handleAnswerSubmission = () => {
    const questionId = currentQuestion.id;
    const answer = currentQuestion.type === "rating" ? ratingAnswer : textAnswer;

    // Add the user's answer for the current question to the userAnswers object
    setUserAnswers((prevUserAnswers) => ({
      ...prevUserAnswers,
      [questionId]: answer,
    }));

    setRatingAnswer(null);
    setTextAnswer("");
    handleNextQuestion();
  };

  const submitSurvey = async () => {
    try {
      const answersRef = collection(db, "answers");

      // Loop through the userAnswers object and store all answers in the database
      for (const questionId in userAnswers) {
        const answer = userAnswers[questionId] || null;
        const answerId = Math.random().toString(36).substring(2);

        await addDoc(answersRef, {
          id: answerId,
          questionId,
          answer,
          sessionId: userSessionId,
        });
      }

      // Mark the survey as completed after all answers are submitted
      setIsSurveyCompleted(true);
      // setTextAnswer('');
      setShowConfirmation(false); // Hide the confirmation step after submission
      setTimeout(() => {
        navigate('/');// Move to the welcome screen after a few seconds
      }, 5000); // 5000 milliseconds (5 seconds) delay before moving to the welcome screen
    } catch (error) {
      alert("Field Cannot be empty");
      
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(userAnswers).length === questions.length) {
      // If all questions have been answered, show the confirmation step
      setShowConfirmation(true);
    }
  }, [userAnswers, questions]);

  useEffect(()=>{
    isSurveyCompleted ? navigate('/Greetings') : null
  },[isSurveyCompleted])

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">
        Question {currentQuestionIndex + 1}/{questions.length}
      </h1>
      <h2 className="text-xl text-gray-800 mb-6">{currentQuestion.questionText}</h2>
      {currentQuestion.type === "rating" && (
        <div>
          <div className="mt-4">
            {currentQuestionIndex === 3 ? ( // Change the 4th question to have a rating range of 1 to 10
              // Rating range from 1 to 10
              [...Array(10)].map((_, index) => (
                <label key={index + 1} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="rating"
                    value={index + 1}
                    checked={ratingAnswer === index + 1}
                    onChange={() => handleRatingChange(index + 1)}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2">{index + 1}</span>
                </label>
              ))
            ) : (
              // Rating range from 1 to 5 for other questions
              [1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    checked={ratingAnswer === value}
                    onChange={() => handleRatingChange(value)}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2">{value}</span>
                </label>
              ))
            )}
          </div>
        </div>
      )}
      {currentQuestion.type === "text" && (
        <div>
          <textarea
            value={textAnswer}
            onChange={handleTextChange}
            className="mt-4 p-2 border rounded-lg resize-none w-full h-24"
            placeholder="Enter your response..."
          />
        </div>
      )}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <>
            {showConfirmation ? (
              <button
                onClick={submitSurvey}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg"
                disabled={isSurveyCompleted} // Disable the button when the survey is completed
              >
                Confirm Submission
              </button>
            ) : (
              <button
                onClick={handleAnswerSubmission}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg"
                disabled={isSurveyCompleted || showConfirmation} // Disable the button when the survey is completed or confirmation is shown
              >
                Submit
              </button>
            )}
          </>
        ) : (
          <button
            onClick={handleAnswerSubmission}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
