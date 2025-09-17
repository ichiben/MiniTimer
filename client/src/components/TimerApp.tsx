import { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimeInput from './TimeInput';
import ThemeToggle from './ThemeToggle';

export default function TimerApp() {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    // Create a simple audio context for the beep sound
    audioRef.current = new Audio();
    // Create a beep sound using data URL (simple tone)
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const createBeep = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    };

    audioRef.current.play = () => {
      createBeep();
      return Promise.resolve();
    };
  }, []);

  const startTimer = useCallback(() => {
    const total = minutes * 60 + seconds;
    if (total <= 0) return;
    
    setTotalTime(total);
    setTimeRemaining(total);
    setIsRunning(true);
  }, [minutes, seconds]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeRemaining(0);
    setTotalTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleTimeUp = useCallback(() => {
    setIsRunning(false);
    if (!isMuted && audioRef.current) {
      // Play multiple beeps
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          if (audioRef.current?.play) {
            audioRef.current.play();
          }
        }, i * 500);
      }
    }
    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      new Notification('Timer Complete!', {
        body: 'Your timer has finished.',
        icon: '/favicon.ico'
      });
    }
  }, [isMuted]);

  // Timer countdown effect
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining]);

  // Request notification permission on first load
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const hasTimeSet = minutes > 0 || seconds > 0;
  const isTimerActive = timeRemaining > 0;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Timer</h1>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMuted(!isMuted)}
              data-testid="button-mute"
              className="rounded-full"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Time Input - Hidden when timer is active */}
        {!isTimerActive && (
          <TimeInput
            minutes={minutes}
            seconds={seconds}
            onMinutesChange={setMinutes}
            onSecondsChange={setSeconds}
            disabled={isRunning}
          />
        )}

        {/* Timer Display - Shown when timer is set or running */}
        {(isTimerActive || isRunning) && (
          <div className="flex justify-center">
            <TimerDisplay
              timeRemaining={timeRemaining}
              totalTime={totalTime}
              isRunning={isRunning}
              onTimeUp={handleTimeUp}
            />
          </div>
        )}

        {/* Controls */}
        <TimerControls
          isRunning={isRunning}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
          disabled={!hasTimeSet && !isTimerActive}
        />

        {/* Status Messages */}
        {!hasTimeSet && !isTimerActive && (
          <p className="text-center text-muted-foreground text-sm" data-testid="text-instruction">
            Set a time above to start your timer
          </p>
        )}

        {isMuted && (
          <p className="text-center text-muted-foreground text-xs" data-testid="text-muted">
            Sound alerts are muted
          </p>
        )}
      </Card>
    </div>
  );
}