import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DataSidebar from './components/DataSidebar';
import MainContent from './components/MainContent';
import './App.css';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDataSidebarOpen, setIsDataSidebarOpen] = useState(false);
  const [deliveries, setDeliveries] = useState([]);

  const toggleSidebar = () => {
    if (isSidebarOpen || isDataSidebarOpen) {
      setIsSidebarOpen(false);
      setIsDataSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  const toggleDataSidebar = () => {
    if (isDataSidebarOpen) {
      setIsDataSidebarOpen(false);
      setIsSidebarOpen(true);
    } else if (isSidebarOpen) {
      setIsSidebarOpen(false);
      setIsDataSidebarOpen(true);
    } 
  };

  return (
    <div className="App">
      <button 
        className={`toggle-btn ${isSidebarOpen || isDataSidebarOpen ? 'open' : 'closed'}`} 
        onClick={toggleSidebar}
      >
        {isSidebarOpen || isDataSidebarOpen ? '<<' : '>>'}
      </button>
      
      {isSidebarOpen && (
        <Sidebar setDeliveries={setDeliveries}>
          <button 
            className="toggle-data-btn"
            onClick={toggleDataSidebar}
          >
            Show Data
          </button>
        </Sidebar>
      )}
      
      {isDataSidebarOpen && (
        <DataSidebar deliveries={deliveries}>
          <button 
            className="toggle-data-btn"
            onClick={toggleDataSidebar}
          >
            Show Input
          </button>
        </DataSidebar>
      )}

      <MainContent 
        isSidebarOpen={isSidebarOpen || isDataSidebarOpen}
        deliveries={deliveries} 
        setDeliveries={setDeliveries} 
      />
    </div>
  );
};

export default App;
