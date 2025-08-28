import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Question } from '@/types';

interface QuestionBankProps {
  questions: Question[];
  onAddQuestion: (question: Omit<Question, 'id'>) => void;
  onUpdateQuestion: (id: string, updates: Partial<Question>) => void;
  onRemoveQuestion: (id: string) => void;
}

const QuestionBank: React.FC<QuestionBankProps> = ({
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onRemoveQuestion
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const [newQuestion, setNewQuestion] = useState<Omit<Question, 'id'>>({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    category: '',
    difficulty: 'medium',
    points: 10
  });

  const categories = Array.from(new Set(questions.map(q => q.category)));
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || q.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const resetForm = () => {
    setNewQuestion({
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      category: '',
      difficulty: 'medium',
      points: 10
    });
    setEditingQuestion(null);
  };

  const handleSubmit = () => {
    if (editingQuestion) {
      onUpdateQuestion(editingQuestion.id, newQuestion);
    } else {
      onAddQuestion(newQuestion);
    }
    setIsAddDialogOpen(false);
    resetForm();
  };

  const startEdit = (question: Question) => {
    setEditingQuestion(question);
    setNewQuestion({
      type: question.type,
      question: question.question,
      options: question.options || ['', '', '', ''],
      correctAnswer: question.correctAnswer,
      category: question.category,
      difficulty: question.difficulty,
      points: question.points
    });
    setIsAddDialogOpen(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'multiple-choice': return 'bg-blue-100 text-blue-800';
      case 'true-false': return 'bg-purple-100 text-purple-800';
      case 'short-answer': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Question Bank</h2>
          <p className="text-slate-600">Manage your examination questions</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingQuestion ? 'Edit Question' : 'Add New Question'}</DialogTitle>
              <DialogDescription>
                {editingQuestion ? 'Update the question details below.' : 'Create a new question for your exam.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Type</label>
                  <Select
                    value={newQuestion.type}
                    onValueChange={(value: any) => setNewQuestion(prev => ({ 
                      ...prev, 
                      type: value,
                      options: value === 'multiple-choice' ? ['', '', '', ''] : undefined,
                      correctAnswer: value === 'true-false' ? 'true' : 0
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="short-answer">Short Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Category</label>
                  <Input
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Science, Math, History"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Question</label>
                <Textarea
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="Enter your question here..."
                  rows={3}
                />
              </div>

              {newQuestion.type === 'multiple-choice' && (
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Answer Options</label>
                  <div className="space-y-2">
                    {newQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-sm font-medium text-slate-600">
                          {index + 1}
                        </span>
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(newQuestion.options || [])];
                            newOptions[index] = e.target.value;
                            setNewQuestion(prev => ({ ...prev, options: newOptions }));
                          }}
                          placeholder={`Option ${index + 1}`}
                        />
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="correctAnswer"
                            checked={newQuestion.correctAnswer === index}
                            onChange={() => setNewQuestion(prev => ({ ...prev, correctAnswer: index }))}
                            className="w-4 h-4 text-blue-600"
                          />
                          <label className="ml-1 text-sm text-slate-600">Correct</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {newQuestion.type === 'true-false' && (
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Correct Answer</label>
                  <Select
                    value={newQuestion.correctAnswer.toString()}
                    onValueChange={(value) => setNewQuestion(prev => ({ ...prev, correctAnswer: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {newQuestion.type === 'short-answer' && (
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Correct Answer</label>
                  <Input
                    value={newQuestion.correctAnswer.toString()}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                    placeholder="Enter the correct answer..."
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Difficulty</label>
                  <Select
                    value={newQuestion.difficulty}
                    onValueChange={(value: any) => setNewQuestion(prev => ({ ...prev, difficulty: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Points</label>
                  <Input
                    type="number"
                    value={newQuestion.points}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, points: parseInt(e.target.value) || 0 }))}
                    min="1"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  {editingQuestion ? 'Update Question' : 'Add Question'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No questions found</h3>
                <p className="text-slate-500 mb-4">
                  {searchTerm || categoryFilter !== 'All' || difficultyFilter !== 'All'
                    ? "Try adjusting your search or filters"
                    : "Get started by adding your first question"}
                </p>
              </div>
            ) : (
              filteredQuestions.map((question) => (
                <Card key={question.id} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-slate-900 mb-2">{question.question}</h3>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge className={getTypeColor(question.type)}>
                            {question.type.replace('-', ' ')}
                          </Badge>
                          <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline">{question.category}</Badge>
                          <Badge variant="outline">{question.points} pts</Badge>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => startEdit(question)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onRemoveQuestion(question.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {question.type === 'multiple-choice' && question.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {question.options.map((option, index) => (
                          <div
                            key={index}
                            className={`p-2 rounded text-sm ${
                              question.correctAnswer === index
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-slate-50 text-slate-700'
                            }`}
                          >
                            {index + 1}. {option}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {question.type === 'true-false' && (
                      <div className="text-sm">
                        <span className="font-medium">Correct Answer: </span>
                        <span className={`px-2 py-1 rounded ${
                          question.correctAnswer === 'true' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {question.correctAnswer}
                        </span>
                      </div>
                    )}
                    
                    {question.type === 'short-answer' && (
                      <div className="text-sm">
                        <span className="font-medium">Correct Answer: </span>
                        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                          {question.correctAnswer}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionBank;