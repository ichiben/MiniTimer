import { useState, useEffect } from 'react';

interface TimerDisplayProps {
  timeRemaining: number;
  totalTime: number;
  isRunning: boolean;
  onTimeUp?: () => void;
}

export default function TimerDisplay({ timeRemaining, totalTime, isRunning, onTimeUp }: TimerDisplayProps) {
  const [isLowTime, setIsLowTime] = useState(false);
  const [isVeryLowTime, setIsVeryLowTime] = useState(false);

  useEffect(() => {
    setIsLowTime(timeRemaining <= 10 && timeRemaining > 5);
    setIsVeryLowTime(timeRemaining <= 5 && timeRemaining > 0);
    
    if (timeRemaining === 0 && onTimeUp) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getDisplayColor = () => {
    if (timeRemaining === 0) return 'text-chart-1';
    if (isVeryLowTime) return 'text-destructive';
    if (isLowTime) return 'text-chart-2';
    return 'text-foreground';
  };

  const getRingColor = () => {
    if (timeRemaining === 0) return 'stroke-chart-1';
    if (isVeryLowTime) return 'stroke-destructive';
    if (isLowTime) return 'stroke-chart-2';
    return 'stroke-primary';
  };

  return (
    <div className="relative flex items-center justify-center" data-testid="timer-display">
      {/* Progress Ring */}
      <svg
        className="transform -rotate-90 w-64 h-64"
        width="256"
        height="256"
        data-testid="progress-ring"
      >
        <circle
          cx="128"
          cy="128"
          r="120"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          fill="transparent"
          className="opacity-20"
        />
        <circle
          cx="128"
          cy="128"
          r="120"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`transition-all duration-500 ${getRingColor()}`}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Timer Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-6xl font-mono font-bold transition-colors duration-300 ${getDisplayColor()} ${isRunning && timeRemaining <= 5 && timeRemaining > 0 ? 'animate-pulse' : ''}`}>
          {formatTime(timeRemaining)}
        </div>
      </div>
      
      {/* Status indicator */}
      {timeRemaining === 0 && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-sm font-medium text-chart-1 animate-pulse" data-testid="status-complete">
            Time's up!
          </div>
        </div>
      )}
    </div>
  );
}