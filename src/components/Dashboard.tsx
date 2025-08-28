import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Trophy, TrendingUp } from 'lucide-react';
import { Question, ExamAttempt } from '@/types';

interface DashboardProps {
  questions: Question[];
  examHistory: ExamAttempt[];
}

const Dashboard: React.FC<DashboardProps> = ({ questions, examHistory }) => {
  const stats = {
    totalQuestions: questions.length,
    totalExams: examHistory.length,
    averageScore: examHistory.length > 0 
      ? Math.round(examHistory.reduce((sum, exam) => sum + (exam.score || 0), 0) / examHistory.length)
      : 0,
    passRate: examHistory.length > 0
      ? Math.round((examHistory.filter(exam => exam.passed).length / examHistory.length) * 100)
      : 0
  };

  const categoryDistribution = questions.reduce((acc, question) => {
    acc[question.category] = (acc[question.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const difficultyDistribution = questions.reduce((acc, question) => {
    acc[question.difficulty] = (acc[question.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h2>
        <p className="text-slate-600">Overview of your examination system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Questions</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.totalQuestions}</div>
            <p className="text-xs text-blue-600">Available in question bank</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Exams Taken</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.totalExams}</div>
            <p className="text-xs text-green-600">Total attempts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Average Score</CardTitle>
            <Trophy className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{stats.averageScore}</div>
            <p className="text-xs text-orange-600">Points average</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Pass Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.passRate}%</div>
            <p className="text-xs text-purple-600">Success rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Questions by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(categoryDistribution).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(count / stats.totalQuestions) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-slate-500 w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Questions by Difficulty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(difficultyDistribution).map(([difficulty, count]) => (
                <div key={difficulty} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 capitalize">{difficulty}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          difficulty === 'easy' ? 'bg-green-500' :
                          difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{
                          width: `${(count / stats.totalQuestions) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-slate-500 w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {examHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Exam Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {examHistory.slice(-5).reverse().map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-900">{exam.examConfig.title}</h4>
                    <p className="text-sm text-slate-500">
                      {new Date(exam.startTime).toLocaleDateString()} at {new Date(exam.startTime).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-slate-900">{exam.score || 0} pts</div>
                    <div className={`text-sm ${exam.passed ? 'text-green-600' : 'text-red-600'}`}>
                      {exam.passed ? 'Passed' : 'Failed'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;