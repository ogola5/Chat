import React, { useState } from 'react';
import styles from '../styles/Chat.module.css';

const Chat = ({ data }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Calculate total income and expenses from the data
  const totalIncome = data.filter(item => item.type === 'credit').reduce((sum, curr) => sum + curr.amount, 0);
  const totalExpenses = data.filter(item => item.type === 'debit').reduce((sum, curr) => sum + Math.abs(curr.amount), 0);

  // Calculate how much can be saved
  const calculateSavingsPotential = () => {
    const savingsPotential = totalIncome - totalExpenses;
    return savingsPotential > 0 ? savingsPotential : 0;
  };

  // Suggesting 20% of savings for investment
  const suggestInvestment = () => {
    const savings = calculateSavingsPotential();
    return savings * 0.2;  // 20% of the savings is suggested for investment
  };

  // Find the category with the highest expenses
  const suggestExpenseReduction = () => {
    const categories = data.filter(item => item.type === 'debit')
      .reduce((acc, curr) => {
        if (!acc[curr.category]) {
          acc[curr.category] = 0;
        }
        acc[curr.category] += Math.abs(curr.amount);
        return acc;
      }, {});

    const highestCategory = Object.entries(categories).reduce((prev, curr) => {
      return prev[1] > curr[1] ? prev : curr;
    }, []);
    
    return highestCategory; // [category, total expense]
  };

  const handleAskQuestion = () => {
    // Logic to handle different types of questions
    if (question.toLowerCase().includes('how much can i save')) {
      setAnswer(`You can potentially save $${calculateSavingsPotential().toLocaleString()}`);
    } else if (question.toLowerCase().includes('how much can i invest')) {
      setAnswer(`You can potentially invest $${suggestInvestment().toLocaleString()}`);
    } else if (question.toLowerCase().includes('how can i reduce expenses')) {
      const [category, amount] = suggestExpenseReduction();
      setAnswer(`You can reduce expenses in the ${category} category, which totals $${amount.toLocaleString()}.`);
    } else {
      setAnswer("I couldn't understand that question. Try asking about savings, investments, or expense reductions.");
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h3 className={styles.chatHeader}>Ask a Question</h3>
      <input
        type="text"
        className={styles.chatInput}
        placeholder="Type your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button className={styles.chatButton} onClick={handleAskQuestion}>Ask</button>
      {answer && <p className={styles.chatAnswer}>{answer}</p>}
    </div>
  );
};

export default Chat;
