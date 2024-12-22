import React from 'react';
import financialData from './data/financialData.json';
import Dashboard from './components/pages/Dashboard';
import Charts from './components/pages/Charts';
import Chat from './components/pages/Chat';  // Import the Chat component

const App = () => {
  return (
    <div>
      <Dashboard data={financialData} />
      <Charts data={financialData} />
      <Chat data={financialData} />  {/* Include the Chat component here */}
    </div>
  );
};

export default App;
