import React, { useEffect } from 'react';
import axios from 'axios';

const MainContent = ({ isSidebarOpen, deliveries, setDeliveries }) => {
  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setDeliveries(response.data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/data/${id}`);
      setDeliveries(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting delivery:', error);
    }
  };

  return (
    <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <h1>TorontoGo Delivery Management</h1>
      <h2>Deliveries</h2>
      <ul>
        {deliveries.map((item) => (
          <li key={item._id}>
            Pickup: {item.pickup} - Delivery: {item.delivery} - Description: {item.description}
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainContent;
