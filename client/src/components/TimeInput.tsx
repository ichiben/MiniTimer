import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Minus, Plus } from 'lucide-react';

interface TimeInputProps {
  minutes: number;
  seconds: number;
  onMinutesChange: (minutes: number) => void;
  onSecondsChange: (seconds: number) => void;
  disabled?: boolean;
}

export default function TimeInput({ minutes, seconds, onMinutesChange, onSecondsChange, disabled = false }: TimeInputProps) {
  const handleMinutesChange = (value: string) => {
    const num = parseInt(value) || 0;
    onMinutesChange(Math.max(0, Math.min(99, num)));
  };

  const handleSecondsChange = (value: string) => {
    const num = parseInt(value) || 0;
    onSecondsChange(Math.max(0, Math.min(59, num)));
  };

  const incrementMinutes = () => {
    onMinutesChange(Math.min(99, minutes + 1));
  };

  const decrementMinutes = () => {
    onMinutesChange(Math.max(0, minutes - 1));
  };

  const incrementSeconds = () => {
    onSecondsChange(Math.min(59, seconds + 1));
  };

  const decrementSeconds = () => {
    onSecondsChange(Math.max(0, seconds - 1));
  };

  return (
    <div className="space-y-6" data-testid="time-input">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Minutes Input */}
        <div className="space-y-2">
          <Label htmlFor="minutes" className="text-sm font-medium">
            Minutes
          </Label>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={decrementMinutes}
              disabled={disabled || minutes <= 0}
              data-testid="button-minutes-decrease"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Input
              id="minutes"
              type="number"
              min="0"
              max="99"
              value={minutes}
              onChange={(e) => handleMinutesChange(e.target.value)}
              disabled={disabled}
              className="text-center text-lg font-mono"
              data-testid="input-minutes"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={incrementMinutes}
              disabled={disabled || minutes >= 99}
              data-testid="button-minutes-increase"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Seconds Input */}
        <div className="space-y-2">
          <Label htmlFor="seconds" className="text-sm font-medium">
            Seconds
          </Label>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={decrementSeconds}
              disabled={disabled || seconds <= 0}
              data-testid="button-seconds-decrease"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Input
              id="seconds"
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => handleSecondsChange(e.target.value)}
              disabled={disabled}
              className="text-center text-lg font-mono"
              data-testid="input-seconds"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={incrementSeconds}
              disabled={disabled || seconds >= 59}
              data-testid="button-seconds-increase"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => { onMinutesChange(5); onSecondsChange(0); }}
          disabled={disabled}
          data-testid="preset-5min"
        >
          5 min
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => { onMinutesChange(10); onSecondsChange(0); }}
          disabled={disabled}
          data-testid="preset-10min"
        >
          10 min
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => { onMinutesChange(15); onSecondsChange(0); }}
          disabled={disabled}
          data-testid="preset-15min"
        >
          15 min
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => { onMinutesChange(30); onSecondsChange(0); }}
          disabled={disabled}
          data-testid="preset-30min"
        >
          30 min
        </Button>
      </div>
    </div>
  );
}