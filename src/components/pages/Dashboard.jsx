import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import { getSpendingByCategory, suggestSavings } from '../utils/insights';


const Dashboard = ({ data }) => {
  const totalIncome = data.filter(item => item.type === 'credit').reduce((sum, curr) => sum + curr.amount, 0);
  const totalExpenses = data.filter(item => item.type === 'debit').reduce((sum, curr) => sum + Math.abs(curr.amount), 0);
  const insights = suggestSavings(totalIncome, totalExpenses);
  const spendingByCategory = getSpendingByCategory(data);

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.title}>Financial Dashboard</h2>
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h3>Total Income</h3>
          <p>${totalIncome.toLocaleString()}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Expenses</h3>
          <p>${totalExpenses.toLocaleString()}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Net Savings</h3>
          <p>${(totalIncome - totalExpenses).toLocaleString()}</p>
        </div>
      </div>
      <div className={styles.insights}>
        <h3>Insights</h3>
        <p>{insights}</p>
      </div>
      <div className={styles.categoryBreakdown}>
        <h3>Spending by Category</h3>
        <ul>
          {spendingByCategory.map(cat => (
            <li key={cat.category}>
              {cat.category}: ${cat.total.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
