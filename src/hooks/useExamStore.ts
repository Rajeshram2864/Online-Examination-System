import { useState, useCallback } from 'react';
import { Question, ExamConfig, ExamAttempt, ExamResult } from '@/types';

export const useExamStore = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'multiple-choice',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2,
      category: 'Geography',
      difficulty: 'easy',
      points: 10
    },
    {
      id: '2',
      type: 'true-false',
      question: 'The Earth is flat.',
      correctAnswer: 'false',
      category: 'Science',
      difficulty: 'easy',
      points: 5
    },
    {
      id: '3',
      type: 'multiple-choice',
      question: 'Which programming language is used for web development?',
      options: ['Python', 'JavaScript', 'C++', 'Java'],
      correctAnswer: 1,
      category: 'Technology',
      difficulty: 'medium',
      points: 15
    }
  ]);

  const [currentExam, setCurrentExam] = useState<ExamAttempt | null>(null);
  const [examHistory, setExamHistory] = useState<ExamAttempt[]>([]);

  const addQuestion = useCallback((question: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...question,
      id: Date.now().toString()
    };
    setQuestions(prev => [...prev, newQuestion]);
  }, []);

  const updateQuestion = useCallback((id: string, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  }, []);

  const removeQuestion = useCallback((id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  }, []);

  const startExam = useCallback((config: ExamConfig) => {
    const shuffled = config.shuffleQuestions ? [...questions].sort(() => Math.random() - 0.5) : questions;
    const examQuestions = shuffled
      .filter(q => config.category === 'All' || q.category === config.category)
      .slice(0, config.numberOfQuestions);

    const attempt: ExamAttempt = {
      id: Date.now().toString(),
      examConfig: config,
      questions: examQuestions,
      answers: {},
      startTime: new Date()
    };

    setCurrentExam(attempt);
  }, [questions]);

  const submitAnswer = useCallback((questionId: string, answer: string) => {
    if (!currentExam) return;
    
    setCurrentExam(prev => prev ? {
      ...prev,
      answers: { ...prev.answers, [questionId]: answer }
    } : null);
  }, [currentExam]);

  const finishExam = useCallback((): ExamResult | null => {
    if (!currentExam) return null;

    const endTime = new Date();
    let correctAnswers = 0;
    let totalScore = 0;
    const questionResults = [];

    for (const question of currentExam.questions) {
      const userAnswer = currentExam.answers[question.id];
      const correctAnswer = question.correctAnswer.toString();
      const isCorrect = userAnswer === correctAnswer;
      
      if (isCorrect) {
        correctAnswers++;
        totalScore += question.points;
      }

      questionResults.push({
        questionId: question.id,
        correct: isCorrect,
        userAnswer: userAnswer || 'No answer',
        correctAnswer: question.type === 'multiple-choice' 
          ? question.options?.[Number(correctAnswer)] || correctAnswer
          : correctAnswer
      });
    }

    const maxPossibleScore = currentExam.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
    const passed = percentage >= currentExam.examConfig.passingScore;
    const timeTaken = Math.round((endTime.getTime() - currentExam.startTime.getTime()) / 1000);

    const result: ExamResult = {
      totalQuestions: currentExam.questions.length,
      correctAnswers,
      score: totalScore,
      percentage,
      passed,
      timeTaken,
      questionResults
    };

    const completedExam = {
      ...currentExam,
      endTime,
      score: totalScore,
      passed
    };

    setExamHistory(prev => [...prev, completedExam]);
    setCurrentExam(null);

    return result;
  }, [currentExam]);

  const getCategories = useCallback(() => {
    const categories = Array.from(new Set(questions.map(q => q.category)));
    return ['All', ...categories];
  }, [questions]);

  return {
    questions,
    currentExam,
    examHistory,
    addQuestion,
    updateQuestion,
    removeQuestion,
    startExam,
    submitAnswer,
    finishExam,
    getCategories
  };
};