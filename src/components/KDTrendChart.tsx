import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { analyticsApi } from '../services/api';

interface KDTrendChartProps {
  playerId: string;
  days?: number;
}

interface TrendData {
  date: string;
  avg_kd: number;
  max_kd: number;
  min_kd: number;
}

export default function KDTrendChart({ playerId, days = 30 }: KDTrendChartProps) {
  const [data, setData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrendData() {
      setLoading(true);
      setError(null);

      const result = await analyticsApi.getKDTrend(playerId, days);

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result.trend && result.trend.length > 0) {
        setData(result.trend);
      } else {
        setError('No trend data available. Track this player to start collecting historical stats.');
      }

      setLoading(false);
    }

    if (playerId) {
      fetchTrendData();
    }
  }, [playerId, days]);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">K/D Ratio Trend</h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-400">Loading trend data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">K/D Ratio Trend</h3>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">K/D Ratio Trend ({days} days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '0.375rem' }}
            labelStyle={{ color: '#F3F4F6' }}
            formatter={(value: number) => value.toFixed(2)}
            labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="avg_kd"
            stroke="#3B82F6"
            strokeWidth={2}
            name="Average K/D"
            dot={{ fill: '#3B82F6', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="max_kd"
            stroke="#10B981"
            strokeWidth={1}
            strokeDasharray="5 5"
            name="Max K/D"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="min_kd"
            stroke="#EF4444"
            strokeWidth={1}
            strokeDasharray="5 5"
            name="Min K/D"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
