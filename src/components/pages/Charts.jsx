import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styles from '../styles/Charts.module.css';

const Charts = ({ data }) => {
  // Extract unique categories and calculate their total spending
  const categories = [...new Set(data.map(item => item.category))];
  const categoryData = categories.map(cat => ({
    name: cat,
    value: data
      .filter(item => item.category === cat && item.type === 'debit')
      .reduce((sum, curr) => sum + Math.abs(curr.amount), 0),
  }));

  // Define colors for the chart
  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Spending Breakdown</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Charts;
