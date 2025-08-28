import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Trophy, Calendar } from 'lucide-react';
import { ExamAttempt } from '@/types';

interface ResultsProps {
  examHistory: ExamAttempt[];
}

const Results: React.FC<ResultsProps> = ({ examHistory }) => {
  const formatDuration = (startTime: Date, endTime?: Date) => {
    if (!endTime) return 'In Progress';
    const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (examHistory.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Results</h2>
          <p className="text-slate-600">View your exam history and performance</p>
        </div>

        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Exam Results Yet</h3>
              <p className="text-slate-500 mb-6">
                Take your first exam to see your results and performance analytics here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalExams = examHistory.length;
  const passedExams = examHistory.filter(exam => exam.passed).length;
  const averageScore = Math.round(
    examHistory.reduce((sum, exam) => sum + (exam.score || 0), 0) / totalExams
  );
  const passRate = Math.round((passedExams / totalExams) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Results</h2>
        <p className="text-slate-600">View your exam history and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExams}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passRate}%</div>
            <p className="text-xs text-muted-foreground">{passedExams} passed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}</div>
            <p className="text-xs text-muted-foreground">Points</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...examHistory.map(exam => exam.score || 0))}
            </div>
            <p className="text-xs text-muted-foreground">Personal best</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exam History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {examHistory.slice().reverse().map((exam) => {
              const maxScore = exam.questions.reduce((sum, q) => sum + q.points, 0);
              const percentage = maxScore > 0 ? Math.round(((exam.score || 0) / maxScore) * 100) : 0;

              return (
                <Card key={exam.id} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{exam.examConfig.title}</h3>
                          {exam.passed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        
                        <p className="text-sm text-slate-600 mb-2">{exam.examConfig.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(exam.startTime).toLocaleDateString()}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDuration(exam.startTime, exam.endTime)}
                          </Badge>
                          <Badge variant="outline">{exam.examConfig.category}</Badge>
                          <Badge variant="outline">{exam.questions.length} Questions</Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className={`text-2xl font-bold ${getScoreColor(exam.score || 0, maxScore)}`}>
                              {exam.score || 0}
                            </div>
                            <div className="text-sm text-slate-500">/ {maxScore} pts</div>
                          </div>
                          
                          <div>
                            <div className={`text-2xl font-bold ${getScoreColor(exam.score || 0, maxScore)}`}>
                              {percentage}%
                            </div>
                            <Badge className={exam.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {exam.passed ? 'PASSED' : 'FAILED'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-500">Questions</div>
                          <div className="font-semibold">{exam.questions.length}</div>
                        </div>
                        <div>
                          <div className="text-slate-500">Correct</div>
                          <div className="font-semibold text-green-600">
                            {Object.entries(exam.answers).filter(([questionId, answer]) => {
                              const question = exam.questions.find(q => q.id === questionId);
                              return question && question.correctAnswer.toString() === answer;
                            }).length}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-500">Incorrect</div>
                          <div className="font-semibold text-red-600">
                            {exam.questions.length - Object.entries(exam.answers).filter(([questionId, answer]) => {
                              const question = exam.questions.find(q => q.id === questionId);
                              return question && question.correctAnswer.toString() === answer;
                            }).length}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-500">Time</div>
                          <div className="font-semibold">{formatDuration(exam.startTime, exam.endTime)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;