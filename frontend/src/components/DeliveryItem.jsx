import React from 'react';

const DeliveryItem = ({ item }) => {
  return (
    <div className="delivery-item">
      <p><strong>ID:</strong> {item._id}</p>
      <p><strong>Pickup:</strong> {item.pickup}</p>
      <p><strong>Delivery:</strong> {item.delivery}</p>
      <p><strong>Description:</strong> {item.description}</p>
    </div>
  );
};

export default DeliveryItem;
