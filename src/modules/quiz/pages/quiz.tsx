import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  language: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is 'Hello' in French?",
    options: ['Au revoir', 'Bonjour', 'Merci', "S'il vous plaît"],
    correctAnswer: 1,
    language: 'French',
  },
  {
    id: 2,
    question: "What is 'Thank you' in French?",
    options: ['Bonjour', 'Au revoir', 'Merci', 'Oui'],
    correctAnswer: 2,
    language: 'French',
  },
  {
    id: 3,
    question: "What is 'Goodbye' in French?",
    options: ['Bonjour', 'Au revoir', 'Merci', 'Non'],
    correctAnswer: 1,
    language: 'French',
  },
  {
    id: 4,
    question: "What is 'Please' in French?",
    options: ['Merci', 'Oui', "S'il vous plaît", 'Non'],
    correctAnswer: 2,
    language: 'French',
  },
  {
    id: 5,
    question: "What is 'Yes' in French?",
    options: ['Non', 'Oui', 'Peut-être', 'Jamais'],
    correctAnswer: 1,
    language: 'French',
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [answers, setAnswers] = useState<{ questionId: number; correct: boolean }[]>([]);

  const question = sampleQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isQuizComplete = currentQuestion === sampleQuestions.length - 1 && showResult;

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === question.correctAnswer;
    setShowResult(true);
    if (correct) {
      setScore(score + 1);
    }
    setAnswers([...answers, { questionId: question.id, correct }]);
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
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
    setAnsweredQuestions([]);
    setAnswers([]);
  };

  if (isQuizComplete) {
    const percentage = Math.round((score / sampleQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <Trophy className="w-16 h-16 mx-auto text-warning" />
                <h2 className="text-3xl font-bold text-foreground">Quiz Complete! 🎉</h2>
                <p className="text-xl text-muted-foreground">
                  You scored {score} out of {sampleQuestions.length}
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
                  {sampleQuestions.map((q, index) => {
                    const answer = answers[index];
                    return (
                      <div
                        key={q.id}
                        className={cn(
                          'p-3 rounded-lg flex items-center justify-between',
                          answer.correct ? 'bg-success/10' : 'bg-destructive/10',
                        )}
                      >
                        <span className="text-sm text-foreground">Question {index + 1}</span>
                        {answer.correct ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Quiz Time</h2>
              <p className="text-muted-foreground">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                {question.language}
              </div>
              <div className="px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold">
                Score: {score}
              </div>
            </div>
          </div>

          <Card className="p-8 space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">{question.question}</h3>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === question.correctAnswer;
                const showCorrectAnswer = showResult && isCorrectAnswer;
                const showIncorrectAnswer = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={cn(
                      'w-full p-4 text-left rounded-lg border-2 transition-all',
                      'hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                      'disabled:cursor-not-allowed',
                      isSelected && !showResult && 'border-primary bg-primary/5',
                      showCorrectAnswer && 'border-success bg-success/5',
                      showIncorrectAnswer && 'border-destructive bg-destructive/5',
                      !isSelected && !showResult && 'border-border',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{option}</span>
                      {showCorrectAnswer && <CheckCircle2 className="w-6 h-6 text-success" />}
                      {showIncorrectAnswer && <XCircle className="w-6 h-6 text-destructive" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {!showResult ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                size="lg"
                className="w-full"
              >
                Submit Answer
              </Button>
            ) : (
              <div className="space-y-4">
                <div
                  className={cn(
                    'p-4 rounded-lg',
                    isCorrect ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive',
                  )}
                >
                  <p className="font-semibold text-center">
                    {isCorrect ? 'Correct! Well done! ✓' : 'Incorrect. Keep practicing!'}
                  </p>
                </div>
                {currentQuestion < sampleQuestions.length - 1 ? (
                  <Button onClick={handleNext} size="lg" className="w-full">
                    Next Question
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleNext} size="lg" className="w-full">
                    View Results
                    <Trophy className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </Card>

          <div className="flex gap-2 justify-center">
            {sampleQuestions.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'h-2 w-2 rounded-full transition-all',
                  index === currentQuestion && 'bg-primary scale-125',
                  index < currentQuestion &&
                    (answers[index]?.correct ? 'bg-success' : 'bg-destructive'),
                  index > currentQuestion && 'bg-border',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
