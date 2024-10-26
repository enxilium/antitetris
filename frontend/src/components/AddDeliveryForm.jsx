import React, { useState } from 'react';
import axios from 'axios';

const AddDeliveryForm = ({ setDeliveries }) => {
  const [newItem, setNewItem] = useState({ pickup: '', delivery: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/data', newItem);
      setDeliveries(prev => [...prev, response.data]);
      setNewItem({ pickup: '', delivery: '', description: '' });
    } catch (error) {
      console.error('Error adding delivery:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Pickup Location"
        value={newItem.pickup}
        onChange={(e) => setNewItem({ ...newItem, pickup: e.target.value })}
      />
      <input
        type="text"
        placeholder="Delivery Location"
        value={newItem.delivery}
        onChange={(e) => setNewItem({ ...newItem, delivery: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <button type="submit">Add Data</button>
    </form>
  );
};

export default AddDeliveryForm;
