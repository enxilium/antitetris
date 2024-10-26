import React, { useState } from 'react';
import axios from 'axios';

const UpdateDeliveryForm = ({ setDeliveries }) => {
  const [updateItem, setUpdateItem] = useState({ id: '', pickup: '', delivery: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/data/${updateItem.id}`, {
        pickup: updateItem.pickup,
        delivery: updateItem.delivery,
        description: updateItem.description,
      });
      setDeliveries(prev => prev.map(item => 
        item._id === updateItem.id ? { ...item, ...updateItem } : item
      ));
      setUpdateItem({ id: '', pickup: '', delivery: '', description: '' });
    } catch (error) {
      console.error('Error updating delivery:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID"
        value={updateItem.id}
        onChange={(e) => setUpdateItem({ ...updateItem, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Pickup Location"
        value={updateItem.pickup}
        onChange={(e) => setUpdateItem({ ...updateItem, pickup: e.target.value })}
      />
      <input
        type="text"
        placeholder="Delivery Location"
        value={updateItem.delivery}
        onChange={(e) => setUpdateItem({ ...updateItem, delivery: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={updateItem.description}
        onChange={(e) => setUpdateItem({ ...updateItem, description: e.target.value })}
      />
      <button type="submit">Update Delivery</button>
    </form>
  );
};

export default UpdateDeliveryForm;
