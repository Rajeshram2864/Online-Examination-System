import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, AlertCircle, Play, Square } from 'lucide-react';
import { ExamConfig, ExamAttempt, ExamResult, Question } from '@/types';

interface ExamInterfaceProps {
  categories: string[];
  currentExam: ExamAttempt | null;
  onStartExam: (config: ExamConfig) => void;
  onSubmitAnswer: (questionId: string, answer: string) => void;
  onFinishExam: () => ExamResult | null;
}

const ExamInterface: React.FC<ExamInterfaceProps> = ({
  categories,
  currentExam,
  onStartExam,
  onSubmitAnswer,
  onFinishExam
}) => {
  const [examConfig, setExamConfig] = useState<ExamConfig>({
    title: 'Practice Exam',
    description: 'A comprehensive practice examination',
    duration: 30,
    numberOfQuestions: 5,
    category: 'All',
    passingScore: 70,
    shuffleQuestions: true,
    showResults: true
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);

  // Timer effect
  useEffect(() => {
    if (currentExam && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentExam, timeLeft]);

  // Initialize timer when exam starts
  useEffect(() => {
    if (currentExam) {
      setTimeLeft(currentExam.examConfig.duration * 60);
      setCurrentQuestionIndex(0);
    }
  }, [currentExam]);

  const handleStartExam = () => {
    onStartExam(examConfig);
  };

  const handleFinishExam = () => {
    const result = onFinishExam();
    if (result) {
      setExamResult(result);
      setShowResultDialog(true);
    }
  };

  const handleAnswerSubmit = (answer: string) => {
    if (!currentExam) return;
    
    const currentQuestion = currentExam.questions[currentQuestionIndex];
    onSubmitAnswer(currentQuestion.id, answer);
  };

  const goToNextQuestion = () => {
    if (currentExam && currentQuestionIndex < currentExam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    return currentExam ? Object.keys(currentExam.answers).length : 0;
  };

  if (showResultDialog && examResult) {
    return (
      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {examResult.passed ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-500" />
              )}
              <span>Exam Results</span>
            </DialogTitle>
            <DialogDescription>
              Here are your exam results and performance breakdown.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">{examResult.score}</div>
                    <div className="text-sm text-slate-500">Total Points</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">{Math.round(examResult.percentage)}%</div>
                    <div className="text-sm text-slate-500">Percentage</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">
                      {examResult.correctAnswers}/{examResult.totalQuestions}
                    </div>
                    <div className="text-sm text-slate-500">Correct Answers</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">{formatTime(examResult.timeTaken)}</div>
                    <div className="text-sm text-slate-500">Time Taken</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Badge className={`text-lg px-6 py-2 ${examResult.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {examResult.passed ? 'PASSED' : 'FAILED'}
              </Badge>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Question Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {examResult.questionResults.map((result, index) => (
                    <div key={result.questionId} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        result.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {result.correct ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${result.correct ? 'text-green-700' : 'text-red-700'}`}>
                            {result.correct ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600">
                          <div>Your answer: <span className="font-medium">{result.userAnswer}</span></div>
                          {!result.correct && (
                            <div>Correct answer: <span className="font-medium text-green-700">{result.correctAnswer}</span></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button onClick={() => setShowResultDialog(false)}>
                Close Results
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (currentExam) {
    const currentQuestion = currentExam.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentExam.questions.length) * 100;
    const answeredCount = getAnsweredCount();

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{currentExam.examConfig.title}</h2>
            <p className="text-slate-600">{currentExam.examConfig.description}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-slate-600">
              <Clock className="w-5 h-5" />
              <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-red-600' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <Badge variant="outline">
              {answeredCount}/{currentExam.questions.length} Answered
            </Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Question {currentQuestionIndex + 1} of {currentExam.questions.length}</CardTitle>
              <Badge className={
                currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }>
                {currentQuestion.difficulty} • {currentQuestion.points} pts
              </Badge>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">{currentQuestion.question}</h3>
              
              {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSubmit(index.toString())}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        currentExam.answers[currentQuestion.id] === index.toString()
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          currentExam.answers[currentQuestion.id] === index.toString()
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-slate-300'
                        }`}>
                          {currentExam.answers[currentQuestion.id] === index.toString() && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </div>
                        <span className="text-slate-900">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {currentQuestion.type === 'true-false' && (
                <div className="space-y-3">
                  {['true', 'false'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerSubmit(option)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        currentExam.answers[currentQuestion.id] === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          currentExam.answers[currentQuestion.id] === option
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-slate-300'
                        }`}>
                          {currentExam.answers[currentQuestion.id] === option && (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </div>
                        <span className="text-slate-900 capitalize">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {currentQuestion.type === 'short-answer' && (
                <div>
                  <Input
                    value={currentExam.answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerSubmit(e.target.value)}
                    placeholder="Enter your answer..."
                    className="text-lg p-4"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              <div className="flex space-x-3">
                {currentQuestionIndex < currentExam.questions.length - 1 ? (
                  <Button onClick={goToNextQuestion}>
                    Next Question
                  </Button>
                ) : (
                  <Button onClick={handleFinishExam} className="bg-green-600 hover:bg-green-700">
                    <Square className="w-4 h-4 mr-2" />
                    Finish Exam
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Question Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {currentExam.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                    index === currentQuestionIndex
                      ? 'bg-blue-500 text-white'
                      : currentExam.answers[currentExam.questions[index].id]
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Take Exam</h2>
        <p className="text-slate-600">Configure and start your examination</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Exam Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Exam Title</label>
              <Input
                value={examConfig.title}
                onChange={(e) => setExamConfig(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter exam title..."
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Category</label>
              <Select
                value={examConfig.category}
                onValueChange={(value) => setExamConfig(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Description</label>
            <Input
              value={examConfig.description}
              onChange={(e) => setExamConfig(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter exam description..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Duration (minutes)</label>
              <Input
                type="number"
                value={examConfig.duration}
                onChange={(e) => setExamConfig(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                min="1"
                max="180"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Number of Questions</label>
              <Input
                type="number"
                value={examConfig.numberOfQuestions}
                onChange={(e) => setExamConfig(prev => ({ ...prev, numberOfQuestions: parseInt(e.target.value) || 0 }))}
                min="1"
                max="50"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Passing Score (%)</label>
              <Input
                type="number"
                value={examConfig.passingScore}
                onChange={(e) => setExamConfig(prev => ({ ...prev, passingScore: parseInt(e.target.value) || 0 }))}
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={examConfig.shuffleQuestions}
                onChange={(e) => setExamConfig(prev => ({ ...prev, shuffleQuestions: e.target.checked }))}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-slate-700">Shuffle Questions</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={examConfig.showResults}
                onChange={(e) => setExamConfig(prev => ({ ...prev, showResults: e.target.checked }))}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm text-slate-700">Show Results</span>
            </label>
          </div>

          <Button onClick={handleStartExam} className="w-full bg-blue-600 hover:bg-blue-700">
            <Play className="w-4 h-4 mr-2" />
            Start Exam
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamInterface;