import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Trophy, CheckIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Flashcard } from '@/modules/flashcard/types/flashcard';
import { useLocation } from 'react-router-dom';

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

const Quiz = () => {
  const location = useLocation();
  const { flashcards }: { flashcards: Flashcard[] } = location.state || {};
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
  const [showResult, setShowResult] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [answers, setAnswers] = React.useState<{ questionId: string; correct: boolean }[]>([]);

  const [questions, setQuestions] = React.useState<Question[]>([]);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question?.correctAnswer;
  const isQuizComplete = currentQuestion === questions.length - 1 && showResult;

  function generateQuizFromFlashcards(flashcards: Flashcard[], numQuestions = 5) {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, numQuestions);

    return selected.map((card) => {
      const otherDefs = flashcards
        .filter((f) => f.id !== card.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((f) => f.definition);

      const options = [...otherDefs, card.definition].sort(() => Math.random() - 0.5);
      const correctAnswer = options.indexOf(card.definition);

      return {
        id: card.id,
        question: `${card.term}?`,
        options,
        correctAnswer,
      };
    });
  }

  const handleSubmit = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);

    const correct = index === question.correctAnswer;
    setShowResult(true);
    if (correct) {
      setScore(score + 1);
    }
    setAnswers([...answers, { questionId: question.id, correct }]);
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };
  React.useEffect(() => {
    if (flashcards?.length) {
      const quizData = generateQuizFromFlashcards(flashcards, 5);
      setQuestions(quizData);
    }
  }, [flashcards]);

  if (!questions.length) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Not enough flashcards to start the quiz.
      </div>
    );
  }

  if (isQuizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <Trophy className="w-16 h-16 mx-auto text-warning" />
                <h2 className="text-3xl font-bold text-foreground">Quiz Complete! 🎉</h2>
                <p className="text-xl text-muted-foreground">
                  You scored {score} out of {questions.length}
                </p>
              </div>

              <div className="py-8">
                <div className="text-6xl font-bold text-primary mb-2">{percentage}%</div>
                <p className="text-muted-foreground">
                  {percentage >= 80
                    ? 'Excellent work!'
                    : percentage >= 60
                    ? 'Good job!'
                    : 'Keep practicing!'}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Your Answers:</h3>
                <div className="space-y-2">
                  {questions.map((q, index) => {
                    const answer = answers[index];
                    return (
                      <div
                        key={q.id}
                        className={cn(
                          'p-3 rounded-lg flex items-center justify-between',
                          answer.correct ? 'bg-green-100' : 'bg-destructive/10',
                        )}
                      >
                        <span className="text-sm text-foreground">Question {index + 1}</span>
                        {answer.correct ? (
                          <CheckIcon className="w-5 h-5 text-green-500" />
                        ) : (
                          <XIcon className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button onClick={handleRestart} size="lg" className="w-full">
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background ">
      <div className="container mx-auto  px-4 py-8 mt-20">
        <div className="max-w-5xl mx-auto ">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Quiz Time</h2>
              <p className="text-muted-foreground mt-2 ">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-2 rounded-full text-black font-semibold">Score: {score}</div>
            </div>
          </div>

          <Card className="p-8 gap-0 mt-6">
            <h3 className="text-2xl mb-6 font-semibold text-foreground">{question.question}</h3>

            <span className="text-sm">Choose your answer</span>
            <div className=" grid grid-cols-2 gap-4 mt-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                const showCorrectAnswer = showResult && isCorrectAnswer;
                const showIncorrectAnswer = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleSubmit(index)}
                    disabled={showResult}
                    className={cn(
                      'w-full p-4 text-left rounded-lg cursor-pointer border-2 transition-all',
                      'hover:bg-gray-100 ',
                      'disabled:cursor-not-allowed',
                      isSelected && !showResult && 'border-primary bg-primary/5',
                      showCorrectAnswer && 'border-green-500 bg-green-100',
                      showIncorrectAnswer && 'border-red-500 bg-destructive/5',
                      !isSelected && !showResult && 'border-border',
                    )}
                  >
                    <div className={`flex items-center justify-between `}>
                      <div className="flex items-center gap-6">
                        <span className="text-sm">{index + 1}</span>
                        <span className="font-medium text-foreground">{option}</span>
                      </div>
                      {showCorrectAnswer && <CheckIcon className="w-6 h-6 text-green-500" />}
                      {showIncorrectAnswer && <XIcon className="w-6 h-6 text-destructive" />}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 justify-center mt-10">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all',
                    index === currentQuestion ? 'bg-primary scale-125' : 'bg-gray-200',
                  )}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
