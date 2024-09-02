import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'rgba(30, 30, 30, 0.9)', // Very dark gray, almost black, with some transparency
        padding: '12px',
        border: '1px solid rgba(255, 255, 255, 0.2)', // Light border for definition
        borderRadius: '6px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: '4px' }}>
          {`Year: ${label}`}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: '4px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: entry.color, fontWeight: 'bold', marginRight: '8px' }}>{entry.name}</span>
            <span>{`${entry.value.toFixed(2)}M`}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const chartColors = {
  valorant: "#ff4d4d", // red
  csgo: "#4dff4d", // green
  lol: "#4d4dff", // blue
  dota2: "#ffff4d", // yellow
  ow: "#ff4dff"  // pink
};

const formatYAxis = (tickItem) => {
  return `${tickItem.toFixed(2)}M`;
};

export default function EnhancedEsportsChart({ data }) {
  const formatData = (data) => {
    return data.map(item => {
      const newItem = { ...item };
      for (let key in newItem) {
        if (key !== 'year') {
          newItem[key] = newItem[key] / 1000000; // Convert to millions
        }
      }
      return newItem;
    });
  };

  const formattedData = formatData(data);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      padding: '20px',
      backgroundColor: '#000',
      boxSizing: 'border-box'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#fff'
      }}>
        Esports Viewership Trends
      </h2>
      <div style={{ width: '100%', height: 'calc(100% - 70px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="year"
              tick={{ fill: '#fff' }}
              axisLine={{ stroke: '#fff' }}
            />
            <YAxis
              tick={{ fill: '#fff' }}
              axisLine={{ stroke: '#fff' }}
              tickFormatter={formatYAxis}
              label={{ value: 'Viewers (Millions)', angle: -90, position: 'insideLeft', fill: '#fff', style: { textAnchor: 'middle' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px', color: '#fff' }} />
            {Object.keys(chartColors).map((game) => (
              <Bar key={game} dataKey={game} name={game} fill={chartColors[game]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}