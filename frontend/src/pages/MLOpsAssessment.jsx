import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { RotateCcw, BarChart3, TrendingUp, CheckCircle2 } from 'lucide-react';
import { questionsData, maturityLevels } from '../data/questions';
import ResultsDisplay from '../components/ResultsDisplay';

const MLOpsAssessment = () => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [activeBlock, setActiveBlock] = useState(0);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }));
  };

  const calculateResults = useMemo(() => {
    const blockScores = questionsData.map(block => {
      const score = block.questions.reduce((sum, q) => {
        return sum + (answers[q.id] || 0);
      }, 0);
      return {
        block: block.block,
        score,
        maxScore: block.maxScore,
        percentage: (score / block.maxScore) * 100
      };
    });

    const totalScore = blockScores.reduce((sum, b) => sum + b.score, 0);
    const totalPercentage = (totalScore / 120) * 100;

    let maturityLevel = maturityLevels[0];
    if (totalScore >= 91) maturityLevel = maturityLevels[3];
    else if (totalScore >= 61) maturityLevel = maturityLevels[2];
    else if (totalScore >= 31) maturityLevel = maturityLevels[1];

    return {
      blockScores,
      totalScore,
      totalPercentage,
      maturityLevel,
      answeredCount: Object.keys(answers).length
    };
  }, [answers]);

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setActiveBlock(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPercentage = (calculateResults.answeredCount / 60) * 100;

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
    }}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 rounded-full" style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
            boxShadow: '0 8px 32px rgba(6, 182, 212, 0.3)'
          }}>
            <BarChart3 className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-lg">MLOps Readiness</span>
          </div>
          <h1 className="text-5xl font-bold mb-4" style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Оценка готовности к MLOps
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Пройдите опрос из 60 вопросов для оценки уровня зрелости MLOps практик в вашей компании
          </p>
        </div>

        {/* Progress Bar */}
        {!showResults && (
          <Card className="mb-8 border-cyan-500/20" style={{ 
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-300">
                  Прогресс: {calculateResults.answeredCount} из 60 вопросов
                </span>
                <span className="text-sm font-semibold text-cyan-400">
                  {progressPercentage.toFixed(0)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" style={{
                background: 'rgba(30, 41, 59, 0.8)'
              }} />
            </CardContent>
          </Card>
        )}

        {/* Results Display */}
        {showResults && (
          <ResultsDisplay 
            results={calculateResults} 
            onReset={handleReset}
          />
        )}

        {/* Questions */}
        {!showResults && (
          <div className="space-y-8">
            {/* Block Navigation */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {questionsData.map((block, index) => (
                <Button
                  key={block.id}
                  onClick={() => setActiveBlock(index)}
                  variant={activeBlock === index ? "default" : "outline"}
                  className="transition-all duration-300"
                  style={activeBlock === index ? {
                    background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
                    border: 'none',
                    boxShadow: '0 4px 16px rgba(6, 182, 212, 0.4)'
                  } : {
                    borderColor: 'rgba(6, 182, 212, 0.3)',
                    color: '#94a3b8',
                    background: 'rgba(15, 23, 42, 0.4)'
                  }}
                >
                  Блок {index + 1}
                </Button>
              ))}
            </div>

            {/* Active Block */}
            {questionsData.map((block, blockIndex) => (
              activeBlock === blockIndex && (
                <div key={block.id} className="space-y-6">
                  <Card className="border-cyan-500/30" style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-cyan-400" />
                        <span className="text-cyan-100">{block.block}</span>
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {block.questions.length} вопросов • Максимум {block.maxScore} баллов
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  {block.questions.map((question) => (
                    <Card 
                      key={question.id} 
                      className="border-slate-700/50 transition-all duration-300 hover:border-cyan-500/40"
                      style={{
                        background: 'rgba(30, 41, 59, 0.4)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold" style={{
                            background: answers[question.id] !== undefined 
                              ? 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)'
                              : 'rgba(71, 85, 105, 0.5)',
                            color: answers[question.id] !== undefined ? 'white' : '#94a3b8'
                          }}>
                            {answers[question.id] !== undefined ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              question.id
                            )}
                          </div>
                          <div className="flex-1">
                            <Label className="text-base text-gray-200 mb-4 block">
                              {question.text}
                            </Label>
                            <RadioGroup
                              value={answers[question.id]?.toString() || ''}
                              onValueChange={(value) => handleAnswer(question.id, value)}
                              className="flex gap-4 mt-3"
                            >
                              <div 
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all cursor-pointer"
                                style={{
                                  background: answers[question.id] === 2 
                                    ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(16, 185, 129, 0.25) 100%)'
                                    : 'transparent',
                                  border: answers[question.id] === 2 
                                    ? '2px solid #06b6d4'
                                    : '1px solid rgba(71, 85, 105, 0.3)'
                                }}
                              >
                                <RadioGroupItem value="2" id={`q${question.id}-yes`} style={{
                                  borderColor: answers[question.id] === 2 ? '#06b6d4' : '#475569',
                                  borderWidth: '2px'
                                }} />
                                <Label htmlFor={`q${question.id}-yes`} className="cursor-pointer font-medium" style={{
                                  color: answers[question.id] === 2 ? '#06b6d4' : '#94a3b8'
                                }}>Да (2)</Label>
                              </div>
                              <div 
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all cursor-pointer"
                                style={{
                                  background: answers[question.id] === 1 
                                    ? 'rgba(251, 191, 36, 0.15)'
                                    : 'transparent',
                                  border: answers[question.id] === 1 
                                    ? '2px solid #fbbf24'
                                    : '1px solid rgba(71, 85, 105, 0.3)'
                                }}
                              >
                                <RadioGroupItem value="1" id={`q${question.id}-partial`} style={{
                                  borderColor: answers[question.id] === 1 ? '#fbbf24' : '#475569',
                                  borderWidth: '2px'
                                }} />
                                <Label htmlFor={`q${question.id}-partial`} className="cursor-pointer font-medium" style={{
                                  color: answers[question.id] === 1 ? '#fbbf24' : '#94a3b8'
                                }}>Частично (1)</Label>
                              </div>
                              <div 
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all cursor-pointer"
                                style={{
                                  background: answers[question.id] === 0 
                                    ? 'rgba(148, 163, 184, 0.15)'
                                    : 'transparent',
                                  border: answers[question.id] === 0 
                                    ? '2px solid #94a3b8'
                                    : '1px solid rgba(71, 85, 105, 0.3)'
                                }}
                              >
                                <RadioGroupItem value="0" id={`q${question.id}-no`} style={{
                                  borderColor: answers[question.id] === 0 ? '#94a3b8' : '#475569',
                                  borderWidth: '2px'
                                }} />
                                <Label htmlFor={`q${question.id}-no`} className="cursor-pointer font-medium" style={{
                                  color: answers[question.id] === 0 ? '#94a3b8' : '#64748b'
                                }}>Нет (0)</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            ))}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-8 pb-12">
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="gap-2"
                style={{
                  borderColor: 'rgba(148, 163, 184, 0.3)',
                  color: '#94a3b8',
                  background: 'rgba(15, 23, 42, 0.6)'
                }}
              >
                <RotateCcw className="w-5 h-5" />
                Сбросить результат
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={calculateResults.answeredCount < 60}
                size="lg"
                className="gap-2 px-8"
                style={{
                  background: calculateResults.answeredCount === 60 
                    ? 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)'
                    : 'rgba(71, 85, 105, 0.5)',
                  border: 'none',
                  boxShadow: calculateResults.answeredCount === 60 
                    ? '0 8px 24px rgba(6, 182, 212, 0.4)'
                    : 'none'
                }}
              >
                <CheckCircle2 className="w-5 h-5" />
                Показать результаты
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MLOpsAssessment;
