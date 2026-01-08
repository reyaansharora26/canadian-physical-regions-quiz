import { useState } from 'react';
import { CheckCircle, XCircle, Award } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which physical region is the largest in Canada?",
    options: ["Canadian Shield", "Interior Plains", "Arctic", "Mountains"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Where can you find the Rocky Mountains in Canada?",
    options: ["Eastern Canada", "Western Canada", "Northern Canada", "Southern Canada"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is the Arctic region known for?",
    options: ["Hot weather", "Cold weather and ice", "Rainforests", "Deserts"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "The Interior Plains are good for what activity?",
    options: ["Swimming", "Farming", "Mountain climbing", "Surfing"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Which region has the Great Lakes?",
    options: ["Arctic", "Great Lakes-St. Lawrence Lowlands", "Canadian Shield", "Mountains"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "The Canadian Shield is made of very old what?",
    options: ["Ice", "Water", "Rock", "Sand"],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "What ocean is on the west coast of Canada?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "Which region would you find in the provinces of Nova Scotia and New Brunswick?",
    options: ["Appalachian Region", "Arctic", "Interior Plains", "Canadian Shield"],
    correctAnswer: 0
  },
  {
    id: 9,
    question: "What animals might you see in the Arctic region?",
    options: ["Lions", "Polar bears", "Elephants", "Monkeys"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "The Interior Plains are mostly what type of land?",
    options: ["Mountains", "Flat grasslands", "Oceans", "Forests only"],
    correctAnswer: 1
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerClick = (selectedIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(selectedIndex);
    setIsAnswered(true);

    if (selectedIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">🍁 Canada Quiz 🍁</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Physical Regions of Canada</h2>
          <p className="text-lg text-gray-600 mb-8">
            Test your knowledge about Canada's amazing physical regions!
            <br />
            Answer 10 fun questions and see how much you know!
          </p>
          <button
            onClick={() => setQuizStarted(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Start Quiz! 🚀
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    let message = "";
    let emoji = "";

    if (percentage >= 90) {
      message = "Outstanding! You're a Canada expert!";
      emoji = "🌟";
    } else if (percentage >= 70) {
      message = "Great job! You know a lot about Canada!";
      emoji = "🎉";
    } else if (percentage >= 50) {
      message = "Good work! Keep learning about Canada!";
      emoji = "👍";
    } else {
      message = "Nice try! Practice makes perfect!";
      emoji = "💪";
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <Award className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-purple-600 mb-4">Quiz Complete! {emoji}</h1>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-8 mb-6">
            <p className="text-2xl mb-4">Your Score:</p>
            <p className="text-7xl font-bold mb-4">{score}/{questions.length}</p>
            <p className="text-3xl">{percentage}%</p>
          </div>
          <p className="text-2xl font-semibold text-gray-700 mb-8">{message}</p>
          <button
            onClick={handleRestartQuiz}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold text-xl py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Try Again! 🔄
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-lg font-semibold text-blue-600">
              Score: {score}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {questions[currentQuestion].question}
        </h2>

        <div className="space-y-4 mb-8">
          {questions[currentQuestion].options.map((option, index) => {
            const isCorrect = index === questions[currentQuestion].correctAnswer;
            const isSelected = index === selectedAnswer;

            let buttonClass = "w-full text-left p-5 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 ";

            if (!isAnswered) {
              buttonClass += "bg-gray-100 hover:bg-blue-100 text-gray-800 border-2 border-gray-300";
            } else if (isSelected && isCorrect) {
              buttonClass += "bg-green-500 text-white border-2 border-green-600";
            } else if (isSelected && !isCorrect) {
              buttonClass += "bg-red-500 text-white border-2 border-red-600";
            } else if (isCorrect) {
              buttonClass += "bg-green-500 text-white border-2 border-green-600";
            } else {
              buttonClass += "bg-gray-100 text-gray-500 border-2 border-gray-300";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle className="w-6 h-6" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6" />}
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg"
          >
            {currentQuestion < questions.length - 1 ? "Next Question →" : "See Results! 🎯"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
