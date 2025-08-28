import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import QuestionBank from './components/QuestionBank';
import ExamInterface from './components/ExamInterface';
import Results from './components/Results';
import { useExamStore } from './hooks/useExamStore';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const {
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
  } = useExamStore();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard questions={questions} examHistory={examHistory} />;
      
      case 'questions':
        return (
          <QuestionBank
            questions={questions}
            onAddQuestion={addQuestion}
            onUpdateQuestion={updateQuestion}
            onRemoveQuestion={removeQuestion}
          />
        );
      
      case 'exam':
        return (
          <ExamInterface
            categories={getCategories()}
            currentExam={currentExam}
            onStartExam={startExam}
            onSubmitAnswer={submitAnswer}
            onFinishExam={finishExam}
          />
        );
      
      case 'results':
        return <Results examHistory={examHistory} />;
      
      default:
        return <Dashboard questions={questions} examHistory={examHistory} />;
    }
  };

  return (
    <>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderActiveTab()}
      </Layout>
      <Toaster />
    </>
  );
}

export default App;