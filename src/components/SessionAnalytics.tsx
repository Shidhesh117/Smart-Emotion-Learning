import { memo, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Emotion } from '../types';
import { Activity } from 'lucide-react';

interface SessionAnalyticsProps {
  history: { time: string, emotion: Emotion }[];
}

const emotionToScore = (emotion: Emotion): number => {
  switch (emotion) {
    case Emotion.Happy: return 100;
    case Emotion.Surprised: return 85;
    case Emotion.Neutral: return 70;
    case Emotion.Fearful: return 50;
    case Emotion.Angry: return 40;
    case Emotion.Sad: return 30;
    case Emotion.Disgusted: return 20;
    default: return 70;
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-100 text-sm">
        <p className="text-slate-500 mb-1">{label}</p>
        <p className="font-semibold text-slate-800">
          State: <span className="text-blue-600 capitalize">{payload[0].payload.emotion}</span>
        </p>
        <p className="font-medium text-slate-600">
          Engagement: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

const SessionAnalytics = memo(({ history }: SessionAnalyticsProps) => {
  
  const data = useMemo(() => {
    return history.map(point => ({
      time: point.time,
      emotion: point.emotion,
      score: emotionToScore(point.emotion)
    }));
  }, [history]);

  // If we don't have enough data history yet, buffer it with some empty points
  // to make the chart look like it's waiting for data.
  const chartData = data.length > 0 ? data : [{ time: '00:00:00', score: 0, emotion: 'waiting' }];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Activity size={20} className="text-indigo-500" />
        <h2 className="text-lg font-semibold text-slate-800">Engagement Tracker</h2>
      </div>

      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
             <XAxis 
               dataKey="time" 
               tick={{ fontSize: 10, fill: '#94A3B8' }} 
               tickLine={false}
               axisLine={false}
               minTickGap={30}
             />
             <YAxis 
               domain={[0, 100]} 
               tick={{ fontSize: 10, fill: '#94A3B8' }} 
               tickLine={false}
               axisLine={false}
               tickCount={5}
             />
             <Tooltip content={<CustomTooltip />} />
             <Line 
               type="monotone" 
               dataKey="score" 
               stroke="#6366F1" 
               strokeWidth={3}
               dot={false}
               activeDot={{ r: 6, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
               animationDuration={300}
             />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

export default SessionAnalytics;
