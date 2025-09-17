import TimerControls from '../TimerControls';

export default function TimerControlsExample() {
  return (
    <div className="p-8 bg-background">
      <TimerControls
        isRunning={false}
        onStart={() => console.log('Start clicked')}
        onPause={() => console.log('Pause clicked')}
        onReset={() => console.log('Reset clicked')}
      />
    </div>
  );
}