import TimerDisplay from '../TimerDisplay';

export default function TimerDisplayExample() {
  return (
    <div className="p-8 bg-background">
      <TimerDisplay 
        timeRemaining={125} 
        totalTime={300} 
        isRunning={true}
        onTimeUp={() => console.log('Timer finished!')}
      />
    </div>
  );
}