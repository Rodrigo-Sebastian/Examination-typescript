import React, { useState } from 'react';
import { createOrder } from '../api/services/api';

const OrderForm: React.FC<{ tenantId: string }> = ({ tenantId }) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleItemSelection = (itemId: number) => {
    setSelectedItems((prev) => [...prev, itemId]);
  };

  const handleSubmit = async () => {
    try {
      const order = await createOrder(tenantId, selectedItems);
      console.log('Order submitted:', order);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className='hidden'>
      <h2>Create Order</h2>
      <button onClick={() => handleItemSelection(1)}>Add Wonton</button>
      <button onClick={() => handleItemSelection(12)}>Add Chili Mayo</button>
      <button onClick={() => handleItemSelection(15)}>Add Sprite</button>
      <br />
      <button onClick={handleSubmit}>Submit Order</button>
    </div>
  );
};

export default OrderForm;
