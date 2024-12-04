import React from 'react';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const Header: React.FC = () => {
  const { cart } = useCart();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Menu App</h1>
      <div className="relative">
        <FaShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
            {totalItems}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
