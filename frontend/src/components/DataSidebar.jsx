import React from 'react';
import DeliveryItem from './DeliveryItem';

const DataSidebar = ({ deliveries, children }) => {
  return (
    <div className="data-sidebar">
      {children}
      <h2>Delivery Data</h2>
      {deliveries.map((item) => (
        <DeliveryItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default DataSidebar;
