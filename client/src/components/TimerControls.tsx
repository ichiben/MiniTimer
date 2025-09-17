import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  disabled?: boolean;
}

export default function TimerControls({ isRunning, onStart, onPause, onReset, disabled = false }: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4" data-testid="timer-controls">
      {!isRunning ? (
        <Button
          size="lg"
          onClick={onStart}
          disabled={disabled}
          className="px-8"
          data-testid="button-start"
        >
          <Play className="w-5 h-5 mr-2" />
          Start
        </Button>
      ) : (
        <Button
          size="lg"
          variant="outline"
          onClick={onPause}
          className="px-8"
          data-testid="button-pause"
        >
          <Pause className="w-5 h-5 mr-2" />
          Pause
        </Button>
      )}
      
      <Button
        size="lg"
        variant="ghost"
        onClick={onReset}
        className="px-6"
        data-testid="button-reset"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Reset
      </Button>
    </div>
  );
}