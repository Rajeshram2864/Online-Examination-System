export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface ExamConfig {
  title: string;
  description: string;
  duration: number; // in minutes
  numberOfQuestions: number;
  category: string;
  passingScore: number;
  shuffleQuestions: boolean;
  showResults: boolean;
}

export interface ExamAttempt {
  id: string;
  examConfig: ExamConfig;
  questions: Question[];
  answers: Record<string, string>;
  startTime: Date;
  endTime?: Date;
  score?: number;
  passed?: boolean;
}

export interface ExamResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  percentage: number;
  passed: boolean;
  timeTaken: number;
  questionResults: {
    questionId: string;
    correct: boolean;
    userAnswer: string;
    correctAnswer: string;
  }[];
}