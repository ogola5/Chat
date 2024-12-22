export const getSpendingByCategory = (data) => {
    const categories = [...new Set(data.map(item => item.category))];
    return categories.map(cat => ({
      category: cat,
      total: data
        .filter(item => item.category === cat && item.type === 'debit')
        .reduce((sum, curr) => sum + Math.abs(curr.amount), 0),
    }));
};
  
export const suggestSavings = (totalIncome, totalExpenses) => {
    const savings = totalIncome - totalExpenses;
    if (savings > 0) {
      return `Great job! You saved $${savings.toLocaleString()}. Consider investing 20% ($${(savings * 0.2).toLocaleString()}) in a diversified portfolio.`;
    }
    return `You overspent by $${Math.abs(savings).toLocaleString()}. Reduce discretionary spending to get back on track.`;
};
  