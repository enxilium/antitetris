import React from 'react';
import AddDeliveryForm from './AddDeliveryForm';
import UpdateDeliveryForm from './UpdateDeliveryForm';

const Sidebar = ({ setDeliveries, children }) => {
  return (
    <div className="sidebar">
      {children}
      <h2>Add New Delivery</h2>
      <AddDeliveryForm setDeliveries={setDeliveries} />

      <h2>Update Delivery</h2>
      <UpdateDeliveryForm setDeliveries={setDeliveries} />
    </div>
  );
};

export default Sidebar;
