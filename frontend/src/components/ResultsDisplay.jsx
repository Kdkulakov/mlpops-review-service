import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { RotateCcw, Award, TrendingUp, BarChart2 } from 'lucide-react';
import { maturityLevels } from '../data/questions';

const ResultsDisplay = ({ results, onReset }) => {
  const { totalScore, totalPercentage, maturityLevel, blockScores } = results;

  const CircularProgress = ({ percentage, size = 200 }) => {
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(30, 41, 59, 0.8)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#06b6d4' }} />
              <stop offset="100%" style={{ stopColor: '#10b981' }} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold" style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {totalPercentage.toFixed(0)}%
          </span>
          <span className="text-sm text-gray-400 mt-1">{totalScore} / 120</span>
        </div>
      </div>
    );
  };

  const BarChart = ({ data }) => {
    const maxPercentage = 100;

    return (
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-300">{item.block}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">
                  {item.score} / {item.maxScore}
                </span>
                <span className="text-sm font-semibold text-cyan-400">
                  {item.percentage.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="h-8 rounded-lg overflow-hidden" style={{
              background: 'rgba(30, 41, 59, 0.8)'
            }}>
              <div 
                className="h-full rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                style={{
                  width: `${item.percentage}%`,
                  background: 'linear-gradient(90deg, #06b6d4 0%, #10b981 100%)',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
                }}
              >
                {item.percentage > 15 && (
                  <span className="text-xs font-semibold text-white">
                    {item.percentage.toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-3" style={{
          background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Результаты оценки
        </h2>
        <p className="text-gray-400">Анализ готовности к внедрению MLOps практик</p>
      </div>

      {/* Main Results Card */}
      <Card className="border-cyan-500/30" style={{
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
        backdropFilter: 'blur(10px)'
      }}>
        <CardContent className="pt-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Circular Progress */}
            <div className="flex flex-col items-center">
              <CircularProgress percentage={totalPercentage} size={240} />
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-cyan-100">
                    {maturityLevel.level}
                  </h3>
                </div>
                <p className="text-gray-400">Уровень зрелости MLOps</p>
              </div>
            </div>

            {/* Maturity Levels */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-cyan-100 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Шкала зрелости
              </h3>
              {maturityLevels.map((level) => {
                const isCurrentLevel = level.level === maturityLevel.level;
                return (
                  <div
                    key={level.level}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      isCurrentLevel ? 'scale-105' : 'opacity-60'
                    }`}
                    style={{
                      background: isCurrentLevel 
                        ? 'rgba(6, 182, 212, 0.15)'
                        : 'rgba(30, 41, 59, 0.4)',
                      borderColor: isCurrentLevel 
                        ? level.color
                        : 'rgba(71, 85, 105, 0.3)',
                      borderWidth: isCurrentLevel ? '2px' : '1px',
                      boxShadow: isCurrentLevel 
                        ? `0 4px 24px ${level.color}40`
                        : 'none'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{level.icon}</span>
                        <div>
                          <div className="font-semibold" style={{ color: level.color }}>
                            {level.level}
                          </div>
                          <div className="text-xs text-gray-400">
                            {level.range} баллов • {level.percent}
                          </div>
                        </div>
                      </div>
                      {isCurrentLevel && (
                        <Award className="w-6 h-6" style={{ color: level.color }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Block Scores */}
      <Card className="border-slate-700/50" style={{
        background: 'rgba(30, 41, 59, 0.4)',
        backdropFilter: 'blur(10px)'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-100">
            <BarChart2 className="w-6 h-6 text-cyan-400" />
            Детализация по блокам
          </CardTitle>
          <CardDescription className="text-gray-400">
            Оценка готовности по каждой категории MLOps практик
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart data={blockScores} />
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Общий балл', value: totalScore, max: 120, icon: Award },
          { label: 'Процент готовности', value: `${totalPercentage.toFixed(1)}%`, icon: TrendingUp },
          { label: 'Уровень зрелости', value: maturityLevel.level, icon: BarChart2 },
          { label: 'Всего вопросов', value: '60', icon: BarChart2 }
        ].map((stat, index) => (
          <Card key={index} className="border-slate-700/50" style={{
            background: 'rgba(30, 41, 59, 0.4)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)'
                }}>
                  <stat.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-100">
                    {stat.value}{stat.max && ` / ${stat.max}`}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reset Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={onReset}
          size="lg"
          className="gap-2 px-8"
          style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
            border: 'none',
            boxShadow: '0 8px 24px rgba(6, 182, 212, 0.4)'
          }}
        >
          <RotateCcw className="w-5 h-5" />
          Пройти опрос заново
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
